import { FunctionComponent } from "preact";

const Header: FunctionComponent = () => {
  return (
    <div class="Header">
      <a href="/">Home</a>
      <a href="/ListaPersonajes">Listar personajes</a>
      <a href="/BuscarPersonaje">Buscar personaje</a>
      <a href="/favorites">Lista favoritos </a>
    </div>
  );
};

export default Header;


