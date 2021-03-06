const { JsonWebTokenError } = require('jsonwebtoken');
const AuthService = require('../auth/auth-service');

async function requireAuth(req, res, next) {
  const authToken = req.get('Authorization') || '';

  if (!authToken.toLowerCase().startsWith('bearer '))
    return res
      .status(401)
      .json({ error: 'Missing bearer token' })

  const bearer = authToken.slice(7, authToken.length)

  try {
    const payload = AuthService.verifyJwt(bearerToken);
    const user = await AuthService.getUserWithEmail(
      req.app.get('db'),
      paylaod.sub
    )

    if (!user) return res
      .status(401)
      .json({ error: 'Unauthorized Request' })
  }
  catch (error) {
    if (error instanceof JsonWebTokenError)
      return res.status(401).json({ error: 'Unauthorize request' })

    next(error)
  }

}

module.exports = {
  requireAuth
}