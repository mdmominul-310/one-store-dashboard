import { IFlashSale } from "../../pages/flash-sale/flash-sale.interface";
import baseApi from "../api/baseApi";

const flashSaleApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getFlashSale: builder.query({
            query: () => "flash-sale",
            providesTags: ["flashSale"],
        }),
        getSingleFlashSale: builder.query({
            query: (id: string) => `flash-sale/${id}`,
            providesTags: ["flashSale"],
        }),
        addFlashSale: builder.mutation({
            query: (data: IFlashSale) => ({
                url: "flash-sale",
                method: "POST",
                body: data,

            }),
            invalidatesTags: ["flashSale"],
        }),

        updateFlashSale: builder.mutation({
            query: (data: { id: string, data: IFlashSale }) => ({
                url: `flash-sale/${data.id}`,
                method: "PATCH",
                body: data.data,
            }),
            invalidatesTags: ["flashSale"],
        }),

        deleteFlashSale: builder.mutation({
            query: (id: string) => ({
                url: `flash-sale/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["flashSale"],
        }),
    }),

});

export const {
    useGetFlashSaleQuery,
    useAddFlashSaleMutation,
    useUpdateFlashSaleMutation,
    useDeleteFlashSaleMutation,
    useGetSingleFlashSaleQuery,
} = flashSaleApiSlice;
