<template>
  <div id="app">
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
            <div class="items-area">
              <sorting-block @sorting="sorting"></sorting-block>
              <router-view :arrComponents="this.filteredArr"></router-view>
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
import Header from '@/components/Header.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import FilterBlock from '@/components/FilterBlock.vue';
import SortingBlock from '@/components/SortingBlock.vue';

export default {
  name: 'TableView',
  data() {
    return {
      isModal: false,
      arrComponents: [],
      filteredArr: [],
      orderInfo: '',
      sortingType: '',
    };
  },
  mounted() {
    if (localStorage.getItem('arrStorage') !== null) {
      this.arrComponents = JSON.parse(localStorage.getItem('arrStorage'));
      this.filteredArr = JSON.parse(localStorage.getItem('arrStorage'));
    }
  },
  methods: {
    deleteItem(key) {
      this.filteredArr.forEach((el, index) => {
        if (el.id === key) {
          this.filteredArr.splice(index, 1);
        }
        return false;
      });
      this.saveArr();
    },
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
        dateCreation: currentDateWithFormat || '-',
        invoiceNumber: this.orderInfo.invoice || '-',
        arrivalTime: this.orderInfo.time || '-',
        title: `Товар: ${Math.floor(Math.random() * (1000 - 1 + 1)) + 1}`,
        orderType: this.orderInfo.orderType || '-',
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
