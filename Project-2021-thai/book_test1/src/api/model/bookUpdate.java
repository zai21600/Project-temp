package api.model;

public class bookUpdate {
	int bookID;
	int chapterID;	
	String content;
	public int getBookID() {
		return bookID;
	}
	public void setBookID(int bookID) {
		this.bookID = bookID;
	}
	public int getChapterID() {
		return chapterID;
	}
	public void setChapterID(int chapterID) {
		this.chapterID = chapterID;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	
}
