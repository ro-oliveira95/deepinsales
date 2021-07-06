import { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import { DateTime as dt } from "luxon";
import { loadRecords } from "../../actions/record";

function Plot({ records, plot }) {
  const data = {
    datasets: records
      .filter((saleRecord) => {
        return plot.plotItems.includes(saleRecord.productId);
      })
      .filter((saleRecord) => {
        return saleRecord.record.length > 0;
      })
      .map((saleRecord) => {
        return {
          label: saleRecord.productName,
          data: saleRecord.record.map((value) => {
            return { x: value.timestamp, y: value.total_sells };
          }),
          fill: false,
          backgroundColor: `rgb(${saleRecord.color[0]}, ${saleRecord.color[1]}, ${saleRecord.color[2]})`,
          borderColor: `rgb(${saleRecord.color[0]}, ${saleRecord.color[1]}, ${saleRecord.color[2]}, 0.2)`,
          tension: 0.2,
        };
      }),
  };

  return (
    <Fragment>
      <section className='container-plot'>
        <Line
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
                  text: "Vendas acumuladas",
                  font: {
                    size: 16,
                  },
                },
              },
              x: {
                type: "time",
                // time: {
                //   unit: "day",
                //   displayFormats: {
                //     day: "DD",
                //   },
                // },
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
});

export default connect(mapStateToProps)(Plot);
// export default Plot;
