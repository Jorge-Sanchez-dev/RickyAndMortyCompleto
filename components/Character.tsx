//components/Character.tsx
import { FunctionalComponent } from "preact/src/index.d.ts";

type Props = {
  name: string;
  status: string;
  origin: string;
  image: string;
  species: string;
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
    </div>
  );
};

export default Character;
