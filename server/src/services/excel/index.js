const path = require("path")
const { compose, orderBy, head, getOr } = require("lodash/fp")
const ExcelJS = require("exceljs")
const { User } = require("../../user")
require("../../quota")
require("../../payment")
const { userRolesText } = require("../../constants")

const getColumns = () => {
  const columns = [
    { header: "Nº de sócio", key: "number" },
    { header: "Titulo", key: "title" },
    { header: "Nome", key: "firstName" },
    { header: "Apelido", key: "lastName" },
    { header: "NIF", key: "nif" },
    { header: "Email", key: "email" },
    { header: "Nº de cédula", key: "ballotNumber" },
    { header: "Especialidade profissional", key: "specialty" },
    { header: "Secções especializadas", key: "specialtySessions" },
    { header: "Morada", key: "addressRoad" },
    { header: "Cidade", key: "addressCity" },
    { header: "Codigo Postal", key: "addressPostCode" },
    { header: "Pais", key: "addressCountry" },
    { header: "Telefone", key: "phone" },
    { header: "Telemovel", key: "mobile" },
    { header: "Notas", key: "notes" },
    { header: "Nome (Facturacao)", key: "billingName" },
    { header: "NIF (Facturacao)", key: "billingNif" },
    { header: "Morada (Facturacao)", key: "billingAddressRoad" },
    { header: "Cidade (Facturacao)", key: "billingAddressCity" },
    { header: "Codigo Postal (Facturacao)", key: "billingAddressPostCode" },
    { header: "Pais (Facturacao)", key: "billingAddressCountry" },
    { header: "Inativo", key: "deletedAt" },
    { header: "Tipo de Sócio", key: "role" },
    { header: "Ano de início", key: "initYear" }
  ]

  for (let i = 2014; i <= (new Date()).getFullYear(); i += 1) {
    columns.push(
      { header: `${i} valor`, key: `${i}value` },
      { header: `${i} pago`, key: `${i}status` }
    )
  }

  return columns
}

const insertUserRow = (sheet, user) => {
  sheet.addRow({
    number: user.number,
    title: user.title,
    firstName: user.firstName,
    lastName: user.lastName,
    nif: user.nif,
    email: user.email,
    ballotNumber: user.ballotNumber,
    specialty: user.specialty,
    specialtySessions: user.specialtySessions,
    addressRoad: user.address.road,
    addressCity: user.address.city,
    addressPostCode: user.address.postCode,
    addressCountry: user.address.country,
    phone: user.phone,
    mobile: user.mobile,
    notes: user.notes,
    billingName: user.billing.name,
    billingNif: user.billing.nif,
    billingAddressRoad: user.billing.address.road,
    billingAddressCity: user.billing.address.city,
    billingAddressPostCode: user.billing.address.postCode,
    billingAddressCountry: user.billing.address.country,
    deletedAt: user.deletedAt ? "sim" : "não",
    role: userRolesText[user.role],
    initYear: compose(
      getOr("", "year"),
      head,
      orderBy("year")("asc")
    )(user.quotas || []),
    ...(user.quotas
      ? user.quotas.reduce((accm, quota) => ({
        ...accm,
        [`${quota.year}value`]: quota.value,
        [`${quota.year}status`]: quota.payment && quota.payment.status === 0 ? "sim" : "não"
      }), {})
      : {}
    )
  }).commit()
}

const excelExport = async (role) => {
  const filename = `socios-${Date.now()}.xlsx`
  const filePath = path.resolve(path.join(__dirname, filename))
  const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
    filename: filePath,
    useStyles: true,
    useSharedStrings: true
  })
  const sheet = workbook.addWorksheet("socios")
  sheet.columns = getColumns()
  sheet.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "b7e1cd" }
  }

  const ids = await User.find({ role: { $gte: role } }).select("_id").exec()
  // eslint-disable-next-line no-restricted-syntax
  for (const _id of ids) {
    // eslint-disable-next-line no-await-in-loop
    const user = await User.get({ _id })
    insertUserRow(sheet, user)
  }

  await workbook.commit()

  return {
    filename,
    filePath
  }
}

module.exports = {
  excelExport
}
