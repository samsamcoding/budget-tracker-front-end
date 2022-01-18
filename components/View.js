import React from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";

/**
 * Boilerplate code for pages, included with
 * @param {String} title 'The page title.'
 * @param {Component[]} children 'Components declared within the <View> component.'
 */

const View = ({ title, children }) => {
  //children parameter - reserved keyword that contains the child/sub components of another component
  return (
    <React.Fragment>
      <Head>
        <title key="title-tag">{title}</title>
        <meta
          key="title-meta"
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <Container className="mt-2 pt-4 mb-2">{children}</Container>
    </React.Fragment>
  );
};

export default View;
