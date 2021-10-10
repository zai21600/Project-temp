$(function () {
	let newBody = $("main").html();
  	let fontStyle = "verdana";
  	let fontSize = "20px";
	const getBookID=localStorage.getItem("bookID");
	const api = "http://localhost:8070/book_test1/rest/BookView/book?bookID="+getBookID;
	let apiObj = {};
	$.get(api, function (data) {
    const obj = JSON.parse(data);
     const orgAPI = obj;
    apiObj = obj;
    //renderBook(obj);
    renderTableOfContent(obj);
    //renderFootnote(obj.bookInfo.footnote);
  });

  const gethighlight = localStorage.getItem("body");

  if (gethighlight) {
    $(".container").replaceWith(gethighlight);
  }
  $("body").on("click", ".download", function () {});
  $(".sizes").change(function () {
    $(".text").css("font-size", $(this).val());

    let chapterSize = parseInt($(".chapter").css("font-size"));
    let getSize = parseInt($(this).val());
    let newSize = getSize + chapterSize;
    $(".chapter").css("font-size", newSize);
    fontSize = $(".text").css("font-size");
    console.log(fontSize);
    localStorage.setItem("size", fontSize);
  });
  $("#fs").change(function () {
    let fontStyle = $(this).val();
    console.log(fontStyle);
    $(".text, .chapter").css("font-family", fontStyle);
    localStorage.setItem("personalize", fontStyle);
  });

  $("body").on("click", ".save", function () {
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
  });
  $("body").on("click", ".chapters", function () {
    let test = $(this).attr("id");
    let numberPattern = /\d+/g;
    console.log(test);
    let a = test.match(numberPattern);
    console.log(a[0]);
    rendyBookByChapter(apiObj, a[0]);
  });
  $("body").on("click", ".toolbar-setting", function () {
    let getAttrName = $(this).attr("name");
    textAction(getAttrName);
  });
});
$("body").on("click", ".done", function () {
  $(".text").off();
  $(".toolbar-setting").prop("checked", false);
});
const checkStorage = (data) => {
  const name = localStorage.getItem("body");
  //console.log(JSON.stringify(name));
  if (name) {
    $(".container").replaceWith(data);
  }
};
const renderTableOfContent = (data) => {
  data.bookInfo.map((val) => {
    $(
      `<a href="#${val.chapterID}"><h3 class="chapters" id=chapter${val.chapterID}>${val.title}</h3></a>`
    ).appendTo(".chapter-container");
  });
};
const renderFootnote = (data, index) => {
  data.map((value) => {
    $(`<footer class="${value.footnoteID}">
      ${value.footnoteID}:  ${value.content}
    </footer>`).appendTo(`.chapter${index}`);
  });
};
const rendyBookByChapter = (data, id) => {
  console.log(data);
  $(".book-container").empty();
  data.bookInfo.map((val, index) => {
    if (val.chapterID == id) {
      $(".container").attr({ id: `book${data.bookID}` });
      //let re = /\(([^)]+)\)/;
      //let matched = re.exec(val.content);
      $(`<section class="chapter${val.chapterID}">
        <h1 class="chapter" id="${val.chapterID}">${val.title}</h1>
            <p class=text>${val.content}</p>      
      </section>
      `).appendTo(".book-container");
      ++index;

      renderFootnote(val.footnote, index);
      //console.log(matched);
    }
  });
};

const renderBook = (data) => {
  $(".container").attr({ id: `book${data.bookID}` });
  data.bookInfo.map((val, index) => {
    //let re = /\(([^)]+)\)/;
    //let matched = re.exec(val.content);
    $(`<section class="chapter${val.chapterID}">
        <h1 class="chapter" id="${val.chapterID}">${val.chapterName}</h1>
            <p class=text>${val.content}</p>      
      </section>
      `).appendTo(".book-container");
    ++index;

    renderFootnote(val.footnote, index);
    //console.log(matched);
  });
};
function getSelectedText() {
  if (window.getSelection) {
    console.log(window.getSelection().toString());
    return window.getSelection().toString();
  }
}
const textAction = (name) => {
  let setClass = "";
  if (name === "highlight") {
    setClass = "hl";
  } else if (name === "bold") {
    setClass = "bold-style";
  } else {
    setClass = "italic-style";
  }

  $(`input[name="${name}"]`).change(function () {
    $(".text").mouseup(function () {
      let selection = getSelectedText();
      if (selection.length >= 3) {
        console.log(selection);

        let replacement = $("<span></span>")
          .attr({ class: setClass })
          .html(selection);
        console.log(replacement);

        let replacementHtml = $("<p>")
          .append(replacement.clone())
          .remove()
          .html();
        console.log($(replacement.clone()).remove().html());
        console.log($("<div>").append(replacement.clone()).html());
        console.log($("<div>").append(replacement.clone()).remove());
        console.log($("<div>").append(replacement.clone()).html());
        console.log(replacementHtml);
        console.log($(this).html($(this).html()));
        $(this).html($(this).html().replace(selection, replacementHtml));
      }
    });
  });
};
