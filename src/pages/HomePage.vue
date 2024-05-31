<script lang="ts" setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import TimeSeriesTable from '@/components/TimeSeriesTable.vue'
import { logger } from '@/utils/logger'

type stockDataType = {
  date: string,
  open: string | number,
  high: string | number,
  low: string | number,
  close: string | number,
  volume: string | number,
}

const stockData = ref<stockDataType[]>([])
const stockSymbol = ref<string>('MSFT')
onMounted(async () => {
  try {
    const response = await axios.get('http://jon.allocate.build/msft.json')
    stockData.value = Object.keys(response.data['Monthly Time Series' as string]).map((key) => {
      return {
        date: key,
        open: response.data['Monthly Time Series' as string][key]['1. open'],
        high: response.data['Monthly Time Series' as string][key]['2. high'],
        low: response.data['Monthly Time Series' as string][key]['3. low'],
        close: response.data['Monthly Time Series' as string][key]['4. close'],
        volume: response.data['Monthly Time Series' as string][key]['5. volume'],
      }
    })
  } catch (ex) {
    logger.error(ex.message)
  }
})
</script>

<template>
  <div class="home-container">
    <TimeSeriesTable :items="stockData" :stock-symbol="stockSymbol" />
  </div>
</template>

<style type="scss" scoped>
.home-container {
  margin: 0 auto;
  background-color: white;
  width: 75%;
}
</style>