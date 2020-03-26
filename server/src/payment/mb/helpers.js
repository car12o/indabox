const config = require("../../../config/default.json")

const IFTHEN_ENTETY = process.env.IFTHEN_ENTETY || config.IFTHEN_ENTETY
const IFTHEN_SUBENTETY = process.env.IFTHEN_SUBENTETY || config.IFTHEN_SUBENTETY

const mid = (value, index, n) => String(value).substring(index, index + n)

const right = (value, n) => String(value).substring(String(value).length, String(value).length - n)

function getPaymentRef(id, valor) {
  const ENT_CALC = 51 * parseInt(String(IFTHEN_ENTETY).charAt(0), 10)
    + 73 * parseInt(String(IFTHEN_ENTETY).charAt(1), 10)
    + 17 * parseInt(String(IFTHEN_ENTETY).charAt(2), 10)
    + 89 * parseInt(String(IFTHEN_ENTETY).charAt(3), 10)
    + 38 * parseInt(String(IFTHEN_ENTETY).charAt(4), 10)

  const sTMP = String(right(`000${IFTHEN_SUBENTETY.toString()}`, 3)
    + right(`0000${id.toString()}`, 4)
    + right(`00000000${(parseFloat(valor) * 100).toFixed(0)}`, 8))

  // eslint-disable-next-line no-mixed-operators
  const iCHECKDIGITS = 98 - (
    parseInt(ENT_CALC, 10)
    + 3 * parseInt(sTMP.charAt(14), 10)
    + 30 * parseInt(sTMP.charAt(13), 10)
    + 9 * parseInt(sTMP.charAt(12), 10)
    + 90 * parseInt(sTMP.charAt(11), 10)
    + 27 * parseInt(sTMP.charAt(10), 10)
    + 76 * parseInt(sTMP.charAt(9), 10)
    + 81 * parseInt(sTMP.charAt(8), 10)
    + 34 * parseInt(sTMP.charAt(7), 10)
    + 49 * parseInt(sTMP.charAt(6), 10)
    + 5 * parseInt(sTMP.charAt(5), 10)
    + 50 * parseInt(sTMP.charAt(4), 10)
    + 15 * parseInt(sTMP.charAt(3), 10)
    + 53 * parseInt(sTMP.charAt(2), 10)
    + 45 * parseInt(sTMP.charAt(1), 10)
    + 62 * parseInt(sTMP.charAt(0), 10)
    // eslint-disable-next-line no-mixed-operators
  ) % 97

  const p1 = right(`000${IFTHEN_SUBENTETY}`, 3)
  const p2 = mid(right(`0000${id}`, 4), 0, 3)
  const p3 = mid(right(`0000${id}`, 4), 3, 1)
  const p4 = right(`00${iCHECKDIGITS.toString()}`, 2)
  const reference = `${p1} ${p2} ${p3}${p4}`

  return {
    id,
    ententy: IFTHEN_ENTETY,
    subEntety: IFTHEN_SUBENTETY,
    reference
  }
}

module.exports = {
  getPaymentRef
}
