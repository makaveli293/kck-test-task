<template>
  <div class="home">
    <Header/>
    <main class="main">
      <div class="container">
        <div class="main__area">
          <div class="filters">
            <div @click="openModal" class="create__button">
              <button id="create-button">+ Добавить</button>
            </div>
            <div v-click-outside="onClickOutside" v-if="isModal">
              <modal-window
                @updateParent="onUpdateChild"
                @closeModalW="openModal"
                @my-event="addToArr"></modal-window>
            </div>
            <filter-block @search="filter"></filter-block>
          </div>
          <div class="cards">
            <sorting-block @sorting="sorting"></sorting-block>
            <div class="view-change">
              <router-link to="/table-view" class="to-table-page"></router-link>
              <router-link to="/" class="to-main-page"></router-link>
            </div>
            <div class="widgets">
              <draggable class="list-group widgets__list"
                         @change="saveArr"
                         tag="ul"
                         v-bind="dragOptions"
                         v-model="filteredArr"
                         @start="drag=true"
                         @end="drag=false">
                <transition-group class="widgets__list"
                                  type="transition"
                                  :name="!drag ? 'flip-list' : null">
                  <li
                    class="list-group-item"
                    v-for="component in filteredArr" :key="component.id">
                    <widget-item @editInfo="editedInfo"  :item="component"></widget-item>
                  </li>
                </transition-group>
              </draggable>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import vClickOutside from 'v-click-outside';
import Header from '@/components/Header.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import FilterBlock from '@/components/FilterBlock.vue';
import SortingBlock from '@/components/SortingBlock.vue';
import WidgetItem from '@/components/WidgetItem.vue';
import draggable from 'vuedraggable';

export default {
  name: 'Home',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      isModal: false,
      arrComponents: [],
      filteredArr: [],
      orderInfo: '',
      sortingType: '',
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    },
  },
  mounted() {
    if (localStorage.getItem('arrStorage') !== null) {
      this.arrComponents = JSON.parse(localStorage.getItem('arrStorage'));
      this.filteredArr = JSON.parse(localStorage.getItem('arrStorage'));
    }
  },
  methods: {
    saveArr() {
      localStorage.setItem('arrStorage', JSON.stringify(this.filteredArr));
    },
    filter(value) {
      const regexpOrder = new RegExp(value.order, 'i');
      const regexpInvoice = new RegExp(value.invoice, 'i');
      const regexpId = new RegExp(value.id, 'i');
      this.filteredArr = this.arrComponents.filter((el) => {
        if ((regexpOrder.test(el.orderType))
          && (regexpInvoice.test(el.invoiceNumber))
          && (regexpId.test(el.id))) {
          return el;
        }
        return false;
      });
    },
    sorting(value) {
      this.sortingType = value.sortingType;
      switch (this.sortingType) {
        case 'ID':
          this.filteredArr.sort((a, b) => {
            if (a.id < b.id) {
              return -1;
            }
            if (a.id > b.id) {
              return 1;
            }
            return 0;
          });
          this.saveArr();
          break;
        case 'Дата создания':
          this.filteredArr.sort((a, b) => {
            if (a.dateCreation < b.dateCreation) {
              return -1;
            }
            if (a.dateCreation > b.dateCreation) {
              return 1;
            }
            return 0;
          });
          this.saveArr();
          break;
        case 'Тип заказа':
          this.filteredArr.sort((a, b) => {
            if (a.orderType < b.orderType) {
              return -1;
            }
            if (a.orderType > b.orderType) {
              return 1;
            }
            return 0;
          });
          this.saveArr();
          break;
        default:
          return 0;
      }
      return 0;
    },
    onUpdateChild(invoice) {
      this.orderInfo = invoice;
    },
    openModal() {
      this.isModal = !this.isModal;
    },
    onClickOutside() {
      if (this.isModal === true) {
        this.openModal();
      }
    },
    addToArr() {
      const currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '/');

      this.filteredArr.push({
        id: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
        dateCreation: currentDateWithFormat,
        invoiceNumber: this.orderInfo.invoice,
        arrivalTime: this.orderInfo.time,
        title: `Товар: ${Math.floor(Math.random() * (1000 - 1 + 1)) + 1}`,
        orderType: this.orderInfo.orderType,
      });
      this.saveArr();
      this.openModal();
    },
  },
  components: {
    Header,
    ModalWindow,
    FilterBlock,
    SortingBlock,
    WidgetItem,
    draggable,
  },
};
</script>

<style scoped>
.to-table-page {
  background: url("../assets/table-view-button.svg") no-repeat;
}
.to-main-page {
  background: url("../assets/widget-view-button.svg") no-repeat;
}

.to-table-page.router-link-exact-active {
  background: url("../assets/table-view-active-button.svg") no-repeat;
}
.to-main-page.router-link-exact-active {
  background: url("../assets/widget-view-active-button.svg") no-repeat;
}
</style>
