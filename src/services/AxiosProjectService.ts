import Vue from 'vue';
import IProjectService from "@/services/IProjectService";
import ProjectListVm from "@/models/project/ProjectListVm";
import Result from "@/models/Result";

export default class AxiosProjectService implements IProjectService {
    public projectImageAsync(id: string): Promise<string> {
        return Vue.$axios.get(`/project/${id}/image`, {
            responseType: 'arraybuffer'
        })
            .then(res => {
                const mimeType = res.headers['content-type']

                const data = Buffer.from(res.data, 'binary').toString('base64')
                return `data:${mimeType};base64,${data}`
            })

    }

    public projectsForUserAsync(userId: string): Promise<ProjectListVm> {
        return Vue.$axios.get<ProjectListVm>(`/user/${userId}/project`)
            .then(res => res.data);
    }

    createProject(userId: string, projectName: string): Promise<Result> {
        const payload = new FormData();
        payload.append('name', projectName);
        return Vue.$axios.post(`/user/${userId}/project`, payload)
            .then(res => Result.SuccessResult());
    }

    deleteProject(id: string): Promise<Result> {
        return Vue.$axios.delete(`/project/${id}`)
            .then(res => Result.SuccessResult());
    }

}
