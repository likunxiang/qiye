<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default  {
  name:  'App',
    metaInfo() {
        return {
            title: this.$store.state.settings.dynamicTitle && this.$store.state.settings.title,
            titleTemplate: title => {
                return title ? `${title} - ${process.env.VUE_APP_TITLE}` : process.env.VUE_APP_TITLE
            }
        }
    }
}
</script>

<style lang="scss">
  .flex {
    display: flex;
  }
  .jsb{
    justify-content: space-between;
  }
  .flex-center {
    align-items: center;
  }
  .flex1 {
    flex: 1;
  }
  .bold {
    font-weight: bold;
  }
  .pl10 {
    padding-left: 10px;
  }
  .pb20 {
    padding-bottom: 20px;
  }
  .ptb {
    padding: 10px 0;
  }
  .ml10 {
    margin-left: 10px;
  }
  .mt20 {
    margin-top: 20px;
  }

  .pageBox {
    height: 48px;
    .pageMain {
      position: absolute;
      bottom: 20px;
      left: 20px;
    }

  }

  .el-dialog__body {
    padding: 0 20px;
  }
  .el-dialog__footer {
    text-align: center;
  }
  .non-image {
    width: 100px;
    height: 100px;
    justify-content: center;
    background-color: #F5F7FA;
  }
  // .el-input {
  //   width: 260px !important;
  // }
  // .el-input--suffix .el-input__inner {
  //   padding-right: 60px !important;
  // }
</style>
