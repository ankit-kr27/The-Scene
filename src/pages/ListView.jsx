import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBreeds } from "../features/dogSlice";
import Loading from "../components/Loading";
import BreedCard from "../components/BreedCard";

const ListView = () => {
    const dispatch = useDispatch();

    const breeds = useSelector((state) => state.breeds.breeds);
    const status = useSelector((state) => state.breeds.status);
    const error = useSelector((state) => state.breeds.error);

    useEffect(()=>{
        if(status === 'idle') dispatch(fetchBreeds());
    }, [dispatch, status])

    if(status === 'loading') return <Loading />
    if(status === 'failed') return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-4 text-3xl font-bold">Dog Breeds</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {console.log(breeds)}
                {breeds &&
                    breeds.map((breed) => (
                        <BreedCard key={breed.id} breed={breed} />
                    ))}
            </div>
        </div>
    );
};

export default ListView;
