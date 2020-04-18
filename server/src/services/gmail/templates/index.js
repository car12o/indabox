const { readFileSync } = require("fs")

const mbGenerated = ({ quotas, mb }) => {
  const template = readFileSync(`${__dirname}/mbGenerated.html`).toString()

  const $quotas = quotas.map(({ year, value }) => `<tr>
  <td>${year}</td>
  <td>${value}€</td>
  </tr>`).join("")

  const message = template
    .replace("{quotas}", $quotas)
    .replace("{ententy}", mb.ententy)
    .replace("{reference}", mb.reference)
    .replace("{value}", mb.value)

  return message
}

const mbCanceled = ({ mb }) => {
  const template = readFileSync(`${__dirname}/mbCanceled.html`).toString()
  const message = template
    .replace("{ententy}", mb.ententy)
    .replace("{reference}", mb.reference)
    .replace("{value}", mb.value)

  return message
}

module.exports = {
  template: {
    mbGenerated,
    mbCanceled
  }
}
