import React, { useState, useEffect, useCallback } from "react"
import { uniqBy } from "lodash/fp"
import { LinearProgress } from "@material-ui/core"
import { useApi } from "../../services/api"
import { User } from "../../components/User/User"

export const Partner = ({ match }) => {
  const [{ partner, loading }, setState] = useState({ partner: {}, loading: true })
  const api = useApi()

  const fetchPartner = useCallback(async () => {
    const { params: { id } } = match
    const { body: partner } = await api.get(`/users/${id}`)
    setState({ partner, loading: false })
  }, [match])

  useEffect(() => {
    fetchPartner()
  }, [])

  const updateUser = (_partner) => {
    setState({ partner: { ...partner, ..._partner }, loading: false })
  }

  const updatePaymentAndQuotas = ({ payment, quotas: _quotas }) => {
    const quotas = uniqBy("_id", [..._quotas || [], ...partner.quotas])
    const payments = uniqBy("_id", [payment, ...partner.payments])
    setState({ partner: { ...partner, quotas, payments }, loading: false })
  }

  return (
    <>
      {loading
        ? <LinearProgress />
        : (
          <User
            user={partner}
            updateUser={updateUser}
            updatePaymentAndQuotas={updatePaymentAndQuotas}
          />
        )
      }
    </>
  )
}
