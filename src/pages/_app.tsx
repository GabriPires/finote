import '@/styles/globals.css'
import '../lib/dayjs'
import { NextSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        title="Finote | Descomplicando suas finanças pessoais"
        description="Finote é uma aplicação que te ajuda a descomplicar suas finanças pessoais, de forma simples e intuitiva."
        canonical="https://finote.vercel.app/"
        openGraph={{
          url: 'https://finote.vercel.app/',
          title: 'Finote | Descomplicando suas finanças pessoais',
          description:
            'Finote é uma aplicação que te ajuda a descomplicar suas finanças pessoais, de forma simples e intuitiva.',
        }}
      />

      <NextNProgress
        color="#641ae6"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <Component {...pageProps} />
    </>
  )
}
