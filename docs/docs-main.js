import './docs-styles.scss';

Array.from(document.getElementsByClassName("title")).forEach(function(element) {
  element.addEventListener("click", toggleContent);
});

function toggleContent() {
    let nextElement = next(this);
    if (nextElement.style.display === 'none') {
      this.style.fontWeight = 'bold';
      nextElement.style.display = 'block';
    } else {
      this.style.fontWeight = 'normal';
      nextElement.style.display = 'none';
    }
}

function next(elem) {
  do {
    elem = elem.nextSibling;
  } while (elem && elem.nodeType !== 1);
  return elem;
}
