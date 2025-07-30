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

		allTodos: builder.query({
			query: () => {
				return {
					url: "/todos",
					method: "GET",
				};
			},

			providesTags: ["todos"],
		}),

		singleTodo: builder.query({
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
		updateTodo: builder.mutation({
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
	useSingleTodoQuery,
	useCreateTodoMutation,
	useDeleteTodoMutation,
	useUpdateTodoMutation,
} = todoApi;
