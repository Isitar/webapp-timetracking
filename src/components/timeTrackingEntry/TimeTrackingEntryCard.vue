<template>

    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                Currently Working on {{timeTrackingEntryDetail.projectName}}
            </p>
        </header>

        <div class="card-content">
            <p>
                <span>Since: <time>{{timeTrackingEntryDetail.from}}</time></span> <br/>
                <span v-if="timeTrackingEntryDetail.to">To: <time>{{timeTrackingEntryDetail.to}}</time></span>
                <span>Time: {{timePassed}}</span>
            </p>

        </div>

        <footer class="card-footer">
            <div class="card-footer-item is-link is-clickable" @click="stopWorking">Stop working</div>
        </footer>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
    import TimeTrackingEntryDetailVm from "@/models/timeTrackingEntry/TimeTrackingEntryDetailVm";
    import {formatDuration} from "@/common/formatters";

    @Component
    export default class TimeTrackingEntryCard extends Vue {
        @Prop({type: Object, required: true})
        public timeTrackingEntryDetail!: TimeTrackingEntryDetailVm;
        private timePassed: string | null = null;

        private stopWorking() {
            this.$userService.stopTrackingAsync(this.timeTrackingEntryDetail.userId)
                .then(res => {
                    console.debug(res);
                    this.stoppedWorking()
                })
        }

        private startTimer() {
            setInterval(() => {
                const durationInSeconds = Math.floor((Date.now() - Date.parse(this.timeTrackingEntryDetail.from)) / 1000);
                this.timePassed = formatDuration(durationInSeconds);
            }, 1000)
        }


        @Emit('stoppedWorking')
        public stoppedWorking(): void {
            return;
        }

        public mounted(): void {
            if (null === this.timeTrackingEntryDetail.to) {
                this.startTimer();
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
