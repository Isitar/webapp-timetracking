import Vue from 'vue';
import {PluginObject} from "vue/types/umd";
import AxiosAuthService from "@/services/AxiosAuthService";
import AxiosProjectService from "@/services/AxiosProjectService";
import AxiosUserService from "@/services/AxiosUserService";
import AxiosTimeTrackingService from "@/services/AxiosTimeTrackingService";

const authService = new AxiosAuthService();
const projectService = new AxiosProjectService();
const userService = new AxiosUserService();
const timeTrackingService = new AxiosTimeTrackingService();

const Plugin = {
    install: function (vueInstance: typeof Vue): void {
        vueInstance.$authService = authService;
        vueInstance.$projectService = projectService;
        vueInstance.$userService = userService;
        vueInstance.$timeTrackingService = timeTrackingService;

        Object.defineProperties(vueInstance.prototype, {
            $authService: {
                get() {
                    return authService;
                }
            },
            $projectService: {
                get() {
                    return projectService;
                }
            },
            $userService: {
                get() {
                    return userService;
                }
            },
            $timeTrackingService: {
                get() {
                    return timeTrackingService;
                }
            },
        });
    }
} as PluginObject<any>;


Vue.use(Plugin.install)
export default Plugin;
