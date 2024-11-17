import baseApi from "../api/baseApi";
export const color = baseApi.injectEndpoints({
    endpoints: builder => ({
        getColors: builder.query({
            query: () => `/colors`,
            providesTags: ["color"]
        }),
        getSingleColor: builder.query({
            query: (id) => `/colors/${id}`
        }),
        addColor: builder.mutation({
            query: (color) => ({
                url: `/colors`,
                method: 'POST',
                body: color
            }),
            invalidatesTags: ["color"]
        }),
        updateColor: builder.mutation({
            query: (color) => ({
                url: `/colors/${color.id}`,
                method: 'PATCH',
                body: color
            }),
            invalidatesTags: ["color"]
        }),
        deleteColor: builder.mutation({
            query: (id) => ({
                url: `/colors/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["color"]
        }),
    })
});

export const {
    useGetColorsQuery,
    useAddColorMutation,
    useDeleteColorMutation,
    useGetSingleColorQuery,
    useUpdateColorMutation

} = color;