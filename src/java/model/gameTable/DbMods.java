package model.gameTable;

import dbUtils.DbConn;
import dbUtils.FormatUtils;
import dbUtils.PrepStatement;
import dbUtils.ValidationUtils;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DbMods {

    /*
    Returns a "StringData" object that is full of field level validation
    error messages (or it is full of all empty strings if inputData
    totally passed validation.  
     */
    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        /* Useful to copy field names from StringData as a reference
    public String gameId = "";
    public String gameName = "";
    public String releaseDate = "";
    public String price = "";
    public String genre = "";
    public String developer = "";
    public String img = "";
    public String webUserId = "";
    public String userEmail = "";

         */
        // Validation
        errorMsgs.gameName = ValidationUtils.stringValidationMsg(inputData.gameName, 45, true);
        errorMsgs.releaseDate = ValidationUtils.dateValidationMsg(inputData.releaseDate, false);
        errorMsgs.price = ValidationUtils.decimalValidationMsg(inputData.price, false);
        errorMsgs.genre = ValidationUtils.stringValidationMsg(inputData.genre, 45, false);
        errorMsgs.developer = ValidationUtils.stringValidationMsg(inputData.developer, 45, true);
        errorMsgs.img = ValidationUtils.stringValidationMsg(inputData.img, 300, false);
        errorMsgs.webUserId = ValidationUtils.integerValidationMsg(inputData.webUserId, true);


        return errorMsgs;
    } // validate 
    
    public static StringData findById(DbConn dbc, String id) {

        // The find API needs to represent three cases: found web_user, not found, db error. 
        StringData sd = new StringData();
        try {
            String sql = "SELECT game_id, game_name, release_date, price, genre, developer, img, web_user_id FROM game_table WHERE game_id = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set

                // plainInteger returns integer converted to string with no commas.
                sd.gameId = FormatUtils.plainInteger(results.getObject("game_id"));
                sd.gameName = FormatUtils.formatString(results.getObject("game_name"));
                sd.releaseDate = FormatUtils.formatDate(results.getObject("release_date"));
                sd.price = FormatUtils.formatDollar(results.getObject("price"));
                sd.genre = FormatUtils.formatString(results.getObject("genre"));
                sd.developer = FormatUtils.formatString(results.getObject("developer"));
                sd.img = FormatUtils.formatString(results.getObject("img"));
                sd.webUserId= FormatUtils.plainInteger(results.getObject("web_user_id"));

            } else {
                sd.errorMsg = "Game Not Found.";
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in DbMods.findById(): " + e.getMessage();
        }
        return sd;

    }
    
    public static model.gameTable.StringData update(model.gameTable.StringData inputData, DbConn dbc) {

        model.gameTable.StringData errorMsgs = new model.gameTable.StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            String sql = "UPDATE game_table SET game_name=?, release_date=?, price=?, genre=?, "
                    + "developer=?, img= ?, web_user_id = ? WHERE game_id = ?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.gameName); // string type is simple
            pStatement.setDate(2, ValidationUtils.dateConversion((inputData.releaseDate)));
            pStatement.setBigDecimal(3, ValidationUtils.decimalConversion((inputData.price)));
            pStatement.setString(4, inputData.genre);
            pStatement.setString(5, inputData.developer);
            pStatement.setString(6, inputData.img);
            pStatement.setInt(7, ValidationUtils.integerConversion(inputData.webUserId));
            pStatement.setInt(8, ValidationUtils.integerConversion(inputData.gameId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were updated (expected to update one record).";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That Game Name is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    }
   
    public static String delete(String gameId, DbConn dbc) {

        if (gameId == null) {
            return "Cannot delete the selected game because the 'gameId' is null";
        }

        // This method assumes that the calling Web API (JSP page) has already confirmed 
        // that the database connection is OK. BUT if not, some reasonable exception should 
        // be thrown by the DB and passed back anyway... 
        String result = ""; // empty string result means the delete worked fine.
        try {

            String sql = "DELETE FROM game_table WHERE game_id = ?";

            // This line compiles the SQL statement (checking for syntax errors against your DB).
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

            // Encode user data into the prepared statement.
            pStatement.setString(1, gameId);

            int numRowsDeleted = pStatement.executeUpdate();

            if (numRowsDeleted == 0) {
                result = "This record was already deleted";
            } else if (numRowsDeleted > 1) {
                result = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
            }

        } catch (Exception e) {
            result = "This game could not ben deleted because there are posts associated with their account";
        }

        return result;
    }


} // class
