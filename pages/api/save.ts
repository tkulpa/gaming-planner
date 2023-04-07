import { supabase } from '@/lib/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

type Data = {
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req })
  const { games, selectedGamingPlatforms } = req.body
  await supabase.from('gaming_platforms')
    .upsert({ discord_user_id: token?.sub, ...selectedGamingPlatforms })
    .select()
  res.send({})
}
