const jwt = require('jsonwebtoken');

// Middleware de autenticação
const autenticacaoJwt = (req, res, next) => {
  // Verificar se o token JWT está presente no cabeçalho de autorização
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ mensagem: 'Token de autenticação não fornecido.' });
  }

  try {
    // Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_TOKEN); // 'chave_secreta' deve ser substituída pela sua chave secreta real

    // Armazenar informações do usuário autenticado no objeto de solicitação (req) para uso posterior
    req.usuario = decoded.usuario;

    // Passar para o próximo middleware ou rota
    next();
  } catch (err) {
    return res.status(401).json({ mensagem: 'Token de autenticação inválido.' });
  }
}

module.exports = autenticacaoJwt;