import baseApi from "../api/baseApi";
export const products = baseApi.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => `/products?limit=100000000&page=1`,
            providesTags: ["product"]
        }),
        getSingleProduct: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: ["product"]
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: `/products`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["product"]
        }),
        updateProduct: builder.mutation({
            query: ({ id, data }) => ({
                url: `/products/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ["product"]
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["product"]
        }),

    })
});

export const {
    useGetProductsQuery,
    useDeleteProductMutation,
    useCreateProductMutation,
    useUpdateProductMutation,
    useGetSingleProductQuery

} = products;