import { Box, Flex, Text } from '@chakra-ui/layout'
import { MdSearch } from 'react-icons/md'

export default function Search() {
  return (
    <Box
      height={'100vh'}
      bg={'blackAlpha.900'}
      fontSize={'6xl'}
      color={'white'}
    >
      <Flex justify={'center'} alignItems={'center'} height={'100%'}>
        <MdSearch style={{ display: 'inline' }} />
        <Text marginLeft={'1rem'}>Your Search</Text>
      </Flex>
    </Box>
  )
}
