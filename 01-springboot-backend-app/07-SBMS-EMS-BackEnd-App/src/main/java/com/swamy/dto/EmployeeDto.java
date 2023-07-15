package com.swamy.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDto {

	private Integer employeeId;

	private String firstName;

	private String lastName;

	private String email;
	
	private Integer departmentId;
}
