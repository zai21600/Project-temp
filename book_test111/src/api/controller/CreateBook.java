package api.controller;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonValue;
import javax.naming.NamingException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import connection.ConnectionUtils;
import connection.MySQLConnUtils;
import api.model.Book;
import api.model.BookChapter;
import api.model.Chapter;
//@Path("/BookView")
public class CreateBook {
	/*@Path("/createBook")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createBook(Book Answer) throws ClassNotFoundException, SQLException {
		Connection db= MySQLConnUtils.getMySQLConnection();
		try {
			
			String sql = "select BCode from book";
			PreparedStatement pstm = db.prepareStatement(sql);
			
			ResultSet rs = pstm.executeQuery();
			
			int i = 1;
			
			while (rs.next()) {
				if (i != rs.getInt(1)) {
					break;
				}
				i++;
			}
			
			sql = "INSERT INTO BOOK VALUES(?,?,?)";
			pstm = db.prepareStatement(sql);
			pstm.setString(1, String.valueOf(i));
			pstm.setString(2, Answer.getBName());
			pstm.setString(3, Answer.getAName());
			System.out.println(Answer.getBCode());
			System.out.println(Answer.getBName());
			System.out.println(Answer.getAName());

			pstm.executeUpdate();
			return Response.ok().entity("Book is successfully created").build();
		}
		catch(SQLException e) {
			e.printStackTrace();
			return Response.ok().entity(e.toString()).build();
			}
		finally {
			db.close();			
		}
	}*/
	
	
}
