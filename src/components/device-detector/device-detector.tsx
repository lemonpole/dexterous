import { useMedia } from '../../hooks';
import { Constants, util } from '../../lib';


function DesktopView( props: any ) {
  const mq = util.buildMediaQuery( 'min-width', Constants.Application.SCREEN_SIZE_DESKTOP );
  const isDesktop = useMedia( mq );

  return isDesktop
    ? <>{props.children}</>
    : null
  ;
}


function MobileView( props: any ) {
  const mq = util.buildMediaQuery( 'max-width', Constants.Application.SCREEN_SIZE_DESKTOP );
  const isMobile = useMedia( mq );

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
