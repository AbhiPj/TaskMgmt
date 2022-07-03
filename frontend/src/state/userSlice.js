import { apiSlice } from "./apiSlice";

export const userSlice = apiSlice.injectEndpoints({
  tagTypes: ["User"],
  endpoints: (build) => ({
    addTask: build.mutation({
      query(body) {
        return {
          url: "/user/add",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    listUser: build.query({
      query: (status) => `/user/list`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "User", id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    detailUser: build.query({
      query: (id) => `/user/detail/${id}`,
      providesTags: (result, error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useAddUserMutation, useListUserQuery, useDetailUserQuery } =
  userSlice;
