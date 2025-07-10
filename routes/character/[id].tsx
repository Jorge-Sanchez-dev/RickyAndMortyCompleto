// carpeta character/[id].tsx
import Axios from "axios";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import CharacterContainer from "../../components/CharacterContainer.tsx";
import { getFavoritesCookie } from "../../lib/cookies.ts";

type Character = {
    id: number;
    name: string;
    status: string;
    origin: string;
    image: string;
    species: string;
    episodes: Array<{ name: string, id: string}>;
}
type Data = {
    character: Character;
    favorites: string[];
}
type CharacterAPI = {
    name: string;
    id: number;
    status: string;
    origin: {name: string};
    episode: string[];
    image: string;
    species: string;
}
type EpisodeAPI = {
    name: string;
    id: string;
}
export const handler: Handlers = {
    GET: async(_req: Request, ctx: FreshContext<unknown, Data>) => {
        const {id} = ctx.params;
        const url = `https://rickandmortyapi.com/api/character/${id}`;
        const favorites = getFavoritesCookie(_req.headers.get("cookie"));
        try{
            const response = await Axios.get<CharacterAPI>(url);
            const episodes = (await Promise.all(response.data.episode.map(
                async(ep) => await Axios.get<EpisodeAPI>(ep)
            ))).map(e => e.data);

            const character: Character = {
                ...response.data,
                origin: response.data.origin.name,
                episodes
            };

            return ctx.render({character, favorites });

        }catch(_e){
            return new Response("Error de API");
        }
    }
};

const Page = (props:PageProps<Data>) => <CharacterContainer character={props.data.character} favorites={props.data.favorites}/>

export default Page;