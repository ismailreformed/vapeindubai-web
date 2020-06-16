<template>
  <div>
    <Cart />
  </div>
</template>
<script>
export default {
  components: {
    Cart: () => import('@/components/Cart.vue')
  }
}
</script>
