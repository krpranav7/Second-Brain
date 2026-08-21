import type { InferSchemaType } from 'mongoose'
import { userSchema } from '../../models/user.model.ts'

declare global {
  namespace Express {
    interface Request {
      user?: InferSchemaType<typeof userSchema>
    }
  }
}
