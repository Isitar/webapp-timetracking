<template>
    <div>
        <section class="section">
            <div class="container">
                <h1 class="title">Welcome {{username}}</h1>
                <div class="columns">
                    <div class="column">
                        <TimeTrackingEntryCard v-if="currentTimeTrackingEntry" :time-tracking-entry-detail="currentTimeTrackingEntry" @stoppedWorking="reloadCurrentTimeTrackingEntry"/>

                        <p v-else>Currently not working</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <h2 class="title">
                    <span class="mr-3">Your Projects</span>
                    <button class="button is-primary is-small" @click="createProjectDialogOpen = true">
                        <Icon icon="plus"/>
                    </button>
                </h2>

                <ul class="columns is-multiline">
                    <li class="column is-one-third-desktop is-half-tablet" v-for="project in projects" :key="project.id">
                        <ProjectCard :project="project" @workingOnChanged="reloadCurrentTimeTrackingEntry" @projectChanged="reloadProjects"/>
                    </li>
                </ul>
            </div>

            <ProjectCreateDialog @close="createProjectDialogOpen = false"
                                 @save="e => {createProjectDialogOpen = false; this.reloadProjects()}"
                                 :user-id="userId" :open="createProjectDialogOpen"
            />
        </section>
        <section class="section" v-if="report">
            <div class="container">
                <h2 class="title">Your day</h2>
                <div class="has-text-centered">
                    <button class="button is-accent" @click="reportPreviousDay">&lt;</button>
                    <button class="button is-accent" @click="reportNextDay">&gt;</button>
                </div>
                <TimeTrackingEntryReport :time-tracking-entry-report-vm="report"/>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ProjectCard from "@/components/project/ProjectCard.vue";
    import ProjectSlim from "@/models/project/ProjectSlim";
    import TimeTrackingEntryCard from "@/components/timeTrackingEntry/TimeTrackingEntryCard.vue";
    import TimeTrackingEntryDetailVm from "@/models/timeTrackingEntry/TimeTrackingEntryDetailVm";
    import TimeTrackingEntryReport from "@/components/timeTrackingEntry/TimeTrackingEntryReport.vue";
    import TimeTrackingEntryReportVm from "@/models/timeTrackingEntry/TimeTrackingEntryReportVm";
    import Icon from "@/components/common/Icon.vue";
    import ProjectCreateDialog from "@/components/project/ProjectCreateDialog.vue";

    @Component({
        components: {ProjectCreateDialog, Icon, TimeTrackingEntryReport, TimeTrackingEntryCard, ProjectCard}
    })
    export default class Home extends Vue {

        private username = '';
        private projects: ProjectSlim[] = []
        private currentTimeTrackingEntry: TimeTrackingEntryDetailVm | null = null;
        private report: TimeTrackingEntryReportVm | null = null;
        private createProjectDialogOpen = false;

        private reportFrom: Date | null = null;
        private reportTo: Date | null = null;

        private get userId(): string {
            return this.$store.getters['user/userId'];
        }

        private reloadCurrentTimeTrackingEntry(): void {
            this.$timeTrackingService.currentTimeTrackingEntryAsync(this.userId)
                .then(res => this.currentTimeTrackingEntry = res)
                .catch(() => {
                    this.currentTimeTrackingEntry = null;
                })
                .then(this.reloadReport);
        }

        private reportNextDay(): void {
            this.reportFrom?.setDate(this.reportFrom?.getDate() + 1)
            this.reportTo?.setDate(this.reportTo?.getDate() + 1)
            this.reloadReport();
        }

        private reportPreviousDay(): void {
            this.reportFrom?.setDate(this.reportFrom?.getDate() - 1)
            this.reportTo?.setDate(this.reportTo?.getDate() - 1)
            this.reloadReport();
        }

        private reloadReport(): void {
            if (null === this.reportFrom) {
                this.reportFrom = new Date();
               this.reportFrom.setHours(0,0,0,0);
            }
            if (null == this.reportTo) {
                this.reportTo = new Date();
                this.reportTo.setHours(23,59,59,999);
            }
            this.$timeTrackingService.reportAsync(this.userId, this.reportFrom.toISOString(), this.reportTo.toISOString())
                .then(res => this.report = res)
                .catch(() => {
                    this.report = null;
                });
        }

        private reloadProjects(): void {
            this.$projectService.projectsForUserAsync(this.userId)
                .then(res => this.projects = res.projects)
                .then(() => {
                    this.reloadCurrentTimeTrackingEntry();
                    this.reloadReport()
                })
        }

        public mounted(): void {
            this.username = this.$store.getters['user/name']
            this.reloadProjects();
        }
    }
</script>
<style lang="scss" scoped>

</style>
