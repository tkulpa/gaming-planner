import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from 'cookies-next';

type Data = {
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const twitchAccessToken = getCookie('twitchAccessToken', { req, res });
  if (!process.env.TWITCH_CLIENT_ID || !twitchAccessToken) {
    res.status(500).end()
    console.error('No TWITCH_CLIENT_ID or twitchAccessToken cookie set')
    return;
  }

  const { searchTerm } = req.query
  fetch(
    `https://api.igdb.com/v4/games`, {
    method: "POST",
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      "Authorization": `Bearer ${twitchAccessToken}`
    },
    body: `fields name; search "${searchTerm}"; where version_parent = null & category = 0 & themes != (42); limit 15;`
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('games data', data)
      res.status(200).json(data)
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).end()
    });
}
