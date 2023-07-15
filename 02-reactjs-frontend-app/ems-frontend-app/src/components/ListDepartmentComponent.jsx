import React, { useEffect, useState } from "react";
import {
  deleteDepartment,
  getAllDepartments,
} from "../services/DepartmentService";
import { Link, useNavigate } from "react-router-dom";

const ListDepartmentComponent = () => {
  const [departments, setDepartments] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getDepartmentList();
  }, []);

  const getDepartmentList = () => {
    getAllDepartments()
      .then((response) => {
        console.log(response.data);
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function updateEmployee(id) {
    navigator(`/edit-department/${id}`);
  }

  function deleteEmployee(id) {
    deleteDepartment(id)
      .then((response) => {
        console.log(response.data);
        getDepartmentList();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center mt-2 datatwo">Department Details</h2>

      <Link to="/create-department" className="btn btn-info">
        Add Department
      </Link>

      <table className="table table-bordered table-hover fsize mt-2">
        <thead>
          <tr>
            <th>Department Id</th>
            <th>Department Name</th>
            <th>Department Description</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.departmentId}>
              <td>{department.departmentId}</td>
              <td>{department.departmentName}</td>
              <td>{department.departmentDescription}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => updateEmployee(department.departmentId)}
                >
                  Update
                </button>
              </td>

              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteEmployee(department.departmentId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDepartmentComponent;
