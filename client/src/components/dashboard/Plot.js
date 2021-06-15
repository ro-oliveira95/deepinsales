import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import { DateTime as dt } from "luxon";

function Plot({ records }) {
  // console.log(records);
  const data = {
    datasets: records
      .filter((saleRecord) => {
        return saleRecord.record.length > 0;
      })
      .map((saleRecord) => {
        return {
          label: saleRecord.productName,
          data: saleRecord.record.map((value) => {
            // return { x: dt.fromISO(value.timestamp), y: value.total_sells };
            return { x: value.timestamp, y: value.total_sells };
          }),
          fill: false,
          backgroundColor: `rgb(${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )})`,
          borderColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, 0.2)`,
          tension: 0.2,
        };
      }),
    // datasets: [
    //   {
    //     // label: records[2].productName,
    //     // data: records[2].record.map((value) => {
    //     //   return { x: value.timestamp, y: value.total_sells };
    //     // }),
    //     label: "test",
    //     data: [
    //       { x: 1, y: 1 },
    //       { x: 2, y: 3 },
    //       { x: 3, y: 6 },
    //     ],
    //     fill: false,
    //     backgroundColor: "rgb(255, 99, 132)",
    //     borderColor: "rgba(255, 99, 132, 0.2)",
    //   },
    // ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      x: [
        {
          type: "time",
          time: {
            // unit: "day",
            // displayFormats: {
            //   day: "DD/MM hha",
            // },
            tooltipFormat: "DD T",
          },
        },
      ],
    },
  };
  return (
    <Fragment>
      <section className='container-plot'>
        <Line
          data={data}
          options={options}
          height={150}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            scales: {
              yAxes: [
                {
                  position: "left",
                  id: "y-axis-0",
                  ticks: {
                    beginAtZero: true,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Acumuladas",
                  },
                },
                {
                  position: "right",
                  id: "y-axis-1",
                  ticks: {
                    beginAtZero: true,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Diárias",
                  },
                },
              ],
              xAxes: [
                {
                  type: "time",
                  time: {
                    unit: "day",
                    displayFormats: {
                      day: "DD/MM hha",
                    },
                  },
                },
              ],
            },
          }}
        />
      </section>
    </Fragment>
  );
}

export default Plot;
