import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { getAllDepartments } from "../services/DepartmentService";

const CreateEmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);

  const { id } = useParams();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    getAllDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getEmployeeById(id)
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setDepartmentId(response.data.departmentId);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const navigator = useNavigate();

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    const employee = { firstName, lastName, email, departmentId };
    console.log(employee);

    if (validateForm()) {
      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  function validateForm() {
    const errorsCopy = { ...errors };
    let valid = true;

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email Id is required";
      valid = false;
    }

    if (departmentId) {
      errorsCopy.department = "";
    } else {
      errorsCopy.department = "Department is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center mt-2">Update Employee</h2>;
    } else {
      return <h2 className="text-center mt-2">Add Employee</h2>;
    }
  }

  return (
    <div className="container">
      <div className="card col-md-6 offset-md-3 offset-md-3 mt-2 shadow-lg">
        {pageTitle()}
        <div className="card-body fsize">
          <form>
            <div className="form-group mb-2">
              <label className="label">First Name : </label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                placeholder="Enter Employee First Name"
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>

            <div className="form-group mb-2">
              <label className="label">Last Name : </label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                placeholder="Enter Employee Last Name"
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>

            <div className="form-group mb-2">
              <label className="label">Email Id : </label>
              <input
                type="text"
                name="email"
                value={email}
                placeholder="Enter Employee Email Id"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="form-group mb-2">
              <label className="label">Department Id : </label>
              <select
                className={`form-control ${errors.department ? "is-invalid" : ""}`}
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
              >
                <option>Select Department</option>
                {departments.map((department) => (
                  <option
                    key={department.departmentId}
                    value={department.departmentId}
                  >
                    {department.departmentName}
                  </option>
                ))}
              </select>
              {errors.department && (
                <div className="invalid-feedback">{errors.department}</div>
              )}
            </div>

            <div className="row">
              <div className="col-2"></div>
              <div className="col-8">
                <button
                  className="btn btn-success form-control"
                  onClick={saveOrUpdateEmployee}
                >
                  Submit
                </button>
              </div>
              <div className="col-2"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeeComponent;
