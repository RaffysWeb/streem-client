<template>
  <div id="app" class="container-fluid">
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="query_term" class="form-label">Query:</label>
        <input type="text" id="query_term" v-model="query_term" required class="form-control" />
      </div>

      <div class="mb-3">
        <label for="interval" class="form-label">Interval:</label>
        <div class="input-group">
          <input type="number" id="interval" v-model="interval" required class="form-control" />
          <select v-model="intervalUnit" class="form-select">
            <option value="h">Hour(s)</option>
            <option value="d">Day(s)</option>
            <option value="M">Month(s)</option>
            <option value="y">Year(s)</option>
          </select>
        </div>
      </div>

      <div class="mb-3">
        <label for="after" class="form-label">Start Date:</label>
        <input
          min="2019-08-01"
          max="2019-08-31"
          type="date"
          id="after"
          v-model="after"
          required
          class="form-control"
        />
      </div>

      <div class="mb-3">
        <label for="before" class="form-label">End Date:</label>
        <input
          min="2019-08-01"
          max="2019-08-31"
          type="date"
          id="before"
          v-model="before"
          required
          class="form-control"
        />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <div v-if="apiData?.datasets?.length > 0" class="mt-5">
      <BarChart :chartDataProp="apiData"></BarChart>
    </div>
  </div>
</template>

<script>
import NewsApi from '@/api/news.js'
import BarChart from '@/components/BarChart.vue'
import { parseNewsData } from '@/utils/parseChartData'

export default {
  components: {
    BarChart
  },

  data() {
    return {
      query_term: '',
      interval: 0,
      intervalUnit: 'd',
      after: '2019-08-01', // set defaults to make it easiser to test
      before: '2019-08-30',
      apiData: {}
    }
  },

  methods: {
    submitForm() {
      const requestData = {
        query_term: this.query_term,
        interval: `${this.interval}${this.intervalUnit}`,
        after: this.dateToTimestamp(this.after),
        before: this.dateToTimestamp(this.before, true)
      }

      NewsApi.fetchData(requestData)
        .then((data) => {
          this.apiData = parseNewsData(data.aggregations.first_agg.buckets)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    },

    dateToTimestamp(dateString, endOfDay = false) {
      const date = new Date(dateString)

      if (endOfDay) {
        // Set the time to the end of the day to ensure we get all the data
        date.setHours(23, 59, 59, 999)
      }

      return date.getTime()
    }
  }
}
</script>
