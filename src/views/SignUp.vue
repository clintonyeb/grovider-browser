<template>
  <div class="bg-pattern min-h-screen">
    <div class="flex flex-col h-screen items-center justify-center">
      <alert class="mt-1" :message="formMessage" v-if="formError" :header="formHeader" :alert_type="alertType" />
      <div class="form flex flex-col p-4 px-6">
        <div class="mb-6">
          <h3 class="text-pink mb-4 font-black">
            Create your account
          </h3>

          <p class="text-grey text-xs">
            Enter your personal details and start your journey today.
          </p>
        </div>

        <ValidationObserver class="w-full" ref="observer">
          <form class="flex flex-col items-center justify-center w-full" @submit.prevent="signInUser"
            slot-scope="{ invalid }" ref="form">
            <Validator name="Full Name" rules="required" class="w-full">
              <div class="mb-5 w-full" slot-scope="{ valid }">
                <label class="block text-grey text-xs font-bold capitalize" for="Full Name">
                  Your Full Name
                </label>
                <p class="inline-flex relative border-b w-full">
                  <user-icon class="absolute m-auto" :height="5" :width="5" style="margin-top: .5rem;"></user-icon>
                  <input
                    class="appearance-none  w-full py-2 pl-6 text-grey-darkest font-semibold focus:outline-none  bg-transparent"
                    id="full_name" type="text" placeholder="Enter Full Name" v-model="fullName" name="Full Name">
                  <input-state class="absolute pin-r m-auto" :height="4" :width="4" style="margin-top: .5rem;"
                    :state="valid" color="pink"></input-state>
                </p>
              </div>
            </Validator>

            <Validator name="Email" rules="required|email" class="w-full">
              <div class="mb-5 w-full" slot-scope="{ valid }">
                <label class="block text-grey text-xs font-bold capitalize" for="Email">
                  Your email
                </label>
                <p class="inline-flex relative border-b w-full">
                  <mail-icon class="absolute m-auto" :height="5" :width="5" style="margin-top: .5rem;"></mail-icon>
                  <input
                    class="appearance-none  w-full py-2 pl-6 text-grey-darkest font-semibold focus:outline-none  bg-transparent"
                    id="email" type="text" placeholder="Enter Email Address" name="Email" v-model="email">
                  <input-state class="absolute pin-r m-auto" :height="4" :width="4" style="margin-top: .5rem;"
                    :state="valid" color="pink"></input-state>
                </p>
              </div>
            </Validator>

            <Validator name="Password" rules="required|min:6" class="w-full">
              <div class="mb-5 w-full" slot-scope="{ valid }">
                <label class="block text-grey text-xs font-bold capitalize" for="Password">
                  Your Password
                </label>
                <p class="inline-flex relative border-b w-full">
                  <password-icon class="absolute m-auto" :height="5" :width="5" style="margin-top: .5rem;">
                  </password-icon>
                  <input
                    class="appearance-none  w-full py-2 pl-6 text-grey-darkest font-semibold focus:outline-none bg-transparent"
                    id="password" type="password" placeholder="Enter Password" name="Password" v-model="password">
                  <input-state class="absolute pin-r m-auto" :height="4" :width="4" style="margin-top: .5rem;"
                    :state="valid" color="pink"></input-state>
                </p>
              </div>
            </Validator>

            <div class="mb-5 w-full relative">
              <input type="submit" :value="loadingForm ? '' : 'Sign Up'"
                class="bg-pink cursor-pointer hover:bg-pink-dark text-white font-bold py-2 px-4 rounded w-full"
                :disabled="invalid">
              <spinner v-if="loadingForm" />
            </div>

            <div class="mb-5 w-full">
              <p class="is-dashed text-grey text-xs">
                <span>or</span>
              </p>
            </div>

            <p class="mb-5 text-grey-darker text-xs">
              Sign up with
            </p>

            <div class="inline-flex w-1/3 mb-5">
              <facebook-icon :height="8" :width="8" class="mx-2 cursor-pointer"
                @click.native="signUpSocial('facebook')"></facebook-icon>
              <twitter-icon :height="8" :width="8" class="mx-2 cursor-pointer" @click.native="signUpSocial('twitter')">
              </twitter-icon>
            </div>

            <p class="mb-5 text-grey-darker text-xs">
              Are you already a user? <router-link :to="{name: 'login'}" class="text-pink-light">Log in
              </router-link>
            </p>

          </form>
        </ValidationObserver>
      </div>
    </div>

    <div class="" v-if="modal.state" style="animation-duration: 500ms;">
      <div class="bg-black fixed h-full w-full pin-t pin-l opacity-25"></div>
      <div class="bg-white rounded p-1 fixed shadow-lg z-20"
        style="top: 50%; left: 50%; transform: translate(-50%, -50%);" @keyup.esc.stop="closeModal">
        <!-- <div class="background-tint fixed w-full h-full bg-black"></div> -->
        <svg class="cursor-pointer fill-current h-5 w-5 text-blue-light float-right mr-2" role="button"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" @click="closeModal">
          <title>Close</title>
          <path
            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z">
          </path>
        </svg>

        <div v-html="socialLogin"></div>

      </div>
    </div>


  </div>
</template>

<script lang="ts">
  import MailIcon from "@/icons/Mail.vue"
  import UserIcon from "@/icons/User.vue"
  import PasswordIcon from "@/icons/Password.vue"
  import TwitterIcon from "@/icons/Twitter.vue"
  import FacebookIcon from "@/icons/Facebook.vue"
  import InputState from "@/components/InputState.vue"
  import Alert from "@/components/Alert.vue"

  import {
    Component,
    Vue
  } from "vue-property-decorator";

  @Component({
    components: {
      MailIcon,
      UserIcon,
      PasswordIcon,
      TwitterIcon,
      FacebookIcon,
      InputState,
      Alert
    }
  })
  export default class Login extends Vue {
    email: string = '';
    fullName: string = '';
    password: string = '';
    valid: any;
    loadingForm: boolean = false;
    formError = false;
    formMessage: string = '';
    formHeader = 'Problem creating account.';
    modal = {
      state: false
    };
    socialLogin = '';
    alertType = 'error';

    async signInUser() {
      if (this.loadingForm) return false

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
        full_name: this.fullName,
        password: this.password
      }

      try {
        const url = 'users'
        const res = await this.$http.post(url, data)
        this.alertType = 'info'
        this.formMessage = 'Account created successfully.'
        this.formHeader = 'Success!'
        this.formError = true
        this.$router.replace({
          name: 'login'
        })
      } catch (error) {
        this.alertType = 'error'
        this.formMessage = this.$http.getErrorMessage(error);
        this.formHeader = 'Problem creating account.'
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