package com.swamy.service;

import java.util.List;

import com.swamy.dto.DepartmentDto;

public interface DepartmentService {

	DepartmentDto saveDepartment(DepartmentDto departmentDto);

	List<DepartmentDto> getAllDeparments();

	DepartmentDto getDepartmentById(Integer departmentId);

	DepartmentDto updateDepartment(Integer departmentId, DepartmentDto departmentDto);

	void deleteDepartment(Integer departmentId);
}
