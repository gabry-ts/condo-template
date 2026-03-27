import { useState, useMemo } from 'react'

export default function useSort(data, defaultKey = null, defaultDir = 'asc') {
  const [sortKey, setSortKey] = useState(defaultKey)
  const [sortDir, setSortDir] = useState(defaultDir)

  const toggle = (key) => {
    if (sortKey === key) {
      setSortDir((d) => d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc')
      if (sortDir === 'desc') setSortKey(null)
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return data
    return [...data].sort((a, b) => {
      let va = a[sortKey]
      let vb = b[sortKey]
      if (va == null) return 1
      if (vb == null) return -1
      if (typeof va === 'string') { va = va.toLowerCase(); vb = vb.toLowerCase() }
      if (va < vb) return sortDir === 'asc' ? -1 : 1
      if (va > vb) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortKey, sortDir])

  const getSorted = (key) => sortKey === key ? sortDir : null

  return { sorted, toggle, getSorted }
}
