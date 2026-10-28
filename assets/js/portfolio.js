'use strict';

(() => {
  const items = window.GEKRAFS_PORTFOLIO || [];
  const gallery = document.getElementById('portfolio-gallery');
  const template = document.getElementById('portfolio-card-template');
  const dialog = document.getElementById('portfolio-dialog');
  const detail = (name) => document.getElementById('portfolio-detail-' + name);
  let opener;
  let previousOverflow;

  function setImage(image, source, fallback) {
    // Lazy images need a layout box to become eligible for loading.
    image.hidden = !source;
    image.style.opacity = '0';
    if (fallback) fallback.hidden = false;
    image.onload = () => {
      image.hidden = false;
      image.style.opacity = '1';
      if (fallback) fallback.hidden = true;
    };
    image.onerror = () => {
      image.hidden = true;
      if (fallback) fallback.hidden = false;
    };
    if (source) {
      image.src = source;
      if (image.complete && image.naturalWidth > 0) image.onload();
    } else {
      image.removeAttribute('src');
    }
  }

  function initials(name) {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0])
      .join('');
  }

  function openDetail(item, button) {
    opener = button;
    detail('title').textContent = item.title;
    detail('category').textContent = item.category;
    detail('description').textContent = item.description;
    detail('creator').textContent = item.creator;
    detail('location').textContent = item.location;
    detail('initial').textContent = initials(item.creator);
    detail('image').alt = item.title;
    setImage(detail('image'), item.image, detail('placeholder'));
    setImage(detail('avatar'), item.avatar, detail('initial'));
    const contact = detail('contact');
    contact.hidden = true;
    contact.removeAttribute('href');
    try {
      const url = new URL(item.contactUrl);
      if (url.protocol === 'https:' || url.protocol === 'http:') {
        contact.href = url.href;
        contact.hidden = false;
      }
    } catch {
      // No contact button until a real creator URL is supplied.
    }
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    dialog.scrollTop = 0;
  }

  items.forEach((item) => {
    const card = template.content.firstElementChild.cloneNode(true);
    card.setAttribute('aria-label', 'Lihat detail ' + item.title + ', oleh ' + item.creator);
    card.setAttribute('aria-controls', dialog.id);
    const width = Number(item.imageWidth) || 900;
    const height = Number(item.imageHeight) || 1100;
    const cover = card.querySelector('.portfolio-cover');
    cover.width = width;
    cover.height = height;
    const placeholder = card.querySelector('.portfolio-placeholder');
    placeholder.textContent = item.id + ' · Gambar segera tersedia';
    setImage(cover, item.image, placeholder);
    card.querySelector('.portfolio-card-title').textContent = item.title;
    card.querySelector('.portfolio-creator-name').textContent = item.creator;
    const initial = card.querySelector('.portfolio-initial');
    initial.textContent = initials(item.creator);
    setImage(card.querySelector('.portfolio-avatar-image'), item.avatar, initial);
    card.addEventListener('click', () => openDetail(item, card));
    gallery.append(card);
  });

  dialog.querySelector('.portfolio-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    opener?.focus({ preventScroll: true });
  });
})();
