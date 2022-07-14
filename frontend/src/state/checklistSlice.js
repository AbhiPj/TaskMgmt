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

    detailChecklistTask: build.query({
      query: (id) => `/checklist/detail/${id}`,
      providesTags: (result, error, id) => [
        { type: "Checklist", id },
        { type: "Checklist", id: "LIST" },
      ],
    }),

    addChecklistTask: build.mutation({
      query(data) {
        const { id, ...checklistTasks } = data;
        return {
          url: `/checklist/addchecklisttask/${id}`,
          method: "POST",
          body: checklistTasks,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Checklist", id },
        { type: "Checklist", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddChecklistMutation,
  useListChecklistQuery,
  useAddChecklistTaskMutation,
  useDetailChecklistTaskQuery,
} = checklistSlice;
