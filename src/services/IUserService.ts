import Result from "@/models/Result";
import UserCreateVm from "@/models/user/UserCreateVm";

export default interface IUserService {
    stopTrackingAsync(userId: string): Promise<Result>
    startTrackingAsync(userId: string, projectId: string): Promise<Result>
    createUser(userCreate: UserCreateVm): Promise<Result>;
}
