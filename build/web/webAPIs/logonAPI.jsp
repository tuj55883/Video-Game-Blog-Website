<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    StringData sd = new StringData();
    //Set the parameters we will search for
    String userEmail = request.getParameter("userEmail");
    String userPw = request.getParameter("userPw");
    if (userEmail == null || userPw == null) {//If user doesn't enter it correctly inform them
        sd.errorMsg = "Cannot search for user - 'userEmail' and 'userPw' must be url params";
    } else {//Otherwise check for errors
        DbConn dbc = new DbConn();
        sd.errorMsg = dbc.getErr();
        if (sd.errorMsg.length() == 0) {//If no errors find the user
            System.out.println("*** Ready to call DbMods.findByEmailPassword");
            sd = DbMods.findByEmailPassword(dbc, userEmail, userPw);
            
            if (sd.webUserId.length() > 0) {//If there is a user set the attribute
                session.setAttribute("webUser", sd);
            } else {//Otherwise inform the user there is no such person and invalidate
                sd.errorMsg = "Credentials not found";
                session.invalidate();
            }
        }

        dbc.close();
    }
    Gson gson = new Gson();
    out.print(gson.toJson(sd).trim());
%>