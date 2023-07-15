package com.swamy.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.swamy.dto.EmployeeDto;
import com.swamy.dto.EmployeeResponse;
import com.swamy.service.EmployeeService;
import com.swamy.utils.AppConstants;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
public class EmployeeRestController {

	private EmployeeService employeeService;

	@PostMapping
	public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {

		return new ResponseEntity<EmployeeDto>(employeeService.saveEmployee(employeeDto), HttpStatus.CREATED);
	}

	@GetMapping("/{id}")
	public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Integer employeeId) {

		return new ResponseEntity<EmployeeDto>(employeeService.getEmployeeById(employeeId), HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<List<EmployeeDto>> getAllEmployees() {

		return new ResponseEntity<>(employeeService.getAllEmployees(), HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Integer employeeId,
			@RequestBody EmployeeDto employeeDto) {

		return new ResponseEntity<EmployeeDto>(employeeService.updateEmployee(employeeId, employeeDto), HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable("id") Integer employeeId) {
		employeeService.deleteEmployeeById(employeeId);
		return new ResponseEntity<>(AppConstants.EMPLOYEE_DELETION_SUCCESS + employeeId, HttpStatus.OK);
	}

	@GetMapping("/all")
	public ResponseEntity<EmployeeResponse> getAllEmployees(

			@RequestParam(name = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NO, required = true) Integer pageNo,
			@RequestParam(name = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = true) Integer pageSize,
			@RequestParam(name = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = true) String sortBy) {

		return ResponseEntity.ok(employeeService.getAllEmployees(pageNo, pageSize, sortBy));
	}

}
