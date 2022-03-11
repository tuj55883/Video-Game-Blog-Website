<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    StringData sd = new StringData();
    if(session.getAttribute("webUser")==null){//If there is no saved user let the user know
        sd.errorMsg = "No user is currently logged in";
    } else {//Otherwise invalidate and log them off
        session.invalidate();
        sd.errorMsg = "You are now logged off";
    }
           
    Gson gson = new Gson();
    out.print(gson.toJson(sd).trim());

%>