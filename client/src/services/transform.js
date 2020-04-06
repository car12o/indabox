import { compose, entries, map, join } from "lodash/fp"

export const formatDate = (date) => new Date(date).toLocaleString("pt-PT")

export const toQueryString = compose(
  (str) => (str ? `?${str}` : ""),
  join("&"),
  map(([key, value]) => `${key}=${value}`),
  entries
)
