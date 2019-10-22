import request from "../../services/request"
import { cleanUserToSubmit } from "../../services/transform"

export function getUser(id) {
  const req = {
    type: "UPDATE_USER_STATE",
    url: `/users/${id}`,
    method: "GET"
  }

  return request(req)
}

export function updateUserIdentification(user) {
  const body = cleanUserToSubmit(user, [
    "title",
    "firstName",
    "lastName",
    "role",
    "number",
    "nif",
    "email",
    "password",
    "rePassword",
    "ballotNumber",
    "specialty",
    "specialtySessions",
    "alerts",
    "newsletter"
  ])

  const req = {
    type: "UPDATE_USER_STATE",
    url: `/users/${user.id}`,
    method: "PATCH",
    body
  }

  return request(req)
}

export function updateUserContact(user) {
  const body = cleanUserToSubmit(user, [
    "address",
    "mobile",
    "phone",
    "billing"
  ])

  const req = {
    type: "UPDATE_USER_STATE",
    url: `/users/${user.id}`,
    method: "PATCH",
    body
  }

  return request(req)
}

export function updateUserNotes(user) {
  const body = cleanUserToSubmit(user, ["notes"])

  const req = {
    type: "UPDATE_USER_STATE",
    url: `/users/${user.id}`,
    method: "PATCH",
    body
  }

  return request(req)
}

export function setUserProperty(path, value) {
  return {
    type: "SET_PROPERTY",
    path,
    value
  }
}

export function login(email, password) {
  const req = {
    type: "UPDATE_USER_STATE",
    url: "/login",
    method: "POST",
    body: { email, password }
  }

  return request(req)
}

export function logout() {
  const req = {
    type: "UPDATE_USER_STATE",
    url: "/logout",
    method: "GET"
  }

  return request(req)
}

// export function generatePayment(type, quotas) {
//   const req = {
//     type: "UPDATE_PARTNER",
//     url: "/payments",
//     method: "POST",
//     body: { type, quotas }
//   }

//   return request(req)
// }

// export function cancelPayment(paymentId) {
//   const req = {
//     type: "UPDATE_PARTNER",
//     url: `/payments/${paymentId}`,
//     method: "DELETE"
//   }

//   return request(req)
// }

// export function togglePartnerQuoteSelected(ids) {
//   return {
//     type: "TOGGLE_PARTNER_QUOTE_SELECTED",
//     ids
//   }
// }

// export function setPaymentInvoiceStatus(paymentId, status) {
//   const req = {
//     type: "SET_PAYMENT_INVOICE_STATUS",
//     url: `/payments/invoice/${paymentId}`,
//     method: "PATCH",
//     body: { invoiceEmited: status }
//   }

//   return request(req)
// }
