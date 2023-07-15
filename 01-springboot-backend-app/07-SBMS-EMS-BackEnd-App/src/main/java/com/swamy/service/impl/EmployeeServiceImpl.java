package com.swamy.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.swamy.dto.EmployeeDto;
import com.swamy.dto.EmployeeResponse;
import com.swamy.entity.Department;
import com.swamy.entity.Employee;
import com.swamy.exception.ResourceNotFoundException;
import com.swamy.repository.DepartmentRepository;
import com.swamy.repository.EmployeeRepository;
import com.swamy.service.EmployeeService;
import com.swamy.utils.AppConstants;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

	private EmployeeRepository employeeRepository;

	private DepartmentRepository departmentRepository;

	private ModelMapper modelMapper;

	@Override
	public EmployeeDto saveEmployee(EmployeeDto employeeDto) {

		Employee employee = modelMapper.map(employeeDto, Employee.class);

		Department department = departmentRepository.findById(employeeDto.getDepartmentId()).orElseThrow(() -> new ResourceNotFoundException(
				String.format(AppConstants.DEPARTMENT_NOT_FOUND_EXCEPTION, employeeDto.getDepartmentId())));

		employee.setDepartment(department);
		
		Employee savedEmployee = employeeRepository.save(employee);

		return modelMapper.map(savedEmployee, EmployeeDto.class);
	}

	@Override
	public EmployeeDto getEmployeeById(Integer employeeId) {

		Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException(
				String.format(AppConstants.EMPLOYEE_NOT_FOUND_EXCEPTION, employeeId)));

		return modelMapper.map(employee, EmployeeDto.class);
	}

	@Override
	public List<EmployeeDto> getAllEmployees() {

		List<Employee> employeesList = employeeRepository.findAll();

		return employeesList.stream().map(employee -> modelMapper.map(employee, EmployeeDto.class))
				.collect(Collectors.toList());

	}

	@Override
	public EmployeeDto updateEmployee(Integer employeeId, EmployeeDto employeeDto) {

		Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException(
				String.format(AppConstants.EMPLOYEE_NOT_FOUND_EXCEPTION, employeeId)));

		employee.setFirstName(employeeDto.getFirstName());
		employee.setLastName(employeeDto.getLastName());
		employee.setEmail(employeeDto.getEmail());
		
		Department department = departmentRepository.findById(employeeDto.getDepartmentId()).orElseThrow(() -> new ResourceNotFoundException(
				String.format(AppConstants.DEPARTMENT_NOT_FOUND_EXCEPTION, employeeDto.getDepartmentId())));

		employee.setDepartment(department);

		Employee updatedEmployee = employeeRepository.save(employee);

		return modelMapper.map(updatedEmployee, EmployeeDto.class);
	}

	@Override
	public void deleteEmployeeById(Integer employeeId) {

		Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException(
				String.format(AppConstants.EMPLOYEE_NOT_FOUND_EXCEPTION, employeeId)));

		employeeRepository.deleteById(employee.getEmployeeId());
	}

	@Override
	public EmployeeResponse getAllEmployees(Integer pageNo, Integer pageSize, String sortBy) {

		Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));

		Page<Employee> page = employeeRepository.findAll(pageable);

		List<Employee> list = page.getContent();

		List<EmployeeDto> content = list.stream().map(employee -> modelMapper.map(employee, EmployeeDto.class))
				.collect(Collectors.toList());

		EmployeeResponse employeeResponse = new EmployeeResponse();
		employeeResponse.setContent(content);
		employeeResponse.setPageNo(pageNo);
		employeeResponse.setPageSize(pageSize);
		employeeResponse.setSortBy(sortBy);
		employeeResponse.setTotalElements(page.getTotalElements());
		employeeResponse.setTotalPages(page.getTotalPages());
		employeeResponse.setFirst(page.isFirst());
		employeeResponse.setLast(page.isLast());

		return employeeResponse;
	}
}
