import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';


/**
 * @component
 * @name Home
 */

export default function Home() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}
