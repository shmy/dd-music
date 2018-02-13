<template>
  <scroller>
    <p v-for="n of 100"
       :key="n">
       排行 {{ n }}
    </p>
  </scroller>
</template>
<script>
import Scroller from '@/components/scrollbar'

export default {
  components: {
    Scroller
  },
  data: () => ({
  }),
  methods: {
  }
}
</script>
