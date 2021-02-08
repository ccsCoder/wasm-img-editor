// CONSTANTS.

const Constants = {
  TAB: 9,
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39,
};

// Copied shamelessly from https://animate.style/#documentation
const animate = async (node, animation, prefix = 'animate__') => {
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    function onAnimationEnd() {
      resolve(node);
    }
    node.addEventListener('animationend', onAnimationEnd);
    node.classList.remove(animationName);
    node.classList.add(`${prefix}animated`, animationName);
  });
};


function init() {
  initFileuploader();
  initChangeImageButton();
  initToolbar();
}

function initToolbar() {
  // TODO: Arrow keys.
  const toolbarCtr = document.querySelector('.image-meta');
  const toolbarButtons = toolbarCtr.querySelectorAll('.icon-button');
  toolbarCtr.addEventListener('keydown', function(event) {
    if (event.target.classList.contains('icon-button')) {
      let currIndex = parseInt(event.target.getAttribute('data-index'));
      let nextIndex = 0;
      if ((event.keyCode || event.which) === Constants.ARROW_LEFT) {
        
      } else if ((event.keyCode || event.which) === Constants.ARROW_RIGHT) {

      }
    }
  });
  const first = document.querySelector('#image-edit-button');
  const last = document.querySelector('#undo');
  // keypresses
  first.addEventListener('keydown', e => {
    const key = e.keyCode || e.which; // yeah, it's 2021 and we still need to do this shit.
    if (e.shiftKey && key === Constants.TAB) {
      e.preventDefault();
      console.log('roving focus detector: Shift Tab on first. focusing last.');
      last.focus();
    }
  });
  last.addEventListener('keydown', e => {
    const key = e.keyCode || e.which; // yeah, it's 2021 and we still need to do this shit.
    if (key === Constants.TAB) {
      e.preventDefault();
      first.focus();
    };
  });
}

function initChangeImageButton() {
  document.querySelector('#image-edit-button').addEventListener('click', e => {
    document.querySelector('#file-selection').click();
  });
}

function initFileuploader() {
  const uploadBtn = document.querySelector('.file-selection-button');
  uploadBtn.addEventListener('click', e => {
    document.querySelector('#file-selection').click();
    e.preventDefault();
  });

  // On file selected.
  document.querySelector('#file-selection').addEventListener('change', onFileSelected);
}

function onFileSelected() {
    if (!this.files || !this.files[0])
      return;
    // hide header
    toggleToolbar();
    // otherwise display stuff
    displayFilename(this.files[0].name);
    previewImage(this.files[0]);
}

async function toggleToolbar() {
  document.querySelector('.image-preview > h3').classList.add('hidden');
  const fileSelector = await animate(document.querySelector('.file-selection'), 'fadeOutUp');
  fileSelector.classList.add('hidden');
  const toolbar = document.querySelector('.image-meta');
  toolbar.classList.remove('hidden');
  animate(toolbar, 'slideInLeft');
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