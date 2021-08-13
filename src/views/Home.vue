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
      this.filteredArr = this.filteredArr.filter((el) => regexpOrder.test(el.orderType));
      const regexpInvoice = new RegExp(value.invoice, 'i');
      this.filteredArr = this.filteredArr.filter((el) => regexpInvoice.test(el.invoiceNumber));
      const regexpId = new RegExp(value.id, 'i');
      this.filteredArr = this.filteredArr.filter((el) => regexpId.test(el.id));
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
          localStorage.setItem('arrStorage', JSON.stringify(this.filteredArr));
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
          localStorage.setItem('arrStorage', JSON.stringify(this.filteredArr));
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
          localStorage.setItem('arrStorage', JSON.stringify(this.filteredArr));
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
      localStorage.setItem('arrStorage', JSON.stringify(this.filteredArr));
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

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  max-width: 1350px;
  margin: 0 auto;
  height: 100%;
}

.d-show {
  display: block !important;
}

.main {
  &__area {
    display: flex;

    .filters {
      width: 30%;
      height: 500px;

      .create__button {
        height: 70px;
        background: #4943CD;
        box-shadow: 0 0 4px #EBEBEB;
        border-radius: 2px;
        width: 90%;
        margin: 30px auto;
        display: flex;
        justify-content: center;

        button {
          background: transparent;
          border: 0;
          font-family: Roboto;
          font-weight: bold;
          font-size: 14px;
          line-height: 16px;
          color: #fff;
        }
      }

      .create__window {
        .modal-window {
          box-shadow: 0 4px 14px rgba(77, 75, 75, .25);
          width: 450px;
          max-width: 100%;
          height: 240px;
          max-height: 100%;
          position: fixed;
          z-index: 100;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: white;

          > div {
            text-align: center;
            padding: 10px;

            p {
              margin-bottom: 20px;
            }

            > div {
              display: flex;
              flex-wrap: wrap;

              label {
                padding-right: 10px;
                width: 50%;
                margin-bottom: 10px;
              }

              input {
                width: 50%;
                margin-bottom: 10px;
              }

              button {
                display: block;
                width: 100%;
                margin-top: 20px;
                height: 40px;
              }
            }
          }

          &-close {
            position: relative;
            display: inline-block !important;
            left: 45%;
            top: -35px;
          }
        }
      }

      &__block {
        background: #FFFFFF;
        box-shadow: 0 4px 12px #E7E7E7;
        border-radius: 3px;
        padding: 15px 25px;
        width: 90%;
        margin: 30px auto;

        p {
          font-weight: bold;
          font-size: 16px;
          line-height: 19px;
          color: #2B2839;
          border-bottom: 1px solid #F8F8F8;
          margin-bottom: 22px;
        }

        &__search {
          display: flex;
          flex-direction: column;

          label {
            margin-bottom: 11px;
            margin-top: 10px;
          }

          input {
            height: 30px;
            border: 1px solid #D9D9D9;
            border-radius: 2px;
            padding: 7px 10px;
          }
        }
      }
    }

    .cards {
      width: 70%;

      .sorting {
        height: 70px;
        background: #FFFFFF;
        box-shadow: 0 4px 12px #E7E7E7;
        border-radius: 3px;
        margin: 30px auto;

        &__block {
          display: flex;
          align-items: center;
          height: 100%;
          padding-left: 20px;

          select {
            height: 30px;
            border: 1px solid #E0E5E6;
            padding: 0 10px;
            font-family: Roboto;
            font-weight: bold;
            font-size: 16px;
            line-height: 19px;
            color: #2B2839;
          }
        }
      }

      .widgets {
        height: 100%;

        &__list {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          padding-top: 5px;

          li {
            list-style: none;
          }

          &__item {
            height: 210px;
            background: #F6FAFB;
            box-shadow: 0 4px 12px #EBEBEB;
            border-radius: 3px;
            margin: 10px;
            margin-top: 5px;

            header {
              height: 40px;
              background: rgba(237, 232, 245, 0.5);
              font-weight: 500;
              font-size: 18px;
              line-height: 21px;
              font-family: Roboto;
              color: #2B2839;
              padding: 10px;

              img {
                float: right;
                margin-right: 30px;
              }
            }

            table {
              width: 100%;
              height: 170px;

              input {
                height: 30px;
                width: 100px;
              }

              tr {
                td {
                  border-bottom: 2px solid #F2F2F2;
                  padding: 0 10px;
                }
              }

              tr:last-child {
                td {
                  border: none;
                }
              }
            }
          }
        }
      }
    }
  }
}

//dd
.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}

.item-menu {
  display: inline-block;
  float: right;
  cursor: pointer;
}

</style>
