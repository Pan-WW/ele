<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods"
            :class="{current: currentIndex === index}"
            class="menu-item"
            @click="selectMenu(index)"
            :key="item.name">
          <span class="text boder-1px">
            <span class="icon" :class="classMap[item.type]" v-show="item.type>=0"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" ref="goodsWrapper">
      <ul>
        <li v-for="item in goods" ref="foodList" class="food-list" :key="item.name">
          <h2 class="title">{{item.name}}</h2>
          <ul>
            <li v-for="food in item.foods" class="food-item" :key="food.name">
              <div class="icon">
                <img :src="food.icon" width="57" height="57"/>
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}％</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span><span v-show="food.oldPrice"
                                                                class="old">¥{{food.oldPrice}}</span>
                </div>
              </div>
              <div class="cartcontrol-wrapper">
                <cart-control @decToCart="decToCart" @addToCart="addToCart"
                              :food="findCurrentFood(food.name)"></cart-control>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart ref="shopcart"
               :shop-cart-goods="shopCartGoods"
               :min-price="seller.minPrice"
               :delivery-price="seller.deliveryPrice"
               @decToCart="decToCart"
               @addToCart="addToCart"
               @empty="empty">
    </shop-cart>
  </div>
</template>

<script>
  import IScroll from 'iscroll/build/iscroll-probe'
  import ShopCart from './ShopCart'
  import CartControl from './CartControl'

  export default {
    created() {
      this.$axios.get('/api/goods')
        .then(res => {
          res = res.data
          if (res.errno === 0) {
            this.goods = res.data
//            The iScroll needs to be initiated when the DOM is ready
//            保证需要用到iscroll的element内容必须加载完毕
            this.$nextTick(() => {
              this._initScroll()
              this._calculateHeight()
            })
          }
        })
        .catch(err => {
          alert(err)
        })
    },
    props: {
      seller: Object
    },
    data() {
      return {
        goods: [],
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        listHeight: [],
        scrollY: 0,
        shopCartGoods: []
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length - 1; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (this.scrollY >= height1 && this.scrollY < height2) {
            return i
          }
        }
        return 0
      }
    },
    methods: {
      _initScroll() {
        this.menuWrapper = new IScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.goodsWrapper = new IScroll(this.$refs.goodsWrapper, {
          click: true,
          probeType: 3
        })
        let self = this
        this.goodsWrapper.on('scroll', function () {
          self.scrollY = Math.abs(Math.round(this.y))
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodList
        let height = 0
        this.listHeight.push(height)
        foodList.forEach(food => {
          height += food.clientHeight
          this.listHeight.push(height)
        })
      },
      selectMenu(index) {
        let height = this.listHeight[index]
        this.goodsWrapper.scrollTo(0, -height, 500)
      },
      findCurrentFood(name) {
        let food = this.shopCartGoods.find(f => f.name === name)
        if (!food) {
          food = {name, count: 0}
        }
        return food
      },
      addToCart(name, target) {
        // 先判断购物车是否已经拥有该商品
        let good = this.shopCartGoods.find(g => g.name === name)
        if (!good) {
          let p
          for (let i = 0; i < this.goods.length; i++) {
            let foods = this.goods[i].foods
            for (let j = 0; j < foods.length; j++) {
              if (foods[j].name === name) {
                p = foods[j]
                break
              }
            }
          }
          good = Object.assign({}, p, {count: 1})
          this.shopCartGoods.push(good)
        } else {
          good.count += 1
        }
        this._drop(target)
      },
      _drop(target) {
        // 通过ref获取DOM时,如果获取的是子组件,可以直接通过子组件调用起方法及属性
        this.$refs.shopcart.drop(target)
      },
      decToCart(name) {
        let good = this.shopCartGoods.find(g => g.name === name)
        if (good.count <= 1) {
          // 直接将商品删除
          let index = this.shopCartGoods.indexOf(good)
          this.shopCartGoods.splice(index, 1)
        } else {
          good.count--
        }
      },
      empty() {
        this.shopCartGoods.splice(0, this.shopCartGoods.length)
      }
    },
    components: {
      ShopCart,
      CartControl
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      height 100%
      background #f3f5f7
      .menu-item
        position relative
        display table
        padding 0 12px
        box-sizing content-box
        height 54px
        width 56px
        line-height 14px
        &.current
          position relative
          z-index 10
          top -1px
          background #fff
          color rgb(7, 17, 27)
          font-weight 700
          .text
            border-none()
        .icon
          display inline-block
          width 12px
          height 12px
          vertical-align top
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('../../common/img/decrease_3')
          &.discount
            bg-image('../../common/img/discount_3')
          &.special
            bg-image('../../common/img/special_3')
          &.invoice
            bg-image('../../common/img/invoice_3')
          &.guarantee
            bg-image('../../common/img/guarantee_3')
        .text
          display table-cell
          vertical-align middle
          width 56px
          font-size 12px
          color rgb(77, 85, 93)
          border-1px(rgba(7, 17, 27, 0.1))
    .goods-wrapper
      flex 1
      height 100%
      .title
        padding-left 14px
        height 26px
        line-height 26px
        font-size 12px
        color rgb(147, 153, 159)
        border-left 2px solid #d9dde1
        background #f3f5f7
      .food-item
        position relative
        display flex
        margin 0 18px
        padding 18px 0
        font-size 0
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
        .icon
          flex 0 0 57px
          margin-right 10px
          @media only screen and (max-width: 320px)
            margin-right 5px
        .content
          flex 1
          .name
            margin 2px 0 8px
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
          .desc, .extra
            margin-bottom 8px
            font-size 10px
            line-height 10px
            color rgb(147, 153, 159)
          .extra .sell-count
            margin-right 12px
          .price
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240, 20, 20)
              font-weight 700
            .old
              font-size 10px
              color rgb(147, 153, 159)
              font-weight 700
              text-decoration line-through
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 12px
</style>
