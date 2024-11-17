import baseApi from "../api/baseApi";

const menu = baseApi.injectEndpoints({
    endpoints: builder => ({
        getMenu: builder.query({
            query: () => `/menus`,
            providesTags: ["Menu"]
        }),
        getSingleMenu: builder.query({
            query: (id) => `/menus/${id}`
        }),
        addMenu: builder.mutation({
            query: (menu) => ({
                url: `/menus`,
                method: 'POST',
                body: menu
            }),
            invalidatesTags: ["Menu"]
        }),
        updateMenu: builder.mutation({
            query: (menu) => ({
                url: `/menus/${menu._id}`,
                method: 'PATCH',
                body: menu
            }),
            invalidatesTags: ["Menu"]
        }),
        deleteMenu: builder.mutation({
            query: (id) => ({
                url: `/menus/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Menu"]
        }),
    })
});

export const {
    useGetMenuQuery,
    useGetSingleMenuQuery,
    useAddMenuMutation,
    useUpdateMenuMutation,
    useDeleteMenuMutation
} = menu;