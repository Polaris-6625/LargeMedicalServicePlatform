package com.example.service_2.Control;

import com.alibaba.fastjson.JSON;
import com.example.service_2.Tools.JedisConnectionFactory;
import com.example.service_2.Unity.NumCheck;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import redis.clients.jedis.Jedis;

@Controller
public class CheckControl {
    @PostMapping("/getMessage")
    @ResponseBody
    public String returnMessage(String phone) {
        int Num = (int) ((Math.random() * 9 + 1) * 100000);
        String createToken = String.valueOf(Num) + "_" + phone;
        Jedis jedis = JedisConnectionFactory.getJedis();
        jedis.set(createToken,String.valueOf(Num));
        jedis.expire(createToken,600);
        if (jedis != null) {
            jedis.close();
        }
        NumCheck numCheck = new NumCheck();
        numCheck.setNum(String.valueOf(Num));
        numCheck.setCreateToken(createToken);
        String json = JSON.toJSONString(numCheck);
        return json;
    }
}
