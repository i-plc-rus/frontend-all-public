<script setup>
import { useDataStore } from "@/stores/dataStore.js";
const dataStore = useDataStore();
import {computed, ref} from "vue";

const isOpen = ref(false);
defineExpose({
  open,
})

const category = ref();
const description = ref();
const amount = ref();

const currentDataObject = computed(() => {
  switch (dataStore.type){
    case 'expenses':
      return dataStore.expensesData;
    default:
      return dataStore.incomeData;
  }
})

async function addingOperation(){
  if(category.value === ''){
    close();
    return;
  }

  const id = new Date().toISOString().split('.')[0] + '-' + Math.round(Math.random() * (1000 - 9999) + 9999);
  const date = new Date().toISOString().split('T')[0];

  const requestBody = {
    'id': id,
    'category': category.value,
    'description': description.value,
    'date': date,
    'amount': amount.value
  }

  await fetch(`http://localhost:3000/${dataStore.type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  currentDataObject.value.push(requestBody)

  category.value = description.value = amount.value = '';
  close();
}

function open(){
  isOpen.value = true;
}
function close(){
  isOpen.value = false;
}
</script>

<template>
  <div class="backdrop" v-if="isOpen" @click="close"></div>
  <div class="popup" v-if="isOpen">
    <nav class="popup-menu">
      <ul class="popup-menu-list">
        <li :class="['popup-menu-item', {active: dataStore.type === 'expenses'}]">
          <a @click="dataStore.switchType('expenses')">Расходы</a>
        </li>
        <li :class="['popup-menu-item', {active: dataStore.type === 'income'}]">
          <a @click="dataStore.switchType('income')">Доходы</a>
        </li>
      </ul>
    </nav>
    <h2 class="popup-title">
      Добавление операции
    </h2>
    <form class="popup-form">
      <input class="popup-input" v-model="category" placeholder="Категория" />
      <input class="popup-input" type="number" v-model="amount" placeholder="Сумма" />
      <input class="popup-input" v-model="description" placeholder="Описание" />
    </form>
    <div class="buttons-container">
      <button class="popup-closing-button" @click="close">Отмена</button>
      <button class="popup-adding-operation-button" @click="addingOperation">Сохранить</button>
    </div>
  </div>
</template>

<style scoped>
.backdrop{
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: rgba(100, 100, 100, 0.25);
}
.popup{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  width: 400px;
  height: 500px;
  background-color: white;
  padding: 32px;
  border-radius: 24px;
}

.popup-menu-list{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.popup-menu-item{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding: 0 2px;
}
.popup-menu-item.active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 2px;
  background-color: var(--vt-c-indigo);
}
a {
  display: inline-block;
  margin: auto;
  text-decoration: none;
  color: var(--color-text);
  cursor: pointer;
}

.popup-title{
  margin-top: 20px;
}

.popup-form{
  margin-top: 20px;
}
.popup-input{
  width: 100%;
  height: 32px;
  font-size: 16px;
  padding: 4px;
}
.popup-input:not(:first-child){
  margin-top: 20px;
}

.buttons-container{
  position: absolute;
  bottom: 32px;

  width: calc(100% - 64px);
  display: flex;
  justify-content: space-between;
}
.buttons-container > button{
  height: 32px;
  border: 0;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 16px;
}
.buttons-container > *{
  cursor: pointer;
}
.popup-closing-button{
  background-color: var(--color-button);
  color: var(--color-text-button);
}
.popup-adding-operation-button{
  background-color: #f10000;
  color: white;
}
</style>