import { Box, Flex, Text } from '@chakra-ui/layout'
import { MdFavorite } from 'react-icons/md'

export default function Favorites() {
  return (
    <Box
      height={'100vh'}
      bg={'blackAlpha.900'}
      fontSize={'6xl'}
      color={'white'}
    >
      <Flex justify={'center'} alignItems={'center'} height={'100%'}>
        <MdFavorite style={{ display: 'inline' }} />
        <Text marginLeft={'1rem'}>Your Favorites</Text>
      </Flex>
    </Box>
  )
}
