import React from "react";

export default function PokemonCard({ pokemon }) {
  const idPadded = String(pokemon.id).padStart(3, "0");
  const hdUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${idPadded}.png`;

  return (
    <div className="card">
      <div className="img-container">
        <img src={hdUrl} alt={pokemon.name} />
      </div>{" "}
      <h2>
        #{pokemon.id}{" "}
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </h2>
      <div>
        {pokemon.types.map((t) => (
          <span key={t.type.name} className={`type ${t.type.name}`}>
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}
