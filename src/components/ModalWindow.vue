<template>
  <div class="create__window">
    <div class="modal-window">
      <div>
        <p>Добавление</p>
        <div @click="closeModal" class="modal-window-close">
          <img src="../assets/close.png" alt="">
        </div>
        <div class="">
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
          <button v-on:click="sendToParent" @click="$emit('my-event')">Добавить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    sendToParent() {
      this.$emit('updateParent', {
        invoice: this.invoice,
        time: this.time,
        orderType: this.orderType,
      });
    },
    closeModal() {
      this.$emit('closeModalW', {
        isModal: false,
      });
    },
  },
};
</script>
