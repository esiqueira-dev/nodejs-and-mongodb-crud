import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';
import Client from '../schemas/Client'

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    const client = await Client.findById(decoded.clientId);

    if (!client) throw new Error()

    req.client = client;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token not invalid' });
  }
};
