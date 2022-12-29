package com.example.service_1.control;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class csDemo {
    @GetMapping("/hello")
    @ResponseBody
    public String hello() {
        return "hello,spring boot!";
    }
}
