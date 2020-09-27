import TimeTrackingEntryDetailVm from "@/models/timeTrackingEntry/TimeTrackingEntryDetailVm";
import TimeTrackingEntryReportVm from "@/models/timeTrackingEntry/TimeTrackingEntryReportVm";

export default interface ITimeTrackingService {
    currentTimeTrackingEntryAsync(userId: string): Promise<TimeTrackingEntryDetailVm>;

    reportAsync(userId: string, from: string, to: string): Promise<TimeTrackingEntryReportVm>;
}
