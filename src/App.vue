<template>
  <div id="app">
    <div class="home">
      <header-block/>
      <main class="main">
        <div class="container">
          <div class="main__area">
            <div class="filters">
              <div @click="openModal" class="create__button">
                <button id="create-button">+ Добавить</button>
              </div>
              <div v-click-outside="onClickOutside" v-if="isModal">
                <modal-window
                  @closeModalW="openModal"></modal-window>
              </div>
              <filter-block></filter-block>
            </div>
            <div class="items-area">
              <sorting-block></sorting-block>
              <router-view></router-view>
            </div>
            <div class="view-change">
              <router-link to="/table-view" class="to-table-page"></router-link>
              <router-link to="/" class="to-main-page"></router-link>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import HeaderBlock from '@/components/HeaderBlock.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import FilterBlock from '@/components/FilterBlock.vue';
import SortingBlock from '@/components/SortingBlock.vue';

export default {
  name: 'App',
  data() {
    return {
      isModal: false,
    };
  },
  computed: {
    ...mapGetters(['allPosts']),
  },
  mounted() {
    this.getArray();
  },
  methods: {
    ...mapActions(['getArray']),
    openModal() {
      this.isModal = !this.isModal;
    },
    onClickOutside() {
      if (this.isModal === true) {
        this.openModal();
      }
    },
  },
  components: {
    HeaderBlock,
    ModalWindow,
    FilterBlock,
    SortingBlock,
  },
};
</script>

<style lang="scss">
@import "scss/portlet";
</style>
