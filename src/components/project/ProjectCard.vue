<template>
    <div class="card isitar-project-card is-block is-clickable" @click.right.prevent="showDelete = !showDelete">
        <div class="card-image" v-if="project.hasImage && projectImage" @click="startWorking">
            <figure class="image is-3by1">
                <img :src="projectImage" alt="Project image">
            </figure>
        </div>
        <div class="card-content" @click="startWorking">
            <p class="title is-4 has-text-centered">
                {{project.name}}
            </p>
        </div>
        <div class="card-footer" v-if="showDelete">
            <button href="#" class="button card-footer-item is-danger" @click.prevent="deleteProject">Delete</button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
    import ProjectSlim from "@/models/project/ProjectSlim";

    @Component
    export default class ProjectCard extends Vue {

        private projectImage: string | null = null;
        private showDelete = false;

        @Prop({type: Object, required: true})
        public project!: ProjectSlim;

        private startWorking(): void {
            Vue.$userService.startTrackingAsync(this.$store.getters['user/userId'], this.project.id)
                .then(res => {
                    this.workingOnChanged()
                })
        }

        private deleteProject(): void {
            this.$projectService.deleteProject(this.project.id)
                .then(() => {
                    this.projectChanged(new Event(''));
                })

        }

        public mounted() {
            if (this.project.hasImage) {
                this.$projectService.projectImageAsync(this.project.id)
                    .then(res => this.projectImage = res);
            }
        }

        @Emit('workingOnChanged')
        public workingOnChanged(): void {
            return;
        }

        @Emit('projectChanged')
        public projectChanged(event: Event): Event {
            return event;
        }
    }
</script>
<style lang="scss" scoped>

</style>
