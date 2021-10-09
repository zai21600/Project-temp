$(function () {
	const api = "rest/BookView/allbook";
	$.get(api, function (data) {
    const obj = JSON.parse(data);
	console.log(obj);
    obj.map((val)=>{
		$(`<div class="books">
			<h1 ><a id="${val.bookID}" class="book"  href="reader.html" target="_blank">${val.bookName}</a></h1>
			<h3>${val.author}</h3>
			</div>
		`).appendTo(".item")
	});
	
  });
	$("body").on("click", ".book", function () {
    	let id = $(this).attr("id");
    	localStorage.setItem("bookID",id)
    	console.log(id);
  	});
  });

