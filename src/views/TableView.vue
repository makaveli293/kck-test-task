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
                   <td v-for="key in gridColumns" :key = "key">
                     {{item[key]}}
                   </td>
                    <td class="edit-column">
                      <div :class="[{'open-panel': isActionPanel}, 'edit-column1']">
                        <button @click="isActionPanel=!isActionPanel"
                                class="action-panel"></button>
                        <div v-if="isActionPanel" class="action-panel-buttons">
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
import { mapGetters, mapMutations } from 'vuex';

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
  },
};
</script>
