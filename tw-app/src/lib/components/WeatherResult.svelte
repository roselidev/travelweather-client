<script lang="ts">
  import { start_month, end_month, country, city } from '../stores';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  export let weatherData: any = {};
  let s_month: string | null = null;
  let e_month: string | null = null;
  let _country: string | null = null;
  let _city: string | null = null;

  // Utility function to get month name from month number
  function monthStr(month: string | null): string {
    return month ? new Date(0, parseInt(month) - 1).toLocaleString('en', { month: 'long' }) : '';
  }

  // Utility function to generate a range
  function range(start: string | null, end: string | null): number[] {
    if (start && end) {
      return Array.from({ length: parseInt(end) - parseInt(start) + 1 }, (_, i) => i + parseInt(start));
    }
    return [];
  }

  onMount(() => {
    s_month = get(start_month);
    e_month = get(end_month);
    _country = get(country);
    _city = get(city);
  });

  // Utility function to format numbers to 1 decimal place
  function formatNumber(value: number): string {
    return value.toFixed(1);
  }
</script>

<div id="weather-comment">
  <h3>{weatherData['comment']}</h3>
</div>
<div id="weather-stat-cont">
  <h4>Weather history of {_city} in {monthStr(s_month)} ~ {monthStr(e_month)}</h4>
  <table id="weather-stat-calendar">
    <tr>
      {#each range(s_month, e_month) as i}
        <td>
          <b>{monthStr(i.toString().padStart(2, '0'))}</b>
          <i class={"fas " + (weatherData[i]?.emoji || "fa-sun")}></i> <!-- Default icon if not found -->
          {#if weatherData[i]?.emoji === 'fa fa-rain'}
            <p class="weather-prcp">{formatNumber(weatherData[i]?.prcp)} mm</p>
          {/if}
          <div class="weather-note">
            <p class="label">Average:</p>
            <p class="content">{formatNumber(weatherData[i]?.tavg)}°C</p>
          </div>
          <div class="weather-note">
            <p class="label">Min:</p>
            <p class="content">{formatNumber(weatherData[i]?.tmin)}°C</p>
          </div>
          <div class="weather-note">
            <p class="label">Max:</p>
            <p class="content">{formatNumber(weatherData[i]?.tmax)}°C</p>
          </div>
        </td>
      {/each}
    </tr>
  </table>
</div>
