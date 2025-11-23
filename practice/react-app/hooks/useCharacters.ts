import { useQuery } from '@tanstack/react-query';
import { DefaultApi } from '../api/api-client-generated';
import type {
  Character,
  CharacterListResponse,
} from '../api/api-client-generated';

const CHARACTERS_QUERY_KEY = ['characters'];
const apiClient = new DefaultApi();

type CharactersResult = {
  info: CharacterListResponse['info'];
  characters: Character[];
};

export function useCharacters() {
  return useQuery<CharactersResult>({
    queryKey: CHARACTERS_QUERY_KEY,
    queryFn: async () => {
      const response = await apiClient.getCharacters();

      return {
        info: response.data.info,
        characters: response.data.results ?? [],
      };
    },
  });
}
