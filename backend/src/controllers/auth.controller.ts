import { userModel } from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { type Request, type Response } from 'express'
import { contentModel } from '../models/content.model.js';
import { tagModel } from '../models/tag.model.js';
import { linkModel } from '../models/link.model.js';
import { hashGenerator } from '../utilities/hashGenerator.js'

export async function registerUser (req: Request, res: Response) {
  try {
    const { username, password } = req.body
    if (!username?.trim() || !password?.trim()) {
      return res.status(400).json({
        message: 'Username and password are required'
      })
    }

    const isUserExists = await userModel.findOne({
      username
    })
    if (isUserExists) {
      return res.status(409).json({
        message: 'Username already taken'
      })
    }

    const hashedPwd = await bcrypt.hash(password, 8)
    const user = await userModel.create({
      username: username.trim(),
      password: hashedPwd
    })

    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('JWT_SECRET is not defined')
    const token = jwt.sign(
      {
        id: user._id
      },
      secret
    )

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })

    res.status(201).json({
      message: 'Signup successfull',
      user: {
        _id: user._id,
        username: user.username
      }
    })
  } catch (err) {
    console.log('user signup error: ', err)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export async function loginUser (req: Request, res: Response) {
  try {
    const { username, password } = req.body
    if (!username?.trim() || !password?.trim()) {
      return res.status(400).json({
        message: 'Username and password are required'
      })
    }

    const user = await userModel.findOne({
      username
    })
    if (!user) {
      return res.status(400).json({
        message: 'invalid username or password'
      })
    }

    const isPwdValid = await bcrypt.compare(password, user.password)
    if (!isPwdValid) {
      return res.status(400).json({
        message: 'invalid username or password'
      })
    }

    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('JWT_SECRET is not defined')
    const token = jwt.sign(
      {
        id: user._id
      },
      secret
    )

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })

    res.status(200).json({
      message: 'Login successfull',
      user: {
        _id: user._id,
        username: user.username
      }
    })
  } catch (err) {
    console.log('user login error: ', err)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export async function logoutUser (req: Request, res: Response) {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });

  res.status(200).json({
    message: "Logout successfull"
  })
}

export async function addContent (req: Request, res: Response) {
  const { type, link, title, tags } = req.body
  if (!type?.trim() || !link?.trim() || !title?.trim()) {
    return res.status(400).json({
      message: 'Types or Link or Title missing are required'
    });
  }

  const user = req.user
  if(!user){
    return res.status(401).json({
      message: "Unauthorized"
    })
  }
  // Wrapped in Promise.all because we're doing several independent async DB calls (one per tag) — running them concurrently instead of one at a time with a loop.
  const tagIds = await Promise.all(
    (tags ?? []).map(async (tagName: string) => {
      const normalizedTag = tagName.trim().toLowerCase()
      const tag = await tagModel.findOneAndUpdate(
        {title: normalizedTag},
        {title: normalizedTag},
        {upsert: true, new: true}
      )
      return tag._id
    })
  )

  const content = await contentModel.create({
    title,
    link,
    type,
    tags: tagIds,
    userId: user._id
  })

  res.status(201).json({
    message: "Content addition successful",
    content
  })
}

export async function getContents(req: Request, res: Response){
  try{
    const user = req.user
    if(!user){
      return res.status(401).json({
        message: "Unauthorized"
      })
    }
    const userId = user._id
    const contents = await contentModel.find({
      userId
    }).populate('userId', 'username')

    if(contents.length === 0){
      return res.status(200).json({
        message: "No content added for this user",
        content: []
      })
    }

    res.status(200).json({
      message: "Contents fetch successful",
      contents
    })

  }
  catch(err){
    console.log('get all existing contents error: ', err)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export async function deleteContent(req: Request, res: Response){
  try{
    const contentId = req.body.contentId;
    const content = await contentModel.findById(contentId)
    if(!content){
      return res.status(200).json({
        message: "Incorrect contentId"
      })
    }

    const user = req.user
    if(!user){
      return res.status(401).json({
        message: "Unauthorized"
      })
    }

    if(content.userId.toString() !== user._id.toString()){
      return res.status(403).json({
        message: "You are not allowed to delete this content"
      })
    }
    await contentModel.deleteOne({
      _id: contentId,
      userId: user._id
    })

    res.status(200).json({
      message: "Content deleted",
      content
    })
  }
  catch(err){
    console.log('Content deletion error: ', err)
    res.status(500).json({
      message: 'Internal server error'
    })   
  }
}

export async function shareBrain(req: Request, res: Response){
  try{
    const share = req.body.share; // true or false
    const user = req.user;
    if(!user){
      return res.status(401).json({
        message: "Unauthorized"
      })
    }

    if(share){
      const existingLink = await linkModel.findOne({
        userId: user._id
      })
      
      if(existingLink){
        return res.status(409).json({
          message: "share link already exists",
          hash: existingLink.hash
        })
      }
      const hash = hashGenerator(10)
      await linkModel.create({
        userId: user._id,
        hash: hash
      })

      res.status(201).json({
        message: "Hash/shareable link creation successful",
        hash: hash
      })
    } else{
      await linkModel.deleteOne({
        userId: user._id
      })
      return res.status(200).json({
        message: "shareable hash/link deletion successful"
      })
    }
  }
  catch(err){
    console.log('Brain share error: ', err)
    res.status(500).json({
      message: 'Internal server error'
    }) 
  }
}

export async function getSharedBrain(req: Request, res: Response) {
  try{
    const hash = req.params.shareLink;
    if(!hash){
      return res.status(401).json({
        message: "Corrupted hash/link"
      })
    }

    const link = await linkModel.findOne({
      hash: hash
    })
    if(!link){
      return res.status(404).json({
        message: "Incorrect hash/link"
      })
    }

    const content = await contentModel.find({
      userId: link.userId
    })
    res.status(200).json({
      message: "Brain fetch successful",
      content: content
    })
  }
  catch(err){
    console.log('Shared brain fetch error: ', err)
    res.status(500).json({
      message: 'Internal server error'
    }) 
  }
}
