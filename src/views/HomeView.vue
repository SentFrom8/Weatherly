<script setup lang="ts">
  import { ref, watch } from 'vue';
  import SearchBar from '@/components/SearchBar.vue'
  import WeatherCard from '@/components/WeatherCard.vue';
  import type { ForecastData, Geolocation } from '@/types/types';
  import { fetchForecast, fetchWeather } from '@/api/functions';

  const selected = ref<Geolocation | null>(null)
  const forecast = ref<ForecastData | null>(null)

  const locationChange = async () => {
    if (selected.value) {
      let forecasts = await fetchForecast(selected.value.lat, selected.value.lon, 5)
      forecasts.list.unshift(await fetchWeather(selected.value.lat, selected.value.lon))
      forecast.value = forecasts
    }
  }

  watch(selected, () => locationChange())
</script>

<template>
  <main>
      <div class="title">
        <h1>Weatherly</h1>
        <p>Your weather companion</p>
        <SearchBar @location-click="(location) => selected = location" />
      </div>
      <WeatherCard :forecast="forecast"/>
  </main>
</template>

<style scoped>
  main {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: 
        linear-gradient(135deg, rgba(255, 244, 144, 0.15) 0%, rgba(138, 255, 248, 0.15) 100%), 
        url("/clouds.jpg");
    background-size: cover;
    background-position: 50% 45%;
    gap: 20px;
    padding-bottom: 3vh;
  }
  .title {
    text-align: center;
    width: 40rem;
    max-width: 90%;
    flex: 0 0 auto;
  }
  h1 {
    font-family: "Inria Serif", serif;
    font-size: clamp(3.5rem, 6rem, 8vw);
    font-weight: 700;
    color: rgba(0,0,0,0.78);
  }
  p {
    font-family: "Inria Serif", serif;
    font-size: clamp(1rem, 1.6rem, 4vw);
    transform: translateY(-60%);
    color: rgba(0,0,0,0.78);
    font-weight: 600;
  }
</style>
