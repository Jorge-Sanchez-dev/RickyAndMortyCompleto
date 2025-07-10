//components/CharacterContainer.tsx

import { FunctionalComponent } from "preact/src/index.d.ts";
import CharacterComponent from "./Character.tsx";

type Character = {
  id: number;
  name: string;
  status: string;
  origin: string;
  image: string;
  species: string;
  episodes: Array<{ name: string; id: string }>;
};

type Props = {
  character: Character;
  favorites: string[];
};

const CharacterContainer: FunctionalComponent<Props> = (props) => {
  const ch = props.character;

  return (
    <div class="characterContainer">
      <h1>{ch.name}</h1>
      <CharacterComponent
        name={ch.name}
        origin={ch.origin}
        status={ch.status}
        image={ch.image}
        species={ch.species}
        id={ch.id}
        favorite={props.favorites.includes(ch.id.toString())}
      />
      <ul>
        {ch.episodes.map((ep) => (
          <li key={ep.id}>
            <a href={`/Episodes/${ep.id}`}>
              {ep.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterContainer;
