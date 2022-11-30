import { Box, Flex, Text } from '@chakra-ui/layout'
import { MdLibraryMusic } from 'react-icons/md'

export default function Library() {
  return (
    <Box
      height={'100vh'}
      bg={'blackAlpha.900'}
      fontSize={'6xl'}
      color={'white'}
    >
      <Flex justify={'center'} alignItems={'center'} height={'100%'}>
        <MdLibraryMusic style={{ display: 'inline' }} />
        <Text marginLeft={'1rem'}>Your Library</Text>
      </Flex>
    </Box>
  )
}
