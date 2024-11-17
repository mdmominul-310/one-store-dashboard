import baseApi from "../api/baseApi";

const authApiSlice = baseApi.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (payload) => ({
                url: `/login`,
                method: "POST",
                body: payload
            })
        }),
        register: builder.mutation({
            query: ({ email, password }) => ({
                url: `/auth/register`,
                method: "POST",
                body: { email, password }
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `/logout`,
                method: "POST"
            })
        }),
        me: builder.query({
            query: () => `/auth/me`,
            providesTags: ["User"]
        })
    })
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useMeQuery } = authApiSlice;
