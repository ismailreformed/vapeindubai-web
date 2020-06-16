export default {
  pushInCart (context, payload) {
    return this.$axios.post('attachment', payload)
      .then((response) => {
        return response
      })
  }
}
