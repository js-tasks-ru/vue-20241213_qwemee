import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',
  data() {
    return {
      weatherData: []
    };
  },

  methods: {
    fetchWeatherData() {
      return getWeatherData();
    },

    getWeatherIcon(conditionId) {
      return WeatherConditionIcons[conditionId];
    },
    
    convertTimeToDate(timeString) {
      const [hours, minutes] = timeString.split(':').map(Number);
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      return date;
    },

    checkTime(item) {
      const currentTime = this.convertTimeToDate(item.current.dt)
      const sunset = this.convertTimeToDate(item.current.sunset);
      const sunrise = this.convertTimeToDate(item.current.sunrise);
      return !((currentTime < sunset) && (currentTime > sunrise));
    }
  },
  
  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>
      <ul class="weather-list unstyled-list">
        <li 
          v-for="item in fetchWeatherData()" 
          class="weather-card" 
          :class="{ 'weather-card--night': checkTime(item)}" 
        >
          <div class="weather-alert" v-if="item.alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{item.alert.sender_name + ' : ' + item.alert.description}}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{item.geographic_name}}
            </h2>
            <div class="weather-card__time">
              {{item.current.dt}}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="item.current.weather.description">{{getWeatherIcon(item.current.weather.id)}}</div>
            <div class="weather-conditions__temp">{{(item.current.temp - 273.15).toFixed(1)}} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{(item.current.pressure * 0.75).toFixed(0)}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{item.current.humidity}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{item.current.clouds}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{item.current.wind_speed}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
