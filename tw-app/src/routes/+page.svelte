<script lang="ts">
  import DateSelector from '$lib/components/DateSelector.svelte';
  import LocationSelector from '$lib/components/LocationSelector.svelte';
  import WeatherCalendar from '$lib/components/WeatherCalendar.svelte';
  import WeatherSuggestion from '$lib/components/WeatherSuggestion.svelte';
  import { selectedDate, selectedLocation } from '$lib/stores';
  import { get } from 'svelte/store';
  import { onMount } from 'svelte';

  let weatherData: any = null;
  let currentSelection = '';

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

  // Subscribe to selectedDate and selectedLocation changes
  onMount(() => {
    const unsubscribeDate = selectedDate.subscribe(date => {
      updateCurrentSelection();
    });

    const unsubscribeLocation = selectedLocation.subscribe(location => {
      updateCurrentSelection();
    });

    return () => {
      unsubscribeDate();
      unsubscribeLocation();
    };
  });

  function updateCurrentSelection() {
    const date = get(selectedDate);
    const location = get(selectedLocation);
    if (date && location && location.country && location.place) {
      currentSelection = `${location.country}, ${location.place} in Month ${date}`;
    } else if (location && location.country && location.place){
      currentSelection = 'Please Select Month';
    } else{
      currentSelection = '';
    }
  }
</script>


<div class="container">
  <h1>WFT: Weather For Travel</h1>

  <DateSelector />
  <LocationSelector />

  <div class="status-text">{currentSelection}</div>

  <button on:click={getWeather}>Get the Weather Calendar</button>

  {#if weatherData}
    <WeatherCalendar {weatherData} />
    <WeatherSuggestion {weatherData} />
  {/if}
</div>
