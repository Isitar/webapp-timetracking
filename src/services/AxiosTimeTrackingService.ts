import Vue from 'vue';
import ITimeTrackingService from "@/services/ITimeTrackingService";
import TimeTrackingEntryDetailVm from "@/models/timeTrackingEntry/TimeTrackingEntryDetailVm";
import TimeTrackingEntryReportVm from "@/models/timeTrackingEntry/TimeTrackingEntryReportVm";

export default class AxiosTimeTrackingService implements ITimeTrackingService {

    public currentTimeTrackingEntryAsync(userId: string): Promise<TimeTrackingEntryDetailVm> {
        return Vue.$axios.get<TimeTrackingEntryDetailVm>(`/user/${userId}/time-tracking-entry/current`)
            .then(res => res.data);
    }

    public reportAsync(userId: string, from: string, to: string): Promise<TimeTrackingEntryReportVm> {
        return Vue.$axios.get<TimeTrackingEntryReportVm>(`/user/${userId}/time-tracking-report`, {
            params: {
                from: from,
                to: to
            }
        })
            .then(res => res.data);
    }

}
