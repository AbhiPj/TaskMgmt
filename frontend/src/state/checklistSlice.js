import { apiSlice } from "./apiSlice";

export const checklistSlice = apiSlice.injectEndpoints({
  tagTypes: ["Checklist"],
  endpoints: (build) => ({
    addChecklist: build.mutation({
      query(body) {
        return {
          url: "/checklist/add",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Checklist", id: "LIST" }],
    }),
    listChecklist: build.query({
      query: (status) => `/checklist/list`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Checklist", id })),
              { type: "Checklist", id: "LIST" },
            ]
          : [{ type: "Checklist", id: "LIST" }],
    }),



  }),
  overrideExisting: false,
});

export const {
  useAddChecklistMutation,
  useListChecklistQuery,

} = checklistSlice;
