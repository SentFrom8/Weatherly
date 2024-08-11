<script setup lang="ts">
    import { ref, watch } from "vue"
    import { fetchLocations, debounce } from "../api/weather_data"
    import type { Geolocation } from "../types/types"


    const locations = ref<Geolocation[]>([])
    const city = ref<string>("")

    const clickFunction = (location: Geolocation) : Geolocation => {
      locations.value = []
      return location
    }

    const changeFunction = async () => {
      if (city.value) {
        locations.value = await fetchLocations(city.value)
      }
    }

    watch(city, (prev, current) => {
      if (current.length) {
        locations.value = []
      }
    })

    const changeDebounced = debounce(changeFunction, 400)
</script>

<template>
  <div>
    <input type="text" v-model="city" placeholder="Location" @input="changeDebounced" :class="{ 'input-suggestions': locations.length }"/>
    <ul>
      <li v-for="(location, index) in locations" :key="index" @click="$emit('location-click', clickFunction(location))">
        <p>{{ location.name + ", " + location.country }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  div {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  ul {
    position: absolute;
    left: 0%;
    top: 100%;
    padding: 0;
    width: 100%;
    border-radius: 0px 0px 20px 20px;
    overflow: hidden;
  }

  li {
    list-style: none;
    height: 3.5rem;
    display: flex;
    background-color: rgba(5, 35, 60, 0.5);
    font-size: 1.2rem;
    display: flex;
    align-items: center;
  }

  li:hover {
    cursor: pointer;
    background-color: gray;
  }

  p {
    margin-left: 20px;
  }

  input {
    width: 100%;
    height: 3rem;
    border: 0;
    padding: 0px 20px;
    outline: none;
    font-size: 1.5rem;
    border-radius: 40px;
  }

  .input-suggestions {
    border-radius: 40px 40px 0px 0px;
  }
</style>