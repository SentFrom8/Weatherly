<script setup lang="ts">
    import { ref, watch } from "vue"
    import { fetchLocations, debounce } from "../api/weather_data"
    import type { Geolocation } from "../types/types"
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"


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
    <FontAwesomeIcon :icon="faMagnifyingGlass" />
    <input type="text" v-model="city" placeholder="Location" @input="changeDebounced" :class="{ 'input-suggestions': locations.length }">
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
    border-radius: 0px 0px 30px 30px;
    overflow: hidden;
    z-index: 3;
  }

  li {
    list-style: none;
    height: 3.5rem;
    display: flex;
    background: linear-gradient(90deg, rgba(166, 166, 166, 0.9) 0%, rgba(64, 64, 64, 0.9) 100%);
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    border-top: 1px solid rgba(64, 64, 64, 0.8);
    color: rgba(0, 0, 0, 0.9); 
  }

  svg {
    position: absolute;
    right: 3%;
    color: rgb(0,0,0,0.78);
    font-size: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
  }

  li:hover {
    cursor: pointer;
    background: rgba(255, 255, 255);
  }

  p {
    margin-left: 20px;
    font-weight: 500;
  }

  input {
    width: 100%;
    height: 3rem;
    border: 0;
    padding: 0px 20px;
    outline: none;
    font-size: 1.5rem;
    border-radius: 30px;
  }

  .input-suggestions {
    border-radius: 30px 30px 0px 0px;
  }
</style>