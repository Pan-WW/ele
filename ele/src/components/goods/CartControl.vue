<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-dec icon-remove_circle_outline"
           v-show="food.count > 0"
           @click="$emit('decToCart',food.name)"></div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="add(food.name,$event)"></div>
  </div>
</template>

<script>
  export default {
    props: {
      food: Object
    },
    methods: {
      add(name, event) {
        this.$emit('addToCart', name, event.target)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0
    .cart-dec
      display inline-block
      line-height 24px
      font-size 24px
      color rgb(0, 160, 240)
      transition all 0.4s linear
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(24px) rotate(180deg)
    .cart-count
      display inline-block
      vertical-align top
      width 24px
      line-height 24px
      font-size 10px
      color rgb(147, 153, 159)
      text-align center
    .cart-add
      display inline-block
      line-height 24px
      font-size 24px
      color rgb(0, 160, 240)
</style>
