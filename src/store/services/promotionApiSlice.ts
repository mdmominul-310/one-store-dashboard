import baseApi from "../api/baseApi";

const promotion = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPromotion: builder.query({
            query: () => ({
                url: "/youtube-promo",
            }),
            providesTags: ["Promotion"]
        }),
        addPromotion: builder.mutation({
            query: (data) => ({
                url: "/youtube-promo",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Promotion"]
        }),
        updatePromotion: builder.mutation({
            query: (data) => ({
                url: `/youtube-promo/${data._id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["Promotion"]
        }),
        deletePromotion: builder.mutation({
            query: (id) => ({
                url: `/youtube-promo/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Promotion"]
        }),
    })
});

export const {
    useGetPromotionQuery,
    useAddPromotionMutation,
    useUpdatePromotionMutation,
    useDeletePromotionMutation
} = promotion;