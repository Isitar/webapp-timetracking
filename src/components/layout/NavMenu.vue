<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a role="button" class="navbar-burger burger" :class="{'is-active': showNavMenu}" aria-label="menu" aria-expanded="false"
         @click="toggleMobileNav">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" :class="{'is-active': showNavMenu}" id="menu">
      <div class="navbar-end">
        <router-link class="navbar-item" ActiveClass="is-active" :to="{name: ''}">Home</router-link>
        <UsersNavMenu />
        <ProfileNavMenu />
        <router-link class="navbar-item is-hidden-desktop" ActiveClass="is-active" :to="{name: 'Profile'}">Profile</router-link>
        <div class="navbar-item is-hidden-desktop is-clickable" @click="logout">
          Logout
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Icon from "@/components/common/Icon.vue";
import ProfileNavMenu from "@/components/layout/ProfileNavMenu.vue";
import UsersNavMenu from "@/components/layout/UsersNavMenu.vue";

@Component({
  components: {UsersNavMenu, ProfileNavMenu, Icon}
})
export default class NavMenu extends Vue {
  private showNavMenu = false

  private toggleMobileNav(): void {
    this.showNavMenu = !this.showNavMenu;
  }

  private logout(): void {
    this.$store.dispatch('user/logout')
        .then(() => this.$router.push({name: 'login'}))
  }
}
</script>
<style lang="scss" scoped>

</style>
