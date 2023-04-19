import { supabase } from '@/lib/supabaseClient'
import updateMetadata from '@/lib/updateMetadata'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { useSession } from 'next-auth/react'

interface Game {
  id: number
  name: string
}

export interface GamingPlatforms {
  pc: boolean
  xbox: boolean
  playstation: boolean
  switch: boolean
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
    } else {
      updateMetadata(token?.accessToken as string, selectedGamingPlatforms)
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
