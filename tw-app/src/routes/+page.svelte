<script lang="ts">
  import DateSelector from '$lib/components/DateSelector.svelte';
  import LocationSelector from '$lib/components/LocationSelector.svelte';
  import WeatherResult from '$lib/components/WeatherResult.svelte';
  import { start_month, end_month, country, city } from '$lib/stores';
  import { get } from 'svelte/store';
  import { onMount } from 'svelte';

  let weatherData: any = null;
  let currentSelection = '';

  async function getWeather() {
    const s_month = get(start_month);
    const e_month = get(end_month);
    const _country = get(country);
    const _city = get(city);

    const params = new URLSearchParams({
      start_month: s_month,
      end_month: e_month,
      country: _country,
      city: _city
    });

    const response = await fetch(`/api/wether?${params.toString()}`, {
      method: 'GET'  // GET 메서드를 사용합니다.
    });
    weatherData = await response.json();
  }

  // Subscribe to selected date and location changes
  onMount(() => {
    const unsubscribeStartMonth = start_month.subscribe(e => {
      updateCurrentSelection();
    });

    const unsubscribeEndMonth = end_month.subscribe(e => {
      updateCurrentSelection();
    })

    const unsubscribeCountry = country.subscribe(e => {
      updateCurrentSelection();
    });

    const unsubscribeCity = city.subscribe(e => {
      updateCurrentSelection();
    });

    return () => {
      unsubscribeStartMonth();
      unsubscribeEndMonth();
      unsubscribeCountry();
      unsubscribeCity();
    };
  });

  function updateCurrentSelection() {
    const s_month = get(start_month);
    const e_month = get(end_month);
    const _country = get(country);
    const _city = get(city);
    if (s_month && e_month && _country && _city) {
      currentSelection = `${_country}, ${_city} in Month ${s_month} ~ ${e_month}`;
    } else if (country && city){
      currentSelection = 'Please Select Month';
    } else{
      currentSelection = '';
    }
  }

</script>


<div class="container">
  <h1>Weather For Travel</h1>

  <DateSelector />
  <LocationSelector />

  <div class="status-text">{currentSelection}</div>

  <button on:click={getWeather}>Get the weather forecast for my trip</button>

  {#if weatherData}
    <WeatherResult {weatherData} />
  {/if}
</div>
