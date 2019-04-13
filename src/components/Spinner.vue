<template>
  <div class="spinner">
    <div class="blob top"></div>
    <div class="blob bottom"></div>
    <div class="blob left"></div>
    <div class="blob move-blob"></div>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
  } from "vue-property-decorator";

  @Component
  export default class Spinner extends Vue {}
</script>

<style lang="scss">
  @mixin transform($property) {
    -webkit-transform: $property;
    -ms-transform: $property;
    transform: $property;
  }

  .spinner {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 50%;
    left: 50%;

    @include transform(translate(-50%, -50%));

    .blob {
      position: absolute;
      top: 50%;
      left: 50%;
      @include transform(translate(-50%, -50%));
      border: 2px solid #fff;

      width: 10px;
      height: 10px;
      border-radius: 50%;

      &.top {
        top: 0;
        animation: blob-top 1s infinite ease-in;
      }

      &.bottom {
        top: 100%;
        animation: blob-bottom 1s infinite ease-in;
      }

      &.left {
        left: 0;
        animation: blob-left 1s infinite ease-in;
      }
    }

    .move-blob {
      background: #fff;
      top: 0;

      animation: blob-spinner-mover 1s infinite ease-in;
    }
  }

  @keyframes blob-bottom {

    25%,
    50%,
    75% {
      top: 50%;
      left: 100%;
    }

    100% {
      top: 0;
      left: 50%;
    }
  }

  @keyframes blob-left {
    25% {
      top: 50%;
      left: 0;
    }

    50%,
    100% {
      top: 100%;
      left: 50%;
    }
  }

  @keyframes blob-top {
    50% {
      top: 0;
      left: 50%;
    }

    75%,
    100% {
      top: 50%;
      left: 0;
    }
  }

  @keyframes blob-spinner-mover {

    0%,
    100% {
      top: 0;
      left: 50%;
    }

    25% {
      top: 50%;
      left: 100%;
    }

    50% {
      top: 100%;
      left: 50%;
    }

    75% {
      top: 50%;
      left: 0;
    }
  }
</style>