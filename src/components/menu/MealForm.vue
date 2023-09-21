<script lang="ts" setup>
import BeefIcon from './icons/BeefIcon.vue';
import BreadIcon from './icons/BreadIcon.vue';
import ChickenIcon from './icons/ChickenIcon.vue';
import FishIcon from './icons/FishIcon.vue';
import NoodlesIcon from './icons/NoodlesIcon.vue';
import PastaIcon from './icons/PastaIcon.vue';
import PorkIcon from './icons/PorkIcon.vue';
import PotatoIcon from './icons/PotatoIcon.vue';
import RiceIcon from './icons/RiceIcon.vue';
import VegetarianIcon from './icons/VegetarianIcon.vue';
</script>
<template>
  <form class="box box--tertiary">
    <h2>Add a Meal</h2>
    <div class="form-item">
      <label>Name</label>
      <input type="text" />
    </div>
    <div>
      <div class="flex">
        <button class="icon-button" title="Beef">
          <BeefIcon :size="40"></BeefIcon>
        </button>
        <button class="icon-button" title="Bread">
          <BreadIcon :size="40"></BreadIcon>
        </button>
        <button class="icon-button" title="Chicken">
          <ChickenIcon :size="40"></ChickenIcon>
        </button>
        <button class="icon-button" title="Fish">
          <FishIcon :size="40"></FishIcon>
        </button>
      </div>
      <div class="flex">
        <button class="icon-button" title="Noodles">
          <NoodlesIcon :size="40"></NoodlesIcon>
        </button>
        <button class="icon-button" title="Pasta">
          <PastaIcon :size="40"></PastaIcon>
        </button>
        <button class="icon-button" title="Pork">
          <PorkIcon :size="40"></PorkIcon>
        </button>
        <button class="icon-button" title="Potato">
          <PotatoIcon :size="40"></PotatoIcon>
        </button>
        <button class="icon-button" title="Rice">
          <RiceIcon :size="40"></RiceIcon>
        </button>
      </div>
      <div class="flex">
        <button class="icon-button" title="Vegetarian">
          <VegetarianIcon :size="40"></VegetarianIcon>
        </button>
      </div>
    </div>
  </form>
</template>
