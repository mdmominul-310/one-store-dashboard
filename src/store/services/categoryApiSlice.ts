import baseApi from "../api/baseApi";


export const category = baseApi.injectEndpoints({
    endpoints: builder => ({
        getCategory: builder.query({
            query: () => `/categories`,
            providesTags: ["Category"]
        }),
        getSingleCategory: builder.query({
            query: (id) => `/categories/${id}`
        }),
        addCategory: builder.mutation({
            query: (category) => ({
                url: `/categories`,
                method: 'POST',
                body: category
            }),
            invalidatesTags: ["Category"]
        }),
        updateCategory: builder.mutation({
            query: (category) => ({
                url: `/categories/${category.id}`,
                method: 'PATCH',
                body: category
            }),
            invalidatesTags: ["Category"]
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Category"]
        }),
    })
});

export const {
    useGetCategoryQuery,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useGetSingleCategoryQuery,
    useUpdateCategoryMutation
} = category;