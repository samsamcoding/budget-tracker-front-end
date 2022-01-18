import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { RecordContext } from "../../RecordContext";
import { Line } from "react-chartjs-2";
import { Form, Col, Row, Container } from "react-bootstrap";
const index = () => {
  var getDaysBetweenDates = function (startDate, endDate) {
    console.log(startDate);
    var now = startDate.clone(),
      dates = [];

    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format("MM/DD/YYYY"));
      now.add(1, "days");
    }
    return dates;
  };

  const [betweenDates, setBetweenDates] = useState("");
  const [startDate, setStartDate] = useState(moment().subtract(7, "d"));
  const [endDate, setEndDate] = useState(moment());

  useEffect(() => {
    setBetweenDates(getDaysBetweenDates(moment(startDate), moment(endDate)));
  }, [startDate, endDate]);

  const { records } = useContext(RecordContext);
  const [balance, setBalance] = useState([]);

  useEffect(() => {
    if (records.length) {
      setBalance(
        betweenDates.map((day) => {
          let bal = [];
          const transBalance = records.filter(
            (record) => moment(record.dateCreated).format("MM/DD/YYYY") === day
          );
          return transBalance[0]?.transactionBalance ?? 0;
          records.forEach((record) => {
            if (moment(record.dateCreated).format("MM/DD/YYYY") === day) {
              bal.push(record.transactionBalance);
            } else {
              bal.push(1);
            }
          });

          return bal;
        })
      );
    }
  }, [records, betweenDates]);

  const data = {
    labels: betweenDates,
    datasets: [
      {
        label: "Daily Balance Trend",
        backgroundColor: "rgba(0, 255, 0, 0.29)",
        borderColor: "#52734d",
        borderWidth: 1,
        fill: true,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: balance,
      },
    ],
  };

  return (
    <Col xs={8} lg={9} id="page-content-wrapper">
      <h1 className="text-left darkTextColor m-2">Balance Trend</h1>

      <Container>
        <Row className="darkTextColor">
          <Col lg={6}>
            <Form.Group controlId="startDate" className="m-0">
              <Form.Label>From:</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group controlId="startDate" className="m-0">
              <Form.Label>To:</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>
      <Container>
        <Line data={data} />
      </Container>
    </Col>
  );
};

export default index;
