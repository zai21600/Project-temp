let resultAPI;
let bookSetting = {};
const getBookID=localStorage.getItem("bookID");
fetch("rest/BookView/book?bookID="+getBookID)
  .then((res) => res.json())
  .then((data) => {
    resultAPI = data;

    init();
  });
function init() {
	
const saveTextFormat=()=>{
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
        console.log("Submit successful");
      },
    });
  }
	/*$(window).scroll(function () {
    const navPos = $("html").scrollTop();

    if (navPos > 200) {
      $(".nav-bar-adj").fadeIn(50);
      $(".nav-bar-adj").css("position", "fixed");
      $(".nav-bar-adj").css(
        "box-shadow",
        " rgba(136, 136, 136, 0.65) 0px 0px 15px 0px"
      );
    } else {
      $(".nav-bar-adj").css("position", "relative");
      $(".nav-bar-adj").css("box-shadow", "none");
    }
  });*/
  //console.log(getData());
  renderTableOfContent(resultAPI);

  $("#zoom-in").click(function () {
    
    updateZoom(1); 
	
  });

 $("#zoom-out").click(function () {
   
    updateZoom(-1);
	
  });

  
 let sizeArray = [];
  let sizeObj = {};
  let updateZoom = function (zoom) {
    let details = [
      ...document.querySelectorAll(".size_5,.size_10,.size_20,.size_30"),
    ];
    let spanInitial = document.querySelector(".initial-size");
    let spanInitialClass = spanInitial.className.split(" ")[1];
    console.log(spanInitialClass);
    let result2 = sizeArray.some((e) => e.hasOwnProperty(spanInitialClass));
    let chapterSize = document.querySelector(".chapter");
    let chapterSizeClass = chapterSize.className;

    let result3 = sizeArray.some((e) => e.hasOwnProperty(chapterSizeClass));
    details.forEach((element) => {
      //console.log(element.className.split(" ")[1]);

      let sizeKey = element.className
      var result = sizeArray.some((e) => e.hasOwnProperty(sizeKey));
		console.log(sizeKey)
		console.log(element)
      //console.log(result);
      //console.log(result2);
      if (!result) {
        let sizeString = "";
        let newSizeString = sizeString + "." + sizeKey;
        let sizes = parseInt($(newSizeString).css("font-size"));
        sizes += zoom;
        sizeObj = { [sizeKey]: sizes };
        sizeArray.push(sizeObj);
        //console.log(sizes);
        //console.log(sizeArray);
        $(newSizeString).css("font-size", sizes);
        let itemString = localStorage.getItem($(".container").attr("id"));
        let json = JSON.parse(itemString);
        json.size = sizeArray;
        localStorage.setItem($(".container").attr("id"), JSON.stringify(json));
      } else {
        //console.log(sizeKey);
        //console.log(zoom);
        let sizeString = "";
        let newSizeString = sizeString + "." + sizeKey;
        let sizes = parseInt($(newSizeString).css("font-size"));
        sizes += zoom;
        $(newSizeString).css("font-size", sizes);
        // console.log(newSizeString);
        sizeArray.map((val) => {
          for (let i in val) {
            if (i == sizeKey) {
              val[i] = sizes;
              break;
            }
          }
        });

        let itemString = localStorage.getItem($(".container").attr("id"));
        let json = JSON.parse(itemString);
        json.size = sizeArray;
        localStorage.setItem($(".container").attr("id"), JSON.stringify(json));
      }
    });
    if (!result2) {
      console.log("a");
      let zoomLevel = parseInt($(".initial-size").css("font-size"));
      zoomLevel += zoom;
      $(".initial-size").css("font-size", zoomLevel);
      sizeObj = { "initial-size": zoomLevel };
      sizeArray.push(sizeObj);
      //console.log(sizeArray);
      let itemString = localStorage.getItem($(".container").attr("id"));
      let json = JSON.parse(itemString);
      json.size = sizeArray;
      localStorage.setItem($(".container").attr("id"), JSON.stringify(json));
    } else {
      console.log("b");
      zoomLevel = parseInt($(".initial-size").css("font-size"));
      zoomLevel += zoom;
      $(".initial-size").css("font-size", zoomLevel);
      sizeArray.map((val) => {
        for (let i in val) {
          if (i == "initial-size") {
            val[i] = zoomLevel;
            break;
          }
        }
      });
      let itemString = localStorage.getItem($(".container").attr("id"));
      let json = JSON.parse(itemString);
      json.size = sizeArray;
      localStorage.setItem($(".container").attr("id"), JSON.stringify(json));
    }
    if (!result3) {
      console.log("a");
      let zoomLevel = parseInt($(".chapter").css("font-size"));
      zoomLevel += zoom;
      $(".chapter").css("font-size", zoomLevel);
      sizeObj = { chapter: zoomLevel };
      sizeArray.push(sizeObj);
      //console.log(sizeArray);
      let itemString = localStorage.getItem($(".container").attr("id"));
      let json = JSON.parse(itemString);
      json.size = sizeArray;
      localStorage.setItem($(".container").attr("id"), JSON.stringify(json));
    } else {
      console.log("b");
      zoomLevel = parseInt($(".chapter").css("font-size"));
      zoomLevel += zoom;
      $(".chapter").css("font-size", zoomLevel);
      sizeArray.map((val) => {
        for (let i in val) {
          if (i == "chapter") {
            val[i] = zoomLevel;
            break;
          }
        }
      });
      let itemString = localStorage.getItem($(".container").attr("id"));
      let json = JSON.parse(itemString);
      json.size = sizeArray;
      localStorage.setItem($(".container").attr("id"), JSON.stringify(json));
    }
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




  $("body").on("click", ".chapters", function () {
    let test = $(this).attr("id");
    let numberPattern = /\d+/g;
    //console.log(test);
    let getChapter = test.match(numberPattern);
    //console.log(getChapter[0]);
    renderBookByChapter(resultAPI, getChapter[0], test);
    //console.log($(".initial-size").css("font-size"));
    let size = [...document.querySelectorAll(".size-change")];
    size.forEach((element) => {
      let zoomTag = parseInt($(element).css("font-size"));
      //console.log(zoomTag);
    });
    let itemString = localStorage.getItem($(".container").attr("id"));
    if (itemString) {
      let json = JSON.parse(itemString);
      //console.log(json.chapterID);
      if (!(json.chapterID == test)) {
        json.chapterID = test;
        json.size = 16;
        localStorage.setItem($(".container").attr("id"), JSON.stringify(json));
      }
    } else {
      setBookSetting(test);
    }
    /*$(window).scroll(function () {
      updateScroll(test);
    });*/
   
    let details = [...document.querySelectorAll("details")];
    document.addEventListener("click", function (e) {
      if (!details.some((node) => node.contains(e.target))) {
        details.forEach((node) => node.removeAttribute("open"));
      } else {
        details.forEach((node) =>
          !f.contains(e.target) ? node.removeAttribute("open") : ""
        );
      }
    });
    function checkInView(elem, partial) {
      var container = $(".book-container");
      var contHeight = container.height();
      var contTop = container.scrollTop();
      var contBottom = contTop + contHeight;

      var elemTop = $(elem).offset().top - container.offset().top;
      var elemBottom = elemTop + $(elem).height();

      var isTotal = elemTop >= 0 && elemBottom <= contHeight;
      var isPart =
        ((elemTop < 0 && elemBottom > 0) ||
          (elemTop > 0 && elemTop <= container.height())) &&
        partial;

      return isTotal || isPart;
    }
    let nodeParagraph;
    let paraObj = {};
    $(".book-container").scroll(function () {
      let result = "";
      let result2;
      $.each($(".book-container .box"), function (i, e) {
        const boxID = $(e).attr("id");
        const getBoxNode = document.getElementById(boxID);
        //console.log(getBoxNode);
        result += " " + checkInView($(e), false);
        result2 = checkInView($(getBoxNode), true);
        //console.log(result2);
        //console.log(boxID);

        if (result2) {
          const paraString = e.innerHTML.length;
          const newParaString = e.innerHTML.substring(0, paraString / 2);
          // console.log(boxID);
          paraObj = { [boxID]: newParaString };
          let itemString = localStorage.getItem($(".container").attr("id"));
          let json = JSON.parse(itemString);
          json.bookmark = paraObj;
          localStorage.setItem(
            $(".container").attr("id"),
            JSON.stringify(json)
          );
        }

        // console.log(checkInView($(e), true));
        //console.log(paraState);
      });
      //scrollToPara2();
    });
	let json = JSON.parse(itemString);
    if (json.bookmark) {
       const getBox = document.getElementsByClassName("box");
      const paraObj = json.bookmark;
      const boxID = Object.keys(paraObj)[0];
      for (let i of getBox) {
        //console.log($(i).attr("id"));
        const getBoxID = $(i).attr("id");
        if (getBoxID == boxID) {
          if (i.innerHTML.includes(paraObj[getBoxID])) {
            nodeParagraph = i;
            
            break;
          }
        }
      }

      setTimeout(function () {
        scrollToPara(nodeParagraph);
      }, 30);
    }

    
  });
 };
const renderTableOfContent = (data) => {
  $(".container").attr({ id: `book${data.bookID}` });

  data.bookInfo.map((val) => {
    $(
      `<a href="#${val.chapterID}"><h3 class="chapters" id=chapter${val.chapterID}>${val.title}</h3></a>`
    ).appendTo(".chapter-container");
  });
};

const renderBookByChapter = (data, id, selectedChapter) => {
  //console.log(data);
$(".book-container").empty();
  $("#text").empty();
  data.bookInfo.map((val, index) => {
    if (val.chapterID == id) {
      //let re = /\(([^)]+)\)/;
      //let matched = re.exec(val.content);
      $(`<section id="chapter${val.chapterID}" class="chapter${val.chapterID} zoom">
        <h1 class="chapter" id="${val.chapterID}">${val.title}</h1>
       

           <p id="text" class=text></p> 
      </section>
      `).appendTo(".book-container");
      ++index;

      //console.log(matched);
    }
  });
  let test = $(".zoom").attr("id");
  let numberPattern = /\d+/g;
  //console.log(test);
  let getChapter = test.match(numberPattern);
	//
  //console.log(getChapter[0]);
let index = 0;
  data.bookInfo.map((val) => {
   
 if (val.chapterID == getChapter[0]) {
// reconstruct html
  let str = val.content;
  let clone =str;
//  var lines = clone.split(/\r\n|\r|\n/g);
 let lines = clone.split(/\r?\n/);
  //console.log(lines);  
// create html
  let html="";
  for(var i=0;i<lines.length;i++){
	let arr1 = lines[i].split(" ");
	//console.log(arr1);
	if(lines[i] == ""){
		html+= '<br></br>'
	}
     else{ 
	//console.log(lines[i] + "\n");
       html += `<p id="box${++index}" class="box initial-size"> ${
            lines[i]
          }  </p>`;
  }}
		$("#text").append(html)
		$(".align_center").parent().css("text-align","center");
		  $(".align_left").parent().css("text-align","left");
		  $(".align_right").parent().css("text-align","right");
let footnote = 1;
  var cite, title;
  $("q[title]").addClass("footnote");
  $(".footnote").each(function() {
    $(this).append("<sup>"+ "[" +footnote + "]"+ "</sup>");
	cite = "<li>";
    title = $(this).attr("title");
	if (title) {
      cite += title;
    }
    cite += "</li>";

    $(this).click(function(){
    if(this.title){
      window.alert(this.title)
    }
        })
  //  $("#footnotes").append(cite);
    footnote++;
  });
}
});
      /*const getContent = val.content.toString();
      const spanString = getContent.slice(0, 5);
      console.log(spanString);
      if (spanString !== "<span") {
        console.log("a");
        document.getElementById("initial-size").innerHTML = val.content;
      } else {
        console.log("b");
        $(".text").empty();
        document.getElementById("text").innerHTML = val.content;
      }
    }*/
	
  $(".book-container").css({ border: "1px solid black" });
  $(".book-container").css(
    "box-shadow",
    " rgba(136, 136, 136, 0.65) 0px 0px 15px 0px"
  );

  let book = localStorage.getItem($(".container").attr("id"));
  //console.log(book);
  if (book == null) {
    console.log("a");
    setBookSetting(selectedChapter);
    book = localStorage.getItem($(".container").attr("id"));
  }
  const bookObj = JSON.parse(book);
  
  const chapterID = bookObj.chapterID;
  const size = bookObj.size;
  //updateBookSetting(selectedChapter);
  //console.log(scrollLocation);
  if ($(".container").attr("id") == bookObj.bookCode) {
    
    if (selectedChapter === chapterID) {
      if (size.length > 0) {
        size.map((val) => {
          for (let i in val) {
            let sizeClass = "";
            sizeClass = "." + i;
           
            $(sizeClass).css("font-size", val[i]);
           
          }
        });
      }
    }
  
   
  }

  /*$(window).scroll(function () {
    updateScroll(selectedChapter);
  });*/
};
const scrollToPara = (el) => {
  el.scrollIntoView({
    block: "end",
    inline: "nearest",
  });

  el.scrollIntoView = function () {};
};
const setBookSetting = (chapterID) => {
  //console.log(scale);
  
  const bookID = $(".container").attr("id");
  const bookSetting = {
    bookCode: bookID,
   
    chapterID: chapterID,
     size: "",
  };
  localStorage.setItem($(".container").attr("id"), JSON.stringify(bookSetting));
};
/*const updateScroll = (chapterID) => {
  //console.log(scale);
  let itemString = localStorage.getItem($(".container").attr("id"));
  let json = JSON.parse(itemString);
  const currentPos = $("html").scrollTop();
  json.scroll = currentPos;
  localStorage.setItem($(".container").attr("id"), JSON.stringify(json));
};*/
function getSelectedText() {
  if (window.getSelection) {
    //console.log(window.getSelection().toString());
    return window.getSelection();
  }
}

