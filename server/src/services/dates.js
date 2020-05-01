const getDate = (dateString, addDays = 0) => {
  if (!dateString) {
    return null
  }
  const date = new Date(dateString)
  date.setDate(date.getDate() + addDays)
  return date
}

const filterByDates = ({ dateStart, dateEnd, field }) => {
  if (!field) {
    return {}
  }

  const now = new Date()
  const yearInit = new Date(`${now.getFullYear()}-01-01`)
  return {
    [field]: {
      $gte: getDate(dateStart) || yearInit,
      $lte: getDate(dateEnd, 1) || now
    }
  }
}

module.exports = {
  filterByDates
}
