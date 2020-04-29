export const handleRequestSort = ({ orderBy, order, setState }) => (_orderBy) => () => {
  if (orderBy === _orderBy) {
    setState({ order: order === "asc" ? "desc" : "asc" })
    return
  }
  setState({ orderBy: _orderBy, order: "asc" })
}


export const handleSelectAllClick = ({ data, selected, setState }) => () => {
  const selectable = data.filter((n) => n.selectable(n))
  if (selectable.length === selected.length) {
    setState({ selected: [] })
    return
  }
  setState({ selected: selectable.map(({ id }) => id) })
}

export const handleSelectClick = ({ selected, setState }) => (id, isSelected) => {
  if (isSelected) {
    setState({ selected: selected.filter((_id) => _id !== id) })
    return
  }
  setState({ selected: [...selected, id] })
}

export const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export const getSorting = (order, orderBy) => {
  return order === "desc" ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}
