import { Fragment, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Line, Chart } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import { DateTime as dt } from "luxon";
import { loadRecords } from "../../actions/record";

function Plot({ records, plot }) {
  const plotRef = useRef();
  const data = {
    datasets: records
      .filter((saleRecord) => {
        return plot.plotItems.includes(saleRecord.productId);
        // saleRecord.record.length > 0
      })
      .filter((saleRecord) => {
        return saleRecord.record.length > 0;
      })

      .map((saleRecord) => {
        return {
          label: saleRecord.productName,
          data: saleRecord.record.map((value) => {
            return {
              x: value.timestamp,
              y:
                plot.visualization == "daily"
                  ? value.daily_sells
                  : value.total_sells,
            };
          }),
          fill: false,
          backgroundColor: `rgb(${saleRecord.color[0]}, ${saleRecord.color[1]}, ${saleRecord.color[2]})`,
          borderColor: `rgb(${saleRecord.color[0]}, ${saleRecord.color[1]}, ${saleRecord.color[2]}, 0.2)`,
          tension: 0.2,
        };
      }),
  };

  useEffect(() => {
    console.log(plotRef);
  }, []);

  return (
    <Fragment>
      <section className='container-plot'>
        <Line
          type='line'
          ref={plotRef}
          data={data}
          height={150}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                position: "left",
                title: {
                  display: true,
                  text:
                    plot.visualization == "daily"
                      ? "Vendas de hora em hora"
                      : "Vendas acumuladas",
                  font: {
                    size: 16,
                  },
                },
                grid: {
                  display: true,
                  drawBorder: true,
                  drawOnChartArea: true,
                  drawTicks: true,
                  color: "rgba(120,120,120, 0.5)",
                },
              },

              x: {
                type: "time",
                distribution: "linear",
                time: {
                  unit: "day",
                  // displayFormats: {
                  //   day: "DD",
                  // },
                },
              },
            },
          }}
        />
      </section>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  plot: state.plot,
  // records: state.records,
});

export default connect(mapStateToProps)(Plot);
// export default Plot;
