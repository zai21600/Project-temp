let bookSetting = {};
$(function () {
	 
	let newBody = $("main").html();
  	let fontStyle = "verdana";
  	let fontSize = "20px";
	const getBookID=localStorage.getItem("bookID");
	const api = "http://localhost:8070/book_test1/rest/BookView/book?bookID="+getBookID;
	let apiObj = {};
	function getData() {
    let resultAPI = null;
    $.ajax({
      type: "GET",
      url: api,
      async: false,
      success: function (data) {
        resultAPI = JSON.parse(data);
      },
      error: function () {
        alert("Error loading order");
      },
    });
    //console.log(resultAPI);
    return resultAPI;
  }
const saveTextFormat=()=>{
    // if (typeof Storage !== "undefined") {
    //   newBody = $("main").html();
    //   localStorage.setItem("body", newBody);
    //   checkStorage(newBody);
    // }
    let bookID = $("div.container").attr("id");
    let numberPattern = /\d+/g;
    let getBookID = bookID.match(numberPattern);
    let getChapterID = $("h1.chapter").attr("id");
    const content = $("p.text").html();
    const postJSON = {
      bookID: getBookID[0],
      chapterID: getChapterID,
      content: content,
    };
    console.log(postJSON);
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "rest/BookView/createBook",
      data: JSON.stringify(postJSON),
      dataType: "text",
      error: function (e) {
        console.log(e);
      },

      success: function (data, textStatus, jqXHR) {
        alert("Submit successful");
      },
    });
  }

  //console.log(getData());
  renderTableOfContent(getData());

  $("#zoom-in").click(function () {
    const scale = $(".book-container").css("font-size");
    console.log(scale);
    updateZoom(1); 
  });

  $("#zoom-out").click(function () {
    updateZoom(-1);
  });

  zoomLevel = parseInt($(".book-container").css("font-size"));

  let updateZoom = function (zoom) {
    zoomLevel += zoom;
    $(".book-container,p.text").css("font-size", zoomLevel);
    let itemString = localStorage.getItem($(".container").attr("id"));
    let json = JSON.parse(itemString);
    json.size = zoomLevel;
    localStorage.setItem($(".container").attr("id"), JSON.stringify(json));
  };
  function isOrContains(node, container) {
    while (node) {
      if (node === container) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  function elementContainsSelection(el) {
    var sel;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount > 0) {
        for (var i = 0; i < sel.rangeCount; ++i) {
          if (!isOrContains(sel.getRangeAt(i).commonAncestorContainer, el)) {
            return false;
          }
        }
        return true;
      }
    } else if ((sel = document.selection) && sel.type != "Control") {
      return isOrContains(sel.createRange().parentElement(), el);
    }
    return false;
  }
  $("body").on("click", ".highlight", function () {
    if (elementContainsSelection(document.getElementById("text"))) {
      let selection = getSelectedText();
      let mark = document.createElement("MARK");
      let range = selection.getRangeAt(0);
      console.log(range);
      mark.appendChild(range.extractContents());
      selection.removeAllRanges();
      range.insertNode(mark);
		saveTextFormat()
    }
  });
  $("body").on("click", ".bold", function () {
    if (elementContainsSelection(document.getElementById("text"))) {
      let selection = getSelectedText();
      let bold = document.createElement("B");
      let range = selection.getRangeAt(0);
      console.log(range);
      bold.appendChild(range.extractContents());
      selection.removeAllRanges();
      range.insertNode(bold);
saveTextFormat()
    }
  });
  $("body").on("click", ".italic", function () {
    if (elementContainsSelection(document.getElementById("text"))) {
      let selection = getSelectedText();
      let italic = document.createElement("I");
      let range = selection.getRangeAt(0);
      console.log(range);
      italic.appendChild(range.extractContents());
      selection.removeAllRanges();
      range.insertNode(italic);
saveTextFormat()
    }
  });


  $("#fs").change(function () {
    let fontStyle = $(this).val();
    console.log(fontStyle);
    $(".text, .chapter").css("font-family", fontStyle);
    localStorage.setItem("personalize", fontStyle);
  });

  $("body").on("click", ".chapters", function () {
   let test = $(this).attr("id");
    let numberPattern = /\d+/g;
    console.log(test);
    let getChapter = test.match(numberPattern);
    console.log(getChapter[0]);
    renderBookByChapter(getData(), getChapter[0], test);
    let itemString = localStorage.getItem($(".container").attr("id"));
    if (itemString) {
      let json = JSON.parse(itemString);
      console.log(json.chapterID);
      if (!(json.chapterID == test)) {
        console.log("a");
        json.chapterID = test;
        json.size = 16;
        localStorage.setItem($(".container").attr("id"), JSON.stringify(json));
      }
    } else {
      setBookSetting(test);
    }
  });
 
});
const renderTableOfContent = (data) => {
  $(".container").attr({ id: `book${data.bookID}` });

  data.bookInfo.map((val) => {
    $(
      `<a href="#${val.chapterID}"><h3 class="chapters" id=chapter${val.chapterID}>${val.chapterName}</h3></a>`
    ).appendTo(".chapter-container");
  });
};
const renderFootnote = (data, index) => {
  data.map((value) => {
    $(`<footer class="${value.contentID}">
      ${value.contentID}:  ${value.content}
    </footer>`).appendTo(`.chapter${index}`);
  });
};
const renderBookByChapter = (data, id, selectedChapter) => {
  console.log(data);
  $(".book-container").empty();
  data.bookInfo.map((val, index) => {
    if (val.chapterID == id) {
      //let re = /\(([^)]+)\)/;
      //let matched = re.exec(val.content);
      $(`<section id="chapter${val.chapterID}" class="chapter${val.chapterID} zoom">
        <h1 class="chapter" id="${val.chapterID}">${val.chapterName}</h1>
            <p id="text" class=text>${val.content}</p>      
      </section>
      `).appendTo(".book-container");
      ++index;

      renderFootnote(val.footnote, index);
      //console.log(matched);
    }
  });

  let book = localStorage.getItem($(".container").attr("id"));
  console.log(book);
  if (book == null) {
    console.log("a");
    setBookSetting(selectedChapter);
    book = localStorage.getItem($(".container").attr("id"));
  }
  const bookObj = JSON.parse(book);
  const scrollLocation = bookObj.scroll;
  const chapterID = bookObj.chapterID;
  const size = bookObj.size;
  //updateBookSetting(selectedChapter);
  //console.log(scrollLocation);
  if ($(".container").attr("id") == bookObj.bookCode) {
    $("html,body").animate(
      {
        scrollTop: scrollLocation,
      },
      "slow"
    );
    if (selectedChapter === chapterID) {
      $(".book-container,p.text").css("font-size", size);
    }
  }

  $(window).scroll(function () {
    updateScroll(selectedChapter);
  });
};
const setBookSetting = (chapterID) => {
  //console.log(scale);
  const currentPos = $("html").scrollTop();
  const bookID = $(".container").attr("id");
  const scale = $(".book-container").css("font-size");
  const bookSetting = {
    bookCode: bookID,
    scroll: currentPos,
    chapterID: chapterID,
    size: scale,
  };
  localStorage.setItem($(".container").attr("id"), JSON.stringify(bookSetting));
};
const updateScroll = (chapterID) => {
  //console.log(scale);
  let itemString = localStorage.getItem($(".container").attr("id"));
  let json = JSON.parse(itemString);
  const currentPos = $("html").scrollTop();
  json.scroll = currentPos;
  localStorage.setItem($(".container").attr("id"), JSON.stringify(json));
};
function getSelectedText() {
  if (window.getSelection) {
    //console.log(window.getSelection().toString());
    return window.getSelection();
  }
}

