import { useState, useContext, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import Swal from "sweetalert2";
import { UserContext } from "../../UserContext";
import View from "../../components/View";
import AppHelper from "../../app-helper";

// import EmailIcon from '@material-ui/icons/Email';
// import LockIcon from '@material-ui/icons/Lock';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';

export default function index() {
  return (
    <Col xs={12} id="page-content-wrapper">
      <View title={"Login"}>
        <Row className="justify-content-center">
          <Col xs md="8">
            <LoginForm />
          </Col>
        </Row>
      </View>
    </Col>
  );
}

//Login thru email
const LoginForm = () => {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  function authenticate(e) {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    fetch(`${AppHelper.API_URL}/users/login`, options)
      .then(AppHelper.toJSON)
      .then((data) => {
        console.log(data);

        if (typeof data.accessToken !== "undefined") {
          localStorage.setItem("token", data.accessToken);
          retrieveUserDetails(data.accessToken);
          
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Welcome!",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          if (data.error === "does-not-exist") {
            Swal.fire("Authentication Failed", "User does not exists", "error");
          } else if (data.error === "incorrect-password") {
            Swal.fire(
              "Authentication Failed",
              "Password is incorrect",
              "error"
            );
          } else if (data.error === "login-type-error") {
            Swal.fire(
              "Login Type Error",
              "You may have registered through a different login procedure, try alternative  login procedure",
              "error"
            );
          }
        }
      });
  }

  //Login thru google
  const authenticateGoogleToken = (response) => {
    console.log(response);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenId: response.tokenId,
      }),
    };
    fetch(`${AppHelper.API_URL}/users/verify-google-id-token`, options)
      .then(AppHelper.toJSON)
      .then((data) => {
        console.log(data);

        if (typeof data.accessToken !== "undefined") {
          localStorage.setItem("token", data.accessToken);
          retrieveUserDetails(data.accessToken);
          console.log(data.accessToken)
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Welcome!`,
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          if (data.error === "google-auth-error") {
            Swal.fire(
              "Google Auth Error",
              "Google authentication procedure failed.",
              "error"
            );
          } else if (data.error === "login-type-error") {
            Swal.fire(
              "Login Type Error",
              "You may have registered through a different login procedure.",
              "error"
            );
          }
        }
      });
  };

  const retrieveUserDetails = (accessToken) => {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    fetch(`${AppHelper.API_URL}/users/details`, options)
      .then(AppHelper.toJSON)
      .then((data) => {
        console.log(data);

        setUser({
          id: data._id,
          token: accessToken,
          ...data,
        });

        Router.push("/profile");
      });
  };

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return (
    <div style={{ 
      backgroundImage: `url("https://images.unsplash.com/photo-1622126958838-2e280164477e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80")`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      }}>
    <Card style={{ backgroundColor: "#1F2020", opacity: ".7", boxShadow: "0 0 10px #7b9481" }}>
      <Card.Body>
        <p className="input-title">
          LOGIN
        </p>
        <Form onSubmit={authenticate} >
          <Form.Group as={Row} controlId="userEmail" className="m-0">
            <Form.Label column md={2} className="text-center text-light authIcon">
              <EmailRoundedIcon style={{ fontSize: 40 }} />
            </Form.Label>
            <Col md={10} className="p-0 m-auto pb-3">
              <Form.Control
                size="lg"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                placeholder="Email Address"
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="password" className="m-0 pb-3">
            <Form.Label column md={2} className="text-center text-light authIcon">
              <LockOpenRoundedIcon style={{ fontSize: 40 }} />
            </Form.Label>
            <Col md={10} className="p-0 m-auto pb-3">
              <Form.Control
                size="lg"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </Col>
          </Form.Group>

          {isActive ? (
             <div className="text-center d-grid ">
             <Button type="submit" variant="primary" size="lg" className="authButton">
               Login
             </Button>
             </div>         
          ) : (
            <div className="text-center d-grid">
            <Button disabled variant="primary" size="lg" className="authButton text-center">
              Login
            </Button>
            </div>
          )}
          <div className="text-light">
          <GoogleLogin 
            clientId="616749084292-hki1ef97luqrgvrc0cedli2ppq7f6sjl.apps.googleusercontent.com"
            buttonText = "Login with Google"
            onSuccess={authenticateGoogleToken}
            onFailure={authenticateGoogleToken}
            cookiePolicy={"single_host_origin"}
            className="w-30 text-center d-flex justify-content-center mt-2 mx-auto authButton"
          />
          </div>

          <Form.Group as={Row} className="m-0  pb-3">
            <Form.Label column lg={12} className="text-center">
              <p className="text-center darkTextColor text-light">
                Don't have an account?{" "}
                <Link href="/register">
                  <strong>Register here.</strong>
                </Link>
              </p>
            </Form.Label>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
    </div>
  );
};
