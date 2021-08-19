<template>
  <div class="create__window">
    <div class="modal-window">
      <div>
        <p>Добавление</p>
        <div @click="closeModal" class="modal-window-close">
          <img src="../assets/close.png" alt="">
        </div>
        <div>
          <label for="invoice">Номер накладной</label>
          <input
            v-model="invoice"
            id="invoice"
            required
                 name="invoice" type="text" placeholder="Введите значение">
          <label for="time">Время прибытия на выгрузку</label>
          <input
            required
            v-model="time"
            id="time" name="time" type="text" placeholder="Введите значение">
          <label for="order">Тип заказа</label>
          <select
            required
            v-model="orderType"
            id="order" name="order">
            <option value="rued">RUED</option>
            <option value="ruex">RUEX</option>
            <option value="rusg">RUSG</option>
          </select>
          <button @click="addNewElement">Добавить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'ModalWindow',
  data() {
    return {
      invoice: '',
      time: '',
      orderType: '',
    };
  },
  methods: {
    ...mapMutations(['ADD_ELEMENT']),
    addNewElement() {
      this.ADD_ELEMENT({
        invoice: this.invoice,
        time: this.time,
        orderType: this.orderType,
      });
      this.closeModal();
    },
    closeModal() {
      this.$emit('closeModalW', {
        isModal: false,
      });
    },
  },
};
</script>
