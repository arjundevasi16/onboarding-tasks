import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Access token missing or invalid' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    if (decoded) {
    }
    req.user = decoded as JwtPayload & { id: string }
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Token is not valid' })
  }
}
