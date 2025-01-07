package com.dcb.sb_tt.Controller;

import com.dcb.sb_tt.entity.Department;
import com.dcb.sb_tt.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @PostMapping("/departments")
    //HERE WE TELL SPRING TO TAKE THE DATA U GETTING AS A REQ-BODY, CONVERT IT INTO Department OBJ
    public Department saveDepartment(@RequestBody Department department){
     return departmentService.saveDepartment(department);
    }

}
