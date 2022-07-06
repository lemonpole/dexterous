import React from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay,
  InputGroup, InputLeftElement, Input,
} from '@chakra-ui/react';
import { Constants } from '@dxtr/lib';
import { AppStateContext } from '@dxtr/redux';
import { filterUpdate, searchingUpdate } from '@dxtr/redux/actions';
import { PokemonList, PokemonListItem } from '@dxtr/components';


/**
 * @component
 * @name SearchOverlay
 */

export default function SearchOverlay() {
  const { state, dispatch } = React.useContext( AppStateContext );

  const data = state.pokemon.filter( pokemon => (
    state.filter.length >= Constants.Application.SEARCH_TRIGGER_TRESHOLD
    && pokemon.name.toLowerCase().indexOf( state.filter.toLowerCase() ) >= 0
  ));

  return (
    <Modal
      isOpen={state.searching}
      onClose={() => dispatch( searchingUpdate( false ) )}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent background="chakra-body-bg" my="24">
        <ModalHeader>
          <InputGroup>
            <InputLeftElement children={<SearchIcon />} />
            <Input
              value={state.filter}
              variant="flushed"
              type="search"
              placeholder={`Search ${Constants.Application.POKEMON_LABEL}`}
              onChange={event => dispatch( filterUpdate( event.target.value ))}
            />
          </InputGroup>
        </ModalHeader>
        <ModalBody>
          <PokemonList>
            {data.map( pokemon => (
              <PokemonListItem
                key={pokemon.id}
                backgroundColor="foreground"
                data={pokemon}
              />
            ))}
          </PokemonList>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
