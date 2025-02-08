import "./App.css";
import { useState, useEffect } from "react";
import { Button } from "./components/button";
import axios from "axios";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const getPokeApi = async () => {
    setLoading(true);
    try {
      const { data: response } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=10000"
      );
      setPokemonData(response.results);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPokeApi();
  }, []);

  return (
    <div className="flex justify-center items-center ">
      <div className="flex gap-4 items-center">
        {error ? (
          <h1>ada error nih</h1>
        ) : loading ? (
          <div className="h-screen flex justify-center items-center">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png`}
            />
          </div>
        ) : (
          <div className="">
            <h1>Pokemon Data</h1>
            <div className="flex flex-wrap justify-center gap-8">
              {pokemonData.map((halo, index) => (
                <div
                  key={index}
                  className="border-2 flex flex-col items-center"
                >
                  <h1>{index + 1}</h1>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      index + 1
                    }.png`}
                  />
                  <h1>{halo.name}</h1>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
