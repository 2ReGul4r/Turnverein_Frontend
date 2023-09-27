<template>
  <div class="card_grid_wrapper">
    <slot name="cards"></slot>
  </div>
  <div class="card_grid_bot_bar">
    <div class="card_grid_pagination">
      <slot name="pagination"></slot>
    </div>
  </div>
</template>

<style scoped>
.card_grid_wrapper {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  margin-bottom: 32px;
  row-gap: 16px;
}

.card_grid_bot_bar {
  display: flex;
  justify-content: center;
}

.card_grid_pagination {
  bottom: 8px;
  position: fixed;
  width: 100%;
}
</style>
