import React, { useEffect, useState } from "react";

export default function FilterDropdown({ value, onChange }) {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    async function fetchTypes() {
      const res = await fetch("https://pokeapi.co/api/v2/type");
      const data = await res.json();
      setTypes(
        data.results.map(
          (t) => t.name.charAt(0).toUpperCase() + t.name.slice(1)
        )
      );
    }
    fetchTypes();
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="dropdown"
    >
      <option>All</option>
      {types.map((t) => (
        <option key={t}>{t}</option>
      ))}
    </select>
  );
}
