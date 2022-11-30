import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import GradientLayout from '../components/gradientLayout'
import { useMe } from '../lib/hooks'
import prisma from '../lib/prisma'

export default function Home({ artists }) {
  const { user } = useMe()

  return (
    <GradientLayout
      roundImage={true}
      color={'blue'}
      subtitle={'profile'}
      title={`${user?.nameFirst} ${user?.nameLast}`}
      description={`${user?.playlistsCount} public playlists`}
      image={'https://avatars.githubusercontent.com/u/81742640?v=4'}
    >
      <Box color={'white'} paddingX={'2.5rem'}>
        <Box marginBottom={'2.5rem'}>
          <Text fontSize={'2xl'} fontWeight={'bold'}>
            Top artist this month
          </Text>
          <Text fontSize={'md'}>only visible to you</Text>
        </Box>
        <Flex gap={'.875rem'}>
          {artists.map((artist) => (
            <Box width={'12%'} key={artist.id}>
              <Box
                bg={'gray.900'}
                borderRadius={'.55rem'}
                padding={'.9375rem'}
                width={'100%'}
              >
                <Image
                  src={`https://i.pravatar.cc/300?img=${artist.id + 50}`}
                  borderRadius={'100%'}
                />
                <Box marginTop={'1.25rem'}>
                  <Text fontSize={'large'}>{artist.name}</Text>
                  <Text fontSize={'small'}>Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export async function getServerSideProps() {
  const artists = await prisma.artist.findMany({})
  return {
    props: { artists }, // will be passed to the page component as props
  }
}
