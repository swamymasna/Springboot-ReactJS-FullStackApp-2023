package com.swamy.service;

import java.util.List;

import com.swamy.dto.EmployeeDto;
import com.swamy.dto.EmployeeResponse;

public interface EmployeeService {

	EmployeeDto saveEmployee(EmployeeDto employeeDto);

	EmployeeDto getEmployeeById(Integer employeeId);

	List<EmployeeDto> getAllEmployees();

	EmployeeDto updateEmployee(Integer employeeId, EmployeeDto employeeDto);

	void deleteEmployeeById(Integer employeeId);

	EmployeeResponse getAllEmployees(Integer pageNo, Integer pageSize, String sortBy);
}
