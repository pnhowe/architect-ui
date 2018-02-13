<template>
  <div>
    <line-chart
      :data="seriesArr"
      :library="libraryProps"
      :min="null"
      :title="graphKey">
    </line-chart>
  </div>
</template>

<script>
import * as charts from '../utils/charts'

export default {
  name: 'plan-complex-graph',
  props: {
    'graphKey': {
      type: String,
      required: true
    },
    'complexes': {
      type: Array,
      required: true
    },
    'library': {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      libraryProps: {}
    }
  },
  computed: {
    seriesArr () {
      const graphArr = charts.pickGraphs(this.complexes, this.graphKey)
      return charts.formatData(graphArr)
    }
  },
  mounted () {
    const libraryObj = Object.assign(charts.lineChartBaseStyle(), this.library)
    this.libraryProps = libraryObj
  }
}
</script>

<style lang="sass">
svg text[text-anchor]
  text-transform: capitalize
</style>
