import {
	TLoginRequest,
	TRegisterRequest,
	TResponse,
	TUserResponse,
} from "@/types";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		signUp: builder.mutation<TResponse<TUserResponse>, TRegisterRequest>({
			query: (payload) => ({
				url: "/users/register",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["users"],
		}),

		login: builder.mutation<
			TResponse<{ accessToken: string }>,
			TLoginRequest
		>({
			query: (payload) => ({
				url: `/users/login`,
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["users"],
		}),
		logout: builder.mutation({
			query: () => ({
				url: `/users/logout`,
				method: "POST",
			}),
			invalidatesTags: ["users"],
		}),

		changePassword: builder.mutation({
			query: (payload) => ({
				url: `/users/change-password`,
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["users"],
		}),
		forgotPassword: builder.mutation({
			query: (payload) => ({
				url: `/users/forgot-password`,
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["users"],
		}),
		resetPassword: builder.mutation({
			query: (payload) => ({
				url: `/users/reset-password`,
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["users"],
		}),
	}),
});

export const {
	useSignUpMutation,
	useLoginMutation,
	useLogoutMutation,
	useForgotPasswordMutation,
	useChangePasswordMutation,
	useResetPasswordMutation,
} = authApi;
