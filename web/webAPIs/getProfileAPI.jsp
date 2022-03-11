<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    StringData sd = new StringData();
    if(session.getAttribute("webUser")==null){//If no user display this
        sd.errorMsg = "No user is currently logged in";
    } else { //Other wise get the user info
        sd = (StringData) session.getAttribute("webUser");
    }
    //Return the info in json       
    Gson gson = new Gson();
    out.print(gson.toJson(sd).trim());
%>