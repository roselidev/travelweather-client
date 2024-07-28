<script lang="ts">
  import { writable } from 'svelte/store';
  import { selectedDate } from '../stores';
  
  let mode: 'simple' | 'detailed' = 'simple';
  let currentDate = new Date();

  function handleDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    selectedDate.set(target.value);
  }
</script>

<div class="cont-bar">
  {#if mode === 'simple'}
    <input type="month" min="{currentDate.toISOString().slice(0, 7)}" on:change={handleDateChange} />
    <button class="primary" on:click={() => mode = 'detailed'}>상세선택</button>
  {:else}
    <input type="date" min="{currentDate.toISOString().slice(0, 10)}" on:change={handleDateChange} />
    <button on:click={() => mode = 'simple'}>간편선택</button>
  {/if}
</div>
