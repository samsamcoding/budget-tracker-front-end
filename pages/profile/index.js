import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Container, Card, Button } from "react-bootstrap";
import { UserContext } from "../../UserContext";
import { RecordContext } from "../../RecordContext";

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';

export default function index() {
  const { user } = useContext(UserContext);
  const { records } = useContext(RecordContext);
  const [qoutes, setQuotes] = useState("");

  let randomNumber = Math.floor(Math.random() * 20);

  const getQuotes = () => {
    fetch("https://type.fit/api/quotes")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setQuotes(data[randomNumber]);
        console.log(data[randomNumber]);
      });
  };
  useEffect(() => {
    getQuotes();
    setQuotes({});
  }, []);

  return (
    <Col xs={10} md={11} lg={9} id="page-content-wrapper">
      <Container>
        <Row>
          <Col md={12} className="text-left pl-15">
            <Card
              className="darkTextColor my-4 "
            >
              <Container>
              <div className="profilebarIconContainer">
              <span className="profileIconBadge">
                
                <EditRoundedIcon style={{ fontSize: 30, color: "gray" }}/>
              </span>
              <div className="profileMain">
              <img
                width="150" 
                height="150"
                style={{ borderRadius: "100px", margin: "10px auto" }}
                src={user.avatar}
              />
              <h1 id="nameProfile">
                {user.firstName} {user.lastName}
              </h1>
              <p className="textProfileSmall">{user.email}</p>
              <p className="textProfileSmall">{user.mobileNo}</p>
              </div>
              </div>
              </Container>
            </Card>
          </Col>
          <Col md={12}>
            <Card
              style={{ boxShadow: "0 0 10px #7b9481" }}
              className="darkTextColor mt-4 text-left"
            >
              <p className="pt-2 pl-2 font-weight-bolder"></p>
              <p className="text-center font-italic">
              <FormatQuoteRoundedIcon style={{ fontSize: 25, color: "gray" }}/>            
              {qoutes.text}
              <FormatQuoteRoundedIcon style={{ fontSize: 25, color: "gray" }}/>
              </p>
              <p className="text-center"> - {qoutes.author || "Anonymous"}</p>
            </Card>
          </Col>
        </Row>
      </Container>
    </Col>
  );
}
