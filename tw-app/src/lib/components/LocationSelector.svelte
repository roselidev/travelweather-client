<script lang="ts">
  import { writable } from 'svelte/store';
  import { selectedLocation } from '../stores';

  let mode: 'simple' | 'detailed' = 'simple';
  let countries = ['USA', 'JAP', 'CHN', 'CA', 'AUC'];
  let locations = {
    'KOR': ['Seoul', 'Busan', 'Incheon'],
    'USA': ['New York', 'Los Angeles', 'Chicago'],
    'JAP': ['Tokyo', 'Osaka', 'Kyoto'],
    'CHN': ['Beijing', 'Nanjing', 'Shanghai'],
    'CA': ['Toronto', 'Vancouber', 'Ottawa'],
    'AUC': ['Sydney', 'Melbourne', 'Perth']
  };
  let selectedCountry = 'USA';
  let selectedPlace = 'New York';

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

  function handleCountLocChange(event: Event){
    const target = event.target as HTMLSelectElement;
    selectedCountry = target.value.split("-")[0];
    selectedPlace = target.value.split("-")[1];
    selectedLocation.set({ country: selectedCountry, place: selectedPlace })
  }
</script>

<div class="cont-bar">
  {#if mode === 'simple'}
    <button on:click={handleCountLocChange} value="USA-New York">미국 뉴욕</button>
    <button on:click={handleCountLocChange} value="JAP-Tokyo">일본 도쿄</button>
    <button on:click={handleCountLocChange} value="CHN-Beijing">중국 베이징</button>
    <button on:click={handleCountLocChange} value="CA-Vancouber">캐나다 벤쿠버</button>
    <button on:click={handleCountLocChange} value="AUC-Sydney">호주 시드니</button>
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
  
<div> 
  {selectedCountry}
  {selectedPlace} 
</div>