<script lang="ts">
  import { selectedDate, selectedLocation } from '../stores';
  import { onMount } from 'svelte';

  export let weatherData: any[] = [];
  let selectedRange = '';

  onMount(async () => {
    // API 호출
    const response = await fetch('/api/weather', {
      method: 'POST',
      body: JSON.stringify({
        date: $selectedDate,
        location: $selectedLocation
      })
    });
    weatherData = await response.json();
  });
</script>

<div>
  <!-- 달력 표시 로직 및 weatherData에 따른 날짜 정보 출력 -->
</div>
