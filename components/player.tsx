import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from '@chakra-ui/react'
import ReactHowler from 'react-howler'
import { useEffect, useRef, useState } from 'react'
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from 'react-icons/md'
import { useStoreActions } from 'easy-peasy'
import { formatTime } from '../lib/formatters'

export default function Player({ songs, activeSong }) {
  const [isPlaying, setPlaying] = useState(true)
  const [isActiveSongIndex, setActiveSongIndex] = useState(0)
  const [isSeek, setSeek] = useState(0.0)
  const [isSeeking, setIsSeeking] = useState(false)
  const [isRepeat, setRepeat] = useState(false)
  const [isShuffle, setShuffle] = useState(false)
  const [isDuration, setDuration] = useState(0.0)
  const soundRef = useRef(null)
  const repeatRef = useRef(null)
  const setActiveSong = useStoreActions((state: any) => state.changeActiveSong)

  useEffect(() => {
    let timerId

    if (isPlaying && !isSeeking) {
      const fn = () => {
        setSeek(soundRef.current.seek())
        timerId = requestAnimationFrame(fn)
      }
      timerId = requestAnimationFrame(fn)
      return () => cancelAnimationFrame(timerId)
    }
    cancelAnimationFrame(timerId)
  }, [isPlaying, isSeeking])

  useEffect(() => {
    setActiveSong(songs[isActiveSongIndex])
  }, [isActiveSongIndex, setActiveSong, songs])

  useEffect(() => {
    repeatRef.current = isRepeat
  }, [isRepeat])

  const setPlayState = (value) => {
    setPlaying(value)
  }

  const onShuffle = () => {
    setShuffle((state) => !state)
  }

  const onRepeat = () => {
    setRepeat((state) => !state)
  }

  const prevSong = () => {
    setActiveSongIndex((state) => {
      return state ? state - 1 : songs.length - 1
    })
  }

  const nextSong = () => {
    setActiveSongIndex((state: any) => {
      if (isShuffle) {
        const next = Math.floor(Math.random() * songs.length)

        if (next === state) {
          return nextSong()
        }
        return next
      }

      return state === songs.length - 1 ? 0 : state + 1
    })
  }

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0)
      soundRef.current.seek(0)
    } else {
      nextSong()
    }
  }

  const onLoad = () => {
    const songDuration = soundRef.current.duration()
    setDuration(songDuration)
  }

  const onSeek = (e) => {
    setSeek(parseFloat(e[0]))
    soundRef.current.seek(e[0])
  }

  return (
    <Box>
      <Box>
        <ReactHowler
          playing={isPlaying}
          src={activeSong?.url}
          ref={soundRef}
          onLoad={onLoad}
          onEnd={onEnd}
        />
      </Box>
      <Center color={'gray.700'}>
        <ButtonGroup>
          <IconButton
            outline={'none'}
            variant={'link'}
            aria-label={'shuffle'}
            fontSize={'1.5rem'}
            color={isShuffle ? 'white' : 'gray.600'}
            icon={<MdShuffle />}
            onClick={onShuffle}
          />
          <IconButton
            outline={'none'}
            variant={'link'}
            aria-label={'skip-previos'}
            fontSize={'1.5rem'}
            icon={<MdSkipPrevious />}
            _hover={{ color: 'white' }}
            onClick={prevSong}
          />
          {isPlaying ? (
            <IconButton
              outline={'none'}
              variant={'link'}
              aria-label={'play'}
              fontSize={'2.5rem'}
              color={'white'}
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setPlayState((play) => !play)}
            />
          ) : (
            <IconButton
              outline={'none'}
              variant={'link'}
              aria-label={'pause'}
              fontSize={'2.5rem'}
              color={'white'}
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => setPlayState((play) => !play)}
            />
          )}
          <IconButton
            outline={'none'}
            variant={'link'}
            aria-label={'skip-next'}
            fontSize={'1.5rem'}
            _hover={{ color: 'white' }}
            icon={<MdSkipNext />}
            onClick={nextSong}
          />
          <IconButton
            outline={'none'}
            variant={'link'}
            aria-label={'repeat'}
            fontSize={'1.5rem'}
            color={isRepeat ? 'white' : 'gray.600'}
            icon={<MdOutlineRepeat />}
            onClick={onRepeat}
          />
        </ButtonGroup>
      </Center>
      <Box color={'gray.600'}>
        <Flex justify={'center'}>
          <Box width={'10%'}>
            <Text fontSize={'xs'}>{formatTime(isSeek)}</Text>
          </Box>
          <Box width={'80%'}>
            <RangeSlider
              aria-label={['min', 'max']}
              step={0.1}
              min={0}
              max={isDuration.toFixed(2) && 0}
              id={'playerRange'}
              onChange={onSeek}
              value={[isSeek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg={'gray.800'}>
                <RangeSliderFilledTrack bg={'gray.600'} />
              </RangeSliderTrack>
              {/* <RangeSliderThumb index={0} /> */}
            </RangeSlider>
          </Box>
          <Box width={'10%'} textAlign={'right'}>
            <Text fontSize={'xs'}>{formatTime(isDuration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
