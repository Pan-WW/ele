<template>
  <div>
    <div class="detail-wrapper clearfix">
      <div class="detail-main">
        <h1 class="name">{{seller.name}}</h1>
        <div class="star-wrapper">
          <star size="48" v-if="seller.score" :score="seller.score"/>
        </div>
        <div class="title" v-if="seller.supports">
          <div class="line"></div>
          <div class="text">优惠信息</div>
          <div class="line"></div>
        </div>
        <ul v-if="seller.supports" class="support">
          <li class="support-item" v-for="item in seller.supports" :key="item.type">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
        <div class="title">
          <div class="line"></div>
          <div class="text">商家公告</div>
          <div class="line"></div>
        </div>
        <div class="bulletin">
          <p class="content">{{seller.bulletin}}</p>
        </div>
      </div>
    </div>
    <div class="detail-close" @click="$emit('update:show',false)">
      <i class="icon-close"></i>
    </div>
  </div>
</template>

<script>
  import Star from '../star/Star'

  export default {
    props: {
      seller: Object,
      classMap: Array
    },
    components: {
      Star
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .detail-wrapper
    width 100%
    min-height 100%
    .detail-main
      margin-top 64px
      padding-bottom 64px
      .name
        line-height 16px
        font-size 16px
        font-weight 700
        text-align center
      .star-wrapper
        margin-top 16px
        text-align center
      .title
        display flex
        width 100%
        margin 28px 0 24px
        padding 0 36px
        .line
          flex 1
          position relative
          top -6px
          border-bottom 2px solid rgba(255, 255, 255, 0.2)
        .text
          padding 0 12px
          line-height 14px
          font-weight 700
          font-size 14px
      .support
        width 100%
        padding 0 48px
        .support-item
          margin-bottom 12px
          font-size 0
          .icon
            display inline-block
            width 16px
            height 16px
            vertical-align top
            margin-right 6px
            background-size 16px 16px
            background-repeat no-repeat
            &.decrease
              bg-image('../../common/img/decrease_2')
            &.discount
              bg-image('../../common/img/discount_2')
            &.special
              bg-image('../../common/img/special_2')
            &.invoice
              bg-image('../../common/img/invoice_2')
            &.guarantee
              bg-image('../../common/img/guarantee_2')
          .text
            font-size 12px
            font-weight 200
            line-height 12px
      .bulletin
        width 100%
        padding 0 48px
        .content
          line-height 24px
          font-size 12px
          font-weight 200

  .detail-close
    position relative
    width 32px
    height 32px
    margin -64px auto 0
    clear both
    font-size 32px

</style>
