/* Add only photos selected for publication. Paths are relative to this page.
   Example entry: {src:'assets/photography/photo.jpg', alt:'Description of the scene',
                   caption:'Optional location or caption', collection:'Nature'} */
const photographs = [];

(() => {
  if (!photographs.length) return;
  document.getElementById('photo-placeholder').hidden = true;
  const section = document.getElementById('photography');
  const collections = document.getElementById('photo-collections');
  const dialog = document.getElementById('photo-dialog');
  const full = document.getElementById('photo-full');
  const caption = document.getElementById('photo-caption');
  const groups = new Map();
  let current = 0;
  let trigger;
  function show(index) {
    current = (index + photographs.length) % photographs.length;
    const photo = photographs[current];
    full.src = photo.src;
    full.alt = photo.alt;
    caption.textContent = photo.caption || '';
    document.getElementById('photo-position').textContent = `${current + 1} / ${photographs.length}`;
  }
  photographs.forEach((photo, index) => {
    const name = photo.collection || '';
    if (!groups.has(name)) {
      const group = document.createElement('div');
      group.className = 'photo-collection';
      if (name) {
        const heading = document.createElement('h3');
        heading.textContent = name;
        group.append(heading);
      }
      const grid = document.createElement('div');
      grid.className = 'photo-grid';
      group.append(grid);
      collections.append(group);
      groups.set(name, grid);
    }
    const figure = document.createElement('figure');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'photo-thumbnail';
    button.setAttribute('aria-label', `Enlarge: ${photo.alt}`);
    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    button.append(img);
    button.addEventListener('click', () => {
      trigger = button;
      show(index);
      dialog.showModal();
    });
    figure.append(button);
    if (photo.caption) {
      const text = document.createElement('figcaption');
      text.textContent = photo.caption;
      figure.append(text);
    }
    groups.get(name).append(figure);
  });
  document.getElementById('close-photo').addEventListener('click', () => dialog.close());
  document.getElementById('photo-previous').addEventListener('click', () => show(current - 1));
  document.getElementById('photo-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  dialog.addEventListener('close', () => trigger?.focus());
  section.hidden = false;
  document.getElementById('photography-nav').hidden = false;
})();
