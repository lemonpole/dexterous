import { ComponentDefaultProps, Image, useStyleConfig } from '@chakra-ui/react';
import { useProgressiveImg } from '@dxtr/hooks';

interface ProgressiveImageProps extends ComponentDefaultProps {
  lowQualitySrc: string;
  highQualitySrc?: string;
}

/**
 * Custom component that must consume the chakra ui style configuration.
 *
 * @see https://chakra-ui.com/docs/styled-system/component-style#consuming-style-config
 * @component
 * @name ProgressiveImage
 */

export default function ProgressiveImage(props: ProgressiveImageProps) {
  const { lowQualitySrc, highQualitySrc, ...rest } = props;
  const [imgSrc, imgBlur] = useProgressiveImg(
    lowQualitySrc,
    highQualitySrc || lowQualitySrc
  );
  const styles = useStyleConfig('ProgressiveImage');

  return (
    <Image
      sx={styles}
      src={imgSrc}
      filter={imgBlur ? 'blur(20px)' : ''}
      {...rest}
    />
  );
}
