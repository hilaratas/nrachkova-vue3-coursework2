export default {
  emits: ['editBlock', 'removeBlock'],
  props: {
    content: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  }
}
