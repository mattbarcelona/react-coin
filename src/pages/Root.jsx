import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> {/* link para ir a la página de inicio */}
        <Link to="/favorites">Favoritos</Link>{" "}
        {/* link para ir a la página de favoritos */}
      </nav>
      <h1> Cryptonline </h1>
      <Outlet /> {/* outlet para renderizar las rutas hijas */}
    </div>
  );
}
