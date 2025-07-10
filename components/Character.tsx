//components/Character.tsx
import { FunctionalComponent } from "preact/src/index.d.ts";
import StarButton from "../islands/StarButton.tsx";

type Props = {
  name: string;
  status: string;
  origin: string;
  image: string;
  species: string;
  id: number;
  favorite: boolean;
};

const Character: FunctionalComponent<Props> = (props) => {
  return (
    <div class="characterComponent">
      <img src={props.image} alt={props.name} />
      <div>
        <div>Status: {props.status}</div>
        <div>Origin: {props.origin}</div>
      </div>
      <div
        style={{
          fontSize: "0.9em",
          color: props.status === "Alive"
            ? "green"
            : props.status === "Dead"
            ? "red"
            : "gray",
        }}
      >
        {props.status}
      </div>

      <div>Especie: {props.species}</div>

      {/* ⭐ Añadimos el botón de favorito */}
      <StarButton id={props.id} initial={props.favorite} />
    </div>
  );
};

export default Character;
