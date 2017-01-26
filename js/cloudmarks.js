var bookmarkList = [];

/* $.each(categories, function () {
$('#bookmarksContainer').append('<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">' + this + '</h3></div><div class="panel-body"><div id="' + this + 'List"></div></div>');
}); */

//BOOKMARKS
function addBookmark() {
	var url = $('#bookmark').val();

	if (url === '') {
		showAlert('Insert a valid url');
		return;
	}

	var result = $.grep(bookmarkList, function (e) {
			return e.url === url;
		});

	if (result.length > 0) {
		showAlert('Bookmark already present');
		return;
	}

	bookmarkList.push({
		'name': url,
		'url': url
	});

	save();
	displayBookmarks();
}

function removeBookmark() {
	var url = $('#bookmark').val();

	if (url === '') {
		showAlert('Insert a valid url');
		return;
	}

	bookmarkList.bookmarks = $.grep(bookmarkList.bookmarks, function (e) {
			return e.url !== url;
		});

	save();
	displayBookmarks();
}

function displayBookmarks() {
	$('#bookmark').val('');

	bookmarkList.sort(function (a, b) {
		return ((trimUrl(a.name) < trimUrl(b.name)) ? -1 : ((trimUrl(a.name) > trimUrl(b.name)) ? 1 : 0));
	});

	$('#bookmarksList').empty();
	$.each(bookmarkList, function () {
		$('#bookmarksList').append('<img src="http://www.google.com/s2/favicons?domain=' + this.url + '" width="16" height="16"><a href="' + this.url + '" target="_blank"> ' + trimUrl(this.url) + '</a><br/>');
	});
}

function trimUrl(url) {
	var tempUrl = url.substring(url.indexOf(':') + 3);
	if (tempUrl[tempUrl.length - 1] === '/') {
		return tempUrl.slice(0, -1);
	} else {
		return tempUrl;
	}
}
function save() {
	var link = document.createElement('a');
	link.download = 'bookmarks.json';
	link.href = 'data:,' + JSON.stringify(bookmarkList);
	link.click();
}

function load() {
	var file = $('#file')[0].files[0];
	var reader = new FileReader();
	if (file) {
		reader.readAsText(file);
		reader.onload = loaded;
	}
}

function loaded(e) {
	bookmarkList = JSON.parse(e.target.result);
	displayBookmarks();
}

$(document).ready(function () {});
