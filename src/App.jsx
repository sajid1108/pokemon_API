import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import DualBall from "./assets/DualBall.svg";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const getPokeApi = async () => {
    setLoading(true); // Set loading saat data di-fetch
    try {
      const { data: response } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=103"
      );
      setPokemonData(response.results);
      setError(false);
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setLoading(false); // Hentikan loading setelah selesai
    }
  };

  useEffect(() => {
    getPokeApi(); // Fetch data saat komponen pertama kali dimuat
  }, []);

  return (
    <>
      <div className="App" style={{ textAlign: "center", padding: "20px" }}>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <img src={DualBall} alt="Loading" width="200" height="200" />
          </div>
        ) : error ? (
          <h1 className="text-red-500">Error loading data!</h1>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-8">List of Pokémon</h1>
            <h6 className="text-2x1 font-bold mb-8">By : Akedo</h6>
            <div className="flex flex-wrap justify-center gap-8">
              {pokemonData.map((pokemon, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-300 p-4 rounded-lg flex flex-col items-center"
                >
                  <h2 className="font-semibold">#{index + 1}</h2>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      index + 1
                    }.png`}
                    alt={pokemon.name}
                  />
                  <h3 className="capitalize">{pokemon.name}</h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
