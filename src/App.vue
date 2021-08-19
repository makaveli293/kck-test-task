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

<style scoped>
.to-table-page {
  background: url("/assets/table-view-button.svg") no-repeat;
}
.to-main-page {
  background: url("/assets/widget-view-button.svg") no-repeat;
}

.to-table-page.router-link-exact-active {
  background: url("/assets/table-view-active-button.svg") no-repeat;
}
.to-main-page.router-link-exact-active {
  background: url("/assets/widget-view-active-button.svg") no-repeat;
}
.edit-column {
  position: relative;
  text-align: right;
}
.action-panel {
  border: none;
  background: url("/assets/open-action-button.svg") no-repeat 80% 60%;
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
  background: url("/assets/edit-btn.svg") no-repeat ;
  background-size: 50%;
}
.delete-button {
  background: url("/assets/delete-btn.svg") no-repeat ;
  background-size: 40%;
}
.to-table-page {
  background: url("./assets/table-view-button.svg") no-repeat;
}
.to-main-page {
  background: url("./assets/widget-view-button.svg") no-repeat;
}

.to-table-page.router-link-exact-active {
  background: url("./assets/table-view-active-button.svg") no-repeat;
}
.to-main-page.router-link-exact-active {
  background: url("./assets/widget-view-active-button.svg") no-repeat;
}
</style>

<style lang="scss">
@import "scss/portlet";
</style>
