import TimeTrackingEntryReportDto from "@/models/timeTrackingEntry/TimeTrackingEntryReportDto";

export default class TimeTrackingEntryReportVm {
    public userId!: string;
    public from!: string;
    public to!: string;
    public timeTrackingEntryReports: TimeTrackingEntryReportDto[] = [];
}
