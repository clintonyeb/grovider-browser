<template>
  <p>
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
      y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"
      class="fill-current m-auto" :class="`text-${color} h-${height} w-${width}`" v-if="state === true">
      <g>
        <g>
          <path d="M437.019,74.98C388.667,26.629,324.38,0,256,0C187.619,0,123.332,26.629,74.98,74.98C26.629,123.332,0,187.62,0,256
			s26.629,132.667,74.98,181.019C123.332,485.371,187.62,512,256,512s132.667-26.629,181.019-74.98
			C485.371,388.667,512,324.38,512,256S485.371,123.333,437.019,74.98z M378.306,195.073L235.241,338.139
			c-2.929,2.929-6.768,4.393-10.606,4.393c-3.839,0-7.678-1.464-10.607-4.393l-80.334-80.333c-5.858-5.857-5.858-15.354,0-21.213
			c5.857-5.858,15.355-5.858,21.213,0l69.728,69.727l132.458-132.46c5.857-5.858,15.355-5.858,21.213,0
			C384.164,179.718,384.164,189.215,378.306,195.073z" />
        </g>
      </g>
    </svg>

    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
      y="0px" viewBox="0 0 230 230" style="enable-background:new 0 0 230 230;" xml:space="preserve" v-if="state === false"
      class="fill-current m-auto" :class="`text-${color} h-${height} w-${width}`">
      <path d="M115,230c63.411,0,115-51.589,115-115S178.411,0,115,0S0,51.589,0,115S51.589,230,115,230z M115,190
	c-13.428,0-26.031-3.564-36.945-9.77L115,143.284l36.945,36.945C141.031,186.436,128.428,190,115,190z M190,115
	c0,13.428-3.565,26.031-9.771,36.945L143.284,115l36.945-36.945C186.435,88.969,190,101.572,190,115z M115,40
	c13.428,0,26.031,3.564,36.945,9.771L115,86.716L78.055,49.771C88.969,43.564,101.572,40,115,40z M49.77,78.055L86.716,115
	L49.77,151.945C43.564,141.031,40,128.428,40,115S43.564,88.969,49.77,78.055z" />
    </svg>
  </p>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
    Prop,
    Watch
  } from "vue-property-decorator";
  import IconMixin from "@/icons/icon.vue"

  @Component({
    mixins: [
      IconMixin
    ]
  })
  export default class Mail extends Vue {
    @Prop({
      required: true,
      // type: Number
    })
    state!: any;
  }
</script>