import NextAuth from 'next-auth'
import { OAuthUserConfig } from 'next-auth/providers'
import DiscordProvider, { DiscordProfile } from 'next-auth/providers/discord'

// https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
const scopes = ['identify', 'role_connections.write'].join(' ')
const providers = []
const domain = process?.env?.DOMAIN_URL ? process?.env?.DOMAIN_URL : 'https://gaming-planner.vercel.app'
export const redirectUriPostfix = '/api/auth/callback/discord'
export const redirectUri = domain

if (!!process?.env?.DISCORD_CLIENT_ID && !!process?.env?.DISCORD_CLIENT_SECRET) {
  const authOptions: OAuthUserConfig<DiscordProfile> = {
    clientId: process?.env?.DISCORD_CLIENT_ID,
    clientSecret: process?.env?.DISCORD_CLIENT_SECRET,
    authorization: { params: { scope: scopes, redirect_uri: redirectUri + redirectUriPostfix } },
    token: "https://discord.com/api/oauth2/token",
    userinfo: "https://discord.com/api/users/@me",
  }

  providers.push(DiscordProvider(authOptions))
} else {
  console.error('Invalid configuration, there is not DISCORD_CLIENT_ID or DISCORD_CLIENT_SECRET secret setup')
}

export default NextAuth({
  providers,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token;
    }
  },
})
