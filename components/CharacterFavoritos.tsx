// components/CharacterFavoritos.tsx
import CharacterCard from "./CharacterCard.tsx";

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
};

export default function CharacterFavoritos(
  { characters, favorites }: { characters: Character[]; favorites: string[] },
) {
  return (
    <div class="charactersContainer">
      {characters.map((c) => (
        <CharacterCard
          character={c}
          favorite={favorites.includes(c.id.toString())}
        />
      ))}
    </div>
  );
}
