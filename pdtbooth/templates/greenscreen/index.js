selected_imgs = [];

var uuid = $('#meta-data').attr('uuid');

$.ajax({
  method: "GET",
  url: window.location.origin + `/get_photos_uuid/?uuid=${uuid}`,
  success: function(data) {
    var photosHtml = "";

    var first_img = "";

    data.data.forEach(function(src) {
	if (first_img == "") {
	    first_img = src;
	}
	photosHtml += `<img class="thumbnail" src="${src}" />`
    });

    $('#preview-div').html(`
    	<img class="preview" id="preview_img" src="${first_img}" />
	<button class="btn" id="add_photo">Add Photo</button>
    `);
    $('#all-photos-div').html(photosHtml);

    addMyListeners();
    addThumbnailListeners();

  }
});


function addThumbnailListeners() {
  $('.thumbnail').off('click');
  $('.thumbnail').click(function(e) {
    var src = $(e.currentTarget).attr("src");
    //we haven't selected the image yet
    if (selected_imgs.indexOf(src) == -1) {
      $('#preview-div').html(`
            <img class="preview" id="preview_img" src=${src} />
            <button class="btn" id="add_photo">Add Photo</button>
        `);
    } else {

      $('#preview-div').html(`
            <img class="preview" id="preview_img" src=${src} />
            <button class="btn btn-danger" id="remove_photo">Remove Photo</button>
    `);
    }
    addMyListeners();
  });
}

function addMyListeners() {
  $('#add_photo').click(function(e) {
    var src = $('#preview_img').attr("src");
    if (selected_imgs.indexOf(src) == -1) {
      selected_imgs.push(src);
      $('#preview-div').html(`
            <img class="preview" id="preview_img" src=${src} />
            <button class="btn btn-danger" id="remove_photo">Remove Photo</button>
    `);
      addMyListeners();
      renderAddedPhotos();
      addThumbnailListeners();
    }
  });

  $('#remove_photo').click(function(e) {
    var src = $('#preview_img').attr("src");
    if (selected_imgs.indexOf(src) != -1) {
      selected_imgs.splice(selected_imgs.indexOf(src), 1);
      $('#preview-div').html(`
            <img class="preview inline" id="preview_img" src=${src} />
            <button class="btn" id="add_photo">Add Photo</button>
        `);

      addMyListeners();
      renderAddedPhotos();
      addThumbnailListeners();
    }
  });
}

function renderAddedPhotos() {
  selectedHtml = "";
  selected_imgs.forEach(function(src) {
    selectedHtml += `<img class="thumbnail inline" src="${src}" />`;
  });
  $('#selected-div').html(selectedHtml);
}

$('#move-to-edit').click(function(e) {
  console.log(selected_imgs);
})
