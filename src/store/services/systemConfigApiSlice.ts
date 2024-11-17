import baseApi from "../api/baseApi";

const systemConfigApiSlice = baseApi.injectEndpoints({
    endpoints: builder => ({
        getSystemConfig: builder.query({
            query: () => `/config`,
            providesTags: ["SystemConfig"]
        }),
        updateSystemConfig: builder.mutation({
            query: (payload) => ({
                url: `/config`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["SystemConfig"]
        })
    })
});


export const { useGetSystemConfigQuery, useUpdateSystemConfigMutation } = systemConfigApiSlice;