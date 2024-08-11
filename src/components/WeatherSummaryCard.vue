<script setup lang="ts">
    import type { WeatherData } from "@/types/types"
    import { formatTime } from "@/api/weather_data";
    const props = defineProps<{
        weather: WeatherData;
    }>()
</script>

<template>
  <div class="card-container">
    <p>{{ formatTime(weather.dt) }}</p>
    <img :src="'https://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'" alt="test">
    <div class="temps">
        <p class="max-temp">{{ Math.round(weather.main.temp_max) }}°</p>
        <p class="min-temp">{{ Math.round(weather.main.temp_min) }}°</p>
    </div>
  </div>
</template>

<style scoped>
    .card-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        background-color: #d9d9d9cc;
        border-radius: 20px;
        font-family: "Inter", sans-serif;
    }

    .card-container p {
        transform: translateY(20%);
    }
    
    .temps {
        display: flex;
        gap: 10px;
    }

    .temps p {
        transform: translateY(-20%);
    }
</style>