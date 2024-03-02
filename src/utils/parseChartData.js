export function parseNewsData(data) {
  if (!data) {
    return {
      labels: [],
      datasets: []
    }
  }

  const channelNames = Array.from(
    new Set(data.flatMap((item) => item.second_agg.buckets.map((bucket) => bucket.key)))
  )

  const datasets = channelNames.map((channel) => ({
    label: channel,
    backgroundColor: getRandomColor(),
    data: data.map((item) => {
      const channelData = item.second_agg.buckets.find((bucket) => bucket.key === channel)
      return channelData ? channelData.doc_count : 0
    })
  }))

  const formattedDates = data.map(
    (item) => new Date(item.key_as_string).toISOString().split('T')[0]
  )
  return {
    labels: formattedDates,
    datasets: datasets
  }
}

function getRandomColor() {
  const r = () => Math.floor(Math.random() * 256)
  return `rgb(${r()}, ${r()}, ${r()})`
}
