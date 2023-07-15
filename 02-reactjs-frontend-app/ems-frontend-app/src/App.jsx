import { useState } from "react";
import "./App.css";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateEmployeeComponent from "./components/CreateEmployeeComponent";
import ViewEmployeeComponent from "./components/ViewEmployeeComponent";
import ListDepartmentComponent from "./components/ListDepartmentComponent";
import CreateDepartmentComponent from "./components/CreateDepartmentComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<ListEmployeeComponent />}></Route>
            <Route path="/employees" element={<ListEmployeeComponent />}></Route>
            <Route path="/add-employee" element={<CreateEmployeeComponent />}></Route>
            <Route path="/edit-employee/:id" element={<CreateEmployeeComponent/>}></Route>
            <Route path="/view-employee/:id" element={<ViewEmployeeComponent/>}></Route>
        
            <Route path="/departments" element={<ListDepartmentComponent />}></Route>
            <Route path="/create-department" element={<CreateDepartmentComponent />}></Route>
            <Route path="/edit-department/:id" element={<CreateDepartmentComponent />}></Route>
           </Routes>

          <FooterComponent />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
