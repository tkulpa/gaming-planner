import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

// https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
const scopes = ['identify', 'email', 'guilds.members.read'].join(' ')
const providers = []

if (!!process?.env?.DISCORD_CLIENT_ID && !!process?.env?.DISCORD_CLIENT_SECRET) {
  const redirectUriPostfix = '/api/auth/callback/discord'
  const redirectUri = process?.env?.VERCEL ? `https://gaming-planner.vercel.app` : 'http://localhost:3000'
  providers.push(DiscordProvider({
    clientId: process?.env?.DISCORD_CLIENT_ID,
    clientSecret: process?.env?.DISCORD_CLIENT_SECRET,
    authorization: { params: { scope: scopes, redirect_uri: redirectUri + redirectUriPostfix } },
  }))
} else {
  console.error('Invalid configuration, there is not DISCORD_CLIENT_ID or DISCORD_CLIENT_SECRET secret setup')
}

export default NextAuth({
  providers,
})
