import { TResponse, TTodo } from "@/types";
import { baseApi } from "./baseApi";

const todoApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createTodo: builder.mutation({
			query: (payload) => ({
				url: "/todos",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["todos"],
		}),

		allTodos: builder.query<
			TResponse<TTodo[]>,
			Record<string, string | string[]>
		>({
			query: (query) => {
				const params = new URLSearchParams();

				Object.entries(query).forEach(([key, value]) => {
					if (value?.length > 0) {
						params.append(key, value.toString());
					}
				});
				return {
					url: "/todos",
					method: "GET",
				};
			},

			providesTags: ["todos"],
		}),
		myTodos: builder.query<TResponse<TTodo[]>, Record<string, string>>({
			query: (query) => {
				const params = new URLSearchParams();

				Object.entries(query).forEach(([key, value]) => {
					if (value?.trim().length > 0) {
						params.append(key, value.toString());
					}
				});
				return {
					url: "/todos/my-todos",
					method: "GET",
					params,
				};
			},

			providesTags: ["todos"],
		}),

		singleTodo: builder.query<TResponse<TTodo>, string>({
			query: (id) => ({
				url: `/todos/${id}`,
				method: "GET",
			}),
			providesTags: ["todos"],
		}),
		deleteTodo: builder.mutation({
			query: (id) => ({
				url: `/todos/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["todos"],
		}),
		updateTodo: builder.mutation<
			TResponse<TTodo>,
			{ id: string; payload: Partial<TTodo> }
		>({
			query: ({ id, payload }) => ({
				url: `/todos/${id}`,
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: ["todos"],
		}),
	}),
});

export const {
	useAllTodosQuery,
	useMyTodosQuery,
	useSingleTodoQuery,
	useCreateTodoMutation,
	useDeleteTodoMutation,
	useUpdateTodoMutation,
} = todoApi;
