import axios from "axios"
import type { CurrentWeatherData, ForecastData, Geolocation, WeatherData } from '@/types/types';
 
const API_URL = "https://api.openweathermap.org"
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY


export const fetchLocations = async (city_name: string): Promise<Geolocation[]> => {
    const locations = await axios.get<Geolocation[]>(API_URL + "/geo/1.0/direct", {
        params: {
            q: city_name,
            appid: API_KEY,
            limit: 5,
            units: "metric",
        }
    }).then((result) => result.data)
    return locations
}

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
    const data = await axios.get<WeatherData>(API_URL + "/data/2.5/weather", {
        params: {
            lat: lat,
            lon: lon,
            appid: API_KEY,
            units: "metric",
        }
    }).then((result) => result.data)
    return data
}

export const fetchForecast = async (lat: number, lon: number, cnt: number): Promise<ForecastData> => {
    const data = await axios.get<ForecastData>(API_URL + "/data/2.5/forecast", {
        params: {
            lat: lat,
            lon: lon,
            appid: API_KEY,
            units: "metric",
            cnt: cnt,
        }
    }).then((result) => result.data)
    return data
}

export const debounce = (func: (...args: any[]) => void, timer: number) => {
    let timeout: NodeJS.Timeout

    return (...args: any[]) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func(args), timer)
    }
}

export const formatTime = (dt: number) => {
    const date = new Date(dt*1000)
    return date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0")
  }