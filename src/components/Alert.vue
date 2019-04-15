<template>
  <div :class="`bg-${color}-lightest border border-${color}-light text-${color}-dark px-4 py-3 rounded relative w-full`" role="alert">
    <strong class="font-bold text-sm">{{header}}</strong>
    <span class="block sm:inline text-xs mt-1">{{message}}</span>
    <span class="absolute pin-t pin-b pin-r px-4 py-3">
      <svg :class="`fill-current h-4 w-4 text-${color}`" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <title>Close</title>
        <path
          d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
      </svg>
    </span>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
    Prop
  } from "vue-property-decorator";

  @Component({
    computed: {
      color(){
        return getMessageColor(this.alert_type)
      }
    }
  })
  export default class Alert extends Vue {
    @Prop({
      type: String,
      required: true
    })
    message!: string;

    @Prop({
      type: String,
      required: false,
      default: 'Error processing request'
    })
    header!: string;

    @Prop({
      type: String,
      required: false,
      default: 'error'
    })
    alert_type!: string;

  }

  function getMessageColor(type: string) {
    switch (type) {
      case 'error':
        return 'red'
      case 'info':
        return 'blue'
      default:
        break;
    }
  }
</script>