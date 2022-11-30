import Head from 'next/head'
import GradientLayout from '../../components/gradientLayout'
import SongTable from '../../components/songsTable'
import { validateToken } from '../../lib/auth'
import prisma from '../../lib/prisma'

const getBGColor = (id) => {
  const colors = [
    'red',
    'green',
    'blue',
    'orange',
    'purple',
    'teal',
    'yellow',
    'pink',
  ]
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

export default function Playlist({ playlist }) {
  const color = getBGColor(playlist.id)
  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle={'playlist'}
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <Head>
        <title>{`BEATIFY ${playlist.name}`}</title>
      </Head>
      <SongTable songs={playlist.songs} />
    </GradientLayout>
  )
}

export async function getServerSideProps({ query, req }) {
  let user

  try {
    user = validateToken(req.cookies.BEATIFY_ACESS_TOKEN)
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    }
  }

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id, // with the '+' converting to query to number
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  })

  return {
    props: { playlist }, // will be passed to the page component as props
  }
}
