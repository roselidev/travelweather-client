<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { selectedDate } from '../stores';
  import Swiper from 'swiper/bundle';
  import 'swiper/swiper-bundle.css';

  let swiperContainer;

  function handleMonthChange(month: string) {
    selectedDate.set(month);
  }

  onMount(() => {
    const swiper = new Swiper(swiperContainer, {
      slidesPerView: 7.5,
      spaceBetween: 0,
      freeMode: true,
      mousewheel: true,
    });
  });
</script>

<div class="cont-col">
  <div class="swiper-container" bind:this={swiperContainer}>
    <div class="swiper-wrapper">
      {#each Array(12) as _, index}
        <div class="swiper-slide">
          <button class="month-btn" on:click={() => handleMonthChange((index + 1).toString().padStart(2, '0'))}>
            {index + 1}월
          </button>
        </div>
      {/each}
    </div>
  </div>
</div>