import React, { useState, useEffect, useContext } from "react";
import { RecordContext } from "../../RecordContext";
import { Line } from "react-chartjs-2";
import { Col, Container } from "react-bootstrap";
import moment from "moment";

export default function index() {
  const { records } = useContext(RecordContext);
  const [months, setMonths] = useState([
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec",
  ]);
  const [monthlyIncome, setmonthlyIncome] = useState([]);
  useEffect(() => {
    if (records.length) {
      setmonthlyIncome(
        months.map((month) => {
          let income = 0;
          records.forEach((record) => {
            if (
              moment(record.dateCreated).format("MMMM") === month &&
              record.categoryType === "Income"
            ) {
              income += parseInt(record.amount);
            }
          });
          return income;
        })
      );
    }
  }, [records]);

  const data = {
    labels: months,
    datasets: [
      {
        label: "per Month",
        backgroundColor: "rgba(0, 0, 255, 0.55)",
        borderColor: "#0000ff",
        fill: true,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: monthlyIncome,
      },
    ],
  };

  return (
    <React.Fragment>
      <Col xs={8} lg={9} id="page-content-wrapper">
        <h1 className="text-center darkTextColor m-2">Income</h1>
        <Container>
          <Line data={data} />
        </Container>
      </Col>
    </React.Fragment>
  );
}
