import { useMediaQuery } from '@chakra-ui/react';
import { Constants } from '@dxtr/lib';


/**
 * @component
 * @name DesktopView
 */

function DesktopView( props: any ) {
  const mq = `(min-width: ${Constants.Application.SCREEN_SIZE_DESKTOP}px)`;
  const [ isDesktop ] = useMediaQuery( mq );

  return isDesktop
    ? <>{props.children}</>
    : null
  ;
}


/**
 * @component
 * @name MobileView
 */

function MobileView( props: any ) {
  const mq = `(max-width: ${Constants.Application.SCREEN_SIZE_DESKTOP}px)`;
  const [ isMobile ] = useMediaQuery( mq );

  return isMobile
    ? <>{props.children}</>
    : null
  ;
}


const DeviceDetector = {
  DesktopView,
  MobileView,
};


export default DeviceDetector;
