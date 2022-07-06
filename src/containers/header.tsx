import React from 'react';
import { ChevronRightIcon, MoonIcon, SearchIcon, SunIcon } from '@chakra-ui/icons';
import {
  useColorMode, useDisclosure,
  Text, IconButton, HStack,
  Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay,
  InputGroup, InputLeftElement, Input,
  Stack, StackDivider,
  List, ListItem, ListIcon,
} from '@chakra-ui/react';
import { Constants } from '@dxtr/lib';
import { NavBar, PokemonBadge } from '@dxtr/components';
import { AppStateContext } from '@dxtr/redux/context';


/**
 * @component
 * @name ThemeToggleButton
 */

function ThemeToggleButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isLightMode = colorMode === Constants.Application.COLOR_MODE_LIGHT;

  return (
    <IconButton
      aria-label="Toggle Dark/Light Theme"
      variant="ghost"
      onClick={toggleColorMode}
      icon={isLightMode ? <MoonIcon /> : <SunIcon />}
    />
  );
}


/**
 * @component
 * @name SearchButton
 */

function SearchButton() {
  const { state } = React.useContext( AppStateContext );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const label = `Search ${Constants.Application.POKEMON_LABEL}`;

  return (
    <>
      <IconButton
        aria-label={label}
        variant="ghost"
        icon={<SearchIcon />}
        onClick={onOpen}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent background="chakra-body-bg" my="24">
          <ModalHeader>
            <InputGroup>
              <InputLeftElement children={<SearchIcon />} />
              <Input variant="flushed" type="search" placeholder={label} />
            </InputGroup>
          </ModalHeader>
          <ModalBody>
            <List spacing={3}>
              {state.pokemon.map( pokemon => (
                <ListItem
                  key={pokemon.id}
                  display="flex"
                  alignItems="center"
                  backgroundColor="foreground"
                  px="4" py="2"
                  cursor="pointer"
                  borderRadius="base"
                >
                  <ListIcon as={ChevronRightIcon} boxSize="2em" />
                  <Stack spacing="0">
                    <Text fontSize="xs" opacity="0.5" fontFamily="mono">#{pokemon.id}</Text>
                    <Text textStyle="h2">{pokemon.name}</Text>
                    <HStack>
                      {pokemon.types.map( ( type: any ) => (
                        <PokemonBadge
                          key={type}
                          size="sm"
                          variant={type.toLocaleLowerCase()}
                        >
                          {type}
                        </PokemonBadge>
                      ))}
                    </HStack>
                  </Stack>
                </ListItem>
              ))}
            </List>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}


/**
 * @component
 * @name Header
 */

export default function Header() {
  return (
    <NavBar as="header">
      <Text
        fontWeight="hairline"
        letterSpacing="wide"
      >
        <b>dex</b>terous
      </Text>
      <Stack
        as="article"
        direction="row"
        divider={<StackDivider />}
      >
        <SearchButton />
        <ThemeToggleButton />
      </Stack>
    </NavBar>
  );
}
