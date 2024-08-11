<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { start_month, end_month } from '../stores';
  import Swiper from 'swiper/bundle';
  import 'swiper/swiper-bundle.css';

  let swiperContainer;
  let first_click = true;

  // Writable stores to track the selected start and end months
  const selectedStartMonth = writable<string | null>(null);
  const selectedEndMonth = writable<string | null>(null);

  function handleMonthChange(month: string) {
    if (first_click) {
      start_month.set(month);
      selectedStartMonth.set(month);
      first_click = false;
    } else {
      end_month.set(month);
      selectedEndMonth.set(month);
    }
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
          <button 
            class="month-btn" 
            class:selected-start={$selectedStartMonth === (index + 1).toString().padStart(2, '0')}
            class:selected-end={$selectedEndMonth === (index + 1).toString().padStart(2, '0')}
            on:click={() => handleMonthChange((index + 1).toString().padStart(2, '0'))}>
            {index + 1}월
          </button>
        </div>
      {/each}
    </div>
  </div>
</div>
