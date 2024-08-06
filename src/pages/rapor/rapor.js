import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";

export const Rapor = () => {
  

  return (
    <Container className="About-header">
      <Row className="mb-5 mt-3 pt-md-3">
        <Col lg="8">
          <h1 className="display-4 mb-4">Example PowerBi Report </h1>
          <hr className="t_border my-4 ml-0 text-left" />
        </Col>
      </Row>
      <iframe title="tool" width="100%" height="700" src="https://app.powerbi.com/reportEmbed?reportId=75a51d00-91ce-44f5-b8bf-84625655d2c4&autoAuth=true" frameborder="0" allowFullScreen="true"></iframe>
        <Col lg="8">
          <br/><br/><br/><br/><br/><br/><br/><br/>
          
          
        </Col>

    </Container>
);
};
