<script>
  import DateSelector from '$lib/components/DateSelector.svelte';
  import LocationSelector from '$lib/components/LocationSelector.svelte';
  import WeatherCalendar from '$lib/components/WeatherCalendar.svelte';
  import WeatherSuggestion from '$lib/components/WeatherSuggestion.svelte';
  import { selectedDate, selectedLocation } from '$lib/stores';
</script>

<h1>WFT: Weather For Travel</h1>

<DateSelector />
<LocationSelector />

<button on:click={() => getWeather()}>Get the Weather Calendar</button>

{#if $selectedDate && $selectedLocation}
  <WeatherCalendar />
  <!-- 예제용 날씨 데이터 -->
  <WeatherSuggestion weather={{ good: true, okay: false }} />
{/if}
