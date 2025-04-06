import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [coins, setCoins] = useState([]); // estado para las criptomonedas

  useEffect(() => {
    // efecto para cargar las criptomonedas
    fetch("https://api.coincap.io/v2/assets/")
      .then((response) => response.json())
      .then((data) => setCoins(data.data)); // guardar las criptomonedas en el estado
  }, []);
  return (
    <div>
      <h2>Criptomonedas</h2>
      <ul>
        {coins.map(
          (
            coin // recorrer las criptomonedas
          ) => (
            <li key={coin.id}>
              <Link to={`/coin/${coin.id}`}>
                {coin.name} | {coin.priceUsd} $
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
