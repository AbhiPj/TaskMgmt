import { apiSlice } from "./apiSlice";

export const checklistSlice = apiSlice.injectEndpoints({
  tagTypes: ["Checklist", "ChecklistTask"],
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

    editChecklist: build.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `/checklist/edit/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Checklist", id },
        { type: "Checklist", id: "LIST" },
      ],
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

    detailChecklist: build.query({
      query: (id) => `/checklist/detail/${id}`,
      providesTags: (result, error, id) => [
        { type: "Checklist", id },
        { type: "Checklist", id: "LIST" },
      ],
    }),

    // addChecklistTask: build.mutation({
    //   query(data) {
    //     const { id, ...checklistTasks } = data;
    //     return {
    //       url: `/checklist/addchecklisttask/${id}`,
    //       method: "POST",
    //       body: checklistTasks,
    //     };
    //   },
    //   invalidatesTags: (result, error, { id }) => [
    //     { type: "ChecklistTask", id },
    //     { type: "ChecklistTask", id: "LIST" },
    //   ],
    // }),

    // editChecklistTask: build.mutation({
    //   query(data) {
    //     const { checklistId, ...task } = data;
    //     return {
    //       url: `/checklist/editchecklisttask/${checklistId}`,
    //       method: "PUT",
    //       body: task,
    //     };
    //   },
    //   invalidatesTags: (result, error, { id }) => [
    //     { type: "Checklist", id },
    //     { type: "Checklist", id: "LIST" },
    //   ],
    // }),

    // detailChecklistTask: build.query({
    //   query(data) {
    //     const { id, ...checklistTask } = data;
    //     return {
    //       url: `/checklist/detailChecklistTask/${id}`,
    //       method: "PUT",
    //       body: checklistTask,
    //     };
    //   },
    //   providesTags: (result, error, id) => [
    //     { type: "ChecklistTask", id },
    //     { type: "ChecklistTask", id: "LIST" },
    //   ],
    // }),
  }),
  overrideExisting: false,
});

export const {
  useAddChecklistMutation,
  useListChecklistQuery,
  useEditChecklistMutation,
  useDetailChecklistQuery,
  // useAddChecklistTaskMutation,
  // useEditChecklistTaskMutation,
  // useDetailChecklistTaskQuery,
} = checklistSlice;
