import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../services/EmployeeService";

const ViewEmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const { id } = useParams();

  useEffect(() => {
    getOneEmployee(id);
  }, [id]);

  const getOneEmployee = (id) => {
    getEmployeeById(id).then((response) => {
      console.log(response.data);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
    });
  };

  return (
    <div className="container">
      <div className="card col-md-6 offset-md-3 offset-md-3 mt-4 shadow-lg fsize">
        <h2 className="text-center mt-2" style={{ color: "darkblue" }}>
          Employee Data
        </h2>
        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Employee Id</th>
                <td>{id}</td>
              </tr>

              <tr>
                <th>Employee First Name</th>
                <td>{firstName}</td>
              </tr>

              <tr>
                <th>Employee Last Name</th>
                <td>{lastName}</td>
              </tr>

              <tr>
                <th>Employee Email Id</th>
                <td>{email}</td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeComponent;
