// js/translate.js
document.addEventListener('DOMContentLoaded', () => {
    let lang = localStorage.getItem('idioma') || 'ca';
    if(lang !== 'ca' && dictionary && dictionary[lang]) {
        translateDOM(document.body, lang);
        translateDOM(document.head, lang); // Per als títols, etc. si estan penjats aquí o podem fer document.title =...
        
        // Traducir el título directamente si está en el diccionario
        let originalTitle = document.title.replace(/\s+/g, ' ').trim();
        if(dictionary[lang][originalTitle]) {
            document.title = dictionary[lang][originalTitle];
        }

        // Setup MutationObserver for dynamically injected content
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        translateDOM(node, lang);
                    });
                }
            });
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }
});

function translateDOM(node, lang) {
    if(node.nodeType === Node.TEXT_NODE) {
        let text = node.nodeValue.replace(/\s+/g, ' ').trim();
        if(text && dictionary[lang][text]) {
            let translated = dictionary[lang][text];
            if (node.nodeValue.trim() !== translated) {
                node.nodeValue = node.nodeValue.replace(node.nodeValue.trim(), translated);
            }
        }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        if(node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
            for(let child of node.childNodes) {
                translateDOM(child, lang);
            }
            
            // Traducir placeholders si los hay
            if (node.placeholder) {
                let text = node.placeholder.replace(/\s+/g, ' ').trim();
                if (dictionary[lang][text]) {
                    node.placeholder = dictionary[lang][text];
                }
            }
        }
    }
}
