import Vue from 'vue';
import VueRouter from 'vue-router';
import WidgetsView from '../views/WidgetsView.vue';
import TableView from '../views/TableView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'WidgetsView',
    component: WidgetsView,
  },
  {
    path: '/table-view',
    name: 'TableView',
    component: TableView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
