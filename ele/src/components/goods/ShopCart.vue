<template>
  <div class="shopcart-wrapper">
    <div class="shopcart">
      <div class="footer-content" @click="togglelist()">
        <div class="content-left">
          <div class="logo-wrapper" ref="logo">
            <div class="logo" :class="{'highlight':nums>0}">
              <i class="icon-shopping_cart"></i>
              <div class="num" v-show="nums>0">{{nums}}</div>
            </div>
          </div>
          <div class="price" :class="{'highlight':nums>0}">¥{{totalPrice}}</div>
          <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="{'enough':totalPrice>=minPrice}">{{payDesc}}</div>
        </div>
      </div>
      <!--运动的小球-->
      <div class="ballWrapper">
        <div v-for="(ball,index) in balls" :key="index">
          <transition name="drop"
                      @before-enter="_beforeEnter"
                      @enter="_enter"
                      @after-enter="_afterEnter"
          >
            <!--外层负责Y轴方向 内层负责X轴-->
            <div class="ball" v-show="ball.show">
              <div class="inner"></div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h2 class="title">购物车</h2>
          <span class="empty" @click="$emit('empty')">清空</span>
        </div>
        <div class="list-conent" ref="linsContent">
          <ul>
            <li class="food boder-1px" v-for="food in shopCartGoods" :key="food.name">
              <span class="name">{{food.name}}</span>
              <div class="price">¥{{food.price}}</div>
              <div class="cartcontrol-wrapper">
                <cart-control :food="food" @decToCart="decToCart" @addToCart="addToCart"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <div class="list-mask" v-show="listShow" @click="togglelist()"></div>
  </div>
</template>

<script>
  import CartControl from './CartControl'
  import IScroll from 'iscroll'
  import Velocity from 'velocity-animate'

  export default {
    props: {
      minPrice: Number,
      deliveryPrice: Number,
      shopCartGoods: Array
    },
    data() {
      return {
        fold: true,
        /* 定义的小球数组 */
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: []
      }
    },
    computed: {
      nums() {
        let num = 0
        this.shopCartGoods.forEach(food => {
          num += food.count
        })
        return num
      },
      totalPrice() {
        let price = 0
        this.shopCartGoods.forEach(food => {
          price += food.count * food.price
        })
        return price
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `¥${this.minPrice}起送`
        } else if (this.totalPrice < this.minPrice) {
          return `还差¥${this.minPrice - this.totalPrice}起送`
        } else {
          return `去结算`
        }
      },
      listShow() {
        if (!this.nums) {
          // eslint-disable-next-line
          this.fold = true
          return false
        }
        let show = !this.fold
        // TODO:这里刷新我们的购物车列表iscroll实例
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              // eslint-disable-next-line
              this.scroll = new IScroll(this.$refs.linsContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    methods: {
      togglelist() {
        if (!this.nums) {
          return
        }
        this.fold = !this.fold
      },
      decToCart(name) {
        this.$emit('decToCart', name)
      },
      addToCart(name) {
        this.$emit('addToCart', name)
      },
      drop(target) {
        if (!target) {
          return
        }
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = target
            this.dropBalls.push(ball)
            return
          }
        }
      },
      _beforeEnter(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (ball.show) {
            // 获取当前元素偏移量
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 22
            let y = -(window.innerHeight - rect.top - 34)
            el.style.webkitTransform = `translateY(${y}px)`
            el.style.transform = `translateY(${y}px)`
            let inner = el.firstElementChild
            inner.style.transform = `translateX(${x}px)`
            inner.style.webkitTransform = `translateX(${x}px)`
          }
        }
      },
      _enter(el, done) {
        // 刷新页面
        // eslint-disable-next-line
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.transform = `translateY(0)`
          el.style.webkitTransform = `translateY(0)`
          let inner = el.firstElementChild
          inner.style.transform = `translateX(0)`
          inner.style.webkitTransform = `translateX(0)`
          el.addEventListener('transitionend', done)
        })
      },
      _afterEnter(el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
        let logo = this.$refs.logo
        Velocity(logo, {scale: '0.7'}, {duration: 120})
        Velocity(logo, {scale: '1'}, {duration: 120})
        Velocity(logo, {scale: '0.9'}, {duration: 120})
        Velocity(logo, {scale: '1'}, {duration: 80})
      }
    },
    components: {
      CartControl
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .shopcart
    position fixed
    height 48px
    bottom 0
    left 0
    width 100%
    z-index 50
    .footer-content
      display flex
      background #141d27
      font-size 0
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -12px
          z-index 55
          padding 6px
          width 56px
          height 56px
          vertical-align top
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            line-height 46px
            border-radius 50%
            text-align center
            font-size 24px
            color rgba(255, 255, 255, 0.4)
            background #2B333B
            &.highlight
              background rgb(0, 160, 220)
              color #fff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 12px
            font-size 9px
            color #fff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price, .desc
          display inline-block
          line-height 24px
          margin 12px
          font-size 12px
          color rgba(255, 255, 255, 0.4)
          @media only screen and (max-width: 320px)
            margin 12px 6px
        .price
          padding-right 12px
          border-right 1px solid rgba(255, 255, 255, 0.1)
          font-size 16px
          font-weight 700
          &.highlight
            color #fff
      .content-right
        flex 0 0 105px
        width 105px
        background #2B333B
        .pay
          padding 0 8px
          height 48px
          line-height 48px
          font-size 14px
          font-weight 700
          text-align center
          color rgba(255, 255, 255, 0.4)
          &.enough
            background #00c850
            color #fff

    .ballWrapper
      .ball
        /*小球落点的位置固定的 起点不唯一,不可以直接使用drop-enter,需要用js动态获取*/
        position fixed
        left 22px
        bottom 26px
        z-index 200
        transition all 0.4s cubic-bezier(0.49, -0.55, 0.75, 0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background rgb(0, 160, 220)
          transition all 0.4s linear

  .shopcart-list
    position absolute
    bottom 0
    left 0
    z-index 45
    width 100%
    transition all 0.5s
    &.fold-enter, &.fold-leave-to
      opacity 0
      transform translateY(100%)
    .list-header
      padding: 0 18px
      height 40px
      background #f3f5f7
      line-height 40px
      border-bottom rgba(7, 17, 27, 0.1)
      .title
        float left
        font-size 14px
        font-weight 200
        color rgb(7, 17, 27)
      .empty
        float right
        font-size 12px
        color rgb(0, 160, 220)
    .list-conent
      padding 0 18px
      max-height 217px
      overflow hidden
      background #fff
      .food
        display flex
        padding 12px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .name
          flex 1
          line-height 24px
          font-size 14px
          color rgb(7, 17, 27)
        .price
          flex 0 0 24px
          width 24px
          margin-left 18px
          line-height 24px
          font-size 14px
          font-weight 700
          color rgb(240, 20, 20)
        .cartcontrol-wrapper
          flex 0 0 72px
          margin-left 12px

  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    background-filter: blur(10px)
    background rgba(7, 17, 27, 0.6)
</style>
