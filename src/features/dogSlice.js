import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

const headers = {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_DOG_API_KEY,
}

const LIMIT = 9;

export const fetchBreeds = createAsyncThunk("breeds/fetchBreeds", async (page=0, {getState}) => {
    const state = getState();
    const cachedBreeds = state.breeds.pages[page]

    if(cachedBreeds){
        return {breedsWithImages: cachedBreeds, totalPages: state.breeds.totalPages, page}
    }

    const response = await axios.get(
        `${import.meta.env.VITE_DOG_API_URL}v1/breeds`,
        {headers},
    );

    const data = response.data;
    const totalPages = Math.ceil(response.data.length/(LIMIT+1));
    const breedsWithImages = await Promise.all(
        data.slice(page*LIMIT, LIMIT*(page+1)).map(async (breed) => {
            if (breed.reference_image_id) {
                const imageResponse = await axios.get(
                    `${import.meta.env.VITE_DOG_API_URL}v1/images/${breed.reference_image_id}`,
                    {headers},
                );
                return { ...breed, image: imageResponse.data.url };
            }
            return breed;
        }),
    );
    return {breedsWithImages, totalPages, page};
});

export const fetchBreedDetails = createAsyncThunk(
    "breeds/fetchBreedDetails",
    async (breedId) => {
        const response = await axios.get(
            `${import.meta.env.VITE_DOG_API_URL}v1/breeds/${breedId}`,
            {headers},
        );
        const breedData = response.data;

        if (breedData.reference_image_id) {
            const imageResponse = await axios.get(
                `${import.meta.env.VITE_DOG_API_URL}v1/images/${breedData.reference_image_id}`,
                {headers},
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
    currentPage: 0,
    totalPages: 0,
    pages: {}
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
                const {breedsWithImages, totalPages, page} = action.payload;
                state.status = "succeeded";
                state.pages[page] = breedsWithImages;
                state.breeds = breedsWithImages;
                state.totalPages = totalPages;
                state.currentPage = page;
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

export const selectBreeds = (state) => state.breeds.breeds;

export const selectBreedPages = createSelector(
    (state) => state.breeds.pages,
    (pages) => pages,
);

export const selectBreedDetails = (state) => state.breeds.breedDetails;

export const selectStatus = (state) => state.breeds.status;

export const selectError = (state) => state.breeds.error;

export default breedSlice.reducer;
