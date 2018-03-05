<template>
  <div class="support">
    <ul ref="suppots">
      <li v-for="(item,index) in support.concat([support[0]])" :key="index">
        <span class="icon" :class="classMap[item.type]"></span>
        <span class="text">{{item.description}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      support: Array,
      classMap: Array
    },
    data() {
      return {
        index: 0,
        timer: 0
      }
    },
    mounted() {
      if (this.support.length > 1) {
        this.startHeaderTransition()
      }
    },
    methods: {
      startHeaderTransition() {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          this.index++
          this.addTransition()
          this.setTranslate()
        }, 1500)
        this.transitionEnd()
      },
      transitionEnd() {
        let ul = this.$refs.suppots
        ul.addEventListener('transitionEnd', () => {
          if (this.index >= this.support.length) {
            this.index = 0
            this.removeTransition()
            this.setTranslate()
          }
        })
        ul.addEventListener('webkitTransitionEnd', () => {
          if (this.index >= this.support.length) {
            this.index = 0
            this.removeTransition()
            this.setTranslate()
          }
        })
      },
      setTranslate() {
        let ul = this.$refs.suppots
        let offset = -this.index * 16
        ul.style.transform = `translateY(${offset}px)`
      },
      addTransition() {
        let ul = this.$refs.suppots
        ul.style.transition = 'all 0.5s'
        ul.style.webkitTransition = 'all 0.5s'
      },
      removeTransition() {
        let ul = this.$refs.suppots
        ul.style.transition = 'none'
        ul.style.webkitTransition = 'none'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .support
    margin-bottom 2px
    height 12px
    overflow hidden
    li
      margin-bottom 4px
      &:last-child
        margin-bottom 0
    .icon
      display inline-block
      width 12px
      height 12px
      vertical-align top
      margin-right 4px
      background-size 12px 12px
      background-repeat no-repeat
      &.decrease
        bg-image('../../common/img/decrease_1')
      &.discount
        bg-image('../../common/img/discount_1')
      &.special
        bg-image('../../common/img/special_1')
      &.invoice
        bg-image('../../common/img/invoice_1')
      &.guarantee
        bg-image('../../common/img/guarantee_1')
    .text
      display inline-block
      line-height 12px
      font-size 10px
      @media only screen and (max-width: 375px)
        width 160px
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
</style>
