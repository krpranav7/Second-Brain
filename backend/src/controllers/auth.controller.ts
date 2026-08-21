import { userModel } from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { type Request, type Response } from 'express'
import { contentModel } from '../models/content.model.js';
import { tagModel } from '../models/tag.model.js';

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

  const tagIds = await Promise.all(
    (tags ?? []).map(async (tagName: string) => {
      const tag = await tagModel.findOneAndUpdate(
        {title: tagName},
        {title: tagName},
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