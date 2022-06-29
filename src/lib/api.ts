/**
 * Singleton interface for the Pokemon Client.
 */

import LocalForage from 'localforage';
import {
  EvolutionClient,
  GameClient,
  MoveClient,
  PokemonClient,
  UtilityClient
} from 'pokenode-ts';
import * as Constants from './constants';


const clientOptions = {
  cacheOptions: {
    maxAge: Constants.Application.POKEDEX_CACHE_MAX_AGE,
    store: LocalForage,
    exclude: {
      query: false,
    },
  }
};


const clientMap: {
  pokemon?: PokemonClient,
  evolution?: EvolutionClient,
  utility?: UtilityClient,
  game?: GameClient,
  move?: MoveClient,
} = {};


export function getPokemonClient() {
  if( !clientMap.pokemon ) {
    clientMap.pokemon = new PokemonClient( clientOptions );
  }

  return clientMap.pokemon;
}


export function getEvolutionClient() {
  if( !clientMap.evolution ) {
    clientMap.evolution = new EvolutionClient( clientOptions );
  }

  return clientMap.evolution;
}


export function getUtilityClient() {
  if( !clientMap.utility ) {
    clientMap.utility = new UtilityClient( clientOptions );
  }

  return clientMap.utility;
}


export function getGameClient() {
  if( !clientMap.game ) {
    clientMap.game = new GameClient( clientOptions );
  }

  return clientMap.game;
}


export function getMoveClient() {
  if( !clientMap.move ) {
    clientMap.move = new MoveClient( clientOptions );
  }

  return clientMap.move;
}
