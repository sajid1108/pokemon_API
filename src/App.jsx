import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import DualBall from "./assets/DualBall.svg";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch list Pokémon
  const getPokeApi = async () => {
    setLoading(true);
    try {
      const { data: response } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=1025"
      );
      setPokemonData(response.results);
      setError(false);
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch detail Pokémon yang diklik
  const getPokemonDetail = async (pokemonName) => {
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      setSelectedPokemon(data);
    } catch (error) {
      console.error("Gagal mengambil detail Pokémon:", error);
    }
  };

  useEffect(() => {
    getPokeApi();
  }, []);

  return (
    <>
      <div className="App min-h-screen bg-[#C00D0D] flex flex-col items-center p-8">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <img src={DualBall} alt="Loading" width="200" height="200" />
          </div>
        ) : error ? (
          <h1 className="text-red-500">Error loading data!</h1>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-8 text-center">
              List of Pokémon
            </h1>
            <h6 className="text-2x1 font-bold mb-8 text-center">By : Akedo</h6>
            <div className="flex flex-wrap justify-center gap-8">
              {pokemonData.map((pokemon, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-300 p-4 rounded-lg flex flex-col items-center bg-white hover:bg-[#f5f5dc] transition duration-300 cursor-pointer"
                  onClick={() => getPokemonDetail(pokemon.name)} // Tambahkan event onClick
                >
                  <h2 className="font-semibold text-gray-700">#{index + 1}</h2>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      index + 1
                    }.png`}
                    alt={pokemon.name}
                    className="w-20 h-20"
                  />
                  <h3 className="capitalize text-blue-800 font-bold">
                    {pokemon.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal untuk menampilkan detail Pokémon */}
        {selectedPokemon && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80 border-4 border-blue-400">
              <h2 className="text-2xl font-bold capitaliz text-gray-800e">
                {selectedPokemon.name}
              </h2>
              <img
                src={selectedPokemon.sprites.front_default}
                alt={selectedPokemon.name}
                className="w-40 h-40 mx-auto mt-4"
              />
              <div className="mt-4 text-gray-700">
                <p className="text-lg">
                  Height:{" "}
                  <span className="font-semibold">
                    {selectedPokemon.height}
                  </span>
                </p>
                <p className="text-lg">
                  Weight:{" "}
                  <span className="font-semibold">
                    {selectedPokemon.weight}
                  </span>
                </p>
                <p className="text-lg">
                  Type: <span className="font-semibold"></span>
                  Type:{" "}
                  {selectedPokemon.types.map((t) => t.type.name).join(", ")}
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
                  onClick={() => setSelectedPokemon(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
