import {Module} from "vuex";
import Vue from "vue";
import {AxiosResponse} from "axios";
import {State} from "@/store";
import {Permissions} from "@/common/constants";
import TokenResult from "@/models/auth/TokenResult";

export interface UserState {
    token: string | null;
    refreshToken: string | null;
    isRefreshingToken: boolean;
}

const user: Module<UserState, State> = {
    namespaced: true,

    state: {
        token: null,
        refreshToken: null,
        isRefreshingToken: false,
    },
    getters: {
        isLoggedIn: (state): boolean => {
            return state.token !== null;
        },
        userId: (state, getters) => {
            const tokenData = getters.tokenData;
            if (null === tokenData) {
                return null;
            }
            return tokenData['sub'];
        },
        name: (state, getters) => {
            return getters.tokenData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        },
        permissions: (state, getters): string[] => {
            try {
                const permissions = getters.tokenData['isitar.ch.permission'];
                return Array.isArray(permissions) ? permissions : [permissions];
            } catch (e) {
                return [];
            }
        },
        hasPermission: (state, getters) => (permission: string): boolean => {
            const permissions = getters.permissions as string[];
            return permissions.includes(permission);
        },
        isAdmin: (state, getters): boolean => {
            return getters.hasPermission(Permissions.admin)
        },
        roles: (state, getters): string[] => {
            try {
                const roles = getters.tokenData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                return Array.isArray(roles) ? roles : [roles];
            } catch (e) {
                return [];
            }
        },
        hasRole: (state, getters) => (role: string): boolean => {
            const roles = getters.roles as string[];
            return roles.includes(role);
        },
        tokenData: state => {
            if (null === state.token) {
                return null;
            }
            return JSON.parse(window.atob(state.token.split('.')[1]))
        },
    },
    mutations: {
        setTokens(state, payload: TokenResult) {
            state.token = payload.token;
            state.refreshToken = payload.refreshToken;
        },
        setIsRefreshingToken(state, payload: boolean) {
            state.isRefreshingToken = payload;
        }
    },
    actions: {
        async refreshToken(context) {
            if (null == context.state.refreshToken) {
                return;
            }

            context.commit('setIsRefreshingToken', true);
            try {
                const response = await Vue.prototype.$axios.post('auth/refresh', {
                    "refreshToken": context.state.refreshToken,
                    "jwtToken": context.state.token,
                }) as AxiosResponse;
                context.commit('setTokens', response.data);
            } catch (err) {
                console.error('error refreshing token', err);
                context.dispatch('logout');
            }

            context.commit('setIsRefreshingToken', false);
        },
        async logout(context, payload: { userId: string } | null) {
            try {
                await Vue.prototype.$axios.post('auth/logout', payload);
            } catch (e) {
                console.debug('logout failed', e);
            }
            if (null === payload || undefined === payload || null === payload.userId) {
                context.commit('setTokens', {token: null, refreshToken: null});
            }
        },
    },
};

export default user;
