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
    editBucket: build.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `/bucket/edit/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Bucket", id },
        { type: "Bucket", id: "LIST" },
      ],
    }),
    deleteBucket: build.mutation({
      query(id) {
        return {
          url: `/bucket/delete/${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Bucket", id },
        { type: "Bucket", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useAddBucketMutation,
  useListBucketQuery,
  useEditBucketMutation,
  useDeleteBucketMutation,
} = bucketSlice;
