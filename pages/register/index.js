import { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";

import Swal from "sweetalert2";

import View from "../../components/View";
import AppHelper from "../../app-helper";

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';

export default function index() {
  return (
    <Col xs={12} id="page-content-wrapper">
      <View title={"Register"}>
        <Row className="justify-content-center">
          <Col xs md="8">
            <RegisterForm />
          </Col>
        </Row>
      </View>
    </Col>
  );
}

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function registerUser(e) {
    e.preventDefault();

    fetch(`${AppHelper.API_URL}/users/email-exists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data === false) {
          fetch(`${AppHelper.API_URL}/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              mobileNo: mobileNo,
              email: email,
              password: password1,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);

              if (data) {
                setEmail("");
                setFirstName("");
                setLastName("");
                setMobileNo(0);
                setPassword1("");
                setPassword2("");

                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Thank you for registering with us!",
                  showConfirmButton: false,
                  timer: 1500,
                });

                Router.push("/login");
              }
            });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oopss...",
            text: "Email already exists!",
            footer: "Please provide another email or log-in",
          });
        }
      });
  }

  useEffect(() => {
    if (
      email !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      mobileNo.length === 11 &&
      password1 !== "" &&
      password2 !== "" &&
      password1 === password2
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, firstName, lastName, mobileNo, password1, password2]);

  return (
    <div style={{ 
      backgroundImage: `url("https://images.unsplash.com/photo-1622126958838-2e280164477e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80")`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      }}>
    <Card style={{ backgroundColor: "#1F2020", opacity:".7", boxShadow: "0 0 10px #7b9481" }}>
      <Card.Body>
        <p className="input-title">
          REGISTER
        </p>
        <p className="text-center text-light ">
        It’s quick and easy.
        </p>
        <Container>
          <Form onSubmit={registerUser} className="m-0  pt-2">
            <Form.Group as={Row} controlId="userEmail" className="m-0 pb-0">
              <Form.Label column xs={12} md={2} className="text-left text-light authIcon">
                <EmailRoundedIcon style={{ fontSize: 40 }} />
              </Form.Label>
              <Col xs={12} md={10} className="p-0 m-autob">
                <Form.Control
                  size="lg"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                />
              </Col>
              <Col xs={12} className="p-0 mt-0 mx-auto">
                <Form.Text className="text-right text-light m-0 pb-1">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="firstName" className="m-0  pb-3 pr-30">
              <Form.Label column xs={12} md={2} className="text-left text-light authIcon">
                <AccountCircleRoundedIcon style={{ fontSize: 40 }} />
              </Form.Label>
              <Col xs={6} md={5} className="p-0 m-auto">
                <Form.Control
                  size="lg"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  required
                />
              </Col>
              <Col xs={6} md={5} className="p-0 m-auto">
                <Form.Control
                  size="lg"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="mobileNo" className="m-0 pb-3">
              <Form.Label column xs={12} md={2} className="text-left text-light authIcon">
                <CallRoundedIcon style={{ fontSize: 40 }} />
              </Form.Label>
              <Col xs={12} md={10} className="p-0 m-auto">
                <Form.Control
                  size="lg"
                  type="number"
                  placeholder="Mobile Number"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="password1" className="m-0 pb-3">
              <Form.Label column xs={12} md={2} className="text-left text-light authIcon">
                <LockRoundedIcon style={{ fontSize: 40 }} />
              </Form.Label>
              <Col xs={12} md={10} className="p-0 m-auto">
                <Form.Control
                  size="lg"
                  type="password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  placeholder="Password"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="password2" className="m-0 pb-3">
              <Form.Label column xs={12} md={2} className="text-left text-light authIcon">
                <LockRoundedIcon style={{ fontSize: 40 }} />
              </Form.Label>
              <Col xs={12} md={10} className="p-0 m-auto">
                <Form.Control
                  size="lg"
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  placeholder="Verify Password"
                  required
                />
              </Col>
            </Form.Group>
            {isActive ? (
              <div className="text-right d-grid gap-2 ">
                <Button type="submit" variant="primary" size="lg" className="authButton">
                  Register
                </Button>
                </div>  
            ) : (
              <div className="text-right d-grid gap-2 ">
              <Button disabled variant="primary" size="lg" className="authButton">
                Register
              </Button>
              </div> 
            )}
            <Form.Group as={Row} className="mb-0">
              <Form.Label column lg={12} className="text-center">
                <p className="text-right text-light">
                  Already have an account?{" "}
                  <Link href="/login">
                    <strong>Sign in here.</strong>
                  </Link>
                </p>
              </Form.Label>
            </Form.Group>
          </Form>
        </Container>
      </Card.Body>
    </Card>
    </div> 
  );
};
