<template>
  <div id="app">
    <ele-header :seller="seller"/>
    <div class="tab boder-1px">
      <div class="tab-item">
        <router-link to="goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller" ></router-view>
  </div>
</template>

<script>
  import EleHeader from './components/header/Header'

  export default {
    name: 'App',
    data() {
      return {
        seller: {}
      }
    },
    components: {
      EleHeader
    },
    created() {
      this.$axios.get('/api/seller')
        .then((res) => {
          res = res.data
          if (res.errno === 0) {
            this.seller = res.data
          }
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  @import "./common/stylus/mixin.styl"

  #app
    .tab
      display flex
      width 100%
      height 40px
      line-height 40px
      /*border-bottom 1px solid rgba(7, 17, 27, 0.1)*/
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex 1
        text-align center
        & > a
          display block
          font-size 14px
          color rgb(77, 85, 93)
          &.active
            color rgb(240, 20, 20)
</style>
