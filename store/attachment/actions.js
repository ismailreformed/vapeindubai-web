export default {
  storeAttachment (context, payload) {
    return this.$axios.post('attachment', payload)
      .then((response) => {
        return response
      })
  },
  getAttachments (context, payload) {
    return this.$axios.get('attachment')
      .then((response) => {
        return response
      })
  }
}
