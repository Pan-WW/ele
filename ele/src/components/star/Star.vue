<template>
  <div class="star" :class="starType">
    <span v-for="(item,index) in itemClass" :class="item" class="star-item" :key="index"></span>
  </div>
</template>

<script>
  const LENGTH = 5
  const S_HALF = 'half'
  const S_OFF = 'off'
  const S_ON = 'on'

  export default {
    props: {
      size: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        required: true
      }
    },
    data() {
      return {}
    },
    computed: {
      starType() {
        return 'star-' + this.size
      },
      itemClass() {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let integer = Math.floor(score)
        let hasHalfStar = (score % 1 !== 0)
        for (let i = 0; i < integer; i++) {
          result.push(S_ON)
        }
        if (hasHalfStar) {
          result.push(S_HALF)
        }
        while (result.length < LENGTH) {
          result.push(S_OFF)
        }
        return result
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .star
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 20px
        background-size 20px 20px
        &:last-child
          margin-right 0
        &.on
          bg-image('../../common/img/star48_on')
        &.half
          bg-image('../../common/img/star48_half')
        &.off
          bg-image('../../common/img/star48_off')
    &.star-36
      .star-item
        width 14px
        height 14px
        margin-right 6px
        background-size 14px 14px
        &:last-child
          margin-right 0
        &.on
          bg-image('../../common/img/star36_on')
        &.half
          bg-image('../../common/img/star36_half')
        &.off
          bg-image('../../common/img/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &.on
          bg-image('../../common/img/star24_on')
        &.half
          bg-image('../../common/img/star24_half')
        &.off
          bg-image('../../common/img/star24_off')
</style>
