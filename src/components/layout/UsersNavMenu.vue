<template>
  <div class="navbar-item has-dropdown is-hoverable is-hidden-mobile is-hidden-tablet-only">
    <div class="navbar-link is-arrowless">
      <Icon icon="users"/>
    </div>
    <div class="navbar-dropdown is-right">
      <a class="navbar-item" @click="createUserDialogOpen = true">Add User</a>
    </div>
    <UserCreateDialog :open="createUserDialogOpen" @save="createUserDialogOpen = false" @close="createUserDialogOpen = false"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Icon from "@/components/common/Icon.vue";
import ChangePasswordDialog from "@/components/profile/ChangePasswordDialog.vue";
import UserCreateDialog from "@/components/user/UserCreateDialog.vue";

@Component({
  components: {UserCreateDialog, ChangePasswordDialog, Icon}
})
export default class UsersNavMenu extends Vue {
  private createUserDialogOpen = false;
}
</script>
<style lang="scss" scoped>

</style>
