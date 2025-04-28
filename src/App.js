import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import FilterDropdown from "./components/FilterDropdown";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await res.json();
        const detailed = await Promise.all(
          data.results.map(async (p) => {
            const resp = await fetch(p.url);
            return resp.json();
          })
        );
        setPokemonList(detailed);
      } catch (err) {
        setError("Failed to fetch Pokémon.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filtered = pokemonList
    .filter((p) => p.name.includes(searchTerm.toLowerCase()))
    .filter(
      (p) =>
        filterType === "All" ||
        p.types.some((t) => t.type.name === filterType.toLowerCase())
    );

  if (loading) return <div className="status">Loading...</div>;
  if (error) return <div className="status error">{error}</div>;

  return (
    <div className="container">
      <header>
        <h1>Pokémon Explorer</h1>
      </header>
      <div className="controls">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <FilterDropdown value={filterType} onChange={setFilterType} />
      </div>
      <div className="grid">
        {filtered.length > 0 ? (
          filtered.map((p) => <PokemonCard key={p.id} pokemon={p} />)
        ) : (
          <div className="status">No Pokémon found.</div>
        )}
      </div>
    </div>
  );
}

export default App;
