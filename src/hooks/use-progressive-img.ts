import React from 'react';
import { useBoolean } from '@chakra-ui/react';

type HookReturn = [string, boolean];

function useProgressiveImg(
  lowQualitySrc: string,
  highQualitySrc: string
): HookReturn {
  const [src, setSrc] = React.useState(lowQualitySrc);
  const [isLoading, setLoading] = useBoolean(true);

  React.useEffect(() => {
    setSrc(lowQualitySrc);
    const img = new Image();
    img.src = highQualitySrc;
    img.onload = () => {
      setSrc(highQualitySrc);
      setLoading.off();
    };
  }, [lowQualitySrc, highQualitySrc, setLoading]);

  return [src, isLoading];
}

export default useProgressiveImg;
