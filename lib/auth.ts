import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import prisma from './prisma'

// const little_secret = process.env.MY_LITTLE_SECRET;

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { BEATIFY_ACESS_TOKEN: token } = req.cookies

    if (token) {
      let user

      try {
        const { id } = jwt.verify(token, 'hello')
        user = await prisma.user.findUnique({
          where: { id },
        })

        if (!user) {
          throw new Error('Not real user')
        }
      } catch (error) {
        res.status(401)
        res.json({ error: 'Not Authorizied' })
        return
      }

      return handler(req, res, user)
    }

    res.status(401)
    res.json({ error: 'Not Authorizied' })
  }
}

export const validateToken = (token) => {
  const user = jwt.verify(token, 'hello')
  return user
}