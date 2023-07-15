import { useEffect, useState } from "react";
import { listEmployees, removeEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = () => {
    listEmployees()
      .then((response) => {
        console.log(response.data);
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const addEmployee = () => {
    navigator("/add-employee");
  };

  const updateEmployee = (id) => {
    navigator(`/edit-employee/${id}`);
  };

  const deleteEmployee = (id) => {
    removeEmployee(id)
      .then((response) => {
        console.log(response.data);
        getAllEmployees();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function viewEmployee(id){
    navigator(`/view-employee/${id}`);
  }

  return (
    <div className="container">
      <h2 className="text-center dataone mt-1 ">Employee Details</h2>

      <button className="btn btn-primary" onClick={addEmployee}>
        Add Employee
      </button>

      <table className="table table-bordered table-hover mt-2 fsize">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email Id</th>
            <th colSpan={3} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employeeId}>
              <td>{employee.employeeId}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateEmployee(employee.employeeId)}
                >
                  <i class="bi bi-pencil-square"> </i>Update
                </button>
              </td>

              <td>
                <button
                  className="btn btn-danger "
                  onClick={() => deleteEmployee(employee.employeeId)}
                >
                  Delete
                </button>
              </td>

              <td>
                <button
                  className="btn btn-dark "
                  onClick={() => viewEmployee(employee.employeeId)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
