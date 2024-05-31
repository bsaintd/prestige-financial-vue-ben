<script setup lang="ts">
defineProps<{
  items: {
    date: string,
    open: string | number,
    high: string | number,
    low: string | number,
    close: string | number,
    volume: string | number,
  }[],
  stockSymbol: string,
}>()
</script>

<template>
  <h1 class="stock-title-header">
    <img :src="`https://financialmodelingprep.com/image-stock/${stockSymbol}.png`" alt="Symbol Logo Image" class="stock-symbol">
    {{ stockSymbol }} Historical Prices
  </h1>
  <table class="time-series-table">
    <thead>
      <tr>
        <th>Symbol</th>
        <th>Date</th>
        <th>Open</th>
        <th>High</th>
        <th>Low</th>
        <th>Close</th>
        <th>Volume</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.date">
        <td />
        <td>{{ item.date }}</td>
        <td>{{ item.open }}</td>
        <td>{{ item.high }}</td>
        <td>{{ item.low }}</td>
        <td>{{ item.close }}</td>
        <td>{{ item.volume }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
.stock-title-header {
  display: flex;
  align-items: center;
  justify-content: center;

  .stock-symbol {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
}
.time-series-table {
    th, td {
        padding: 2px 40px 2px 0;
    }

    td {
      padding-top:2px;
      padding-bottom:2px;
    }
}
</style>