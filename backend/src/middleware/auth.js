import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) return res.status(401).json({ msg: 'Acesso negado, token não fornecido' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.userId
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido' })
  }
}

export default authMiddleware
