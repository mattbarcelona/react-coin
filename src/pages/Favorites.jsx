import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Favorites = () => {
  const [favorites, setFavorites] = useState([]); // estado para las criptomonedas favoritas
  useEffect(() => {
    // efecto para cargar las criptomonedas favoritas
    updateFavorites(); // actualizar las criptomonedas favoritas
  }, []);
  const updateFavorites = async () => {
    // función para actualizar las criptomonedas favoritas
    const favoritesFilter = JSON.parse(localStorage.getItem("favorites")) || []; // conseguir las criptomonedas favoritas del localstorage
    const response = await fetch("https://api.coincap.io/v2/assets/");
    const data = await response.json();
    const newFavorites = data.data.filter((coin) =>
      favoritesFilter.some((favorite) => favorite.id === coin.id)
    ); // filtrar las criptomonedas favoritas
    setFavorites(newFavorites); // guardar las criptomonedas favoritas en el estado
  };
  return (
    <div>
      <h2>Favoritos</h2>
      <ul>
        {favorites.map(
          (
            favorite // recorrer las criptomonedas favoritas
          ) => (
            <li key={favorite.id}>
              <Link to={`/coin/${favorite.id}`}>
                {favorite.name} | {favorite.priceUsd} $ |{" "}
                {favorite.changePercent24Hr} %
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Favorites;
