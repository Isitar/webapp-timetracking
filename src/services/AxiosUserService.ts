import Vue from 'vue';
import IUserService from "@/services/IUserService";
import Result from "@/models/Result";
import UserCreateVm from "@/models/user/UserCreateVm";

export default class AxiosUserService implements IUserService {
    public startTrackingAsync(userId: string, projectId: string): Promise<Result> {
        return Vue.$axios.post<Result>(`/user/${userId}/time-tracking-entry`, {
            projectId: projectId
        })
            .then(() => Result.SuccessResult())
            .catch(() => new Result());
    }

    public stopTrackingAsync(userId: string): Promise<Result> {
        return Vue.$axios.post<Result>(`/user/${userId}/time-tracking-entry`, {})
            .then(() => Result.SuccessResult())
            .catch(() => new Result());
    }

    createUser(userCreate: UserCreateVm): Promise<Result> {
        return Vue.$axios.post<Result>('/user', userCreate)
            .then(() => Result.SuccessResult())
            .catch(() => new Result());
    }

}
