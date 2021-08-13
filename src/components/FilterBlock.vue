<template>
  <div class="filters__block">
    <p>Фильтры</p>
    <div class="filters__block__search">
      <label for="filter_id">ID</label>
      <input
        v-model="idLine"
        v-on:input="sendToParent"
        id="filter_id"
        name="filter"
        type="text" placeholder="Enter Value">
      <label for="filter_invoice">Номер накладной</label>
      <input
        v-model="invoiceLine"
        v-on:input="sendToParent"
        id="filter_invoice"
             name="filter"
             type="text" placeholder="Enter Value">
      <label for="filter_order">Тип заказа</label>
      <input
        v-model="orderLine"
        v-on:input="sendToParent"
        id="filter_order"
        name="filter"
        type="text" placeholder="Enter Value">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Filter',
  data() {
    return {
      invoiceLine: '',
      orderLine: '',
      idLine: '',
    };
  },
  methods: {
    sendToParent() {
      this.$emit('search', {
        invoice: this.invoiceLine,
        order: this.orderLine,
        id: this.idLine,
      });
    },
  },
};
</script>
