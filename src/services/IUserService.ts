import Result from "@/models/Result";

export default interface IUserService {
    stopTrackingAsync(userId: string): Promise<Result>
    startTrackingAsync(userId: string, projectId: string): Promise<Result>
}
