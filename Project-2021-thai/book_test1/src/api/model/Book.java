package api.model;

public class Book {

	   private String name;
	   private String author;
	   private String content;
	   private String chapter;
	   public Book() {

	   }

	   public Book(String name, String author, String chapter, String content) {
	       this.name = name;
	       this.author = author;
	       this.chapter = chapter;
	       this.content = content;
	   }

	   public String getAuthor() {
	       return author;
	   }

	   public void setAuthor(String author) {
	       this.author = author;
	   }

	   public String getName() {
	       return name;
	   }

	   public void setName(String name) {
	       this.name = name;
	   }
	   public String getChapter() {
	       return chapter;
	   }

	   public void setChapter(String chapter) {
	       this.chapter = chapter;
	   }

	   public String getContent() {
	       return content;
	   }

	   public void setContent(String content) {
	       this.content = content;
	   }
	   

	}
