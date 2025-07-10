//ListaPersonajes.tsx
import Axios from "npm:axios";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import CharactersContainer from "../components/CharactersContainer.tsx";
import { getFavoritesCookie } from "../lib/cookies.ts";

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
};
type Data = {
  characters: Array<Character>;
  favorites: string[];
};
type CharacterAPI = {
  results: Array<{
    id: number;
    name: string;
    image: string;
    status: string;
    species: string;
  }>;
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    const url = "https://rickandmortyapi.com/api/character";
    try {
      const response = await Axios.get<CharacterAPI>(url);
      const favorites = getFavoritesCookie(_req.headers.get("cookie"));
      return ctx.render({
        characters: response.data.results,
        favorites,
      });
    } catch (_e) {
      return new Response("Error de API");
    }
  },
};

export default (props: PageProps<Data>) => {
    const characters = props.data.characters;
    const favorites = props.data.favorites;
    return (
    <div>
      <h1 style={{ textAlign: "center" }}>Lista de personajes</h1>
      <CharactersContainer characters={characters} favorites={favorites} />
    </div>
  );
}

