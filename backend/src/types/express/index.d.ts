import type { HydratedDocument, InferSchemaType } from 'mongoose'
import { userSchema } from '../../models/user.model.js'

declare global {
  namespace Express {
    interface Request {
      user?: HydratedDocument<InferSchemaType<typeof userSchema>>
    }
  }
}
