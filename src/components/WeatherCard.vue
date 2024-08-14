<script setup lang="ts">
  import { ref, watch } from "vue";
  import type { ForecastData, WeatherData } from "../types/types";
  import { formatTime } from "@/api/functions";
  import WeatherSummaryCard from "./WeatherSummaryCard.vue";
  
  const props = defineProps<{
      forecast: ForecastData | null,
  }>()

  const selected = ref<WeatherData | null>(null)



  const currentRainPct = () => {
    if (selected.value) {
      console.log(selected.value.weather[0].id.toString())
      if (selected.value.weather[0].id.toString().match(/^[235]/)) {
        return 100
      }
    return 0
    }
  }

  watch(() => props.forecast, (current, prev) => {
    if (current) {
      console.log(current)
      selected.value=current.list[0]
    }
  })
</script>

<template>
  <div class="forecast-data-container" :class="{invisible: !forecast}">
    <div class="forecast-data-upper">
      <div class="forecast-upper-left">
        <h2>{{ selected ? Math.round(selected.main.temp) : null }}°C</h2>
        <ul>
          <li>rain: {{ (selected && selected.pop) ? selected.pop*100 : currentRainPct()}}%</li>
          <li>humidity: {{ selected?.main.humidity }}%</li>
          <li>wind: {{ selected?.wind.speed }}m/s</li>
        </ul>
      </div>
      <div class="forecast-upper-right">
        <ul>
          <li><h2>{{ selected?.weather[0].main }}</h2></li>
          <li>feels like: {{ selected ? Math.round(selected.main.feels_like) : null }}°C</li>
          <li>{{ selected ? formatTime(selected.dt) : null }}</li>
        </ul>
        <img v-if="forecast" :src="'https://openweathermap.org/img/wn/' + selected?.weather[0].icon + '@2x.png'" alt="test">
      </div>
    </div>
    <div class="forecast-data-lower">
      <WeatherSummaryCard v-for="(weather, index) in forecast?.list" :key="index" :weather="weather" @click="selected=weather"/>
    </div>
  </div>
</template>

<style scoped>
  h2 {
    font-weight: 700;
    font-size: 1.4rem;
  }

  ul {
    padding: 0px;
  }

  li {
    list-style: none;
    font-weight: 500;
  }

  img {
    display: none;
  }

  .invisible {
    visibility: hidden;
  }

  .forecast-data-container {
    background-color: rgb(146, 146, 146, 0.85);
    width: 50rem;
    max-width: 90%;
    border-radius: 40px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: 20px;
    color: rgba(0,0,0,0.78);
  }

  .forecast-data-upper {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 20px 30px 20px 30px;
    border-bottom: 1px solid rgba(64, 64, 64, 0.5);
  }

  .forecast-upper-left {
    display: flex;
    flex-direction: column;
  }


  .forecast-upper-right {
    display: flex;
  }

  .forecast-data-lower {
    display: flex;
    padding: 0px 30px 20px 30px;
    align-items: center;
    justify-content:space-between;
    flex-wrap: wrap;
    column-gap: 5px;
    row-gap: 15px;
  }

  @media only screen and (min-width: 768px) {
  img {
    display: block;
  }
  h2 {
    font-size: 1.6rem;
  }
  .forecast-upper-left {
    flex-direction: row;
    align-items: center;
  }
}

</style>