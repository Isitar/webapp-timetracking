import IAuthService from "@/services/IAuthService";
import Vue from 'vue';
import TokenResult from "@/models/auth/TokenResult";
import {AxiosResponse} from "axios";
import LoginRequest from "@/models/auth/LoginRequest";

export default class AxiosAuthService implements IAuthService {
	login(loginRequest: LoginRequest): Promise<TokenResult> {
		return Vue.$axios.post('auth/login', loginRequest)
			.then((res: AxiosResponse<TokenResult>) => res.data);
	}

	logout(): Promise<null> {
		return Vue.$axios.post('auth/logout')
			.then((res: AxiosResponse) => res.data);
	}

	resetPassword(email: string): Promise<null> {
		return Vue.$axios.post('auth/reset-password', {
			email: email
		})
			.then((res) => res.data);
	}

	changePassword(userId: string, newPassword: string): Promise<null> {
		return Vue.$axios.post(`auth/${userId}/password`, {
			newPassword: newPassword,
		})
			.then(res => res.data);
	}

}
