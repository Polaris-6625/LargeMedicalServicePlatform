package com.example.service_2.Unity;

public class NumCheck {
    private String createToken;
    private String Num;

    public String getCreateToken() {
        return createToken;
    }

    public void setCreateToken(String createToken) {
        this.createToken = createToken;
    }

    public String getNum() {
        return Num;
    }

    public void setNum(String num) {
        Num = num;
    }

    @Override
    public String toString() {
        return "NumCheck{" +
                "createToken='" + createToken + '\'' +
                ", Num='" + Num + '\'' +
                '}';
    }
}
