<template>
  <div class="navbar-item has-dropdown is-hoverable is-hidden-mobile is-hidden-tablet-only">
    <div class="navbar-link is-arrowless">
      <Icon icon="user"/>
    </div>
    <div class="navbar-dropdown is-right">
      <a class="navbar-item" @click="showChangePasswordDialog = true">Change Password</a>
      <a class="navbar-item" @click="logout">Logout</a>
    </div>
    <ChangePasswordDialog :open="showChangePasswordDialog" :user-id="$store.getters['user/userId']" @save="showChangePasswordDialog = false" @close="showChangePasswordDialog = false" @cancel="showChangePasswordDialog = false"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Icon from "@/components/common/Icon.vue";
import ChangePasswordDialog from "@/components/profile/ChangePasswordDialog.vue";

@Component({
  components: {ChangePasswordDialog, Icon}
})
export default class ProfileNavMenu extends Vue {

  private showChangePasswordDialog = false;

  private logout(): void {
    this.$store.dispatch('user/logout')
        .then(() => this.$router.push({name: 'login'}))
  }
}
</script>
<style lang="scss" scoped>

</style>
