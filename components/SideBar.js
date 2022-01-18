import React, { useContext, useEffect } from "react";
import { Nav, NavLink, Col } from "react-bootstrap";

import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import BallotRoundedIcon from '@mui/icons-material/BallotRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';

import { UserContext } from "../UserContext";

const SideBar = ({ props }) => {
  const { user } = useContext(UserContext);

  return !user.id ? null : (
    <Col xs={2} md={1} lg={3} id="sidebar-wrapper">
      <Nav className="col-sm-4 col-md-12 col-lg-12 d-md-block sidebar m-0 p-0">
        <div className="sidebar-sticky"></div>
        <Nav.Item className=" darkSideBorder">
          <Nav.Link href="/profile" className="darkSideText sideBarCenterText">
            <AccountBoxRoundedIcon style={{ fontSize: 30 }} />
            <span className="sideBarRemovedText">
              {"  "}
              Dashboard
            </span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="darkSideBorder">
          <Nav.Link
            href="/categories"
            className="darkSideText sideBarCenterText"
          >
            <AppsRoundedIcon style={{ fontSize: 30 }} />
            <span className="sideBarRemovedText">
              {"  "}
              Categories
            </span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="darkSideBorder">
          <Nav.Link href="/entries" className="darkSideText sideBarCenterText">
            <BallotRoundedIcon style={{ fontSize: 30 }}/>
            <span className="sideBarRemovedText">
              {"  "}
              Transactions
            </span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="darkSideBorder">
          <Nav.Link
            href="/income-monthly"
            className="darkSideText sideBarCenterText"
          >
            <AccountBalanceRoundedIcon style={{ fontSize: 30 }} />
            <span className="sideBarRemovedText">
              {"  "}
              View Income
            </span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="darkSideBorder">
          <Nav.Link
            href="/savings-monthly"
            className="darkSideText sideBarCenterText"
          >
            <AccountBalanceWalletRoundedIcon style={{ fontSize: 30 }} />
            <span className="sideBarRemovedText">
              {"  "}
              View Savings
            </span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="darkSideBorder">
          <Nav.Link
            href="/expense-monthly"
            className="darkSideText sideBarCenterText"
          >
            <PaymentRoundedIcon style={{ fontSize: 30 }} />
            <span className="sideBarRemovedText">
              {"  "}
              View Expense
            </span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="darkSideBorder">
          <Nav.Link
            href="/trend"
            className="darkSideText sideBarCenterText"
          >
            <ShowChartRoundedIcon style={{ fontSize: 30 }}/>
            <span className="sideBarRemovedText">
              {"  "}
              Trend
            </span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
  );
};
export default SideBar;
