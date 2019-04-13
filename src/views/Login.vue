<template>
  <div class="bg-pattern min-h-screen">
    <div class="flex flex-col h-screen items-center justify-center">
      <div class="form flex flex-col p-4 px-6">
        <div class="mb-6">
          <h3 class="text-pink mb-4 font-black">
            Create your account
          </h3>

          <p class="text-grey text-xs">
            Enter your personal details and start your journey today.
          </p>
        </div>

        <form class="flex flex-col items-center justify-center w-full" @submit.prevent="signInUser">
          <Validator name="Full Name" rules="required|alpha" class="w-full">
            <div class="mb-5 w-full" slot-scope="{ valid }">
              <label class="block text-grey text-xs font-bold capitalize" for="Full Name">
                Your Full Name
              </label>
              <p class="inline-flex relative border-b w-full">
                <user-icon class="absolute m-auto" :height="5" :width="5" style="margin-top: .5rem;"></user-icon>
                <input
                  class="appearance-none  w-full py-2 pl-6 text-grey-darkest font-semibold focus:outline-none  bg-transparent"
                  id="full_name" type="text" placeholder="Enter Full Name" v-model="fullName" name="Full Name">
                  <input-state class="absolute pin-r m-auto" :height="4" :width="4" style="margin-top: .5rem;" :state="valid" color="pink"></input-state>
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
                <input-state class="absolute pin-r m-auto" :height="4" :width="4" style="margin-top: .5rem;" :state="valid" color="pink"></input-state>
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
                <input-state class="absolute pin-r m-auto" :height="4" :width="4" style="margin-top: .5rem;" :state="valid" color="pink"></input-state>
            </p>
          </div>
          </Validator>

          <div class="mb-5 w-full">
            <input type="submit" value="Sign Up"
              class="bg-pink cursor-pointer hover:bg-pink-dark text-white font-bold py-2 px-4 rounded w-full">
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
            <facebook-icon :height="8" :width="8" class="mx-2"></facebook-icon>
            <twitter-icon :height="8" :width="8" class="mx-2"></twitter-icon>
          </div>

          <p class="mb-5 text-grey-darker text-xs">
            Are you already a user? <router-link :to="{name: 'login'}" class="text-pink-light no-underline">Log in
            </router-link>
          </p>

        </form>
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
      InputState
    }
  })
  export default class Login extends Vue {
    email: string = '';
    fullName: string = '';
    password: string = '';
    errors: Array<any> = [];
    valid: any;

    signInUser(){

    }
  }
</script>

<style>

</style>