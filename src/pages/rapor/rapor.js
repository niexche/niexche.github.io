import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";

export const Rapor = () => {
  

  return (
    <Container className="About-header">
      <Row className="mb-5 mt-3 pt-md-3">
        <Col lg="8">
          <h1 className="display-4 mb-4" style={{fontSize:40}}>Example PowerBi Report </h1>
          <hr className="t_border my-4 ml-0 text-left" />
        </Col>
      </Row>
      <iframe title="tool" width="100%" height="700" src="https://app.powerbi.com/reportEmbed?reportId=75a51d00-91ce-44f5-b8bf-84625655d2c4&autoAuth=true" frameborder="0" allowFullScreen="true"></iframe>
        
      <Row className="mb-5 mt-3 pt-md-3">
        <Col lg="12">
          <h3 style={{fontSize:20}}>Bu raporda eskiden yapmış olduğum ExLibris isimli Online kütüphane sisteminin örnek raporları yer almaktadır. Ayrıca sistemin detaylarını ve source kodunu aşşağıya bırakıyorum.</h3>
          <h3 style={{ textAlign: 'center', fontSize: 40, }}>ER Diagram</h3>
          <img height="%50" width="1080" src="..\images\er_diagram.jpg" alt="My Image" />
          <hr/>
          <h1 style={{ fontSize: 40, marginBottom: '1rem' }}>Exlibris Library Automation System</h1>
      <h4 style={{ fontSize: 25, marginBottom: '0.5rem' }}>Description:</h4>
      <p style={{ fontSize: 15, lineHeight: '1.6' }}>
        Exlibris is set to revolutionize library management with a cutting-edge online automation system designed to streamline the administration and access of library resources. This innovative web-based platform will provide a seamless and intuitive experience for both library staff and users, combining advanced technology with user-centric design to enhance operational efficiency and resource accessibility.
      </p>
      <h4 style={{ fontSize: 25, margin: '1rem 0 0.5rem' }}>Features:</h4>
      <p style={{ fontSize: 15, lineHeight: '1.6' }}>
        <strong>Advanced Catalog Management:</strong><br /><br />
        <strong>Resource Handling:</strong> Effortlessly manage a diverse range of library materials such as books, journals, articles, multimedia, and digital resources.<br /><br />
        <strong>Record Operations:</strong> Seamlessly add, update, and delete catalog entries. Customize and enrich records with detailed metadata, tags, and classifications.<br /><br />
        <strong>Status and Location Tracking:</strong> Real-time updates on the availability, status, and physical or digital location of each item to streamline inventory management.<br /><br />
        <strong>Comprehensive Admin Management:</strong><br /><br />
        <strong>User Account Administration:</strong> Create, modify, and deactivate user accounts for patrons, staff, and administrators with customizable access levels and roles.<br /><br />
        <strong>Activity Monitoring:</strong> Track and review the activities of users and staff to ensure smooth operations and compliance with library policies.<br /><br />
        <strong>Access Control:</strong> Implement granular permissions to control user access to various system features and data, enhancing security and operational efficiency.<br /><br />
        <strong>Enhanced Circulation Management:</strong><br /><br />
        <strong>Lending and Returning:</strong> Manage the borrowing and returning process for library resources, including handling renewals and extending due dates.<br /><br />
        <strong>Overdue Tracking:</strong> Automatically monitor overdue items, generate notifications for users, and apply late fees where applicable.<br /><br />
        <strong>Reservation System:</strong> Allow users to reserve items, view reservation status, and manage their reservation queue.<br /><br />
        <strong>Rating and Reviews:</strong> Enable users to rate and review items, fostering community feedback and aiding in resource discovery.<br /><br />
        <strong>Detailed Reporting and Analytics:</strong><br /><br />
        <strong>Custom Reports:</strong> Generate a variety of reports including circulation statistics, inventory status, user activity, and financial summaries.<br /><br />
        <strong>Data Visualization:</strong> Utilize charts, graphs, and dashboards to visualize key metrics and trends, facilitating data-driven decision-making.<br /><br />
        <strong>Operational Insights:</strong> Analyze resource usage patterns, user engagement, and other critical metrics to optimize library operations and service offerings.<br /><br />
        <strong>Robust Security and Access Control:</strong><br /><br />
        <strong>User Authentication:</strong> Secure the system with advanced authentication mechanisms, including single sign-on (SSO) and multi-factor authentication (MFA).<br /><br />
        <strong>Permission Management:</strong> Define and enforce access levels and permissions to protect sensitive information and restrict unauthorized access.<br /><br />
        <strong>Data Protection:</strong> Implement encryption and other security measures to safeguard library data and ensure privacy compliance.
      </p>
          <hr className="t_border my-4 ml-0 text-left" />
        </Col>
      </Row>
    </Container>
);
};
