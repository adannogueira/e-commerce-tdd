<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import { Order } from './domain/Order'

  const products = reactive([
    { idProduct: 1, description: 'A', price: 1000 },
    { idProduct: 2, description: 'B', price: 5000 },
    { idProduct: 3, description: 'C', price: 30 },
  ])

  const order: any = reactive(new Order('987.654.321-00', '29560000'))

  const message = ref('')

  const getProductById = function (idProduct: number) {
    return products.find(product => product.idProduct === idProduct)
  }

  const confirm = async function (order: any) {
    const { data } = await axios.post('http://localhost:3000/checkout', order)
    message.value = 'Success'
    order.code = data.code
    order.total = data.total
  }

  onMounted(async () => {
    const { data } = await axios.get('http://localhost:3000/products')
    products.push(...data)
  })
</script>

<template>
  <div class="title">Checkout</div>
  <div v-for="product in products">
    <span class="product-description">{{ product.description }}</span>
    <span class="product-price">{{ order.formatMoney(product.price) }}</span>
    <button class="product-add-button" @click="order.addItem(product)">add</button>
  </div>
  <div class="total">{{ order.getTotal() }}</div>
  <div v-for="item in order.items">
    <span class="item-description">{{ getProductById(item.idProduct)?.description }}</span>
    <span class="item-quantity">{{ item.quantity }}</span>
    <span class="item-delete-button" @click="order.deleteItem(item.idProduct)">-</span>
    <span class="item-add-button" @click="order.addItem(item)">+</span>
  </div>
  <button class="confirm" @click="confirm(order)">confirm</button>
  <div class="message">{{ message }}</div>
  <div class="order-code">{{ order.code }}</div>
  <div class="order-total">{{ order.total }}</div>
</template>

<style scoped>
</style>
