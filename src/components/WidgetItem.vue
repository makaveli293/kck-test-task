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
        <td v-if="isEdit" class="tableInvoice">{{ item.invoiceNumber }}</td>
        <input v-else
               @change="editInvoice"
          id="invoice"
          name="invoice" type="text" placeholder="Введите значение">
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
  data() {
    return {
      isEdit: true,
      editInvoiceNumber: '',
    };
  },
  methods: {
    editCard() {
      this.isEdit = !this.isEdit;
    },
    editInvoice() {
      this.item.invoiceNumber = this.editInvoiceNumber;
      this.$emit('editInfo', {
        editInvoiceNumber: this.editInvoiceNumber,
      });
      this.isEdit = !this.isEdit;
    },
  },
};
</script>
