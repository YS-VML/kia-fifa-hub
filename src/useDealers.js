import { ref, watch } from 'vue'

const GEO_URL = 'https://geo.api.gouv.fr/communes'
const DEALERS_URL = 'https://v3.insightondemand.fr/api/kia/dealers.php'

let allDealersCache = null
let fetchPromise = null

function fetchAllDealers() {
  if (allDealersCache) return Promise.resolve(allDealersCache)
  if (!fetchPromise) {
    fetchPromise = fetch(DEALERS_URL)
      .then(r => r.json())
      .then(data => { allDealersCache = data; return data })
      .catch(e => { fetchPromise = null; throw e })
  }
  return fetchPromise
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function nearestDealers(dealers, lat, lon, count = 5) {
  return dealers
    .map(d => ({ ...d, distance: haversine(lat, lon, parseFloat(d.latitude), parseFloat(d.longitude)) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, count)
}

export function useDealers(codePostalRef) {
  const dealers = ref([])
  const ville = ref('')
  const loading = ref(false)
  const error = ref('')
  let reqId = 0

  async function load(cp) {
    if (!/^\d{5}$/.test(cp)) {
      dealers.value = []
      ville.value = ''
      error.value = ''
      return
    }
    const id = ++reqId
    loading.value = true
    error.value = ''
    dealers.value = []
    try {
      const [all, communes] = await Promise.all([
        fetchAllDealers(),
        fetch(`${GEO_URL}?codePostal=${cp}&fields=centre,nom&format=json&limit=1`).then(r => r.json()),
      ])
      if (id !== reqId) return
      if (!Array.isArray(communes) || !communes[0]?.centre) {
        error.value = 'Code postal introuvable'
        return
      }
      const { lat, lon } = communes[0].centre.coordinates
        ? { lat: communes[0].centre.coordinates[1], lon: communes[0].centre.coordinates[0] }
        : { lat: communes[0].centre.lat, lon: communes[0].centre.lon }
      ville.value = communes[0].nom
      dealers.value = nearestDealers(all, lat, lon)
    } catch {
      if (id === reqId) error.value = 'Erreur lors de la recherche'
    } finally {
      if (id === reqId) loading.value = false
    }
  }

  watch(codePostalRef, cp => load(cp), { immediate: true })

  return { dealers, ville, loading, error }
}
