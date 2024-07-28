<script lang="ts">
  import DateSelector from '$lib/components/DateSelector.svelte';
  import LocationSelector from '$lib/components/LocationSelector.svelte';
  import WeatherCalendar from '$lib/components/WeatherCalendar.svelte';
  import WeatherSuggestion from '$lib/components/WeatherSuggestion.svelte';
  import { selectedDate, selectedLocation } from '$lib/stores';
  import { get } from 'svelte/store';

  let weatherData: any = null;

  async function getWeather() {
    const date = get(selectedDate);
    const location = get(selectedLocation);

    if (date && location) {
      try {
        const response = await fetch('/api/weather', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date,
            location,
          }),
        });

        if (response.ok) {
          weatherData = await response.json();
        } else {
          console.error('Error fetching weather data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    } else {
      console.warn('Date and location must be selected');
    }
  }
</script>

<div class="container">

  <h1>WFT: Weather For Travel</h1>

  <DateSelector />
  <LocationSelector />

  <button on:click={getWeather}>Get the Weather Calendar</button>

  {#if weatherData}
    <WeatherCalendar {weatherData} />
    <WeatherSuggestion {weatherData} />
  {/if}

</div>