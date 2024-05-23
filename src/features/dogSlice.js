import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_DOG_API_KEY,
});

const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
};

export const fetchBreeds = createAsyncThunk("breeds/fetchBreeds", async () => {
    const response = await axios.get(
        `${import.meta.env.VITE_DOG_API_URL}v1/breeds`,
        requestOptions,
    );
    const data = response.data;

    const breedsWithImages = await Promise.all(
        data.slice(0, 9).map(async (breed) => {
            if (breed.reference_image_id) {
                const imageResponse = await axios.get(
                    `${import.meta.env.VITE_DOG_API_URL}v1/images/${breed.reference_image_id}`,
                    requestOptions,
                );
                return { ...breed, image: imageResponse.data.url };
            }
            return breed;
        }),
    );
    return breedsWithImages;
});

export const fetchBreedDetails = createAsyncThunk(
    "breeds/fetchBreedDetails",
    async (breedId) => {
        const response = await axios.get(
            `${import.meta.env.VITE_DOG_API_URL}v1/breeds/${breedId}`,
            requestOptions,
        );
        const breedData = response.data;

        if (breedData.reference_image_id) {
            const imageResponse = await axios.get(
                `${import.meta.env.VITE_DOG_API_URL}v1/images/${breedData.reference_image_id}`,
                requestOptions,
            );
            return {...breedData, image: imageResponse.data.url}
        }
        return breedData;
    },
);

const initialState = {
    breeds: [],
    breedDetails: null,
    status: "idle",
    error: null,
};

const breedSlice = createSlice({
    name: "breeds",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBreeds.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBreeds.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.breeds = action.payload;
            })
            .addCase(fetchBreeds.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchBreedDetails.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBreedDetails.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.breedDetails = action.payload;
            })
            .addCase(fetchBreedDetails.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default breedSlice.reducer;
