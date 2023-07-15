import React, { useEffect, useState } from "react";
import {
  createDepartment,
  getDepartmentById,
  updateDepartment,
} from "../services/DepartmentService";
import { useNavigate, useParams } from "react-router-dom";

const CreateDepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");

  const { id } = useParams();
  const navigator = useNavigate();

  const [errors, setErrors] = useState({
    departmentName: "",
    departmentDescription: "",
  });

  useEffect(() => {
    getOneDepartmentById();
  }, [id]);

  function getOneDepartmentById() {
    getDepartmentById(id).then((response) => {
      console.log(response.data);
      setDepartmentName(response.data.departmentName);
      setDepartmentDescription(response.data.departmentDescription);
    });
  }

  function addOrUpdateEmployee(e) {
    e.preventDefault();
    const department = { departmentName, departmentDescription };
    console.log(department);

    if (validateForm()) {
      if (id) {
        updateDepartment(id, department)
          .then((response) => {
            console.log(response.data);
            navigator   ("/departments");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createDepartment(department)
          .then((response) => {
            console.log(response.data);
            navigator("/departments");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    const errorsCopy = { ...errors };
    let valid = true;

    if (departmentName.trim()) {
      errorsCopy.departmentName = "";
    } else {
      errorsCopy.departmentName = "Department name is required";
      valid = false;
    }

    if (departmentDescription.trim()) {
      errorsCopy.departmentDescription = "";
    } else {
      errorsCopy.departmentDescription = "Department description is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center mt-2">Update Department</h2>;
    } else {
      return <h2 className="text-center mt-2">Add Department</h2>;
    }
  }

  return (
    <div className="container">
      <div className="card col-md-6 offset-md-3 offset-md-3 mt-4 shadow-lg fsize">
        {pageTitle()}
        <div className="card-body">
          <form className="form-group mb-2">
            <div>
              <label className="label">Department Name : </label>
              <input
                type="text"
                name="departmentName"
                value={departmentName}
                placeholder="Enter Department Name"
                className={`form-control ${
                  errors.departmentName ? "is-invalid" : ""
                }`}
                onChange={(e) => setDepartmentName(e.target.value)}
              />
              {errors.departmentName && (
                <div className="invalid-feedback">{errors.departmentName}</div>
              )}
            </div>

            <div>
              <label className="label">Department Description : </label>
              <input
                type="text"
                name="departmentDescription"
                value={departmentDescription}
                placeholder="Enter Department Description"
                className={`form-control ${
                  errors.departmentDescription ? "is-invalid" : ""
                }`}
                onChange={(e) => setDepartmentDescription(e.target.value)}
              />
              {errors.departmentDescription && (
                <div className="invalid-feedback">
                  {errors.departmentDescription}
                </div>
              )}
            </div>

            <div className="row mt-2">
              <div className="col-2"></div>
              <div className="col-8">
                <button
                  className="btn btn-success form-control"
                  onClick={addOrUpdateEmployee}
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

export default CreateDepartmentComponent;
