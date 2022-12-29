package com.example.service_1.control;

import com.example.service_1.Dao.Tools.JedisConnectionFactory;
import com.example.service_1.Dao.Tools.UserRepository;
import com.example.service_1.RealClass.ChatHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import redis.clients.jedis.Jedis;

import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class MyWebSocketHandler extends TextWebSocketHandler {

    private final UserRepository userRepository;
    @Autowired
    public MyWebSocketHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
//    @Resource
//    private RestTemplate restTemplate;

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // 处理WebSocket消息
        Jedis jedis = JedisConnectionFactory.getJedis();
        String[] parts = message.getPayload().split(":");
        String who = jedis.get("username="+parts[0]);
        System.out.println(session.getId());
        if(who.equals("manage") || who.equals("ok")) {
            session.sendMessage(new TextMessage(message.getPayload()));
            ChatHistory chatHistory = new ChatHistory();
            chatHistory.setPerson(parts[0]);
            chatHistory.setContent(parts[1]);
            Date date = new Date();

            // Set the desired date and time format
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH:mm");

            // Format the date and time and store it in a string
            String formattedDate = dateFormat.format(date);
            chatHistory.setTalkTime(formattedDate);
            System.out.println(chatHistory.getContent());
            System.out.println(userRepository==null);
//            System.out.println(restTemplate==null);
            assert userRepository != null;
            userRepository.save(chatHistory);
            System.out.println("f");
//            String url = "http://localhost:8080/csMongoDB";
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON);
//            HttpEntity<ChatHistory> request = new HttpEntity<>(chatHistory, headers);
//            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, request, String.class);
//            if (response.getStatusCode() == HttpStatus.OK) {
//                System.out.println("ok");
//            } else {
//                System.out.println("error");
//            }
        }
        if(jedis != null) {
            jedis.close();
        }
    }
}
