import baseApi from "../api/baseApi";

const upload = baseApi.injectEndpoints({
    endpoints: builder => ({
        uploadImage: builder.mutation({
            query: (formData) => ({
                url: `/uploads`,
                method: "POST",
                body: formData,

            }),
            // invalidatesTags: ["User"]
        })
    })
});

export const { useUploadImageMutation } = upload;