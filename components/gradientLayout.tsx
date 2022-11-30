import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'

export default function GradientLayout({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage,
}) {
  return (
    <Box
      height="calc(100vh - 6.25rem)"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex bg={`${color}.600`} padding="2.5rem" align="end">
        <Box padding="1.25rem">
          <Image
            boxSize="10rem"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? '100%' : '3px'}
          />
        </Box>
        <Box padding="1.25rem" lineHeight="2.5rem" color="white">
          <Text fontSize="x-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl">{title}</Text>
          <Text fontSize="x-small">{description}</Text>
        </Box>
      </Flex>
      <Box paddingY="3.125rem">{children}</Box>
    </Box>
  )
}
