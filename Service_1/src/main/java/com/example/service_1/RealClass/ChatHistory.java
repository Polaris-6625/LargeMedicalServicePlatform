package com.example.service_1.RealClass;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "chatHistory")
public class ChatHistory {
    private String person;
    private String content;
    private String talkTime;

    public String getPerson() {
        return person;
    }

    public void setPerson(String person) {
        this.person = person;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTalkTime() {
        return talkTime;
    }

    public void setTalkTime(String talkTime) {
        this.talkTime = talkTime;
    }

    @Override
    public String toString() {
        return "ChatHistory{" +
                "person='" + person + '\'' +
                ", content='" + content + '\'' +
                ", talkTime='" + talkTime + '\'' +
                '}';
    }
}
