use test;
DROP table FootNote;
DROP table BookChapter;
DROP TABLE Book;
CREATE TABLE BOOK (
	BCode INT AUTO_INCREMENT PRIMARY KEY,
    BName VARCHAR(25) NOT NULL,
    AName VARCHAR(25) NOT NULL
);

CREATE TABLE BookChapter(
    BCode INT NOT NULL,
    CId INT NOT NULL ,
    CTitle VARCHAR(25) NOT NULL,
    CContent TEXT NOT NULL,
    FOREIGN KEY (BCode) REFERENCES Book(BCode),
    PRIMARY KEY (BCode, CId) 
    );
    
CREATE TABLE FootNote(
    BCode INT NOT NULL,
    CId INT NOT NULL,
    FId INT NOT NULL ,
    FContent TEXT NOT NULL,
    PRIMARY KEY (BCode, CId,FId),
    FOREIGN KEY (BCode, CId) REFERENCES BookChapter(BCode, CId)
);

SELECT * FROM FootNote;
