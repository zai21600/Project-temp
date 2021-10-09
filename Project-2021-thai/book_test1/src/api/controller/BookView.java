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
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import connection.ConnectionUtils;
import connection.MySQLConnUtils;

import api.model.Book;

@Path("/BookView")
public class BookView {
	
	@Path("book")
	@GET
	public Response getBook(
			@DefaultValue("") @QueryParam("bookID") String bookID
			) throws SQLException, NamingException, ClassNotFoundException   {
		
		Connection db = MySQLConnUtils.getMySQLConnection();
		try {
			String author = null;
			String bookname = null;
			
			PreparedStatement st = db.prepareStatement(
					"Select AName, BName from book where BCode = ?"
					);
			st.setString(1, bookID);
			
			ResultSet rs = st.executeQuery();
			
			while(rs.next()) {
				author = rs.getString(1);
				bookname = rs.getString(2);
			}
			
			JsonArrayBuilder bookInfo = Json.createArrayBuilder();
			
			st = db.prepareStatement(
					"Select CId, CTitle, CContent from bookchapter where BCode = ?"
			);
			st.setString(1, bookID);
			
			rs = st.executeQuery();
			while (rs.next()) {
				
				JsonArrayBuilder footnote = Json.createArrayBuilder();
				
				PreparedStatement st1 = db.prepareStatement(
						"Select FId, FContent from FootNote where BCode = ? and CId = ?"
						);
				
				st1.setString(1, bookID);
				st1.setString(2, rs.getString(1));
				ResultSet rs1 = st1.executeQuery();
				
				while(rs1.next()) {
					footnote.add((javax.json.JsonValue) Json.createObjectBuilder().add("footnoteID", rs1.getInt(1))
																				.add("content", rs1.getString(2))
																				.build());
				}
				
				
				bookInfo.add((javax.json.JsonValue) Json.createObjectBuilder().add("chapterID", rs.getInt(1))
		        													.add("title", rs.getString(2))
		        													.add("content", rs.getString(3))
		        													.add("footnote", footnote.build())
		        													.build());
		    }
			
			JsonObject book = Json.createObjectBuilder().add("bookID", bookID).add("bookName", bookname).add("author", author).add("bookInfo", bookInfo.build()).build();
			
		return Response.ok().entity(book.toString()).build();
		}
		finally {
			db.close();
		}
	}
	
	@Path("allbook")
	@GET
	public Response getAllBook() throws SQLException, NamingException, ClassNotFoundException   {
		
		Connection db = MySQLConnUtils.getMySQLConnection();
		System.out.println("database connected");
		try {
			
			JsonArrayBuilder books = Json.createArrayBuilder();
			
			PreparedStatement stt = db.prepareStatement(
					"Select * from book"
					);
			
			ResultSet rss = stt.executeQuery();
			
			while (rss.next()) {
				String author = rss.getString(3);
				int bookID = rss.getInt(1);
				String bookName = rss.getString(2);
				
				JsonArrayBuilder bookInfo = Json.createArrayBuilder();
				
				PreparedStatement st = db.prepareStatement(
						"Select CId, CTitle, CContent from bookchapter where BCode = ?"
				);
				st.setInt(1, bookID);
				
				ResultSet rs = st.executeQuery();
				while (rs.next()) {
					
					JsonArrayBuilder footnote = Json.createArrayBuilder();
					
					PreparedStatement st1 = db.prepareStatement(
							"Select FId, FContent from FootNote where BCode = ? and CId = ?"
							);
					
					st1.setInt(1, bookID);
					st1.setString(2, rs.getString(1));
					ResultSet rs1 = st1.executeQuery();
					
					while(rs1.next()) {
						footnote.add((javax.json.JsonValue) Json.createObjectBuilder().add("ID", rs1.getInt(1))
																					.add("content", rs1.getString(2))
																					.build());
					}
					
					
					bookInfo.add((javax.json.JsonValue) Json.createObjectBuilder().add("ID", rs.getInt(1))
			        													.add("title", rs.getString(2))
			        													.add("content", rs.getString(3))
			        													.add("footnote", footnote.build())
			        													.build());
			    }
				
				JsonObject book = Json.createObjectBuilder().add("bookName", bookName).add("bookID",bookID).add("author", author).add("bookInfo", bookInfo.build()).build();
				
				books.add(book);
			}
		return Response.ok().entity(books.build().toString()).build();
		}
		finally {
			db.close();
		}
	}
}