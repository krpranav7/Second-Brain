import type {JwtPayload} from 'jsonwebtoken'

export interface AuthTokenPayload extends JwtPayload {
    id: string
}