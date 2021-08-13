<template>
  <header class="header">
    <div class="container">
      <div class="header__block">
        <div class="header__block__title">
          <h2>Тестовое задание</h2>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'header',
};
</script>

<style scoped lang="scss">
.header {
  height: 261px;
  background: linear-gradient(267.21deg, #900793 0.16%, rgba(134, 4, 137, 0.785707) 0.16%,
    rgba(159, 12, 162, 0.762269) 43.22%,
    rgba(5, 1, 190, 0.734375) 98.12%,
    rgba(0, 28, 126, 0.619792) 100.15%,
    rgba(6, 77, 142, 0.447917) 102.03%,
    rgba(1, 0, 60, 0) 102.73%);

  &__block {
    display: flex;
    align-items: center;
    height: 100%;

    &__title {
      color: #fff;
      font-family: Roboto;
      font-weight: bold;
    }
  }
}
</style>
