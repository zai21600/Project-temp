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

import api.model.bookUpdate;
import connection.ConnectionUtils;
import connection.MySQLConnUtils;

@Path("/BookView")
public class UpdateBook {
	@Path("/createBook")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createBook(bookUpdate book) throws ClassNotFoundException, SQLException {
		Connection db= MySQLConnUtils.getMySQLConnection();
		try {
			String sql = "update bookchapter set ccontent = ? where BCode = ? and CId = ?";
			PreparedStatement pstm = db.prepareStatement(sql);
			pstm.setString(1, book.getContent());
			pstm.setInt(2, book.getBookID());
			pstm.setInt(3, book.getChapterID());

			pstm.executeUpdate();
			return Response.ok().entity("Book has been updated").build();
		}
		catch(SQLException e) {
			e.printStackTrace();
			return Response.ok().entity(e.toString()).build();
			}
		finally {
			db.close();			
		}
		
	}
}
