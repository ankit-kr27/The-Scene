import React from "react";
import { Link } from "react-router-dom";

const BreedCard = ({ breed }) => {
    // console.log(breed)
    return (
        <Link
            to={`/breed/${breed.id}`}
            className="block rounded-lg border p-4 shadow-md"
        >
            <img
                src={breed.image}
                alt={breed.name}
                className="h-48 w-full rounded-md object-cover"
            />
            <h2 className="mt-2 text-xl font-bold">{breed.name}</h2>
            <p className="text-gray-600" >{breed.bred_for}</p>
        </Link>
    );
};

export default BreedCard;
