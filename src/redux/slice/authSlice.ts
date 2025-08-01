import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TUserState = {
	id: string;
	name: string;
	email: string;
	role: string;
};

export type TAuthState = {
	user: null | TUserState;
	token: null | string;
};

const initialState: TAuthState = {
	user: null,
	token: null,
};

const authSlice = createSlice({
	name: "sovftvance",
	initialState,
	reducers: {
		setCredentials: (
			state,
			{ payload: { user, token } }: PayloadAction<TAuthState>
		) => {
			state.user = user;
			state.token = token;
		},

		logout: (state) => {
			state.user = null;
			state.token = null;
		},
	},
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectedUser = (state: RootState) => state.softvance.user;
export const selectedToken = (state: RootState) => state.softvance.token;
