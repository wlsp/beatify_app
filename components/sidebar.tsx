import Image from 'next/image'
import NextLink from 'next/link'
import { usePlaylist } from '../lib/hooks'
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  Center,
  LinkBox,
} from '@chakra-ui/layout'
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from 'react-icons/md'

const navMenu = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/',
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/search',
  },
  {
    name: 'Your Library',
    icon: MdLibraryMusic,
    route: '/library',
  },
]

const musicMenu = [
  {
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/',
  },
  {
    name: 'Favorites',
    icon: MdFavorite,
    route: '/favorites',
  },
]

// const playlists = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`);

const SideBar = () => {
  const { playlists } = usePlaylist()
  return (
    <Box
      width={'100%'}
      height={'calc(100vh - 6.25rem)'}
      bg={'black'}
      paddingX={'.3125rem'}
      color={'gray'}
    >
      <Box paddingY={'1.25rem'} height={'100%'}>
        <LinkBox>
          <NextLink href={'/'}>
            <Box
              width={'9.5rem'}
              marginBottom={'1.25rem'}
              paddingX={'1.25rem'}
              position={'relative'}
            >
              <Image
                src={'/images/beatify.png'}
                height={100}
                width={120}
                alt={'beatifyLogo'}
                priority
              />
            </Box>
          </NextLink>
        </LinkBox>
        <Box marginBottom={'1.25rem'}>
          <List spacing={2}>
            {navMenu.map((menu) => (
              <ListItem paddingX={'1.25rem'} fontSize={'1rem'} key={menu.name}>
                <LinkBox>
                  <NextLink href={menu.route}>
                    <ListIcon
                      as={menu.icon}
                      color={'white'}
                      marginRight={'1.25rem'}
                    />
                    {menu.name}
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box marginY={'1.25rem'}>
          <List spacing={2}>
            {musicMenu.map((item) => (
              <ListItem paddingX={'1.25rem'} fontSize={'1rem'} key={item.name}>
                <LinkBox>
                  <NextLink href={item.route} passHref>
                    <ListIcon
                      as={item.icon}
                      color={'white'}
                      marginRight={'1.25rem'}
                    />
                    {item.name}
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider color={'gray.500'} />
        <Box height={'66%'} overflowY={'auto'} paddingY={'1.25rem'}>
          <List spacing={0.25}>
            {playlists?.map((playlist) => (
              <ListItem paddingX={'1.25rem'} key={playlist.id}>
                <LinkBox>
                  <NextLink
                    href={{
                      pathname: '/playlist/[id]',
                      query: { id: playlist.id },
                    }}
                    passHref
                  >
                    {playlist.name}
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export default SideBar
