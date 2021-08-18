<template>
  <div class="widgets__list__item">
    <header>
      {{ item.title }}
      <div class="item-menu">
        <img @click="editCard" src="../assets/edit.png" alt="">
      </div>
      <img src="../assets/move.png" alt="">
    </header>
    <table>
      <tbody>
      <tr>
        <td>ID</td>
        <td class="tableId">{{ item.id }}</td>
      </tr>
      <tr>
        <td>Дата создания</td>
        <td class="tableDate">{{ item.dateCreation }}</td>
      </tr>
      <tr>
        <td>Номер накладной</td>
        <td class="tableInvoice">{{ item.invoiceNumber }}</td>
      </tr>
      <tr>
        <td>Время прибытия на выгрузку</td>
        <td class="tableHours">{{ item.arrivalTime }}</td>
      </tr>
      <tr>
        <td>Тип заказа</td>
        <td class="tableOrder">{{ item.orderType }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'WidgetItem',
  props: ['item'],
  methods: {
    editCard() {
      this.isEdit = !this.isEdit;
    },
  },
};
</script>
