<template>
          <div class="cards">
            <div class="widgets">
              <draggable class="list-group widgets__list"
                         @change="saveArr"
                         tag="ul"
                         v-bind="dragOptions"
                         v-model="arrComponents"
                         @start="dragging=true"
                         @end="dragging=false">
                <transition-group class="widgets__list"
                                  type="transition"
                                  :name="!dragging ? 'flip-list' : null">
                  <li
                    class="list-group-item"
                    v-for="component in arrComponents" :key="component.id">
                    <widget-item :item="component"></widget-item>
                  </li>
                </transition-group>
              </draggable>
            </div>
          </div>
</template>

<script>
// @ is an alias to /src
import vClickOutside from 'v-click-outside';
import draggable from 'vuedraggable';
import WidgetItem from '@/components/WidgetItem.vue';

export default {
  name: 'Home',
  props: ['arrComponents'],
  data() {
    return {
      dragging: false,
    };
  },
  directives: {
    clickOutside: vClickOutside.directive,
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
  methods: {
    onClickOutside() {
      if (this.isModal === true) {
        this.openModal();
      }
    },
    saveArr() {
      localStorage.setItem('arrStorage', JSON.stringify(this.arrComponents));
    },
  },
  components: {
    draggable,
    WidgetItem,
  },
};
</script>
