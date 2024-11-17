import baseApi from "../api/baseApi";

const banner = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBanner: builder.query({
            query: () => "/banner",
        }),

        createBanner: builder.mutation({
            query: (body) => ({
                url: `/banner`,
                method: "POST",
                body,
            }),
        }),

    }),
});

export const { useGetBannerQuery, useCreateBannerMutation } = banner;