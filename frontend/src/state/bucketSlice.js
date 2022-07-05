import { apiSlice } from "./apiSlice";

export const bucketSlice = apiSlice.injectEndpoints({
  tagTypes: ["Bucket"],
  endpoints: (build) => ({
    addBucket: build.mutation({
      query(body) {
        return {
          url: "/bucket/add",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Bucket", id: "LIST" }],
    }),
    listBucket: build.query({
      query: (status) => `/bucket/list`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Bucket", id })),
              { type: "Bucket", id: "LIST" },
            ]
          : [{ type: "Bucket", id: "LIST" }],
    }),
  }),
});

export const { useAddBucketMutation, useListBucketQuery } = bucketSlice;
