package com.example.service_1.Dao;

import com.example.service_1.RealClass.Docter;
import com.example.service_1.RealClass.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DaoMapper {
    public int Querry();
    public User SelectUserE(String root, String password);
    public void AddUser(String root,String password,String sex,String username,String status);
    public String rootExistence(String root);
    public List<Docter> selectAllDocter();
    public void insertDocter(String name,String sex,String position,String age,String dateTime,String endTime,String remarks,String department);
    public void createUser(String user);
    public void addPreDocter(String user,String preDocter);
    public void delDocter(String delDocter);
    public Docter SelectDocter(String name);
}
