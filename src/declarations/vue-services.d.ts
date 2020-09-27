// noinspection ES6UnusedImports
import Vue from 'vue';
// noinspection ES6UnusedImports
import VueConstructor from 'vue-property-decorator';
import IAuthService from "@/services/IAuthService";
import IProjectService from "@/services/IProjectService";
import IUserService from "@/services/IUserService";
import ITimeTrackingService from "@/services/ITimeTrackingService";

declare module 'vue/types/vue' {
    interface Vue {
        $authService: IAuthService;
        $projectService: IProjectService;
        $userService: IUserService;
        $timeTrackingService: ITimeTrackingService;
    }
}

declare module 'vue/types/vue' {
    interface VueConstructor {
        $authService: IAuthService;
        $projectService: IProjectService;
        $userService: IUserService;
        $timeTrackingService: ITimeTrackingService;
    }
}
