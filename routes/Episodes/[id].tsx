// carpeta Episodes/[id].tsx
import { Handlers, PageProps } from "$fresh/server.ts";
import CharactersContainer from "../../components/CharactersContainer.tsx";
import Axios from "npm:axios";
import { getFavoritesCookie } from "../../lib/cookies.ts";

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
};

type Data = {
  characters: Character[];
  episodeName: string;
  favorites: string[];
};

export const handler: Handlers<Data> = {
  GET: async (_req, ctx) => {
    const { id } = ctx.params;

    try {
      // 1. Traemos el episodio
      const episode = await Axios.get(
        `https://rickandmortyapi.com/api/episode/${id}`,
      );

      const favorites = getFavoritesCookie(_req.headers.get("cookie"));

      // 2. Obtenemos URLs de los personajes
      const characterUrls: string[] = episode.data.characters;

      // 3. Fetch en paralelo de todos los personajes
      const characterResponses = await Promise.all(
        characterUrls.map((url) => Axios.get(url)),
      );

      const characters: Character[] = characterResponses.map((res) => ({
        id: res.data.id,
        name: res.data.name,
        image: res.data.image,
        status: res.data.status,
        species: res.data.species,
      }));

      return ctx.render({ characters, episodeName: episode.data.name, favorites });
    } catch (error) {
      return new Response("Episodio no encontrado", { status: 404 });
    }
  },
};

export default function EpisodePage({ data }: PageProps<Data>) {
  return (
    <div className="Layout">
      <h1>Personajes del episodio: {data.episodeName}</h1>
      <CharactersContainer
        characters={data.characters}
        favorites={data.favorites}
      />
    </div>
  );
}
