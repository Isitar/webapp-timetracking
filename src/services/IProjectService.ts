import ProjectListVm from "@/models/project/ProjectListVm";
import Result from "@/models/Result";

export default interface IProjectService {
    projectImageAsync(id: string): Promise<string>;

    projectsForUserAsync(userId: string): Promise<ProjectListVm>;

    createProject(userId: string, projectName: string): Promise<Result>
}
