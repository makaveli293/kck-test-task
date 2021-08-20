<template>
          <div class="cards">
            <div class="widgets">
              <draggable class="list-group widgets__list"
                         tag="ul"
                         @change="saveArr"
                         v-bind="dragOptions"
                         v-model="startArr"
                         @start="dragging=true"
                         @end="dragging=false">
                <transition-group class="widgets__list"
                                  type="transition"
                                  :name="!dragging ? 'flip-list' : null">
                  <li
                    class="list-group-item"
                    v-for="component in filteredPosts" :key="component.id">
                    <widget-item :item="component"></widget-item>
                  </li>
                </transition-group>
              </draggable>
            </div>
          </div>
</template>

<script>
// @ is an alias to /src
import draggable from 'vuedraggable';
import WidgetItem from '@/components/WidgetItem.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      dragging: false,
    };
  },
  computed: {
    ...mapGetters(['allPosts', 'filteredPosts']),
    startArr: {
      get() {
        return this.filteredPosts;
      },
      set(value) {
        this.$store.commit('UPDATE_ARRAY', value);
      },
    },
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
    saveArr() {
      localStorage.setItem('arrStorage', JSON.stringify(this.allPosts));
    },
  },
  components: {
    draggable,
    WidgetItem,
  },
};
</script>
