<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="desc">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <support-slide v-if="seller.supports" :classMap="classMap" :support="seller.supports"/>
        <div v-if="seller.supports" class="support-count" @click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div class="bulletin" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%"/>
    </div>
    <transition name="fade">
      <detail-view
        class="detail"
        :classMap="classMap"
        :seller="seller"
        v-show="detailShow"
        :show.sync="detailShow"
      />
    </transition>
  </div>
</template>

<script>
  import SupportSlide from './SupportSlide'
  import DetailView from './DetailView'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true
      }
    },
    components: {
      SupportSlide,
      DetailView
    }
  }
</script>

<!--lang="stylus" 让我们的代码使用stylus 语法 -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .header
    position relative
    overflow hidden
    color #fff
    background rgba(7, 17, 27.0 .5)
    .content-wrapper
      position relative
      padding 24px 12px 18px 24px
      font-size 0
      @media only screen and (max-width: 320px)
        padding 24px 8px 18px 14px
      .avatar
        display inline-block
        vertical-align top
        img
          border-radius 4px
      .content
        display inline-block
        margin-left 16px
        @media only screen and (max-width: 320px)
          margin-left 6px
        .title
          margin 2px 0 8px
          .brand
            display inline-block
            width 30px
            height 18px
            vertical-align top
            bg-image('../../common/img/brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            margin-left 6px
            line-height 18px
            font-size 16px
            font-weight bold
        .desc
          margin-bottom 10px
          line-height 12px
          font-size 12px
          font-weight 200
        .support-count
          position absolute
          right 12px
          bottom 14px
          padding 0 8px
          height 24px
          text-align center
          border-radius 12px
          background rgba(0, 0, 0, 0.2)
          .count
            vertical-align top
            font-size 10px
            line-height 24px
          .icon-keyboard_arrow_right
            margin-left 2px
            font-size 10px
            line-height 24px

    .bulletin
      display flex
      box-sizing border-box
      padding 0 12px
      width 100%
      height 28px
      line-height 28px
      font-size 0
      background rgba(7, 17, 27, 0.2)
      .bulletin-title
        flex 0 0 22px
        display inline-block
        width 22px
        height 28px
        bg-image('../../common/img/bulletin')
        background-size 22px 12px
        background-repeat no-repeat
        background-position center center
      .bulletin-text
        flex 0 1 auto
        display inline-block
        height 28px
        line-height 28px
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        vertical-align top
        font-size 10px
        margin 0 4px
      .icon-keyboard_arrow_right
        flex 0 0 10px
        display inline-block
        height 28px
        line-height 28px
        font-size 10px
    .background
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
    .detail
      position: fixed
      z-index 100
      top 0
      left 0
      height 100%
      width 100%
      overflow auto;
      transition all 0.5s
      background rgba(7,17,27,0.8)
      backdrop-filter blur(10px)
      &.fade-enter, &.fade-leave-to {
        opacity 0
      }
</style>
