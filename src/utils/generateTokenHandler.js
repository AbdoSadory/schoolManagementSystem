import jwt from 'jsonwebtoken'
export const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' })
  console.log('🟢 Token has been created Successfully 👌')
  return token
}
export default generateToken
