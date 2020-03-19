import React, { useState, useEffect, useCallback } from "react"
import { LinearProgress } from "@material-ui/core"
import { get } from "../../services/api"
import { User } from "../../components/Partner/User"

export const Partner = ({ match }) => {
  const [{ partner, loading }, setState] = useState({ partner: {}, loading: true })

  const fetchPartner = useCallback(async () => {
    const { params: { id } } = match
    const { body: partner } = await get(`/users/${id}`)
    setState({ partner, loading: false })
  }, [match])

  useEffect(() => {
    fetchPartner()
  }, [])

  const updateUser = (partner) => {
    setState({ partner, loading: false })
  }

  const updatePayment = ({ _id, invoiceEmited }) => {
    const payments = partner.payments.map((payment) => (
      (payment._id === _id && { ...payment, invoiceEmited }) || payment
    ))
    setState({ partner: { ...partner, payments }, loading: false })
  }

  return (
    <>
      {loading
        ? <LinearProgress />
        : <User user={partner} updateUser={updateUser} updatePayment={updatePayment} />
      }
    </>
  )
}
