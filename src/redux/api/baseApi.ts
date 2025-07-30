import { RootState } from "../store";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // backend url

export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: fetchBaseQuery({
		baseUrl,
		credentials: "include",
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).softvance.token;

			if (token) {
				headers.set("authorization", token);
			}
			return headers;
		},
	}),
	endpoints: () => ({}),
	tagTypes: ["todos", "users"],
});
