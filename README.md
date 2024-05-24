# Dog Breeds Application

This is a React application that displays information about various dog breeds. The application fetches data from an external API and provides a paginated list of dog breeds with images. Users can click on a breed to view more details about it. The application is optimized to reduce unnecessary API calls and re-renders.

## Features

- Display a list of dog breeds with images.
- Pagination to navigate through the list of breeds.
- View detailed information about a specific breed.
- Optimized state management using Redux and `reselect` for memoized selectors.
- Deployed on Vercel at [Dog Breeds Application](https://the-scene-rho.vercel.app/).

## Technologies Used

- React
- Redux Toolkit
- Redux Thunk
- Axios
- Tailwind CSS
- Reselect
- Vite
- Vercel

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ankit-kr27/The-Scene.git
   cd The-Scene
    ```
2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file in the root directory with the following environment variables:

   ```env
    VITE_DOG_API_KEY=your-api-key
    VITE_DOG_API_URL=https://api.thedogapi.com/
    ```
4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. The application will be available at [http://localhost:5173](http://localhost:5173).

## Deployment

The application is deployed on Vercel. You can visit it at [Dog Breeds Application](https://the-scene-rho.vercel.app/).

## Application Structure

### Pages

- `ListView.jsx`: Displays a paginated list of dog breeds.
- `ProductView.jsx`: Displays detailed information about a specific breed.

### Components

- `Header.jsx`: Fixed header for the application.
- `Loading.jsx`: Loading spinner component.
- `BreedCard.jsx`: Card component to display breed information.

### Redux

- `dogSlice.js`: Redux slice for managing breeds and breed details.
- `selectors.js`: Contains memoized selectors using `reselect`.



