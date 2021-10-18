package connection;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
 
public class MySQLConnUtils {
	 
	 public static Connection getMySQLConnection()
	         throws ClassNotFoundException, SQLException {
	     String hostName = "localhost";
	     String dbName = "test";
	     String userName = "user1";
	     String password = "123456789";
	     return getMySQLConnection(hostName, dbName, userName, password);
	 }
	 
	 public static Connection getMySQLConnection(String hostName, String dbName,
	         String userName, String password) throws SQLException,
	         ClassNotFoundException {
	   
	     Class.forName("com.mysql.cj.jdbc.Driver");
	 
	     String connectionURL = "jdbc:mysql://" + hostName + ":5042/" + dbName;
	 
	     Connection conn = DriverManager.getConnection(connectionURL, userName,
	             password);
	     return conn;
	 }
	}