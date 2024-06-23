<script lang="ts">
    import { onMount } from 'svelte';
    import { getRecCity, getCity } from '$lib/api';
    import { writable } from 'svelte/store';

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let start_month: string | null = null;
    let end_month: string | null = null;
    let selectedCity: string | null = null;
    let cityData: any = null;
    let recommendedCities: string[] = [];

    const fetchRecommendedCities = async () => {
        recommendedCities = await getRecCity(start_month, end_month);
    };

    onMount(fetchRecommendedCities);

    $: if (start_month && end_month) {
        fetchRecommendedCities();
    }

    const selectMonth = (month: string) => {
        if (!start_month) {
            start_month = month;
        } else if (!end_month) {
            end_month = month;
        } else {
            start_month = month;
            end_month = null;
        }
    };

    const getMonthIndex = (month: string) => months.indexOf(month);

    const isInRange = (month: string) => {
        if (!start_month || !end_month) return false;
        const startIndex = getMonthIndex(start_month);
        const endIndex = getMonthIndex(end_month);
        const currentIndex = getMonthIndex(month);
        return currentIndex >= startIndex && currentIndex <= endIndex;
    };

    const selectCity = async (city: string) => {
        selectedCity = city;
        cityData = await getCity(city);
    };

    const closePopup = () => {
        selectedCity = null;
        cityData = null;
    };
</script>

<svelte:head>
    <title>Travel Weather</title>
</svelte:head>

<div class="container">
    <h1>Plan Your Trip With Weather Forecast!</h1>
    <h1>🏖 Choose your vacation month</h1>
    <section>
        {#if start_month || end_month}
            <button class="refresh" on:click={() => { start_month = null; end_month = null; }}>🔄</button>
        {/if}
        <div class="month-grid">
            {#each months as month}
                <button 
                    type="button"
                    class:month
                    class:selected={month === start_month || month === end_month}
                    class:range={isInRange(month)}
                    on:click={() => selectMonth(month)}
                    aria-label={`Select ${month}`}
                >
                    {month}
                </button>
            {/each}
        </div>
    </section>
    <section>
        <h2>Recommended Cities</h2>
        <div class="city-flex">
            {#each recommendedCities as city}
                <button 
                    type="button"
                    class="city-tag" 
                    on:click={() => selectCity(city)}
                    aria-label={`Select ${city}`}
                >
                    {city}
                </button>
            {/each}
        </div>
    </section>
    {#if selectedCity && cityData}
        <div class="popup-backdrop" on:click={closePopup}></div>
        <div class="popup">
            <button on:click={closePopup}>Close</button>
            <h1>{cityData.name}</h1>
            <img src={cityData.image} alt={cityData.name} width="500px" />
            <p>{cityData.description}</p>
            <section>
                {#each cityData.weather as weather}
                    <div>
                        <div>{weather.month}</div>
                        <div>{weather.grade}</div>
                        <div>{weather.comment}</div>
                    </div>
                {/each}
            </section>
        </div>
    {/if}
</div>
