package com.example.service_1.control;

import com.alibaba.fastjson.JSON;
import com.example.service_1.Dao.DaoMapper;
import com.example.service_1.Dao.Tools.JedisConnectionFactory;
import com.example.service_1.RealClass.Docter;
import com.example.service_1.RealClass.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import redis.clients.jedis.Jedis;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller
public class MVCcontroller {
//    //@RequestMapping("/logincheck")
//    @PostMapping("/logincheck")
//    public String setCookies(HttpServletRequest request, HttpServletResponse response, String username, String password) {
//        ResponseCookie cookie = ResponseCookie.from(username, password).build();
//        HttpSession session = request.getSession();
//        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
//        session.setAttribute("user","ok");
//        System.out.println(session.getAttribute("user"));
//        return "forward:result";
//    }
//
//    @GetMapping("/check")
//    @ResponseBody
//    public String getCookies(HttpServletRequest request) {
//        Cookie[] cookie = request.getCookies();
//        System.out.println(cookie.toString());
//        HttpSession session = request.getSession();
//        System.out.println(session);
////        if (cookie != null) {
////            return cookie[1].toString();
////        }
////        else
////            return "1";
////    }
//        System.out.println(session.getAttribute("user"));
//
//        return "check";
//    }
//
//    /**
//     * 测试请求转发
//     * @return
//     */
//    @RequestMapping("t5")
//    public String test5(HttpServletRequest request){
//        request.setAttribute("user","ok");
//        return "forward:result";//相对路径   (绝对路径：forward:/test/result)
//    }
//
//    /**
//     * 测试重定向
//     * @return
//     */
//    @RequestMapping("t6")
//    public String test6(HttpServletRequest request){
//        request.setAttribute("str","你好！测试重定向。");
//        return "redirect:result";
//    }
//
//    /**
//     * 请求转发的目标位置，接收转发和重定向的结果
//     * @return
//     */
//    @RequestMapping("result")
//    public String result(HttpServletRequest request){
//        HttpSession session = request.getSession();
//        String result = String.valueOf(session.getAttribute("user"));
//        System.out.println(result);
//        if (result.equals("ok")) {
//            return "forward:ceshi.html";
//        }
//        else {
//            return "...";
//        }
//    }

    @Autowired
    private  DaoMapper daoMapper;
    private User user;

    @PostMapping("/exit")
    @ResponseBody
    public String UserExit(HttpServletRequest request, HttpServletResponse response,String cookie) {
        System.out.println("cookie is "+cookie+" want to exit");
        HttpSession session = request.getSession();
        session.invalidate();
        Jedis jedis = JedisConnectionFactory.getJedis();
        jedis.del(cookie);
        if (jedis != null) {
            jedis.close();
        }
        return "successfully";
    }

    @PostMapping("/logincheck")
    @ResponseBody
    public String setSession(String username, String password, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("username is "+username);
        System.out.println("password is "+password);
        user = daoMapper.SelectUserE(username,password);
        if(user != null){
            ResponseCookie cookie = ResponseCookie.from("username",username).build();
            response.setHeader(HttpHeaders.SET_COOKIE,cookie.toString());
            HttpSession session = request.getSession();
            String s1 = "ok";
            String s2 = "NOT";
            String s3 = "manage";
            if (user.getStatus().equals("ok")) {
                session.setAttribute("userStatues",s1);
                Jedis jedis = JedisConnectionFactory.getJedis();
                jedis.set(cookie.toString(),s1);
                System.out.println(cookie.toString());
            }
            else if (user.getStatus().equals("manage")) {
                session.setAttribute("userStatues",s3);
                Jedis jedis = JedisConnectionFactory.getJedis();
                jedis.set(cookie.toString(),s3);
                System.out.println(cookie.toString());
            }
            else {
                session.setAttribute("userStatues",s2);
                Jedis jedis = JedisConnectionFactory.getJedis();
                jedis.set(cookie.toString(),s2);
            }
            System.out.println(session.getAttribute("userStatues"));
            return "ok";
        }
        else {
            return "not";
        }
    }

    @PostMapping("/registCheck")
    @ResponseBody
    public String pUserExistence(String root) {
        System.out.println("root is "+root);
        if (root != null) {
            String user = daoMapper.rootExistence(root);
            System.out.println("user is "+user);
            if (user != null) {
                return "Have";
            }
            else {
                return "NotHave";
            }
        }
        else {
            return "error";
        }
    }


    @PostMapping("/regist")
    @ResponseBody
    public String addUserInformation(String root,String password,String sex,String username) {
        System.out.println("root is "+root);
        System.out.println("password is "+password);
        System.out.println("sex is "+sex);
        System.out.println("name is "+username);
        if(root != null && password != null && sex != null && username != null) {
            daoMapper.AddUser(root,password,username,sex,"ok");
            daoMapper.createUser("user_"+root);
        }
        return "success";
    }

    @GetMapping("/check")
    @ResponseBody
    public String checkSession(HttpServletRequest request){
        HttpSession session = request.getSession();
        String result = (String) session.getAttribute("userStatues");
        System.out.println("result is "+result);
        return result;
    }

//    @Resource
//    private WebSocketServer webSocketServer;
    @PostMapping("/talk")
    @ResponseBody
    public void talkCommunication() {


    }

    @PostMapping("/docterInf")
    @ResponseBody
    public String backInf(){
//        Docter docter_1 = new Docter();
//        Docter docter_2 = new Docter();
//        docter_1.setId(1);
//        docter_1.setName("王二");
//        docter_1.setAge("19");
//        docter_1.setSex("男");
//        docter_1.setPosition("主任");
//        docter_1.setDateTime("3:00");
//        docter_1.setRemarks("无");
//        docter_1.setEndTime("6:00");
//        docter_2.setId(2);
//        docter_2.setName("王三");
//        docter_2.setAge("39");
//        docter_2.setSex("男");
//        docter_2.setPosition("副主任");
//        docter_2.setRemarks("无");
//        docter_2.setEndTime("7:00");
//        docter_2.setDateTime("2:00");
        List<Docter> list = new ArrayList<>();
        list = daoMapper.selectAllDocter();
        String docterJSON = JSON.toJSONString(list);
        System.out.println(docterJSON);
        return docterJSON;
    }

    @PostMapping("/AddDocter")
    @ResponseBody
    public String addDocterInformation(String name,String sex,String age,String dateTime,String endTime,String position,String remarks,String department){
        System.out.println("1");
        Docter docter = new Docter();
        docter.setName(name);
        docter.setSex(sex);
        docter.setAge(age);
        docter.setDateTime(dateTime);
        docter.setEndTime(endTime);
        docter.setPosition(position);
        docter.setRemarks(remarks);
        docter.setDepartment(department);
        daoMapper.insertDocter(name,sex,position,age,dateTime,endTime,remarks,department);
        return "successful";
    }

    @PostMapping("/registerDocter")
    @ResponseBody
    public String registerDocter(String user,String preDocter) {
        System.out.println(user+","+preDocter);
        daoMapper.addPreDocter(user,preDocter);
        return "successfully";
    }

    @PostMapping("/delDocter")
    @ResponseBody
    public String delDocter(String delDocter)
    {
        System.out.println("delete is "+delDocter);
        daoMapper.delDocter(delDocter);
        return "successfully";
    }

    @PostMapping("/JedisSelect")
    @ResponseBody
    public String JedisSelect(String name) {
        System.out.println(name);
        Jedis jedis = JedisConnectionFactory.getJedis();
//        jedis.auth("123456");
        Docter docter = new Docter();
        String result = "";
        if (jedis.get(name) != null) {
            result = jedis.get(name);
        }
        else {
            docter = daoMapper.SelectDocter(name);
            if (docter != null) {
                jedis.set(name,JSON.toJSONString(docter));
                jedis.expire(name,1800);
            }
            result = JSON.toJSONString(docter);
        }
        if (jedis != null) {
            jedis.close();
        }
        System.out.println(result);
        return result;
    }
}