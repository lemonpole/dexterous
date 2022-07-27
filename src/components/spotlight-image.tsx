import ProgressiveImage from './progressive-image';
import { Box, Container, Flex, Heading } from '@chakra-ui/react';
import { Constants, util } from '@dxtr/lib';


interface SpotlightImageProps {
  backgroundColor?: string;
  blurAmt?: string;
  brightness?: number;
  coverImageOffset?: number;
  height?: number;
  pokemonId?: number | string;
  scaleAmt?: number;
}


/**
 * @component
 * @name SpotlightImage
 */

export default function SpotlightImage( props: SpotlightImageProps ) {
  const bgImageSrc = util.formatString( Constants.PokemonSpriteURLs.DEFAULT, [ props.pokemonId?.toString() || '1' ]);
  const coverImageSrc = util.formatString( Constants.PokemonSpriteURLs.OFFICIAL_ARTWORK, [ props.pokemonId?.toString() || '1' ]);

  // offset height if on mobile
  const baseHeight = props.height || Constants.Application.SPOTLIGHT_IMAGE_HEIGHT;
  const heightOffset = {
    base: baseHeight - parseInt( Constants.Application.HEADER_HEIGHT ),
    lg: baseHeight
  };

  return (
    <Flex
      position="relative"
      justifyContent="center"
      alignItems="center"
      width="full"
      height={heightOffset}
      minHeight={heightOffset}
      backgroundColor={props.backgroundColor || 'black'}
      overflow="hidden"
    >
      <ProgressiveImage
        lowQualitySrc={bgImageSrc}
        objectFit="fill"
        filter="auto"
        blur={props.blurAmt || '20px'}
        brightness={props.brightness || 0.75}
        transform={`scale(${props.scaleAmt || 3})`}
        width="full"
        height="full"
      />
      <Container
        centerContent
        justifyContent="center"
        position="absolute"
        top="0"
        width="full"
        height="full"
      >
        <ProgressiveImage
          lowQualitySrc={bgImageSrc}
          highQualitySrc={coverImageSrc}
          width="auto"
          height={baseHeight - ( props.coverImageOffset || 100 )}
        />
      </Container>
      <Box
        position="absolute"
        top="2"
        left="2"
      >
        <Heading
          as="h2"
          size="md"
          textShadow="darklg"
          color="white"
          fontFamily="mono"
        >
          #{props.pokemonId}
        </Heading>
      </Box>
    </Flex>
  );
}
