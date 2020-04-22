const userRoles = {
  root: 0,
  admin: 10,
  holder: 20,
  adherent: 30
}

const userRolesText = {
  [userRoles.root]: "Root",
  [userRoles.admin]: "Admin",
  [userRoles.holder]: "Titular",
  [userRoles.adherent]: "Aderente"
}

const userTitles = {
  dr: "Dr.",
  dra: "Dra."
}

const userCountries = {
  pt: "Portugal",
  en: "Inglaterra",
  fr: "França",
  gr: "Alemannha",
  es: "Espanha"
}

const paymentStatus = {
  paid: 0,
  unpaid: 10,
  canceled: 20
}

const paymentTypes = {
  imported: "Importado",
  manual: "Manual",
  mb: "Referencia MB"
}

module.exports = {
  userRoles,
  userRolesText,
  userTitles,
  userCountries,
  paymentStatus,
  paymentTypes
}
