const { MbReferenceId } = require("../models/mbReferenceId")

const right = (value, n) => String(value).substring(String(value).length, String(value).length - n)

const mid = (value, index, n) => String(value).substring(index, index + n)

const getId = async (value) => {
  const mbRefId = await MbReferenceId.findOne({ value })
  if (mbRefId) {
    mbRefId.refID += 1
    mbRefId.save()
    return mbRefId.refID.toString().padStart(4, "0")
  }

  MbReferenceId.create({ value })

  return "0000"
}

/**
 * getPaymentRef ...
 * @param {String} ententy
 * @param {String} subEntety
 * @param {Number} value
 */
const getPaymentRef = async (ententy, subEntety, value) => {
  const refId = await getId(value)
  const entCalc = (51 * parseInt(String(ententy).charAt(0), 10)
    + 73 * parseInt(String(ententy).charAt(1), 10)
    + 17 * parseInt(String(ententy).charAt(2), 10)
    + 89 * parseInt(String(ententy).charAt(3), 10)
    + 38 * parseInt(String(ententy).charAt(4), 10)
  )

  const sTMP = String(right(`000${subEntety.toString()}`, 3)
    + right(`0000${refId.toString()}`, 4)
    + right(`00000000${(parseFloat(value) * 100).toFixed(0)}`, 8))

  let iCheckDigits = (parseInt(entCalc, 10)
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
    + 62 * parseInt(sTMP.charAt(0), 10)) % 97

  iCheckDigits = 98 - iCheckDigits

  const position1 = right(`000${subEntety}`, 3)
  const position2 = mid(right(`0000${refId}`, 4), 0, 3)
  const position3 = mid(right(`0000${refId}`, 4), 3, 1)
  const position4 = right(`00${iCheckDigits.toString()}`, 2)
  const reference = `${position1} ${position2} ${position3}${position4}`

  return { reference, refId }
}

module.exports = { getPaymentRef }
