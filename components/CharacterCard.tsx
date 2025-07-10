//components/CharacterCard.tsx
import { FunctionalComponent } from "preact/src/index.d.ts";
import StarButton from "../islands/StarButton.tsx";

type Props = {
  character: {
    name: string;
    image: string;
    status: string;
    species: string;
    id: string;
  };
};

const CharacterCard: FunctionalComponent<Props> = (props) => {
  const { name, image, status, species, id} = props.character;

  return (
    <div class="characterCard">
      <img src={image} alt={name} />
      <div>{name}</div>
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
      <div> Especie: {species} </div>
      <StarButton id={id} initial={false} />
    </div>
  );
};

export default CharacterCard;
