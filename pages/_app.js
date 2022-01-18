import React, { useState, useEffect, useContext } from "react";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { UserProvider } from "../UserContext";
import SideBar from "../components/SideBar";

import Head from "next/head";

import { CategoryProvider } from "../CategoryContext";
import { RecordProvider } from "../RecordContext";

export default function App({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      {/* Wrap the component tree within the UserProvider context provider so that components will have access to the passed in values here */}
      <UserProvider>
        <CategoryProvider>
          <RecordProvider>
            <NavBar />
            <Container fluid>
              <Row>
                <SideBar />
                <Component {...pageProps} />
              </Row>
            </Container>
          </RecordProvider>
        </CategoryProvider>
      </UserProvider>
    </React.Fragment>
  );
}
