// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "https://one-store-63j5.onrender.com/api/v1" , credentials: "include"}),
    // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),

    reducerPath: "baseApi",
    // Tag types are used for caching and invalidation.
    tagTypes: ["User", "Category", "color", "size", "product", "order", "Menu", "Promotion", "SystemConfig", "flashSale"],
    endpoints: () => ({}),
})

export default baseApi;
