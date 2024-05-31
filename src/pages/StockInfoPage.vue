<script lang="ts" setup>
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
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
const stockDataError = ref<boolean>(false)
const stockDataErrorMsg = ref<string>('')
const stockSymbol = ref<string>('MSFT')
const stockApiBenKey = 'INSERT APLHA VANTAGE API KEY HERE'
const stockQuery = 'TIME_SERIES_MONTHLY'
const stocksApiUrl = `https://www.alphavantage.co/query?function=${stockQuery}&symbol=${stockSymbol}&apikey=${stockApiBenKey}`
// const dummyApiForMSFT = 'http://jon.allocate.build/msft.json'
const route = useRoute()
const stockSymbolFromURLPath = computed((): string => {
  return route.path.split('/')[2].toUpperCase() as string
})
onMounted(async () => {
  if (stockSymbolFromURLPath.value.length > 0) {
    stockSymbol.value = stockSymbolFromURLPath.value
  }
  try {
    const response = await axios.get(stocksApiUrl)
    // const response = await axios.get(dummyApiForMSFT)
    console.log(response)
    if (response.status !== 200) {
      stockDataError.value = true
      stockDataErrorMsg.value = 'Error fetching data'
    } else if (response.data['Error Message']) {
      stockDataError.value = true
      stockDataErrorMsg.value = response.data['Error Message']
    } else if (response.data.Information) {
      stockDataError.value = true
      stockDataErrorMsg.value = response.data.Information
    } else if (response.data['Monthly Time Series']) {
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
    }
  } catch (ex) {
    logger.error(ex.message)
    stockDataError.value = true
    stockDataErrorMsg.value = ex.message
  }
})
</script>

<template>
  <div class="stock-info-container">
    <div v-if="stockDataError" class="error-display">
      <h1>Stock Info Page Loading Error</h1>
      <p>{{ stockDataErrorMsg }}</p>
    </div>
    <TimeSeriesTable v-else :items="stockData" :stock-symbol="stockSymbol" />
  </div>
</template>

<style type="scss" scoped>
.stock-info-container {
  background-color: white;
  width: 75%;

  .error-display {
    text-align: center;
  }
}
</style>