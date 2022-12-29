package com.example.service_1.control;

import com.example.service_1.Dao.Tools.UserRepository;
import com.example.service_1.RealClass.ChatHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class csMongoDBcontrol {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/csMongoDB")
    @ResponseBody
    public String cs(){
        ChatHistory chatHistory = new ChatHistory();
        chatHistory.setPerson("123456");
        chatHistory.setContent("你好");
        Date date = new Date();

        // Set the desired date and time format
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH:mm");

        // Format the date and time and store it in a string
        String formattedDate = dateFormat.format(date);
        chatHistory.setTalkTime(formattedDate);
        System.out.println(chatHistory.getContent());
        userRepository.save(chatHistory);
        System.out.println(userRepository==null);
        return "success";
    }
}
