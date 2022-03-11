package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.gameTable.*;

// classes in my project
import dbUtils.*;

public class GameView {

    public static StringDataList getAllGames(DbConn dbc) {

        // sdl will be an empty array and DbError with "" 
        StringDataList sdl = new StringDataList(); 
        
        // sd will have all of it's fields initialized to ""
        StringData sd = new StringData();
        
        try {
            String sql = "SELECT game_id, game_name, release_date, price, genre, developer, img, game_table.web_user_id, user_email "
                    + "FROM game_table "
                    + "JOIN web_user "
                    + "WHERE game_table.web_user_id = web_user.web_user_id;";  // you always want to order by something, not just random order.
            
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                
                sd = new StringData();
                
                // the formatUtils methods do not throw exceptions, but if they find illegal data, they write 
                // a message right in the field that they are trying to format.

                // plainInteger returns integer converted to string with no commas.
                sd.gameId = FormatUtils.plainInteger(results.getObject("game_id"));
                sd.gameName = FormatUtils.formatString(results.getObject("game_name"));
                sd.releaseDate = FormatUtils.formatDate(results.getObject("release_date"));
                sd.price = FormatUtils.formatDollar(results.getObject("price"));
                sd.genre = FormatUtils.formatString(results.getObject("genre"));
                sd.developer = FormatUtils.formatString(results.getObject("developer"));
                sd.img = FormatUtils.formatString(results.getObject("img"));
                sd.webUserId = FormatUtils.plainInteger(results.getObject("web_user_id"));
                sd.userEmail = FormatUtils.formatString(results.getObject("user_email"));
                sdl.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in GameView.getAllGames(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}