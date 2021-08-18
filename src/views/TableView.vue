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
                  <tr v-for="item in arrComponents" :key = "item.id">
                   <td v-for="key in gridColumns" :key = "key">
                     {{item[key]}}
                   </td>
                    <td class="edit-column">
                      <div class="edit-column1">
                        <button class="action-panel"></button>
                        <div class="action-panel-buttons">
                          <button class="edit-button"></button>
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
export default {
  props: ['arrComponents'],
  name: 'TableView',
  data() {
    return {
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
    };
  },
  methods: {
    deleteItem(key) {
      this.arrComponents.forEach((el, index) => {
        if (el.id === key) {
          this.arrComponents.splice(index, 1);
        }
        return false;
      });
      this.saveArr();
    },
    saveArr() {
      localStorage.setItem('arrStorage', JSON.stringify(this.arrComponents));
    },
  },
};
</script>

<style scoped>
.edit-column {
  position: relative;
  text-align: right;
}
.action-panel {
  border: none;
  background: url("../assets/open-action-button.svg") no-repeat 80% 60%;
  width: 30px;
  height: 30px;
}
.edit-column1 {
  border: 1px solid #e5e9ec;
  padding: 2px;
}
.action-panel:hover {
  opacity: 1;
  border-top: 1px solid #e5e9ec;
  border-left: 1px solid #e5e9ec;
  border-bottom: 1px solid #e5e9ec;
}

.action-panel-buttons {
  position: absolute;
  top: 20px;
  right: 40px;
}
.action-panel-buttons button {
  width: 30px;
  height: 30px;
  border: none;
  display: inline;
}
.edit-button {
  background: url("../assets/edit-btn.svg") no-repeat ;
  background-size: 50%;
}
.delete-button {
  background: url("../assets/delete-btn.svg") no-repeat ;
  background-size: 40%;
}
</style>
