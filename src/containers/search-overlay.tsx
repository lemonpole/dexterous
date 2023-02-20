import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search2Icon, SmallCloseIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
} from '@chakra-ui/react';
import { Constants } from '@dxtr/lib';
import { AppStateContext } from '@dxtr/redux';
import { searchingUpdate } from '@dxtr/redux/actions';
import { PokemonList, PokemonListItem } from '@dxtr/components';

/**
 * @component
 * @name SearchOverlay
 */

export default function SearchOverlay() {
  const { state, dispatch } = React.useContext(AppStateContext);
  const [filter, setFilter] = React.useState('');
  const navigate = useNavigate();

  const data = state.pokemon.filter(
    (pokemon) =>
      filter.length >= Constants.Application.SEARCH_TRIGGER_TRESHOLD &&
      pokemon.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0
  );

  return (
    <Modal
      isOpen={state.searching}
      onClose={() => dispatch(searchingUpdate(false))}
      scrollBehavior="inside"
      size="xl"
    >
      <ModalOverlay />
      <ModalContent
        background="chakra-body-bg"
        my="24"
        // render search modal slightly
        // different on mobile devices
        mt={[0, 24]}
        borderRadius={[0, 'md']}
      >
        <ModalHeader>
          <InputGroup size="lg">
            <InputLeftElement children={<Search2Icon color="brand.300" />} />
            <Input
              value={filter}
              variant="flushed"
              type="text"
              placeholder={`Search ${Constants.Application.POKEMON_LABEL}`}
              onChange={(event) => setFilter(event.target.value)}
              // only add a border when we have search results
              _focusVisible={{
                borderColor: data.length > 0 ? 'inherit' : 'transparent',
              }}
              borderColor={data.length > 0 ? 'inherit' : 'transparent'}
            />
            {data.length > 0 && (
              <InputRightElement
                children={<SmallCloseIcon />}
                onClick={() => setFilter('')}
                cursor="pointer"
                opacity="0.5"
              />
            )}
          </InputGroup>
        </ModalHeader>
        {data.length > 0 && (
          <ModalBody>
            <PokemonList>
              {data.map((pokemon) => (
                <PokemonListItem
                  key={pokemon.id}
                  backgroundColor="foreground"
                  data={pokemon}
                  onClick={(name) => {
                    dispatch(searchingUpdate(false));
                    setFilter('');
                    navigate(`/${name}`);
                  }}
                />
              ))}
            </PokemonList>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
