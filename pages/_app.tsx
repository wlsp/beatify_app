import type { AppProps } from 'next/app'
import type { NextComponentType } from 'next' // Import Component type
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { StoreProvider } from 'easy-peasy'
import { store } from '../lib/store'
import PlayerLayout from '../components/playerLayout'
import 'reset-css'
import Head from 'next/head'

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

const App = ({ Component, pageProps }: CustomAppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>BEATIFY music</title>
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

export default App