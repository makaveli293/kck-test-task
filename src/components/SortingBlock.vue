<template>
  <div class="sorting">
    <div class="sorting__block">
      <select @change="sort" v-model="sortingType" name="select">
        <option>ID</option>
        <option>Дата создания</option>
        <option>Тип заказа</option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'SortingBlock',
  data() {
    return {
      sortingType: '',
    };
  },
  methods: {
    ...mapMutations(['SORT_ARRAY']),
    sort() {
      this.SORT_ARRAY({
        sortingType: this.sortingType,
      });
    },
  },
};
</script>
