import { Box } from '@chakra-ui/layout'
import PlayerBar from './playerBar'
import SideBar from './sidebar'

export default function PlayerLayout({ children }) {
  return (
    <Box width='100vw' height='100vh'>
      <Box position='absolute' top='0' left='0' width='15.625rem'>
        <SideBar />
      </Box>
      <Box marginLeft='15.625rem' marginBottom='6.25rem'>
        {children}
      </Box>
      <Box position='absolute' left='0' bottom='0'>
        <PlayerBar />
      </Box>
    </Box>
  )
}
