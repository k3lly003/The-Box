package com.dcb.sb_tt.service;

import com.dcb.sb_tt.entity.Department;

import java.util.List;

public interface DepartmentService {
    Department saveDepartment(Department department);

    public List<Department> fetchDepartmentList();

    public Department fetchDepartmentById(Long departmentId);

    public void deleteDepartmentById(Long departmentId);
}
