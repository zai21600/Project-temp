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
import javax.ws.rs.core.Response;

import api.model.Book;
import connection.MySQLConnUtils;

public class test {
	public static void main(String[] args) throws ClassNotFoundException, SQLException {
		Connection db = MySQLConnUtils.getMySQLConnection();
		try {
			String sql = "update bookchapter set ccontent = \"blablablablabla\" where BCode = 1 and CId = 2";
			PreparedStatement pstm = db.prepareStatement(sql);

			pstm.executeUpdate();
		}
		catch(SQLException e) {
			e.printStackTrace();
			}
		finally {
			db.close();			
		}
	}
}