<template>
  <div class="widgets__list__item">
    <header>
      {{ item.title }}
      <div class="item-menu">
        <img @click="deleteItem(item.id)" src="../assets/delete-btn.svg" alt="">
        <img @click="editCard(item.id)" src="../assets/edit.png" alt="">
        <img src="../assets/move.png" alt="">
      </div>
    </header>
    <table>
      <tbody>
      <tr>
        <td>ID</td>
        <td class="form-edit" v-if="item.isEdit"><input v-model="elem.id" type="text"></td>
        <td v-else class="tableId">{{ item.id }}</td>
      </tr>
      <tr>
        <td>Дата создания</td>
        <td class="form-edit" v-if="item.isEdit"><input v-model="elem.dateCreation" type="text">
        </td>
        <td v-else class="tableDate">{{ item.dateCreation }}</td>
      </tr>
      <tr>
        <td>Номер накладной</td>
        <td class="form-edit" v-if="item.isEdit"><input v-model="elem.invoiceNumber" type="text">
        </td>
        <td v-else class="tableInvoice">{{ item.invoiceNumber }}</td>
      </tr>
      <tr>
        <td>Время прибытия на выгрузку</td>
        <td class="form-edit" v-if="item.isEdit"><input v-model="elem.arrivalTime" type="text"></td>
        <td v-else class="tableHours">{{ item.arrivalTime }}</td>
      </tr>
      <tr>
        <td>Тип заказа</td>
        <td class="form-edit" v-if="item.isEdit"><input v-model="elem.orderType" type="text"></td>
        <td v-else class="tableOrder">{{ item.orderType }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'WidgetItem',
  props: ['item'],
  data() {
    return {
      isEdit: false,
      elem: this.item,
    };
  },
  computed: {
    ...mapGetters(['allPosts', 'filteredPosts']),
  },
  methods: {
    ...mapMutations(['DELETE_ELEMENT']),
    deleteItem(key) {
      this.DELETE_ELEMENT({
        key,
      });
    },
    editCard(val) {
      const item = this.filteredPosts.find((el) => el.id === val);
      item.isEdit = !item.isEdit;
      localStorage.setItem('arrStorage', JSON.stringify(this.filteredPosts));
    },
  },
};
</script>
