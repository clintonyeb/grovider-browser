<template>
  <div class="bg-pattern min-h-screen">
    <div class="flex flex-col h-screen items-center justify-center">
      <alert class="mt-1" :message="formMessage" v-if="formError" :header="formHeader"  :alert_type="alertType"/>
      <div class="form flex flex-col w-full p-4 px-6">
        <div class="mb-8">
          <h3 class="text-pink mb-6 font-black">
            Recover Your Password
          </h3>

          <p class="text-grey text-xs">
            Enter your email and we will email you a recovery link to reset your password.
          </p>
        </div>
        
        <ValidationObserver class="w-full" ref="observer">
        <form class="flex flex-col items-center justify-center w-full" @submit.prevent="signInUser" slot-scope="{ invalid }" ref="form">

          <Validator name="Email" rules="required|email" class="w-full">
          <div class="mb-8 w-full" slot-scope="{ valid }">
            <label class="block text-grey text-xs font-bold capitalize" for="Email">
              Your email
            </label>
            <p class="inline-flex relative border-b w-full">
              <!-- <mail-icon class="absolute m-auto" :height="5" :width="5" style="margin-top: .5rem;"></mail-icon> -->
              <input
                class="appearance-none  w-full py-2 text-grey-darkest font-semibold focus:outline-none  bg-transparent"
                id="email" type="text" placeholder="Enter Email Address" name="Email" v-model="email">
                <input-state class="absolute pin-r m-auto" :height="4" :width="4" style="margin-top: .5rem;" :state="valid" color="pink"></input-state>
            </p>
          </div>
          </Validator>

          <div class="mb-8 w-full relative">
            <input type="submit" :value="loadingForm ? '' : 'Submit'"
              class="bg-pink cursor-pointer hover:bg-pink-dark text-white font-bold py-2 px-4 rounded w-full" :disabled="invalid">
              <spinner v-if="loadingForm" />
          </div>

          <p class="mb-5 text-grey-darker text-xs">
            Remembered your password? <router-link :to="{name: 'login'}" class="text-pink-light">Sign In
            </router-link>
          </p>

        </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import MailIcon from "@/icons/Mail.vue"
  import InputState from "@/components/InputState.vue"
  import Alert from "@/components/Alert.vue"

  import {
    Component,
    Vue
  } from "vue-property-decorator";

  @Component({
    components: {
      MailIcon,
      InputState,
      Alert
    }
  })
  export default class Login extends Vue {
    email: string = '';
    valid: any;
    loadingForm: boolean = false;
    formError = false;
    formMessage: string = '';
    formHeader = 'Problem creating account.';
    alertType = 'error';

    async signInUser(){
      if(this.loadingForm) return false

      this.formError = false
      this.formMessage = ''
      this.$refs.observer.reset()

      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        return false
      }

      this.loadingForm = true;

      const data = {
        email: this.email,
        password: this.password
      }

      try {
        const url = 'users/login'
        const res = await this.$http.login(url, data)
        sessionStorage.setItem('token', res.token)
        this.alertType = 'info'
        this.formMessage = 'Login successful.'
        this.formHeader = 'Success!'
        this.formError = true
        this.$router.replace({name: 'home'})
      } catch (error) {
        this.alertType = 'error'
        this.formHeader = 'Problem logging in'
        this.formMessage = this.$http.getErrorMessage(error);
        this.formError = true;
      } finally {
        this.loadingForm = false
      }
    }

    async signUpSocial(type: string) {
      try {
        const url = `users/${type}`
        const res = await this.$http.getRaw(url)
        this.socialLogin = res
        this.modal.state = true
      } catch (error) {
        
      }
    }

    closeModal() {
      this.modal.state = false
      this.socialLogin = ''
    }
  }
</script>

<style>

</style>