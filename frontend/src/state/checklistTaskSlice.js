import { apiSlice } from "./apiSlice";

export const checklistTaskSlice = apiSlice.injectEndpoints({
  tagTypes: ["ChecklistTask"],
  endpoints: (build) => ({
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
        { type: "ChecklistTask", id },
        { type: "ChecklistTask", id: "LIST" },
      ],
    }),

    editChecklistTask: build.mutation({
      query(data) {
        const { checklistId, ...task } = data;
        return {
          url: `/checklist/editchecklisttask/${checklistId}`,
          method: "PUT",
          body: task,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "ChecklistTask", id },
        { type: "ChecklistTask", id: "LIST" },
      ],
    }),

    detailChecklistTask: build.query({
      query(data) {
        const { id, ...checklistTask } = data;
        return {
          url: `/checklist/detailChecklistTask/${id}`,
          method: "PUT",
          body: checklistTask,
        };
      },
      providesTags: (result, error, id) => [
        { type: "ChecklistTask", id },
        { type: "ChecklistTask", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddChecklistTaskMutation,
  useEditChecklistTaskMutation,
  useDetailChecklistTaskQuery,
} = checklistTaskSlice;
