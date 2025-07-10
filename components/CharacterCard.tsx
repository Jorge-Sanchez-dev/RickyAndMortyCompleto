//components/CharacterCard.tsx
import { FunctionalComponent } from "preact/src/index.d.ts";
import StarButton from "../islands/StarButton.tsx";

type Props = {
  character: {
    name: string;
    image: string;
    status: string;
    species: string;
    id: number;
  };
  favorite?: boolean;
};

const CharacterCard: FunctionalComponent<Props> = (props) => {
  const { name, image, status, species, id } = props.character;

  return (
    <div class="characterCard" style={{ textAlign: "center" }}>
      <a href={`/character/${id}`}>
        <img src={image} alt={name} />
        <div>{name}</div>
      </a>
      <div
        style={{
          fontSize: "0.9em",
          color: status === "Alive"
            ? "green"
            : status === "Dead"
            ? "red"
            : "gray",
        }}
      >
        {status}
      </div>
      <div>Especie: {species}</div>
      <StarButton id={id} initial={props.favorite ?? false} />
    </div>
  );
};

export default CharacterCard;
