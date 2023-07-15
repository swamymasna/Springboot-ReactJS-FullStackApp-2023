package com.swamy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.swamy.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {

}
