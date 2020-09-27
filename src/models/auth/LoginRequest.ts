export default class LoginRequest {
    username: string | null = null;
    password: string | null = null;

    constructor(username: string | null, password: string | null) {
        this.username = username;
        this.password = password;
    }

    public static InstanceFromLogin(username: string, password: string) {
        return new LoginRequest(username, password);
    }
}
