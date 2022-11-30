import type { AppProps } from 'next/app'
import Head from 'next/head'
import type { NextComponentType } from 'next' // Import Component type
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { StoreProvider } from 'easy-peasy'
import { store } from '../lib/store'
import PlayerLayout from '../components/playerLayout'
import 'reset-css'

const theme = extendTheme({
  colors: {
    gray: {
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    customBlack: {
      100: '#373737',
    },
  },
  components: {
    Button: {
      variants: {
        link: {
          ':focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
  },
})

//  Add custom appProp type then use union to add it
type CustomAppProps = AppProps & {
  Component: NextComponentType & { authPage?: boolean } // add auth type
}

export default function App({ Component, pageProps }: CustomAppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>BEATIFY music</title>
        <meta name="theme-color" content="#1e1e1e" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta
          content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          name="robots"
        />
      </Head>
      <StoreProvider store={store}>
        {Component.authPage ? (
          <Component {...pageProps} />
        ) : (
          <PlayerLayout>
            <Component {...pageProps} />
          </PlayerLayout>
        )}
      </StoreProvider>
    </ChakraProvider>
  )
}
