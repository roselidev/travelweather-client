<script lang="ts">
  import { writable } from 'svelte/store';
  import { selectedLocation } from '../stores';
  import { onMount } from 'svelte';
  import Swiper from 'swiper/bundle';
  import 'swiper/swiper-bundle.css';

  let swiperContainer;

  let mode: 'simple' | 'detailed' = 'simple';
  let locations = {};
  let countries = [];
  let selectedCountry = '';
  let selectedPlace = '';

  let randomCountries = [];
  
  function handleCountryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    selectedCountry = target.value;
    selectedPlace = locations[selectedCountry][0];
  }

  function handleLocationChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    selectedPlace = target.value;
    selectedLocation.set({ country: selectedCountry, place: selectedPlace });
  }

  function handleCountLocChange(event: Event) {
    const target = event.currentTarget as HTMLButtonElement;
    selectedCountry = target.value.split("-")[0];
    selectedPlace = target.value.split("-")[1];
    selectedLocation.set({ country: selectedCountry, place: selectedPlace });
  }

  function shuffleAndSelectCountries() {
      let shuffled = countries.sort(() => 0.5 - Math.random());
      randomCountries = shuffled.slice(0, 5);
  }

  onMount(async () => {
      const response = await fetch('/locations.json');
      locations = await response.json();
      countries = Object.keys(locations);
      selectedCountry = countries[0];
      selectedPlace = locations[countries[0]];
      shuffleAndSelectCountries();

      new Swiper(swiperContainer, {
        slidesPerView: '1.5',
        spaceBetween: 0,
        freeMode: true,
        mousewheel: true,
      });
  });
</script>

<div class="cont-col">
  {#if mode === 'simple'}
    <div class="swiper-container" bind:this={swiperContainer}>
      <div class="swiper-wrapper">
        {#each randomCountries as country}
          <div class="swiper-slide">
            <button on:click={handleCountLocChange} value={`${country}-${locations[country]}`}>
                {country} {locations[country]}
            </button>
          </div>
        {/each}
      </div>
    </div>
    <button on:click={() => mode = 'detailed'}>상세선택</button>
  {:else}
    <select on:change={handleCountryChange}>
      {#each countries as country}
        <option value="{country}">{country}</option>
      {/each}
    </select>
    <select on:change={handleLocationChange}>
      {#each locations[selectedCountry] as place}
        <option value="{place}">{place}</option>
      {/each}
    </select>
    <button on:click={() => mode = 'simple'}>간편선택</button>
  {/if}
</div>