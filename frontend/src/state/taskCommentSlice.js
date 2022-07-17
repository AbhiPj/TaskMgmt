import { apiSlice } from "./apiSlice";

export const taskCommentSlice = apiSlice.injectEndpoints({
  tagTypes: ["Comment"],
  endpoints: (build) => ({
    addComment: build.mutation({
      query(body) {
        const { comment, id } = body;
        return {
          url: `/task/comment/add/${id}`,
          method: "POST",
          body: comment,
        };
      },
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),
    listComment: build.query({
      query: (id) => `/comment/list/${id}`,
      providesTags: (result, id) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Comment", id })),
              { type: "Comment", id: "LIST" },
            ]
          : [{ type: "Comment", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useAddCommentMutation, useListCommentQuery } = taskCommentSlice;
