
import React, { useState } from "react";
import './App.css'


const validateEmployee = (employee) => {
  const errors = {};
  if (!employee.name || employee.name.length < 3 || employee.name.length > 50 || !/^[A-Za-z ]+$/.test(employee.name)) {
    errors.name = "Name is required, and should be between 3-50 characters with alphabets and spaces only.";
  }
  if (!employee.dob || new Date(employee.dob) >= new Date()) {
    errors.dob = "DOB is required and must be a past date.";
  }
  if (!employee.contact || !/^\d{10}$/.test(employee.contact)) {
    errors.contact = "Contact is required and must be exactly 10 digits.";
  }
  if (!employee.email || !/\S+@\S+\.\S+/.test(employee.email)) {
    errors.email = "Email is required and must be in a valid format.";
  }
  if (!employee.address) {
    errors.address = "Address is required.";
  }
  if (!employee.department) {
    errors.department = "Department is required.";
  }
  if (!employee.designation) {
    errors.designation = "Designation is required.";
  }
  if (!employee.salary || isNaN(employee.salary) || parseFloat(employee.salary) <= 0) {
    errors.salary = "Salary is required and must be a positive number.";
  }
  return errors;
};

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeForm, setEmployeeForm] = useState({
    name: "",
    dob: "",
    contact: "",
    email: "",
    address: "",
    department: "",
    designation: "",
    salary: "",
  });
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeForm({ ...employeeForm, [name]: value });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateEmployee(employeeForm);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setEmployees([...employees, employeeForm]);
      setEmployeeForm({
        name: "",
        dob: "",
        contact: "",
        email: "",
        address: "",
        department: "",
        designation: "",
        salary: "",
      });
      setErrors({});
    }
  };

  const handleEdit = (index) => {
    setEmployeeForm(employees[index]);
    setEmployees(employees.filter((_, i) => i !== index));
  };

  const handleDelete = (index) => {
    setEmployees(employees.filter((_, i) => i !== index));
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="Heading">Employee Management System</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={handleSearch}
      />
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={employeeForm.name}
            onChange={handleChange}
          />
          {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
        </div>
        <div>
          <label>DOB</label>
          <input
            type="date"
            name="dob"
            value={employeeForm.dob}
            onChange={handleChange}
          />
          {errors.dob && <div style={{ color: "red" }}>{errors.dob}</div>}
        </div>
        <div>
          <label>Contact</label>
          <input
            type="text"
            name="contact"
            value={employeeForm.contact}
            onChange={handleChange}
          />
          {errors.contact && <div style={{ color: "red" }}>{errors.contact}</div>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={employeeForm.email}
            onChange={handleChange}
          />
          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={employeeForm.address}
            onChange={handleChange}
          />
          {errors.address && <div style={{ color: "red" }}>{errors.address}</div>}
        </div>
        <div>
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={employeeForm.department}
            onChange={handleChange}
          />
          {errors.department && (
            <div style={{ color: "red" }}>{errors.department}</div>
          )}
        </div>
        <div>
          <label>Designation</label>
          <input
            type="text"
            name="designation"
            value={employeeForm.designation}
            onChange={handleChange}
          />
          {errors.designation && (
            <div style={{ color: "red" }}>{errors.designation}</div>
          )}
        </div>
        <div>
          <label>Salary</label>
          <input
            type="number"
            name="salary"
            value={employeeForm.salary}
            onChange={handleChange}
          />
          {errors.salary && <div style={{ color: "red" }}>{errors.salary}</div>}
        </div>
        <button type="submit">Save Employee</button>
      </form>

      <h2>Employee List</h2>
      <ul>
        {filteredEmployees.map((emp, index) => (
          <li key={index}>
            <div>
              <p>Name: {emp.name}</p>
              <p>DOB: {emp.dob}</p>
              <p>Contact: {emp.contact}</p>
              <p>Email: {emp.email}</p>
              <p>Address: {emp.address}</p>
              <p>Department: {emp.department}</p>
              <p>Designation: {emp.designation}</p>
              <p>Salary: {emp.salary}</p>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
