package com.example.service_1.control;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
public class RestForHtml {

    @RequestMapping(value="/login", method= RequestMethod.GET)
    public void getLoginPage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/html/login.html").forward(request,response);
    }

    @RequestMapping("/add")
    public void getAddPage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/html/add.html").forward(request,response);
    }

    @RequestMapping("/addDocter")
    public void getAddDpcterPage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/html/addDocter.html").forward(request,response);
    }

    @RequestMapping("/communication")
    public void getCommunicationPage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/html/communication.html").forward(request,response);
    }

    @RequestMapping("/del")
    public void getDelPage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/html/del.html").forward(request,response);
    }

    @RequestMapping("/index")
    public void getIndexPage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/html/index.html").forward(request,response);
    }

    @RequestMapping("/regist")
    public void getRegistPage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/html/regist.html").forward(request,response);
    }

    @RequestMapping("/Select")
    public void getSelectPage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/html/Select.html").forward(request,response);
    }

    @RequestMapping("/signNum")
    public void getSignNumPage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/html/signNum.html").forward(request,response);
    }

    @RequestMapping("/userSignHistory")
    public void getUserSignHistory(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/html/userSignHistory.html").forward(request,response);
    }

    @RequestMapping("/yinsi")
    public void getYinSiPage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/html/yinsi.html").forward(request,response);
    }

}
