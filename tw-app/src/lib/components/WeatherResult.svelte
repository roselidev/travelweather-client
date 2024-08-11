<script lang="ts">
  import { start_month, end_month, country, city } from '../stores';
  import { onMount } from 'svelte';

  export let weatherData: any = {};
  let selectedRange = '';

  onMount(async () => {
    const response = await fetch('/api/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        start_month: start_month,
        end_month: end_month,
        country: country,
        city: city
      })
    });
    weatherData = await response.json();
  });
  
  // Utility function to get month name from month number
  function monthStr(month: number): string {
    return new Date(0, month - 1).toLocaleString('en', { month: 'long' });
  }

  // Utility function to generate a range
  function range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  }
</script>

<div id="weather-comment">
  <h3>{weatherData['comment']}</h3>
</div>
<div id="weather-stat-cont">
  <h4>Weather history of {city} in {monthStr(start_month)} ~ {monthStr(end_month)}</h4>
  <table id="weather-stat-calendar">
    <tr>
      {#each range(start_month, end_month) as i}
        <td>
          <b>{monthStr(i)}</b>
          <i class={weatherData[i]?.emoji}></i>
          {#if weatherData[i]?.emoji === 'fa fa-cloud-rain'}
            <p class="weather-prcp">{weatherData[i]?.prcp}mm</p>
          {/if}
          <div class="weather-note">
            <p class="label">Average:</p>
            <p class="content">{weatherData[i]?.tavg}°C</p>
          </div>
          <div class="weather-note">
            <p class="label">Min:</p>
            <p class="content">{weatherData[i]?.tmin}°C</p>
          </div>
          <div class="weather-note">
            <p class="label">Max:</p>
            <p class="content">{weatherData[i]?.tmax}°C</p>
          </div>
        </td>
      {/each}
    </tr>
  </table>
</div>