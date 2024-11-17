import baseApi from "../api/baseApi";

const order = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => `/orders`,
            providesTags: ["order"]
        }),
        getSingleOrder: builder.query({
            query: (id) => `/orders/${id}`,
            providesTags: ["order"]
        }),
        addOrder: builder.mutation({
            query: (order) => ({
                url: `/orders`,
                method: 'POST',
                body: order
            }),
            invalidatesTags: ["order"]
        }),
        updateOrder: builder.mutation({
            query: (order: { data: unknown, id: string }) => ({
                url: `/orders/${order.id}`,
                method: 'PATCH',
                body: order.data
            }),
            invalidatesTags: ["order"]
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["order"]
        }),
    })
});

export const {
    useGetOrdersQuery,
    useAddOrderMutation,
    useDeleteOrderMutation,
    useGetSingleOrderQuery,
    useUpdateOrderMutation
} = order;