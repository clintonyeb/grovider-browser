<script lang="ts">
  import {
    Component,
    Vue,
    Prop
  } from "vue-property-decorator";

  @Component({})
  export default class Icon extends Vue {
    @Prop({
      type: String,
      default: 'grey-dark'
    })
    color!: string;
    @Prop({
      default: '5',
      type: Number
    })
    height!: string;
    @Prop({
      default: '5',
      type: Number
    })
    width!: string;

  }
</script>