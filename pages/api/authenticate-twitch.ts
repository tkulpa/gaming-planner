import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'cookies-next';

type Data = {
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('Called authenticate-twitch endpoint')
  if (!process.env.TWITCH_CLIENT_ID || !process.env.TWITCH_CLIENT_SECRET) {
    res.status(500).end()
    console.error('No TWITCH_CLIENT_ID or TWITCH_CLIENT_SECRET set')
    return;
  }
  fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if(data?.access_token) {
        setCookie('twitchAccessToken', data?.access_token, { req, res, maxAge: data?.expires_in });
        console.log('twitchAccessToken set successfully!')
        res.status(200).end()
      } else {
        console.error("Invalid token returned from twitch");
        res.status(500).end()
      }
    })
    .catch((error) => {
      console.error("Error while Authenticating Twitch:", error);
      res.status(500).end()
    });
}
