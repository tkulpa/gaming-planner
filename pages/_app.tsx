import '@/components/styles/globals.css'
import '@/components/styles/react-tags.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (<SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>)
}
