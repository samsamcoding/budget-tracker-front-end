import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import {Col, Table, InputGroup, FormControl, Form, Modal, Button, Row } from "react-bootstrap";

import Swal from "sweetalert2";

import { PlusCircleFill, Record, Search } from "react-bootstrap-icons";

import IconButton from '@mui/material/IconButton';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Icon from "@mui/material/Icon";

import { CategoryContext } from "../../CategoryContext";
import { UserContext } from "../../UserContext";
import AppHelper from "../../app-helper";
import { RecordContext } from "../../RecordContext";
export default function index() {
  let initialForm = {
    categoryIcon: "",
    categoryType: "",
    categoryName: "",
    amount: "",
    description: "",
  };

  const filters = ["All", "Income", "Savings", "Expense"];
  const { user, fetchUser } = useContext(UserContext);
  const { category } = useContext(CategoryContext);
  const { records } = useContext(RecordContext);

  const { categories, categoryTypes, categoryIcons } = useContext(
    CategoryContext
  );

  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [balance, setBalance] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [recordOptions, setRecordOptions] = useState([]);
  const handleChange = (e) => {
    const value = e.target.value;
    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  const handleCategorySelect = (e) => {
    const getTargetCategory = categories.filter(
      (category) => category._id === e.target.value
    );

    setForm({
      ...form,
      _id: getTargetCategory[0]._id,
      [e.target.name]: getTargetCategory[0].categoryName,
      categoryIcon: getTargetCategory[0].categoryIcon,
    });

    console.log(getTargetCategory);
  };

  const handleFilterRecords = (e) => {
    if (e.target.value === "All") {
      setCurrentRecords(records);
      setRecordOptions(records);
    } else {
      const filtered = records.filter(
        (record) => record.categoryType === e.target.value
      );
      setCurrentRecords(filtered);
      setRecordOptions(filtered);
    }
    setFilter(e.target.value);
  };

  const setValueTransaction = () => {
    if (form.categoryType === "Income") {
      return records.length
        ? records[0].transactionBalance + parseFloat(form.amount || 0)
        : parseFloat(form.amount);
    } else
      return records.length
        ? records[0].transactionBalance - parseFloat(form.amount || 0)
        : parseFloat(form.amount);
  };

  const transactionBalance = setValueTransaction();

  useEffect(() => {
    console.log("fetching data");

    console.log(records);
    setBalance(user.balance);
    setCurrentRecords(records);
    setRecordOptions(records);
  }, [records]);

  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);

    if (e.target.value == "") {
      setCurrentRecords(recordOptions);
    } else {
      let keyword = e.target.value.toLowerCase();
      setCurrentRecords(
        recordOptions.filter((record) =>
          record.description.toLowerCase().includes(keyword)
        )
      );
    }
  };

  const colorIcon = (type) => {
    switch (type) {
      case "Income":
        return "#358873";
      case "Savings":
        return "#ff6863";
      case "Expense":
        return "#fcdc64";

      default:
        return "black";
    }
  };

  const availableCategories = categories.filter(
    (category) => category.categoryType === form.categoryType
  );

  const iconColor = () => {
    switch (form.categoryType) {
      case "Income":
        return "#358873";
      case "Savings":
        return "#ff6863";
      case "Expense":
        return "#fcdc64";

      default:
        return "black";
    }
  };

  const setFormData = (data) => {
    setForm(data);
    setShow(true);
  };

  function handleSave(e) {
    fetch(`${AppHelper.API_URL}/users/add-record`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AppHelper.getAccessToken()}`,
      },
      body: JSON.stringify({
        categoryName: form.categoryName,
        categoryType: form.categoryType,
        categoryIcon: form.categoryIcon,
        amount: form.amount,
        description: form.description,
        transactionBalance: parseFloat(transactionBalance),
        dateCreated: new Date(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data) {
          fetchUser();
          setForm(initialForm);

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Transaction has been saved!",
            showConfirmButton: false,
            timer: 1500,
          });

          setShow(false);
        }
      });
  }

  return (
    <Col xs={10} md={11} lg={9} id="page-content-wrapper">
      <h1 className="mt-4 ml-4 mb-3 darkTextColor">Records</h1>

      <div className="headerTable">
        <div className="labelIcon">
        <h3 className="mt-2 ml-4 pr-3 darkTextColor">Add Entry</h3>
        <IconButton aria-label="Add" className="mb-3 pr-3" >
        <LibraryAddIcon 
            fontSize="large" 
            role="button"
            size={20}
            onClick={() => setShow(true)}
            />
        </IconButton>        
        </div>
        <div>
          <InputGroup className="mb-3">

          <FormControl
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon1"
              value={search}
              onInput={handleSearch}
            />
            <Form.Control
              as="select"
              custom
              value={filter}
              name="filter"
              onChange={handleFilterRecords}
              required
            >
              <option>select entry</option>
              {filters.map((type, index) => (
                <option key={index}>{type}</option>
              ))}
            </Form.Control>         
          </InputGroup>
        </div>
      </div>
      <Table striped>
        <thead>
          <tr className="text-center darkTextColor">
            <th>Transaction</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {!currentRecords.length ? (
            <tr>
              <td colSpan="4">No Data Found</td>
            </tr>
          ) : (
            currentRecords
              .filter((val) => val.isActive)
              .map((record) => {
                return (
                  <tr key={record._id} className="text-center darkTextColor">
                    <td className="text-left">
                      <Row>
                        <Col lg={2} col={3} className="text-center my-auto">
                          <Icon
                            style={{
                              color: colorIcon(record.categoryType),
                              fontSize: "50px",
                            }}
                            className="mb-0"
                          >
                            {record.categoryIcon}
                          </Icon>
                          <span
                            style={{
                              color: colorIcon(record.categoryType),
                            }}
                          >
                            <strong>{record.categoryType}</strong>
                          </span>
                        </Col>
                        <Col lg={10} col={9} className="text-left my-auto">
                          <span style={{ fontSize: "20px" }}>
                            {record.description}
                          </span>
                          <br />
                          {record.categoryName}
                          <br />
                          {moment(record.dateCreated).format(
                            "MMMM DD, YYYY - hh:mm:ss A"
                          )}
                        </Col>
                      </Row>
                    </td>
                    <td style={{ paddingTop: "40px" }}>
                      {record.categoryType === "Income"
                        ? `₱ ${record.amount}`
                        : "-"}
                    </td>
                    <td style={{ paddingTop: "40px" }}>
                      {record.categoryType !== "Income"
                        ? `- ₱ ${record.amount}`
                        : "-"}
                    </td>
                    <td style={{ paddingTop: "40px" }}>
                      ₱ {record.transactionBalance}
                    </td>
                  </tr>
                );
              })
          )}
        </tbody>
      </Table>
      <Modal
        show={show}
        centered
        onHide={() => setShow(false)}
        size="lg"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Create Record
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col lg={6} col={12}>
                <Form.Group controlId="categoryType">
                  <Form.Label>Category Type:</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    value={form.categoryType}
                    name="categoryType"
                    onChange={handleChange}
                  >
                    <option>select filter</option>
                    {categoryTypes.map((type, index) => (
                      <option key={index}>{type}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col lg={6} col={12}>
                <Form.Group controlId="categoryName">
                  <Form.Label>Category Name:</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    value={form._id}
                    name="categoryName"
                    onChange={handleCategorySelect}
                  >
                    <option>- -</option>
                    {availableCategories.map((type, index) => (
                      <option value={type._id} key={index}>
                        {type.categoryName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col col={12} lg={12}>
                <Form.Group controlId="description">
                  <Form.Label>Description:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={form.description}
                    onInput={handleChange}
                    name="description"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col col={12}>
                <Form.Group as={Row} controlId="amount">
                  <Form.Label column sm={4}>
                    Amount:
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="number"
                      placeholder="Php"
                      value={form.amount}
                      onInput={handleChange}
                      name="amount"
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col col={12}>
                <Form.Group as={Row} controlId="balance">
                  <Form.Label column sm={4}>
                    Current Balance:
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      plaintext
                      readOnly
                      value={transactionBalance}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleSave()}>Save</Button>
          <Button onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
}
