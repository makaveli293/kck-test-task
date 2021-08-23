<template>
            <div class="table-view">
              <div class="a-table-container">
                <a-table
                  :headers="headers"
                  :items="filteredPosts"
                  :sortParams="sortParams"
                  :sortParamsDefault="sortParamsDefault"
                  @onChangeSort="handleChangeSort"
                ></a-table>
              </div>
            </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import ATable from '../components/a-table/ATable.vue';

export default {
  name: 'TableView',
  components: {
    ATable,
  },
  data() {
    return {
      sortParamsDefault: {
        sidx: 'id',
        sord: 'desc',
      },
      sortParams: {
        sidx: '',
        sord: '',
      },
      headers: [
        {
          key: 'id',
          name: 'id',
          title: 'ID',
          headerAlign: 'center',
          dataAlign: 'center',
          sortControl: true,
          classes: 'width-4',
        },
        {
          key: 'invoiceNumber',
          name: 'number',
          title: 'Номер накладной',
          headerAlign: 'center',
          dataAlign: 'center',
        },
        {
          key: 'orderType',
          name: 'orderType',
          title: 'Тип заказа',
          headerAlign: 'center',
          dataAlign: 'left',
          sortControl: true,
        },
        {
          key: 'dateCreation',
          name: 'dateCreation',
          title: 'Дата создания',
          headerAlign: 'center',
          dataAlign: 'center',
          sortControl: true,
        },
        {
          key: 'arrivalTime',
          title: 'Время прибытия на выгрузку',
          headerAlign: 'center',
          dataAlign: 'center',
          position: 'afterAll',
        },
      ],
      isActionPanel: false,
    };
  },
  computed: {
    ...mapGetters(['allPosts', 'filteredPosts']),
  },
  methods: {
    ...mapMutations(['DELETE_ELEMENT', 'SORT_ARRAY_IN_COLUMN']),
    deleteItem(key) {
      this.DELETE_ELEMENT({
        key,
      });
    },
    handleChangeSort(obj) {
      this.sortParams.sidx = obj.data.sidx;
      this.sortParams.sord = obj.data.sord;

      this.SORT_ARRAY_IN_COLUMN({
        sortingType: obj.data.sidx,
        sortingDirection: obj.data.sord,
      });
    },
  },
};
</script>
