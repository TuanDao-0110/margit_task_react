import React from "react";
import { Link } from "react-router-dom";

export default function PokemonDetails() {
  return (
    <div>
      <div>this is details of the list</div>
      <button>
        <Link to="/pokemon">back</Link>
      </button>
    </div>
  );
}
