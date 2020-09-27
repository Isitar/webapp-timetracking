import TokenResult from "@/models/auth/TokenResult";
import LoginRequest from "@/models/auth/LoginRequest";

export default interface IAuthService {

	login(loginRequest: LoginRequest): Promise<TokenResult>;
	logout(): Promise<null>;

	resetPassword(email: string): Promise<null>;

}
