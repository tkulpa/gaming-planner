import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Register the metadata to be stored by Discord. This should be a one time action.
 * Note: uses a Bot token for authentication, not a user token.
 */
const url = `https://discord.com/api/v10/applications/${process.env.DISCORD_CLIENT_ID}/role-connections/metadata`;
// supported types: number_lt=1, number_gt=2, number_eq=3 number_neq=4, datetime_lt=5, datetime_gt=6, boolean_eq=7, boolean_neq=8
const body = [
  {
    key: 'pc',
    name: 'PC Platform',
    description: 'Is PC Gamer',
    type: 7,
  },
  {
    key: 'xbox',
    name: 'Xbox Platform',
    description: 'Is Xbox Gamer',
    type: 7,
  },
  {
    key: 'playstation',
    name: 'Playstation Platform',
    description: 'Is Playstation Gamer',
    type: 7,
  },
  {
    key: 'switch',
    name: 'Switch Platform',
    description: 'Is Switch Gamer',
    type: 7,
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bot ${process.env.DISCORD_BOT_SECRET}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    res.status(200).end();
  } else {
    const data = await response.text();
    console.error(data);
    res.status(500).end();
  }
}
