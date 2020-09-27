import Vue from 'vue';
import IUserService from "@/services/IUserService";
import Result from "@/models/Result";

export default class AxiosUserService implements IUserService {
    public startTrackingAsync(userId: string, projectId: string): Promise<Result> {
        return Vue.$axios.post<Result>(`/user/${userId}/time-tracking-entry`, {
            projectId: projectId
        })
            .then(res => Result.SuccessResult());
    }

    public stopTrackingAsync(userId: string): Promise<Result> {
        return Vue.$axios.post<Result>(`/user/${userId}/time-tracking-entry`, {})
            .then(res => Result.SuccessResult());
    }

}
