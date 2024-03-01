<template>
  <div id="app" class="container mt-5">
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
          value="2019-08-01"
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
          value="2019-08-31"
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
  </div>
</template>

<script>
import NewsApi from '@/api/news.js'

export default {
  data() {
    return {
      query_term: '',
      interval: 0,
      intervalUnit: 'd',
      after: '',
      before: '',
      apiData: []
    }
  },
  methods: {
    submitForm() {
      const requestData = {
        query_term: this.query_term,
        interval: `${this.interval}${this.intervalUnit}`,
        // NOTE: The API expects timestamps in milliseconds
        // we should shift the start date to the beginning of the day
        // and the end date to the end of the day
        // but for simplicity, we'll just use the default time
        after: this.dateToTimestamp(this.after),
        before: this.dateToTimestamp(this.before)
      }

      NewsApi.fetchData(requestData)
        .then((data) => {
          console.log(data)
          this.apiData = data
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    },

    dateToTimestamp(dateString) {
      // Convert date string to milliseconds
      const date = new Date(dateString)
      return date.getTime()
    }
  }
}
</script>
