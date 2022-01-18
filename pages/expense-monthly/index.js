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
  const [monthlyExpense, setmonthlyExpense] = useState([]);
  useEffect(() => {
    if (records.length) {
      setmonthlyExpense(
        months.map((month) => {
          let expense = 0;
          records.forEach((record) => {
            if (
              moment(record.dateCreated).format("MMMM") === month &&
              record.categoryType === "Expense"
            ) {
              expense += parseInt(record.amount);
            }
          });
          return expense;
        })
      );
    }
  }, [records]);

  const data = {
    labels: months,
    datasets: [
      {
        label: "per month",
        backgroundColor: "rgba(255, 0, 0, 0.6)",
        borderColor: "#ff3b30",
        borderWidth: 1,
        fill: true,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: monthlyExpense,
      },
    ],
  };

  return (
    <React.Fragment>
      <Col xs={8} lg={9} id="page-content-wrapper">
        <h1 className="text-center darkTextColor m-2">Expenses</h1>
        <Container>
          <Line data={data} />
        </Container>
      </Col>
    </React.Fragment>
  );
}
