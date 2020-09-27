<template>
    <div>
        <h2 class="title is-4">Report</h2>
        <p>{{reportFrom}} - {{reportTo}}</p>

        <table class="table">
            <thead>
            <tr>
                <th>Project</th>
                <th>Duration [h]</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="report in timeTrackingEntryReportVm.timeTrackingEntryReports" :key="report.id">
                <td>{{report.projectName}}</td>
                <td>{{formatDuration(report.totalSeconds)}}</td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                <th>Total</th>
                <td>{{formatDuration(overallTotalSeconds)}}</td>
            </tr>
            </tfoot>

        </table>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import TimeTrackingEntryReportVm from "@/models/timeTrackingEntry/TimeTrackingEntryReportVm";
    import {formatDuration} from "@/common/formatters";

    @Component
    export default class TimeTrackingEntryReport extends Vue {
        @Prop({type: Object, required: true})
        public timeTrackingEntryReportVm!: TimeTrackingEntryReportVm;

        private formatDuration(seconds: number): string {
            return formatDuration(seconds);
        }

        private get reportFrom(): string {
            return new Date(this.timeTrackingEntryReportVm.from).toLocaleDateString()
        }

        private get reportTo(): string {
            return new Date(this.timeTrackingEntryReportVm.to).toLocaleDateString()
        }

        private get overallTotalSeconds(): number {
            return this.timeTrackingEntryReportVm.timeTrackingEntryReports.map(tter => tter.totalSeconds).reduce((carry, x) => carry + x);
        }
    }
</script>
<style lang="scss" scoped>

</style>
