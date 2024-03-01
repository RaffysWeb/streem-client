const apiUrl = 'http://localhost:3000/results'

export default {
  async fetchData(requestData) {
    const queryParams = new URLSearchParams(requestData).toString()
    const url = `${apiUrl}?${queryParams}`

    return fetch(url).then((response) => {
      return response.json()
    })
  }
}
