<template>
  <div class="filters__block">
    <p>Фильтры</p>
    <div class="filters__block__search">
      <label for="filter_id">ID</label>
      <input
        v-model="idLine"
        v-on:input="filter"
        id="filter_id"
        name="filter"
        type="text" placeholder="Введите значение">
      <label for="filter_invoice">Номер накладной</label>
      <input
        v-model="invoiceLine"
        v-on:input="filter"
        id="filter_invoice"
             name="filter"
             type="text" placeholder="Введите значение">
      <label for="filter_order">Тип заказа</label>
      <input
        v-model="orderLine"
        v-on:input="filter"
        id="filter_order"
        name="filter"
        type="text" placeholder="Введите значение">
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'filterBlock',
  data() {
    return {
      invoiceLine: '',
      orderLine: '',
      idLine: '',
    };
  },
  methods: {
    ...mapMutations(['FILTER_ARRAY']),
    filter() {
      this.FILTER_ARRAY({
        invoice: this.invoiceLine,
        order: this.orderLine,
        id: this.idLine,
      });
    },
  },
};
</script>
