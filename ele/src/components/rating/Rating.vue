<template>
  <div class="rating">
    <div class="overview">
      <div class="overview-left">
        <h1 class="score">{{seller.score}}</h1>
        <div class="title">综合评分</div>
        <div class="rank">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="overview-right">
        <div class="score-wrapper">
          <span class="title">服务态度</span>
          <star size="36" :score="seller.serviceScore"/>
          <span class="score">{{seller.serviceScore}}</span>
        </div>
        <div class="score-wrapper">
          <span class="title">商品评分</span>
          <star class="star" size="36" :score="seller.foodScore"/>
          <span class="score">{{seller.foodScore}}</span>
        </div>
        <div class="score-wrapper">
          <span class="title">送达时间</span>
          <span class="delivery">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <split></split>
    <rating-select :ratings="ratings" :selectType.sync="selectType" :onlyContent.sync="onlyContent"/>
    <div class="rating-wrapper">
      <ul>
        <li v-for="(rating,index) in ratings"
            v-show="needShow(rating.rateType,rating.text)"
            class="rating-item"
            :key="index">
          <div class="avatar">
            <img width="28" height="28" :src="rating.avatar"/>
          </div>
          <div class="content">
            <h3 class="name">{{rating.username}}</h3>
            <div class="star-wrapper">
              <star size="24" class="star" :score="rating.score"/>
              <span class="delivery" v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
            </div>
            <p class="text">{{rating.text}}</p>
            <div class="recommend" v-if="rating.recommend && rating.recommend.length">
              <span class="icon"
                    :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
              <span class="item" v-for="item in rating.recommend" :key="item">{{item}}</span>
            </div>
            <div class="time">
              {{rating.rateTime | formdate}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Star from '../star/Star'
  import Split from '../split/Split'
  import RatingSelect from '../ratingselect/RatingSelect'
  import {formDate} from '../../common/js/date'

  const ALL = 2
  //  const POSITIVE = 0
  //  const NEGATIVE = 1
  export default {
    props: {
      seller: Object
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: false
      }
    },
    created() {
      this.$axios('/api/ratings')
        .then(res => {
          res = res.data
          if (res.errno === 0) {
            this.ratings = res.data
          }
        })
    },
    methods: {
      needShow(type, text) {
        if (this.onlyContent && !text) {
          // 勾选了只看有内容的评价,不管你选择全部 还是满意还是不满意,没文本内容的都不展示
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return this.selectType === type
        }
      }
    },
    filters: {
      formdate(time) {
        let date = new Date(time)
        return formDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    components: {
      Star,
      Split,
      RatingSelect
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .rating
    width 100%
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .overview-left
        flex 0 0 137px
        padding 0 12px
        border-right 1px solid rgba(7, 17, 27, 0.1)
        text-align center
        @media only screen and (max-width: 320px)
          flex 0 0 120px
          width 120px
          padding 0 6px
        .score
          margin-bottom 6px
          font-size 24px
          line-height 28px
          color rgb(255, 153, 0)
        .title
          margin-bottom 8px
          font-size 12px
          line-height 12px
          color rgb(7, 17, 27)
        .rank
          margin-bottom 6px
          font-size 10px
          line-height 10px
          color rgb(147, 153, 159)
      .overview-right
        flex 1
        padding 0 24px
        @media only screen and (max-width: 320px)
          padding 0 12px
        .score-wrapper
          margin-bottom 8px
          font-size 0
          .title
            display inline-block
            line-height 18px
            font-size 12px
            color rgb(7, 17, 27)
          .star
            display inline-block
            margin 0 12px
          .score
            display inline-block
            font-size 12px
            line-height 18px
            color rgb(255, 153, 0)
          .delivery
            display inline-block
            margin-left 12px
            font-size 12px
            line-height 18px
            color rgb(147, 153, 159)
    .rating-wrapper
      padding 0 18px
      .rating-item
        display flex
        padding 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex 0 0 28px
          width 28px
          margin-right 12px
          img
            border-radius 50%
        .content
          position relative
          flex 1
          .name
            margin-bottom 4px
            font-size 10px
            line-height 12px
            color rgb(7, 17, 27)
          .star-wrapper
            margin-bottom 6px
            font-size 0
            .star
              display inline-block
              margin-right 6px
              vertical-align top
            .delivery
              display inline-block
              font-size 10px
              line-height 12px
              font-weight 200
              color rgb(147, 153, 159)
          .text
            margin-bottom 8px
            font-size 12px
            line-height 18px
            color rgb(7, 17, 27)
          .recommend
            line-height 16px
            font-size 0
            .icon
              display inline-block
              margin-right 8px
              font-size 12px
              color rgb(0, 160, 220)
            .item
              display inline-block
              padding 0 6px
              margin-right 8px
              font-size 10px
              border 1px solid rgba(7, 17, 27, 0.1)
              border-radius 2px
              color rgb(147, 153, 159)
          .time
            position absolute
            right 0
            top 0
            font-size 10px
            font-weight 200
            line-height 12px
            color rgb(147, 153, 159)
</style>
