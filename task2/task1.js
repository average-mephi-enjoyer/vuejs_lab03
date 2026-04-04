function colorTextNodes(node, colorIndex) {
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'A') return colorIndex;
    if (node.nodeType === Node.TEXT_NODE) {
        let text = node.textContent;
        let fragment = document.createDocumentFragment();
        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            if (char === ' ') {
                fragment.appendChild(document.createTextNode(' '));
                colorIndex++;
            }
            else {
                let span = document.createElement('span');
                span.style.color = (colorIndex % 2 === 0) ? 'red' : 'blue';
                span.textContent = char;
                fragment.appendChild(span);
                colorIndex++;
            }
        }
        node.parentNode.replaceChild(fragment, node);
        return colorIndex;
    }
    else if (node.nodeType === Node.ELEMENT_NODE) {
        let currentIndex = colorIndex;
        for (let child of node.childNodes)
            currentIndex = colorTextNodes(child, currentIndex);
        return currentIndex;
    }
    return colorIndex;
}
const container = document.getElementById('colorfulText');
if (container) colorTextNodes(container, 0);