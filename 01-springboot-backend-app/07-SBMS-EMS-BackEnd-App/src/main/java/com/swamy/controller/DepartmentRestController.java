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
import org.springframework.web.bind.annotation.RestController;

import com.swamy.dto.DepartmentDto;
import com.swamy.service.DepartmentService;
import com.swamy.utils.AppConstants;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@CrossOrigin("*")
@RestController
@RequestMapping("/api/departments")
public class DepartmentRestController {

	private DepartmentService departmentService;

	@PostMapping
	public ResponseEntity<DepartmentDto> createDepartment(@RequestBody DepartmentDto departmentDto) {

		return new ResponseEntity<DepartmentDto>(departmentService.saveDepartment(departmentDto), HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<DepartmentDto>> listOfDepartments() {

		return new ResponseEntity<>(departmentService.getAllDeparments(), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable("id") Integer departmentId) {

		return new ResponseEntity<>(departmentService.getDepartmentById(departmentId), HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<DepartmentDto> updateDepartment(@PathVariable("id") Integer departmentId,
			@RequestBody DepartmentDto departmentDto) {

		return new ResponseEntity<DepartmentDto>(departmentService.updateDepartment(departmentId, departmentDto),
				HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteDepartment(@PathVariable("id") Integer departmentId) {
		departmentService.deleteDepartment(departmentId);
		return new ResponseEntity<>(AppConstants.DEPARTMENT_DELETION_SUCCESS + departmentId, HttpStatus.OK);
	}
}
