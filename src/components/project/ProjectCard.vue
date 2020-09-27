<template>
    <div class="card isitar-project-card is-block is-clickable" @click="startWorking">
        <div class="card-image" v-if="project.hasImage && projectImage">
            <figure class="image is-3by1">
                <img :src="projectImage" alt="Project image">
            </figure>
        </div>
        <header class="card-content">
            <p class="title is-4 has-text-centered">
                {{project.name}}
            </p>
        </header>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
    import ProjectSlim from "@/models/project/ProjectSlim";

    @Component
    export default class ProjectCard extends Vue {

        private projectImage: string | null = null;

        @Prop({type: Object, required: true})
        public project!: ProjectSlim;

        private startWorking(): void {
            Vue.$userService.startTrackingAsync(this.$store.getters['user/userId'], this.project.id)
                .then(res => {
                    this.workingOnChanged()
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
    }
</script>
<style lang="scss" scoped>

</style>
