import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.TWITCH_CLIENT_ID) {
    console.error('No TWITCH_CLIENT_ID set')
    return res.status(500).end();
  }

  if (!process.env.TWITCH_ACCESS_TOKEN) {
    console.error('No igdb_access_token set')
    return res.status(500).end();
  }

  const { searchTerm } = req.query
  return fetch(
    `https://api.igdb.com/v4/games`, {
    method: "POST",
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      "Authorization": `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`
    },
    body: `fields name; search "${searchTerm}"; where version_parent = null & category = 0 & themes != (42); limit 15;`
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('games data', data)
      return res.status(200).json(data)
    })
    .catch((error) => {
      console.error("Error:", error);
      return res.status(500).end()
    });
}
