function init() {
  initFileuploader();
}

function initFileuploader() {
  const uploadBtn = document.querySelector('.file-selection-button');
  uploadBtn.addEventListener('click', e => {
    document.querySelector('#file-selection').click();
    e.preventDefault();
  });

  // On file selected.
  document.querySelector('#file-selection').addEventListener('change', function() {
    if (!this.files || !this.files[0]) return;
    // hide header
    toggleToolbar();
    // otherwise display stuff
    displayFilename(this.files[0].name);
    previewImage(this.files[0]);
  });
}

function toggleToolbar() {
  document.querySelector('.image-preview > h3').style.display = 'none';
}

function setImageSource({ target: { result }}) {
  document.querySelector('#working-image').src = result;
}

function previewImage(fileRef) {
  const reader = new FileReader();
  // when read finishes
  reader.onload = setImageSource;
  reader.readAsDataURL(fileRef);

}

function displayFilename(name) {
  document.querySelector('.filename').innerText = name;
}

// start initializing stuff when dom loads
document.addEventListener('DOMContentLoaded', init);