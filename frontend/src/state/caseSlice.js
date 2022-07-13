import { apiSlice } from "./apiSlice";

export const caseSlice = apiSlice.injectEndpoints({
  tagTypes: ["Case"],
  endpoints: (build) => ({
    addCase: build.mutation({
      query(body) {
        return {
          url: "/Case/add",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Case", id: "LIST" }],
    }),
    listCase: build.query({
      query: (status) => `/Case/list`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Case", id })),
              { type: "Case", id: "LIST" },
            ]
          : [{ type: "Case", id: "LIST" }],
    }),
    detailCase: build.query({
      query: (id) => `/case/detail/${id}`,
      providesTags: (result, error, id) => [
        { type: "Case", id },
        { type: "Case", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useAddCaseMutation, useListCaseQuery, useDetailCaseQuery } =
  caseSlice;
