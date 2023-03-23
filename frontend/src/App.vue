<script setup lang="ts">
import { reactive } from 'vue';

  const products = reactive([
    { idProduct: 1, description: 'A', price: 1000 },
    { idProduct: 2, description: 'B', price: 5000 },
    { idProduct: 3, description: 'C', price: 30 },
  ])

  const order = reactive({
    total: 0,
    items: [] as any
  })

  const addItem = function (product: any) {
    const existingItem = order.items.find((item: any) => item.idProduct === product.idProduct)
    if (existingItem) {
      existingItem.quantity++
    } else {
      order.items.push({ idProduct: product.idProduct, price: product.price, quantity: 1 })
    }
  }

  const getTotal = function () {
    const total = order.items.reduce(
      (total: number, item: any) => total + item.price * item.quantity, 0
    )
    return formatMoney(total)
  }

  const formatMoney = function(amount: number) {
    const [integerPart, decimalPart] = amount.toFixed(2).split(".");
    const integerPartWithSeparator = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `R$ ${integerPartWithSeparator},${decimalPart}`;
  }

  const getProductById = function (idProduct: number) {
    return products.find(product => product.idProduct === idProduct)
  }
</script>

<template>
  <div class="title">Checkout</div>
  <div v-for="product in products">
    <span class="product-description">{{ product.description }}</span>
    <span class="product-price">{{ formatMoney(product.price) }}</span>
    <button class="product-add-button" @click="addItem(product)">add</button>
  </div>
  <div class="total">{{ getTotal() }}</div>
  <div v-for="item in order.items">
    <span class="item-description">{{ getProductById(item.idProduct)?.description }}</span>
    <span class="item-quantity">{{ item.quantity }}</span>
  </div>
</template>

<style scoped>
</style>
