<script setup lang="ts">
defineProps<{ item: any }>()
</script>

<template>
  <div class="top-stocks-item">
    <div class="top-stocks-item__header">
      <span>{{ item.symbol }}</span>
      <span> - {{ item.company_name }}</span>
      <div class="top-stocks-item__header-description">
        {{ item.description }}
      </div>
    </div>
    <div class="top-stocks-item__content">
      <div class="top-stocks-item__content-item">
        <span>Price</span>
        <span>{{ item.price }}</span>
      </div>
      <div class="top-stocks-item__content-item">
        <span>Exchange</span>
        <span>{{ item.exchange }}</span>
      </div>
      <div class="top-stocks-item__content-item">
        <span>Industry</span>
        <span>{{ item.industry }}</span>
      </div>
      <div class="top-stocks-item__content-item">
        <span>CEO</span>
        <span>{{ item.ceo }}</span>
      </div>
      <div class="top-stocks-item__content-item">
        <span>IPO</span>
        <span>{{ item.ipo }}</span>
      </div>
    </div>
  </div>
</template>

<style lang=scss>
.top-stocks-item {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    background-color: #ddf;
    border-radius: 5px;

    &__header {
        font-weight: bold;
    }

    &__header-description {
        font-weight: 400;
        font-size: 14px;
        color: #44a;
    }

    &__content {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

    &__content-item {
        display: flex;
        gap: 4px;

        > span:first-of-type {
            font-weight: 600;
        }
    }
}
</style>