package api.model;

public class BookChapter{
	private String bcode;
	private String bname;
	private String aname;
	private String cid;
	private String ctitle;
	private String ccontent;
	public BookChapter() {

	   }
	public BookChapter(String bcode,String bname, String aname,String cid, String ctitle, String ccontent) {
	       this.cid = cid;
	       this.ctitle = ctitle;
	       this.ccontent = ccontent;
	       this.bcode = bcode;
	       this.bname = bname;
	       this.aname = aname;
	   }
	 public String getBCode() {
	       return bcode;
	   }

	   public void setBCode(String BCode) {
	       this.bcode = BCode;
	   }

	   public String getBName() {
	       return bname;
	   }

	   public void setBName(String BName) {
	       this.bname = BName;
	   }
	   public String getAName() {
	       return aname;
	   }

	   public void setAName(String AName) {
	       this.aname = AName;
	   }
	   public String getCid() {
	       return cid;
	   }

	   public void setCid(String Cid) {
	       this.cid = Cid;
	   }
	   public String getCTitle() {
	       return ctitle;
	   }

	   public void setCTitle(String CTitle) {
	       this.ctitle = CTitle;
	   }
	   public String getCContent() {
	       return ccontent;
	   }

	   public void setCContent(String CContent) {
	       this.ccontent = CContent;
	   }
}