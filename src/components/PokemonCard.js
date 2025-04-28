import React from "react";

export default function PokemonCard({ pokemon }) {
  return (
    <div className="card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h2>
        #{pokemon.id}{" "}
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </h2>
      <p>{pokemon.types.map((t) => t.type.name).join(", ")}</p>
    </div>
  );
}
