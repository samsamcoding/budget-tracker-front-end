import React, { useContext, useState, useEffect } from "react";
import { Table, Button, Col, Modal, Form, Row } from "react-bootstrap";

import Icon from "@mui/material/Icon";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import IconButton from '@mui/material/IconButton';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

import Swal from "sweetalert2";
import { CategoryContext } from "../../CategoryContext";
import { UserContext } from "../../UserContext";
import AppHelper from "../../app-helper";

export default function index() {
  let initialForm = {
    categoryIcon: "",
    categoryType: "",
    categoryName: "",
  };

  const { user, fetchUser } = useContext(UserContext);
  const { categories, categoryTypes, categoryIcons } = useContext(
    CategoryContext
  );
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [filters, setFilters] = useState([
    "All",
    "Income",
    "Savings",
    "Expense",
  ]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    setCurrentCategories(categories);
  }, [categories]);

  const handleFilterCategories = (e) => {
    console.log(e.target.value);
    e.target.value === "All"
      ? setCurrentCategories(categories)
      : setCurrentCategories(
          categories.filter((item) => item.categoryType === e.target.value)
        );

    setFilter(e.target.value);
  };

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

  const handleChange = (e) => {
    const value = e.target.value;
    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  const handleClose = () => setShowDelete(false);

  const handleConfirm = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  function handleSave(e) {
    if (!form._id) {
      fetch(`${AppHelper.API_URL}/users/create-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AppHelper.getAccessToken()}`,
        },
        body: JSON.stringify({
          categoryName: form.categoryName,
          categoryType: form.categoryType,
          categoryIcon: form.categoryIcon,
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
              title: "Category has been saved!",
              showConfirmButton: false,
              timer: 1500,
            });

            setShow(false);
          }
        });
    } else {
      fetch(`${AppHelper.API_URL}/users/update-category`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AppHelper.getAccessToken()}`,
        },
        body: JSON.stringify({
          userId: user._id,
          categoryId: form._id,
          categoryIcon: form.categoryIcon,
          categoryType: form.categoryType,
          categoryName: form.categoryName,
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
              title: "Category has been updated!",
              showConfirmButton: false,
              timer: 1500,
            });
            setShow(false);
          }
        });
    }
  }
  function handleDelete(e) {
    fetch(`${AppHelper.API_URL}/users/delete-category`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AppHelper.getAccessToken()}`,
      },
      body: JSON.stringify({
        userId: user._id,
        categoryId: deleteId,
        isActive: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data) {
          fetchUser();

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Category has been deleted!",
            showConfirmButton: false,
            timer: 1500,
          });

          setShowDelete(false);
        }
      });
  }

  return (
    <Col xs={10} md={11} lg={9} id="page-content-wrapper">
      <h1 className="mt-4 ml-4 mb-3 darkTextColor">Categories</h1>
      <div className="headerTable">
        <div className="labelIcon">
        <h3 className="mt-2 ml-4 pr-3 darkTextColor">Add</h3>
        <IconButton aria-label="Add" className="mb-3 pr-3" >
        <LibraryAddIcon 
            fontSize="large" 
            role="button"
            size={20}
            onClick={() => setShow(true)}
            />
        </IconButton>        
        </div>
        <Form.Control
          as="select"
          custom
          value={filter}
          name="filter"
          onChange={handleFilterCategories}
          style={{ maxWidth: "300px" }}
        >
          {/* <option>- -</option> */}
          {filters.map((type, index) => (
            <option key={index}>{type}</option>
          ))}
        </Form.Control>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center darkTextColor">
            <th>Icon</th>
            <th>Category Type</th>
            <th>Category Name</th>
            <th>Update  Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories
            .filter((val) => val.isActive)
            .map((category) => {
              return (
                <tr key={category._id} className="text-center darkTextColor">
                  <td>
                    <Icon style={{ color: colorIcon(category.categoryType) }}>
                      {category.categoryIcon}
                    </Icon>
                  </td>
                  <td>{category.categoryType}</td>
                  <td>{category.categoryName}</td>
                  <td>
                  <IconButton aria-label="update">
                  <UpdateIcon 
                  role="button"
                  size="medium"
                  onClick={() => setFormData(category)}
                  />
                  </IconButton>
                    {"     "}
                  <IconButton aria-label="delete">
                  <DeleteIcon 
                  role="button"
                  style={{ color: "#1f2b1d" }}
                  size="medium"
                  onClick={(e) => handleConfirm(category._id)}
                  />
                  </IconButton>
                  </td>
                </tr>
              );
            })}
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
            {form._id ? "Update" : "Add"} Category
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
                    <option>select category</option>
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
                    value={form.categoryName}
                    name="categoryName"
                    type="text"
                    onInput={handleChange}
                    autoComplete="off"
                    placeholder="Category Name"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col col={12} lg={12}>
                <Form.Group controlId="categoryIcons">
                  <Form.Label>Category Icon:</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    value={form.categoryIcon}
                    name="categoryIcon"
                    onChange={handleChange}
                    required
                  >
                    <option>select Icon</option>
                    {categoryIcons.map((type, index) => (
                      <option key={index}>{type}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col col={12} lg={12}>
                <Form.Text>Icon Preview:</Form.Text>
                <Icon style={{ color: iconColor() }} size={20}>
                  {form.categoryIcon}
                </Icon>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleSave()}>
            {form._id ? "Update" : "Save"}
          </Button>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDelete} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
}
