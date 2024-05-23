import React from "react";
import { Link } from "react-router-dom";

const BreedCard = ({ breed }) => {
    return (
        <Link to={`/breed/${breed.id}`}>
            <img src={breed.image.url} alt={breed.name} />
            <h2>{breed.name}</h2>
            <p>{breed.bred_for}</p>
        </Link>
    );
};

export default BreedCard;
