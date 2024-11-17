import baseApi from "../api/baseApi";
export const size = baseApi.injectEndpoints({
    endpoints: builder => ({
        getSizes: builder.query({
            query: () => `/sizes`,
            providesTags: ["size"]
        }),
        getSingleSize: builder.query({
            query: (id) => `/sizes/${id}`
        }),
        addSize: builder.mutation({
            query: (size) => ({
                url: `/sizes`,
                method: 'POST',
                body: size
            }),
            invalidatesTags: ["size"]
        }),
        updateSize: builder.mutation({
            query: (size) => ({
                url: `/sizes/${size.id}`,
                method: 'PATCH',
                body: size
            }),
            invalidatesTags: ["size"]
        }),
        deleteSize: builder.mutation({
            query: (id) => ({
                url: `/sizes/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["size"]
        }),
    })
});

export const {
    useGetSizesQuery,
    useGetSingleSizeQuery,
    useAddSizeMutation,
    useUpdateSizeMutation,
    useDeleteSizeMutation

} = size;