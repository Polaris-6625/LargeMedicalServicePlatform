package com.example.service_1.Dao.Tools;

import com.example.service_1.RealClass.ChatHistory;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<ChatHistory, String> {
}
