<template>
  <div class="modal" :class="{'is-active': open}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <div class="modal-card-head has-background-primary has-text-white">
        <h2 class="modal-card-title has-text-white">Change Password</h2>
        <button class="delete" aria-label="close" @click="requestClose"></button>
      </div>
      <div class="modal-card-body">
        <form>
          <div class="field">
            <label class="label">New Password</label>
            <div class="control has-icons-left has-icons-right">
              <input :type="passwordType" placeholder="*******" class="input" v-model="newPassword">
              <Icon is-small is-left icon="lock"/>
              <Icon is-small is-right :icon="showPassword ? 'eye-slash' : 'eye'" class="is-clickable" @click.native="toggleShowPassword"/>

            </div>
          </div>
        </form>
      </div>
      <div class="modal-card-foot">
        <button class="button is-success" @click="requestSave">
          <Icon icon="save"/>
          <span>Save</span>
        </button>
        <button class="button is-danger" @click="requestClose">
          <Icon icon="times"/>
          <span>Cancel</span>
        </button>
      </div>
    </div>


  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import Icon from "@/components/common/Icon.vue";

@Component({
  components: {Icon}
})
export default class ChangePasswordDialog extends Vue {
  @Prop({type: Boolean, default: false})
  public open!: boolean;

  private newPassword = '';
  private showPassword = false;
  private error = null;

  private get passwordType(): string {
    return this.showPassword ? 'text' : 'password';
  }

  private toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  @Prop({type: String, required: true})
  public userId!: string;


  private requestSave(): void {
    this.$authService.changePassword(this.userId, this.newPassword)
        .then(() => {
          this.save(new Event('a'));
        })
  }

  private requestClose(event: Event): void {
    this.newPassword = '';
    this.close(event);
  }

  @Emit('save')
  public save(event: Event): Event {
    return event;
  }

  @Emit('close')
  public close(event: Event): Event {
    return event;
  }
}
</script>
<style lang="scss" scoped>
.modal-card-foot {
  justify-content: center;
}
</style>
