<template>
    <div id="app">
        <template v-if="isLoggedIn">
            <NavMenu/>
            <div class="main">
                <router-view/>
            </div>
            <Footer/>
        </template>
        <Login v-else/>
    </div>
</template>


<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import NavMenu from "@/components/layout/NavMenu.vue";
    import Login from "@/views/Login.vue";
    import Footer from "@/components/layout/Footer.vue";

    @Component({
        components: {Footer, Login, NavMenu}
    })
    export default class App extends Vue {
        private get isLoggedIn(): boolean {
            return this.$store.getters['user/isLoggedIn'];
        }
    }
</script>
<style lang="scss" scoped>
 #app {
     min-height: 100vh;
     display: flex;
     flex-direction: column;
     .main {
         flex: 1 1 auto;
     }
 }
</style>
