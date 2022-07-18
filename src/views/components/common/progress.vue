<template>
  <div class="zhezhao">
    <div class="progress"><el-progress type="circle" :percentage="progressValue"></el-progress></div>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: {
      progressValue: {
        type: Number,
        default: 0
      },
    },
    data() {
      return {
        isOpen: true,
      };
    },
    methods: {
    },
    created() {

    }
  };
</script>

<style lang="scss" scoped>
  .zhezhao {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    .progress {
      background-color: #fff;
    }
  }
</style>
