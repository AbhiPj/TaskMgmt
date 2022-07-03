import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({}),
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
