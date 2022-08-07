import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import { Constants } from '@dxtr/lib';
import { DeviceDetector } from '@dxtr/components';
import { Pokedex } from '@dxtr/containers';


/**
 * @component
 * @name Details
 */

export default function Details() {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      {/* RENDER IN A DRAWER ON DESKTOP */}
      <DeviceDetector.DesktopView>
        <Drawer
          isOpen
          size="lg"
          onClose={() => navigate( '/' )}
          // @note: resolves a chakra scroll bar error
          blockScrollOnMount={false}
        >
          <DrawerOverlay />
          <DrawerContent overflowY="scroll">
            <Pokedex name={params.name as string} />
          </DrawerContent>
        </Drawer>
      </DeviceDetector.DesktopView>

      {/* RENDER IN FULL ON MOBILE */}
      <DeviceDetector.MobileView>
        <Box
          marginTop={Constants.Application.HEADER_HEIGHT}
          // fixes x-scrollbar issue on safari
          overflowX="hidden"
        >
          <Pokedex name={params.name as string} />
        </Box>
      </DeviceDetector.MobileView>
    </React.Fragment>
  );
}
