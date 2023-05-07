import { Request, Response } from 'express'

function login (req: Request, res: Response){
  res.json({
    message: 'Login'
  })
}

export default {
  login
}