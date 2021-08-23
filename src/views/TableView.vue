<template>
            <div class="table-view">
              <table>
                <thead>
                <tr>
                  <th v-for="key in gridColumnsNames" :key = "key"> {{ key }}</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                  <tr v-for="item in filteredPosts" :key = "item.id">
                    <template v-if="item.isEdit">
                      <td>{{item.id}}</td>
                      <td><input v-model="editedRowData.invoiceNumber" type="text"></td>
                      <td><input v-model="editedRowData.orderType" type="text"></td>
                      <td><input v-model="editedRowData.dateCreation" type="text"></td>
                      <td><input v-model="editedRowData.arrivalTime" type="text"></td>
                    </template>
                   <template v-else>
                     <td v-for="key in gridColumns" :key = "key">
                       {{item[key]}}
                     </td>
                   </template>
                    <td class="edit-column">
                      <div :class="[{'open-panel': isActionPanel}, 'edit-column1']">
                        <button @click="isActionPanel=!isActionPanel"
                                class="action-panel"></button>
                        <div v-if="isActionPanel" class="action-panel-buttons">
                          <button @click="editRow(item)" class="edit-button"></button>
                          <button @click="deleteItem(item.id)" class="delete-button"></button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'TableView',
  data() {
    return {
      isActionPanel: false,
      gridColumnsNames: [
        'ID',
        'Номер накладной',
        'Тип заказа',
        'Дата создания',
        'Время прибытия на выгрузку',
      ],
      gridColumns: [
        'id',
        'invoiceNumber',
        'orderType',
        'dateCreation',
        'arrivalTime',
      ],
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
    ...mapActions(['editElement']),
    editRow(obj) {
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
    ...mapMutations(['DELETE_ELEMENT']),
    deleteItem(key) {
      this.DELETE_ELEMENT({
        key,
      });
    },
  },
};
</script>
