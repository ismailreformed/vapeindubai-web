export default {
  addToCart (state, product) {
    // mutate state
    state.selectedItems.push(product)
  }
}
