import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchBreedDetails } from '../features/dogSlice';
import Loading from '../components/Loading';

const ProductView = () => {
  const {breedId} = useParams();
  const dispatch = useDispatch();
  const breedDetails = useSelector((state) =>
      state.breeds.breedDetails &&
      state.breeds.breedDetails.id === parseInt(breedId)
          ? state.breeds.breedDetails
          : null,
  );
  const status = useSelector((state)=>state.breeds.status);
  const error = useSelector((state)=>state.breeds.error);

  useEffect(()=>{
    if(!breedDetails) dispatch(fetchBreedDetails(breedId));
  }, [dispatch, breedId, breedDetails])

  if(status === 'loading') return <Loading />
  if(status === 'failed') return <div>Error: {error}</div>;

  return (
      <div className="container mx-auto sm:max-w-[50vw] p-[2vw]">
          {breedDetails && (
              <>
                  <img
                      src={breedDetails.image}
                      alt={breedDetails.name}
                      className="h-[80%] w-full rounded-md object-cover"
                  />
                  <h1 className="mt-4 text-3xl font-bold">
                      {breedDetails.name}
                  </h1>
                  <p>
                      <strong>Breed Group: </strong>
                      {breedDetails.breed_group}
                  </p>
                  <p>
                      <strong>Breed For: </strong>
                      {breedDetails.breed_for}
                  </p>
                  <p>
                      <strong>Life Span: </strong>
                      {breedDetails.life_span}
                  </p>
                  <p>
                      <strong>Origin: </strong>
                      {breedDetails.origin}
                  </p>
              </>
          )}
      </div>
  );
}

export default ProductView
