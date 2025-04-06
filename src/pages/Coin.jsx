import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Coin() {
  const { data } = useLoaderData(); // conseguir el data que se paso por el loader
  const [isFavorite, setIsFavorite] = useState(false); // estado para saber si es favorito
  useEffect(() => {
    // efecto para saber si es favorito
    const favorites = JSON.parse(localStorage.getItem("favorites")) || []; // conseguir las criptomonedas favoritas del localstorage
    setIsFavorite(favorites.some((favorite) => favorite.id === data.id)); // saber si la criptomoneda esta en favoritos
  }, [data]); // ejecutar el efecto cuando cambie el data
  const addTofavorites = () => {
    // función para agregar a favoritos
    const favorites = JSON.parse(localStorage.getItem("favorites")) || []; // conseguir las criptomonedas favoritas del localstorage
    if (!favorites.find((favorite) => favorite.id === data.id)) {
      // si la criptomoneda no esta en favoritos
      favorites.push(data); // agregar la criptomoneda a favoritos
      localStorage.setItem("favorites", JSON.stringify(favorites)); // guardar las criptomonedas favoritas en el localstorage
    }
  };
  const removeFromFavorites = () => {
    // función para remover de favoritos
    const favorites = JSON.parse(localStorage.getItem("favorites")) || []; // conseguir las criptomonedas favoritas del localstorage
    const newFavorites = favorites.filter(
      (favorite) => favorite.id !== data.id
    ); // filtrar las criptomonedas favoritas
    localStorage.setItem("favorites", JSON.stringify(newFavorites)); // guardar las criptomonedas favoritas en el localstorage
  };
  const handleFavorite = () => {
    // función para manejar los favoritos
    if (isFavorite) {
      // si es favorito
      removeFromFavorites(); // remover de favoritos
    } else {
      // si no es favorito
      addTofavorites(); // agregar a favoritos
    }
    setIsFavorite(!isFavorite); // cambiar el estado de favorito
  };
  return (
    <div>
      <h1>{data.name}</h1>
      <p>
        <b>Rank :</b> {data.rank}
      </p>
      <p>
        <b>Symbol:</b> {data.symbol}
      </p>
      <p>
        <b>Price:</b> {data.priceUsd} $
      </p>
      <p>
        <b>Change in 24h:</b> {data.changePercent24Hr} %
      </p>
      <button onClick={handleFavorite}>
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </button>
    </div>
  );
}
