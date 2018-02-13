<template>
  <scroller tag="ul" load-text="fuck">
    <li v-for="n of 100"
       :key="n">
       歌手 {{ n }}
    </li>
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
