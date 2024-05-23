import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchBreeds,
    selectBreedPages,
    selectError,
    selectStatus,
} from "../features/dogSlice";
import Loading from "../components/Loading";
import BreedCard from "../components/BreedCard";

const ListView = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);

    const breeds = useSelector((state) => selectBreedPages(state)[page] || []);
    const totalPages = useSelector((state) => state.breeds.totalPages);
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
    // console.log(totalPages)
    // console.log(page)

    useEffect(() => {
        if (status === "idle" || !breeds.length) dispatch(fetchBreeds(page));
    }, [dispatch, page, breeds, status]);

    if (status === "loading") return <Loading />;
    if (status === "failed") return <div>Error: {error}</div>;

    const handleNextPage = () => {
        setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
    };

    const handlePrevPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-4 text-3xl font-bold">Dog Breeds</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* {console.log(breeds)} */}
                {breeds &&
                    breeds.map((breed) => (
                        <BreedCard key={breed.id} breed={breed} />
                    ))}
            </div>
            <div className="mt-4 flex justify-center gap-4">
                <button
                    onClick={handlePrevPage}
                    disabled={page === 0}
                    className="cursor-pointer text-blue-500"
                >
                    Previous
                </button>
                <span>Page {page + 1}</span>
                <button
                    onClick={handleNextPage}
                    disabled={page === totalPages - 1}
                    className="cursor-pointer text-blue-500"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ListView;
