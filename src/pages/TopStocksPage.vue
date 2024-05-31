<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { getTopStocks, topStocksDataType } from '@/api/getTopStocks'
import TopStocksItem from '@/components/TopStocksItem.vue'
import TopStocksSummaryItem from '@/components/TopStocksSummaryItem.vue'

const topStocks = ref<topStocksDataType[]>([])
const minPriceFilter = ref(0)

function getKeySum(key: string): number {
  return topStocks.value.reduce((acc, cur) => {
    if (typeof cur[key] !== 'number') {
      return acc
    }
    return acc + cur[key]
  }, 0)
}

function getOldestAndNewestIPOs(): number[] {
  const stocksSorted = topStocks.value.toSorted((a, b) => {
    const firstIpo = new Date(a.ipo)
    const secondIpo = new Date(b.ipo)
    return firstIpo.getTime() - secondIpo.getTime()
  })

  const first = parseInt(stocksSorted[0]?.ipo)
  const last = parseInt(stocksSorted[stocksSorted.length - 1]?.ipo)
  return [first, last]
}

onBeforeMount(() => {
  getTopStocks().then(res => {
    topStocks.value = res
  })
})
</script>

<template>
  <div class="top-stocks-page">
    <div class="top-stocks-page__filters">
      <div class="top-stocks-page__filters-header">
        <div class="top-stocks-page__filters-header-title">
          Filters
        </div>
        <div class="top-stocks-page__filters-header-description">
          Filters apply to summary items and list
        </div>
      </div>
      <div class="top-stocks-page__filters-input">
        <label for="min-price">Min Price</label>
        <input id="min-price" v-model="minPriceFilter" type="number">
      </div>
    </div>
    <div class="top-stocks-page__summary">
      <TopStocksSummaryItem label="Total Volume" value-prepend="" :value="getKeySum('volume')" />
      <TopStocksSummaryItem label="Total Market Cap" value-prepend="$" :value="getKeySum('market_cap')" />
      <TopStocksSummaryItem label="Average Stock Price" value-prepend="$" :value="getKeySum('price') / topStocks?.length" />
      <TopStocksSummaryItem label="Oldest IPO" value-prepend="" :value="getOldestAndNewestIPOs()[0]" />
      <TopStocksSummaryItem label="Newest IPO" value-prepend="" :value="getOldestAndNewestIPOs()[1]" />
    </div>
    <div class="top-stocks-page__items">
      <TopStocksItem v-for="stock in topStocks.filter((stock) => stock.price > minPriceFilter)" :item="stock" />
    </div>
  </div>
</template>

<style lang="scss">
.top-stocks-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  margin: 10px;
  background-color: #eef;
  border-radius: 5px;

  &__filters {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 12px;
  }

  &__filters-header {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
  }

  &__filters-header-title {
    font-size: 1.5rem;
  }

  &__filters-input {
    display: flex;
    flex-direction: column;
    gap: 4px;

    > label {
      font-weight: 600;
    }
  }

  &__summary {
    display: flex;
    justify-content: space-between;
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
}
</style>