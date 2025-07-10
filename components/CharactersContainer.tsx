//components/CharactersContainer.tsx
import { FunctionalComponent } from "preact/src/index.d.ts";
import CharacterCard from "./CharacterCard.tsx";


type Character = {
  name: string;
  image: string;
  id: number;
  status: string;
  species: string;
};

type Props = {
  characters: Character[];
  favorites: string[];
};

const CharactersContainer: FunctionalComponent<Props> = (props) => {
  const characters = props.characters;
  return (
    <div class="charactersContainer">
      {characters.map((ch) => (
        <CharacterCard
          key={ch.id}
          character={ch}
          favorite={props.favorites.includes(ch.id.toString())}
        />
      ))}
    </div>
  );
};

export default CharactersContainer;
