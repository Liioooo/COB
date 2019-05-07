import './docs-styles.scss';

Array.from(document.getElementsByClassName("title")).forEach(function(element) {
  element.addEventListener("click", toggleContent);
});

function toggleContent() {
  console.log("got here");
    let nextElement = next(this);
    if (nextElement.style.display === 'none') {
      nextElement.style.display = 'block';
      console.log("block");
    } else {
      nextElement.style.display = 'none';
      console.log("none");
    }
}

function next(elem) {
  do {
    elem = elem.nextSibling;
  } while (elem && elem.nodeType !== 1);
  return elem;
}
