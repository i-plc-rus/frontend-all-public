<script setup lang="ts">
import { ButtonState } from '~/constants/button-state';

interface Props {
  elementClass?: string;
  text: string;
  type?: 'button' | 'submit';
  state?: ButtonState;
}

const { text, type = 'button', state = ButtonState.NORMAL } = defineProps<Props>();
</script>

<template>
  <button
    class="ui-button"
    :class="`${elementClass} ui-button_state_${state}`"
    :disabled="state !== ButtonState.NORMAL"
    :type
  >
    {{ text }}
  </button>
</template>

<style lang="scss" scoped>
@keyframes loader {
  100% {
    transform: rotate(360deg);
  }
}

.ui-button {
  @include reset-button();
  position: relative;

  padding: 11px 52px;

  @include text($size: 16px, $color: white);
  text-align: center;

  border-radius: $ui-border-radius;
  background-color: var(--color-accent);
  transition: opacity $transition;

  &:hover:not(:disabled) {
    opacity: 0.85;
  }

  &:active:not(:disabled) {
    opacity: 0.95;
  }

  &::after {
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    top: calc(50% - 10px);
    z-index: 2;

    width: 20px;
    height: 20px;

    opacity: 0;
    transition: opacity $transition;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;

    width: 100%;
    height: 100%;

    background-color: rgba($color: white, $alpha: 0.5);
    border-radius: $ui-border-radius;
    opacity: 0;
    transition: opacity $transition;
  }
}

.ui-button_state_processing,
.ui-button_state_success {
  color: transparent;
  pointer-events: none;

  &::before,
  &::after {
    opacity: 1;
  }
}

.ui-button_state_processing {
  &::after {
    animation: loader 1s linear infinite;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M21 12a9 9 0 11-6.219-8.56'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
  }
}

.ui-button_state_success {
  &::after {
    background-image: url("data:image/svg+xml,%3Csvg fill='%23ffffff' version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 78.369 78.369' xml:space='preserve' stroke='%23ffffff'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cg%3E%3Cpath d='M78.049,19.015L29.458,67.606c-0.428,0.428-1.121,0.428-1.548,0L0.32,40.015c-0.427-0.426-0.427-1.119,0-1.547l6.704-6.704 c0.428-0.427,1.121-0.427,1.548,0l20.113,20.112l41.113-41.113c0.429-0.427,1.12-0.427,1.548,0l6.703,6.704 C78.477,17.894,78.477,18.586,78.049,19.015z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
}
</style>
