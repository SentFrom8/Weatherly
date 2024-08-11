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
        background-color: rgba(255, 255, 255, 0.65);
        border-radius: 20px;
    }

    .card-container p {
        transform: translateY(20%);
    }

    .card-container:hover {
        cursor: pointer;
        outline: 2px solid rgba(0,0,0,0.78);
    }
    
    .temps {
        display: flex;
        gap: 10px;
    }

    .temps p {
        transform: translateY(-20%);
    }

    .max-temp {
        font-weight: 700;
    }
</style>