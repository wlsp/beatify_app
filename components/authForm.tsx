import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useSWRConfig } from 'swr';
import { Box, Flex, Input, Button } from '@chakra-ui/react';
import { auth } from '../lib/mutation';

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const user = await auth(mode, {email, password})
    setLoading(false)
    router.push('/')
  }

  return (
    <Box
      height={'100vh'}
      width={'100vw'}
      bg={'customBlack.100'}
      color={'white'}
    >
      <Flex
        justify={'center'}
        align={'center'}
        height={'6.25rem'}
        borderBottom={'gray 1px solid'}
      >
        <Image
          src={'/images/beatify.png'}
          alt={'logo'}
          height={60}
          width={120}
          priority
        />
      </Flex>
      <Flex
        justify={'center'}
        align={'center'}
        height={'calc(100vh - 6.25rem)'}
      >
        <Box padding={'3.125rem'} bg={'gray.900'} borderRadius={'.375rem'}>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder={'email'}
              type={'email'}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder={'password'}
              type={'password'}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type={'submit'}
              bg={'green.500'}
              isLoading={isLoading}
              sx={{
                '&:hover': {
                  bg: 'green.300',
                },
              }}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
