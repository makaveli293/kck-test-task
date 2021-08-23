<template>
  <div class="widgets__list__item">
    <header>
      {{ item.title }}
      <div class="item-menu">
        <img @click="deleteItem(item.id)" src="../assets/delete-btn.svg" alt="">
        <img @click="editCard(item)" src="../assets/edit.png" alt="">
        <img src="../assets/move.png" alt="">
      </div>
    </header>
    <table>
      <tbody>
      <tr>
        <td>ID</td>
        <td class="tableId">{{ item.id }}</td>
      </tr>
      <tr>
        <td>Дата создания</td>
        <td class="form-edit" v-if="item.isEdit"><input v-model="editedRowData.dateCreation"
                                                        type="text">
        </td>
        <td v-else class="tableDate">{{ item.dateCreation }}</td>
      </tr>
      <tr>
        <td>Номер накладной</td>
        <td class="form-edit" v-if="item.isEdit"><input v-model="editedRowData.invoiceNumber"
                                                        type="text">
        </td>
        <td v-else class="tableInvoice">{{ item.invoiceNumber }}</td>
      </tr>
      <tr>
        <td>Время прибытия на выгрузку</td>
        <td class="form-edit" v-if="item.isEdit"><input v-model="editedRowData.arrivalTime"
                                                        type="text"></td>
        <td v-else class="tableHours">{{ item.arrivalTime }}</td>
      </tr>
      <tr>
        <td>Тип заказа</td>
        <td class="form-edit" v-if="item.isEdit"><input v-model="editedRowData.orderType"
                                                        type="text"></td>
        <td v-else class="tableOrder">{{ item.orderType }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'WidgetItem',
  props: ['item'],
  data() {
    return {
      isEdit: false,
      elem: this.item,
      editedRowData: {
        id: '',
        invoiceNumber: '',
        orderType: '',
        dateCreation: '',
        arrivalTime: '',
        title: '',
        isEdit: false,
      },
    };
  },
  computed: {
    ...mapGetters(['allPosts', 'filteredPosts']),
  },
  methods: {
    ...mapMutations(['DELETE_ELEMENT']),
    ...mapActions(['editElement']),
    deleteItem(key) {
      this.DELETE_ELEMENT({
        key,
      });
    },
    editCard(obj) {
      const item = this.filteredPosts.find((el) => el.id === obj.id);
      item.isEdit = !item.isEdit;
      if (obj.isEdit) {
        this.editedRowData.id = obj.id;
        this.editedRowData.invoiceNumber = obj.invoiceNumber;
        this.editedRowData.orderType = obj.orderType;
        this.editedRowData.dateCreation = obj.dateCreation;
        this.editedRowData.arrivalTime = obj.arrivalTime;
        this.editedRowData.title = obj.title;
      }
      if (!obj.isEdit) {
        this.editElement({
          ...this.editedRowData,
        });
      }
    },
  },
};
</script>
