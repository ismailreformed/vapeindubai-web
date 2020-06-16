<template>
  <div style="margin-top:100px;">
    <CategoryProducts />
    <v-divider />
    <VapeLists />
  </div>
</template>
<script>
export default {
  components: {
    CategoryProducts: () => import('@/components/CategoryProducts.vue'),
    VapeLists: () => import('@/components/VapeLists.vue')
  }
}
</script>
