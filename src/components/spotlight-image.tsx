import ProgressiveImage from './progressive-image';
import { Box, Container, Flex, Heading } from '@chakra-ui/react';
import { Constants, util } from '@dxtr/lib';


interface SpotlightImageProps {
  backgroundColor?: string;
  blurAmt?: string;
  brightness?: number;
  coverImageOffset?: number;
  height?: number;
  scaleAmt?: number;
}


/**
 * @component
 * @name SpotlightImage
 */

export default function SpotlightImage( props: SpotlightImageProps ) {
  return (
    <Flex
      position="relative"
      justifyContent="center"
      alignItems="center"
      width="full"
      height={props.height || Constants.Application.SPOTLIGHT_IMAGE_HEIGHT}
      backgroundColor={props.backgroundColor || 'black'}
      overflow="hidden"
    >
      <ProgressiveImage
        lowQualitySrc={util.formatString( Constants.PokemonSpriteURLs.DEFAULT, [ '1' ])}
        objectFit="fill"
        filter="auto"
        blur={props.blurAmt || '20px'}
        brightness={props.brightness || 0.75}
        transform={`scale(${props.scaleAmt || 3})`}
        width="full"
        height={props.height || Constants.Application.SPOTLIGHT_IMAGE_HEIGHT}
      />
      <Container
        centerContent
        justifyContent="center"
        position="absolute"
        top="0"
        width="full"
        height={props.height || Constants.Application.SPOTLIGHT_IMAGE_HEIGHT}
      >
        <ProgressiveImage
          lowQualitySrc={util.formatString( Constants.PokemonSpriteURLs.DEFAULT, [ '1' ])}
          highQualitySrc={util.formatString( Constants.PokemonSpriteURLs.OFFICIAL_ARTWORK, [ '1' ])}
          width="auto"
          height={( props.height || Constants.Application.SPOTLIGHT_IMAGE_HEIGHT ) - ( props.coverImageOffset || 100 )}
        />
      </Container>
      <Box
        position="absolute"
        top="2"
        left="2"
        padding="2"
      >
        <Heading
          as="h2"
          size="md"
          textShadow="darklg"
          color="white"
          fontFamily="mono"
        >
          #1
        </Heading>
      </Box>
    </Flex>
  );
}
