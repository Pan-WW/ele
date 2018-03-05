<template>
  <div class="ratingselect">
    <div class="rating-type boder-1px">
      <span class="block positive"
            :class="{'active':selectType===2}"
            @click="changeSelectType(2)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span class="block positive"
            :class="{'active':selectType===0}"
            @click="changeSelectType(0)">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
      <span class="block negative"
            :class="{'active':selectType===1}"
            @click="changeSelectType(1)">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
    </div>
    <div class="switch" :class="{'on':onlyContent}" @click="$emit('update:onlyContent',!onlyContent)">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const ALL = 2
  const POSITIVE = 0
  const NEGATIVE = 1
  export default {
    props: {
      selectType: {
        type: Number,
        default: ALL
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      },
      ratings: {
        type: Array,
        default() {
          return []
        }
      },
      onlyContent: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    computed: {
      positive() {
        return this.ratings.filter(rating => {
          return rating.rateType === POSITIVE
        })
      },
      negative() {
        return this.ratings.filter(rating => {
          return rating.rateType === NEGATIVE
        })
      }
    },
    methods: {
      changeSelectType(type) {
        this.$emit('update:selectType', type)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .rating-type
    padding 18px 0
    margin 0 18px
    border-1px(rgba(7, 17, 27, 0.1))
    font-size 0
    .block
      display inline-block
      padding 8px 12px
      margin-right 8px
      line-height 16px
      border-radius 2px
      font-size 12px
      color rgb(77, 85, 93)
      &.active
        color #fff
      &.positive
        background rgba(0, 160, 220, 0.2)
        &.active
          background rgb(0, 160, 220)
      &.negative
        background rgba(77, 85, 93, 0.2)
        &.active
          background rgb(77, 85, 93)

  .switch
    padding 12px 18px
    line-height 24px
    border-bottom 1px solid rgba(7, 17, 27, 0.1)
    color rgb(147, 153, 159)
    font-size 0
    &.on
      .icon-check_circle
        color #00c850
    .icon-check_circle
      display inline-block
      vertical-align top
      margin-right 4px
      font-size 24px
    .text
      display inline-block
      vertical-align top
      font-size 12px
</style>
