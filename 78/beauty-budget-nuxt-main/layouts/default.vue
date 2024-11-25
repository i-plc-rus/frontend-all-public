<template>
  <div class="main-layout">
    <div class="main-layout__wrapper">
      <PageHeader />
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-layout {
  box-sizing: border-box;
  display: grid;
  min-height: 100vh;

  background-color: var(--color-main-light);

  @include wide-mobile() {
    padding: $mobile-outer-gap;
  }

  @include desktop() {
    padding: $desktop-outer-gap calc($desktop-outer-gap * 2);
  }
}

.main-layout__wrapper {
  box-sizing: border-box;
  display: grid;
  align-content: start;
  gap: $mobile-inner-gap;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 10px;

  background-color: white;
  box-shadow: $box-shadow;

  @include wide-mobile() {
    padding: $mobile-outer-gap;
    border-radius: 24px;
  }

  @include desktop() {
    max-width: 860px;
    gap: $desktop-inner-gap;
    padding: $desktop-outer-gap;
  }
}
</style>
