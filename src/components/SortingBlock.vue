<template>
  <div class="sorting">
    <div class="sorting__block">
      <select @change="sendToParent" v-model="sortingType" name="select">
        <option>ID</option>
        <option>Дата создания</option>
        <option>Тип заказа</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SortingBlock',
  data() {
    return {
      sortingType: '',
    };
  },
  methods: {
    sendToParent() {
      this.$emit('sorting', {
        sortingType: this.sortingType,
      });
    },
  },
};
</script>
