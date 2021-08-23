import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    arrComponents: [],
    filteredArr: [],
    orderInfo: {},
  },
  getters: {
    allPosts(state) {
      return state.arrComponents;
    },
    filteredPosts(state) {
      return state.filteredArr;
    },
  },
  mutations: {
    UPDATE_ARRAY(state, array) {
      state.arrComponents = array;
      state.filteredArr = array;
    },
    EDIT_ELEMENT(state, obj) {
      state.arrComponents.forEach((el, index, array) => {
        if (el.id === obj.id) {
          array.splice(index, 1, obj);
        }
        return false;
      });
      localStorage.setItem('arrStorage', JSON.stringify(state.arrComponents));
    },
    ADD_ELEMENT(state, newElement) {
      const currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '/');
      //  addElement
      const el = {
        id: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
        dateCreation: currentDateWithFormat || '-',
        invoiceNumber: newElement.invoice || '-',
        arrivalTime: newElement.time || '-',
        title: `Товар: ${Math.floor(Math.random() * (1000 - 1 + 1)) + 1}`,
        orderType: newElement.orderType || '-',
        isEdit: false,
      };
      state.arrComponents.push(el);
      localStorage.setItem('arrStorage', JSON.stringify(state.arrComponents));
    },
    DELETE_ELEMENT(state, obj) {
      state.arrComponents.forEach((el, index) => {
        if (el.id === obj.key) {
          state.arrComponents.splice(index, 1);
        }
        return false;
      });
      localStorage.setItem('arrStorage', JSON.stringify(state.arrComponents));
    },
    FILTER_ARRAY(state, obj) {
      const regexpOrder = new RegExp(obj.order, 'i');
      const regexpInvoice = new RegExp(obj.invoice, 'i');
      const regexpId = new RegExp(obj.id, 'i');
      state.filteredArr = state.arrComponents.filter((el) => {
        if ((regexpOrder.test(el.orderType))
          && (regexpInvoice.test(el.invoiceNumber))
          && (regexpId.test(el.id))) {
          return el;
        }
        return false;
      });
    },
    SORT_ARRAY(state, obj) {
      switch (obj.sortingType) {
        case 'ID':
          state.arrComponents.sort((a, b) => {
            if (a.id < b.id) {
              return -1;
            }
            if (a.id > b.id) {
              return 1;
            }
            return 0;
          });
          localStorage.setItem('arrStorage', JSON.stringify(state.arrComponents));
          break;
        case 'Дата создания':
          state.arrComponents.sort((a, b) => {
            if (a.dateCreation < b.dateCreation) {
              return -1;
            }
            if (a.dateCreation > b.dateCreation) {
              return 1;
            }
            return 0;
          });
          localStorage.setItem('arrStorage', JSON.stringify(state.arrComponents));
          break;
        case 'Тип заказа':
          state.arrComponents.sort((a, b) => {
            if (a.orderType < b.orderType) {
              return -1;
            }
            if (a.orderType > b.orderType) {
              return 1;
            }
            return 0;
          });
          localStorage.setItem('arrStorage', JSON.stringify(state.arrComponents));
          break;
        default:
          return 0;
      }
      return 0;
    },
    SORT_ARRAY_IN_COLUMN(state, obj) {
      if (obj.sortingDirection === 'asc') {
        state.arrComponents.sort((a, b) => {
          if (a[obj.sortingType] < b[obj.sortingType]) {
            return -1;
          }
          if (a[obj.sortingType] > b[obj.sortingType]) {
            return 1;
          }
          return 0;
        });
      } else {
        state.arrComponents.sort((a, b) => {
          if (a[obj.sortingType] < b[obj.sortingType]) {
            return 1;
          }
          if (a[obj.sortingType] > b[obj.sortingType]) {
            return -1;
          }
          return 0;
        });
      }
    },
  },
  actions: {
    getArray({ commit }) {
      if (localStorage.getItem('arrStorage') !== null) {
        const array = JSON.parse(localStorage.getItem('arrStorage'));
        commit('UPDATE_ARRAY', array);
      }
    },
    setArray(state) {
      localStorage.setItem('arrStorage', JSON.stringify(state.arrComponents));
    },
    addElToArray({ commit, state }, obj) {
      commit('ADD_ELEMENT', obj);
      state.filteredArr = state.arrComponents;
    },
    editElement({ commit }, obj) {
      commit('EDIT_ELEMENT', obj);
    },
  },
  modules: {
  },
});
