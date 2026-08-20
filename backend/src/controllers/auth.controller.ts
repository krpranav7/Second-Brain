import { userModel } from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { type Request, type Response } from 'express'

export async function registerUser (req: Request, res: Response) {
  try {
    const { username, password } = req.body
    if (!username?.trim() || !password?.trim) {
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
      secure: true,
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
    if (!username?.trim() || !password?.trim) {
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
      secure: true,
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
    console.log('user signup error: ', err)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export async function logoutUser (req: Request, res: Response) {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax'
  });

  res.status(200).json({
    message: "Logout successfull"
  })
}
