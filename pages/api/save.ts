import { supabase } from '@/lib/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

interface Game {
  id: number
  name: string
}

interface GamingPlatforms {
  pc: boolean
  playstation: boolean
  switch: boolean
  xbox: boolean
}

interface Body {
  selectedGamingPlatforms: GamingPlatforms
  selectedGames: Game[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req })
  const { selectedGames, selectedGamingPlatforms } = req.body as Body
  if (token?.sub && selectedGamingPlatforms) {
    const { error } = await supabase.from('gaming_platforms')
      .upsert({
        discord_user_id: token.sub,
        pc: selectedGamingPlatforms.pc,
        xbox: selectedGamingPlatforms.xbox,
        playstation: selectedGamingPlatforms.playstation,
        switch: selectedGamingPlatforms.switch,
      })
      .select()
    if (error) {
      console.error('Error gaming_platforms upsert:', error)
    }
  }

  if (token?.sub && selectedGames?.length > 0) {
    const selectedGamesDb = selectedGames.map((game: Game) => ({
      // TODO: figure out why I have add optional value as two lines above we checking if value is undefined
      discord_user_id: token.sub ?? '???',
      igdb_game_id: game.id,
      name: game.name
    }))
    const { error: errorDelete } = await supabase.from('games')
      .delete()
      .eq('discord_user_id', token.sub)
    if (errorDelete) {
      console.error('Error games delete:', errorDelete)
    }
    const { error: errorUpsert } = await supabase.from('games')
      .upsert(selectedGamesDb)
      .select()
    if (errorUpsert) {
      console.error('Error games upsert:', errorUpsert)
    }
  } else if (token?.sub && (!selectedGames || selectedGames?.length === 0)) {
    const { error: errorDelete } = await supabase.from('games')
      .delete()
      .eq('discord_user_id', token!.sub)
    if (errorDelete) {
      console.error('Error games delete:', errorDelete)
    }
  }
  res.send({})
}
