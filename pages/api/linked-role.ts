import type { NextApiRequest, NextApiResponse } from 'next'
import { redirectUri, redirectUriPostfix } from './auth/[...nextauth]';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.redirect(redirectUri + redirectUriPostfix);
}
