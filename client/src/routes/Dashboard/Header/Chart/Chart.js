import React, { createRef, useEffect, memo } from "react"
import { makeStyles, useTheme } from "@material-ui/core"
import ChartJS from "chart.js"

const useStyles = makeStyles({
  container: {
    width: ({ width }) => `${width}px` || "auto"
  }
})

const _Chart = ({ totals, width }) => {
  const classes = useStyles({ width })
  const theme = useTheme()
  const ref = createRef(null)

  useEffect(() => {
    if (ref.current) {
      // eslint-disable-next-line no-new
      new ChartJS(ref.current, {
        type: "doughnut",
        data: {
          labels: ["Pagamentos recebidos", "Aguardar pagamento", "Quotas sem pagamento"],
          datasets: [{
            data: [totals.paymentReceived, totals.paymentWaiting, totals.paymentMissing],
            backgroundColor: [
              theme.palette.primary.main,
              theme.palette.primary.dark,
              theme.palette.secondary.main
            ],
            borderWidth: 1
          }]
        },
        options: {
          legend: {
            position: "right",
            labels: {
              fontSize: 16
            }
          }
        }
      })
    }
  }, [totals])

  return (
    <div className={classes.container}>
      <canvas ref={ref}></canvas>
    </div>
  )
}

export const Chart = memo(_Chart, (prev, next) => prev.totals === next.totals)
