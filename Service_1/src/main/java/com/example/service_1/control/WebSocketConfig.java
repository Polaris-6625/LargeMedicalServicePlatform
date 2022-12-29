package com.example.service_1.control;

import com.example.service_1.Dao.Tools.UserRepository;
import com.example.service_1.RealClass.ChatHistory;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
//import org.springframework.data.repository.query.FluentQuery;
//import org.springframework.data.repository.query.FluentQuery;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Configuration
@EnableWebSocket
@ComponentScan(basePackages = "com.example.service_1.control")
@EnableMongoRepositories("com.example.service_1.Dao.Tools")
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new MyWebSocketHandler(new UserRepository() {
            @Override
            public <S extends ChatHistory> S save(S entity) {
                return null;
            }

            @Override
            public <S extends ChatHistory> List<S> saveAll(Iterable<S> entities) {
                return null;
            }

            @Override
            public Optional<ChatHistory> findById(String s) {
                return Optional.empty();
            }

            @Override
            public boolean existsById(String s) {
                return false;
            }

            @Override
            public List<ChatHistory> findAll() {
                return null;
            }

            @Override
            public Iterable<ChatHistory> findAllById(Iterable<String> strings) {
                return null;
            }

            @Override
            public long count() {
                return 0;
            }

            @Override
            public void deleteById(String s) {

            }

            @Override
            public void delete(ChatHistory entity) {

            }

//            @Override
//            public void deleteAllById(Iterable<? extends String> strings) {
//
//            }

            @Override
            public void deleteAll(Iterable<? extends ChatHistory> entities) {

            }

            @Override
            public void deleteAll() {

            }

            @Override
            public List<ChatHistory> findAll(Sort sort) {
                return null;
            }

            @Override
            public Page<ChatHistory> findAll(Pageable pageable) {
                return null;
            }

            @Override
            public <S extends ChatHistory> S insert(S entity) {
                return null;
            }

            @Override
            public <S extends ChatHistory> List<S> insert(Iterable<S> entities) {
                return null;
            }

            @Override
            public <S extends ChatHistory> Optional<S> findOne(Example<S> example) {
                return Optional.empty();
            }

            @Override
            public <S extends ChatHistory> List<S> findAll(Example<S> example) {
                return null;
            }

            @Override
            public <S extends ChatHistory> List<S> findAll(Example<S> example, Sort sort) {
                return null;
            }

            @Override
            public <S extends ChatHistory> Page<S> findAll(Example<S> example, Pageable pageable) {
                return null;
            }

            @Override
            public <S extends ChatHistory> long count(Example<S> example) {
                return 0;
            }

            @Override
            public <S extends ChatHistory> boolean exists(Example<S> example) {
                return false;
            }



//            @Override
//            public <S extends ChatHistory, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
//                return null;
//            }
//
//            @Override
//            public <S extends ChatHistory, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
//                return null;
//            }
        }), "/websocket");
    }
}
