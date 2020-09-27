import Vue from 'vue'
import Vuex from 'vuex'
import user, {UserState} from "@/store/modules/user";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export interface State {
    user: UserState;
}

export default new Vuex.Store<State>({
    mutations: {},
    actions: {},
    modules: {
        user: user,
    },
    plugins: [
        createPersistedState({
            storage: window.localStorage,
            key: 'timetracking-user-store',
            reducer: (persistedState: State) => {
                const stateFilter = JSON.parse(JSON.stringify(persistedState)) as State;

                delete stateFilter.user.isRefreshingToken;

                return stateFilter
            }
        }),
    ]
});
