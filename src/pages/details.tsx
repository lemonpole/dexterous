import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import { Constants } from '@dxtr/lib';
import { DeviceDetector } from '@dxtr/components';
import { PokemonDetails } from '@dxtr/containers';


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
        >
          <DrawerOverlay />
          <DrawerContent>
            <PokemonDetails name={params.name as string} />
          </DrawerContent>
        </Drawer>
      </DeviceDetector.DesktopView>

      {/* RENDER IN FULL ON MOBILE */}
      <DeviceDetector.MobileView>
        <Box marginTop={Constants.Application.HEADER_HEIGHT}>
          <PokemonDetails name={params.name as string} />
        </Box>
      </DeviceDetector.MobileView>
    </React.Fragment>
  );
}
