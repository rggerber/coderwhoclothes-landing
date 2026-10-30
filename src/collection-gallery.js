// Progressive enhancement: without JavaScript each image opens its original file.
const links = document.querySelectorAll('[data-gallery-image]');
if (links.length && typeof HTMLDialogElement !== 'undefined') {
  const dialog = document.createElement('dialog');
  dialog.className = 'image-dialog';
  dialog.setAttribute('aria-labelledby', 'image-dialog-title');
  dialog.innerHTML = '<div class="image-dialog-toolbar"><h2 id="image-dialog-title"></h2><button type="button" aria-label="Close full-size image">Close ×</button></div><a class="original-image-link" target="_blank" rel="noopener noreferrer">Open original image ↗</a><img alt="">';
  document.body.append(dialog);
  const image = dialog.querySelector('img');
  const close = dialog.querySelector('button');
  let opener;
  links.forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0 || typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    opener = link;
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    dialog.querySelector('h2').textContent = link.dataset.title;
    dialog.querySelector('.original-image-link').href = link.href;
    dialog.showModal();
    document.documentElement.classList.add('image-dialog-open');
    close.focus();
  }));
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('image-dialog-open');
    opener?.focus();
  });
}
