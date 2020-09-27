<template>

    <section class="hero is-bold is-primary is-fullheight page-login">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                        <div class="notification is-danger" v-if="error">
                            <button class="delete" @click="e => error = null"></button>
                            {{error}}
                        </div>

                        <form class="box" @submit="authenticate">
                            <div class="field">
                                <label class="label">Username (email)</label>
                                <div class="control has-icons-left">
                                    <input type="text" placeholder="" class="input" v-model="loginModel.username" autofocus="">
                                    <span class="icon is-small is-left">
                                    <Icon icon="envelope"/>
                                </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Password</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input :type="passwordType" placeholder="*******" class="input" v-model="loginModel.password">
                                    <Icon is-small is-left icon="lock"/>
                                    <Icon is-small is-right :icon="showPassword ? 'eye-slash' : 'eye'" class="is-clickable" @click.native="toggleShowPassword"/>

                                </div>
                            </div>
                            <div class="field">
                                <button class="button is-primary is-fullwidth" type="submit">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Icon from "@/components/common/Icon.vue";
    import LoginRequest from "@/models/auth/LoginRequest";

    @Component({
        components: {Icon}
    })
    export default class Login extends Vue {
        private loginModel: LoginRequest = new LoginRequest('', '');
        private showPassword = false;
        private error = null;

        private get passwordType(): string {
            return this.showPassword ? 'text' : 'password';
        }

        private toggleShowPassword(): void {
            this.showPassword = !this.showPassword;
        }

        private authenticate(): void {
            this.$authService.login(this.loginModel)
                .then(res => {
                    this.$store.commit('user/setTokens', res);
                    this.$router.push({name: 'Home'});
                })
        }
    }
</script>
<style lang="scss" scoped>

</style>
