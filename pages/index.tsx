import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { supabase } from '@/lib/supabaseClient';
import { getToken } from 'next-auth/jwt';
import { GetServerSideProps } from 'next';
import Header from '@/components/header'
import Planner, { Game, GamingPlatforms } from '@/components/planner';
import Login from '@/components/login';

interface Props {
  games: Game[],
  gamingPlatforms: GamingPlatforms
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req })
  let { data: games } = await supabase.from('games').select()
  let { data: gamingPlatforms } = await supabase.from('gaming_platforms').select().eq('discord_user_id', token?.sub).limit(1)
    .single()

  return {
    props: {
      games: games ?? [],
      gamingPlatforms
    } as Props,
  }
}

export default function Home({ gamingPlatforms, games }: Props) {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Gaming Planner</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ height: '100vh', padding: 8 }}>
        <div style={{ margin: 'auto', maxWidth: '40vw', minWidth: 300 }}>
          <Header />
          {session ? <Planner gamingPlatforms={gamingPlatforms} games={games} />
            : <Login />}
        </div>
      </main>
    </>
  )
}
