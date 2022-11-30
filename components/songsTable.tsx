import { Box } from '@chakra-ui/layout'
import {
  Table,
  Thead,
  Td,
  Tr,
  Tbody,
  Th,
  IconButton,
  Image,
} from '@chakra-ui/react'
import { BsFillPlayFill } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { useStoreActions } from 'easy-peasy'
import { formatDate, formatTime } from '../lib/formatters'

export default function SongTable({ songs }) {
  const playSongs = useStoreActions((store: any) => store.changeActiveSongs)
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong)

  const handlePlay = (activeSong?) => {
    setActiveSong(activeSong | songs[0])
    playSongs(songs)
  }

  return (
    <Box bg="transparent" color="white">
      <Box padding=".625rem" marginBottom="1.25rem">
        <Box marginBottom="1.875rem">
          <IconButton
            icon={<BsFillPlayFill fontSize={'1.875rem'} />}
            aria-label="play"
            borderRadius="100%"
            colorScheme="green"
            size="lg"
            isRound
            onClick={() => handlePlay()}
          />
        </Box>
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,.2)">
            <Tr>
              <Th>#</Th>
              <Th></Th>
              <Th>Title</Th>
              <Th textAlign={'right'}>Added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, i) => (
              <Tr
                sx={{
                  transition: 'all .32',
                  '&:hover': {
                    bg: 'rgba(255,255,255,.1)',
                  },
                }}
                key={song.id}
                cursor="pointer"
                onClick={() => handlePlay(song)}
              >
                <Td verticalAlign="middle">{i + 1}</Td>
                <Td textAlign="center" verticalAlign={'middle'}>
                  <Image
                    src={`https://avatars.dicebear.com/api/jdenticon/:${song.id}.svg`}
                    height="2.5rem"
                    width="2.5rem"
                  />
                </Td>
                <Td verticalAlign="middle">{song.name}</Td>
                <Td textAlign="right" verticalAlign={'middle'}>
                  {formatDate(song.createdAt)}
                </Td>
                <Td verticalAlign="middle">{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}
