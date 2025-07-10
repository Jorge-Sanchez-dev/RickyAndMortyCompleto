//components/CharactersContainer.tsx
import { FunctionalComponent } from "preact/src/index.d.ts";
import CharacterCard from "./CharacterCard.tsx";

type Character = {
  name: string;
  image: string;
  id: string;
  status: string;
  species: string;
};

type Props = {
  characters: Character[];
};

const CharactersContainer: FunctionalComponent<Props> = (props) => {
  const characters = props.characters;
  return (
    <div class="charactersContainer">
      {characters.map((ch) => (<a href={`/character/${ch.id}`}><CharacterCard key={ch.id} character={ch} /></a>)) }
    </div>
  );
};

export default CharactersContainer;
