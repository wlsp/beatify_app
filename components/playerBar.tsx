import { Box, Flex, Text } from '@chakra-ui/layout'
import { useStoreState } from 'easy-peasy'
import Player from './player'

export default function PlayerBar() {
  const songs = useStoreState((state: any) => state.activeSongs)
  const activeSong = useStoreState((state: any) => state.activeSong)
  return (
    <Box
      height={'6.25rem'}
      width={'100vw'}
      bg={'#121212'}
      padding={'.625rem'}
      borderTop={'1px solid'}
      borderColor={'rgba(255,255,255,.2)'}
    >
      <Flex align={'center'}>
        {activeSong ? (
          <Box padding={'1.25rem'} color={'white'} width={'30%'}>
            <Text>{activeSong.name}</Text>
            <Text>{activeSong.artist.name}</Text>
          </Box>
        ) : null}
        <Box width={'40%'}>
          {activeSong ? <Player songs={songs} activeSong={activeSong} /> : null}
        </Box>
      </Flex>
    </Box>
  )
}
