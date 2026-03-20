const STORAGE_KEY = "escamas_comments_v1";

function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
}

function getSavedComments() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.warn("Error leyendo comentarios guardados", error);
        return [];
    }
}

function saveComments(comments) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
}

function renderComments() {
    const commentList = document.getElementById("commentsList");
    const comments = getSavedComments();
    commentList.innerHTML = "";

    if (comments.length === 0) {
        commentList.innerHTML = '<p class="no-comments">Encara no hi ha comentaris.</p>';
        return;
    }

    const fragment = document.createDocumentFragment();
    comments.forEach((item) => {
        const div = document.createElement("div");
        div.className = "comment";
        div.innerHTML = `
            <div class="comment-header">
                <strong>${escapeHtml(item.name)}</strong>
                <span>${escapeHtml(item.date)}</span>
            </div>
            <p>${escapeHtml(item.message)}</p>
        `;
        fragment.appendChild(div);
    });

    commentList.appendChild(fragment);
}

function addComment(name, message) {
    const comments = getSavedComments();
    const newComment = {
        name: name.trim(),
        message: message.trim(),
        date: new Date().toLocaleString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }),
    };
    comments.unshift(newComment);
    saveComments(comments);
    renderComments();
}

document.addEventListener("DOMContentLoaded", () => {
    const sendBtn = document.getElementById("sendComment");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("comment");
    const statusMessage = document.createElement("p");
    statusMessage.className = "comment-status";
    statusMessage.setAttribute("aria-live", "polite");
    const box = document.querySelector(".comment-box");
    if (box) box.appendChild(statusMessage);

    let gmailVerified = false;

    function validateGmail() {
        const emailValue = emailInput.value.trim().toLowerCase();
        const gmailRegex = /^[a-z0-9._%+-]+@gmail\.com$/;

        if (!emailValue) {
            gmailVerified = false;
            statusMessage.textContent = "Introdueix el teu Gmail.";
            statusMessage.style.color = "#f8d7da";
            return false;
        }

        if (!gmailRegex.test(emailValue)) {
            gmailVerified = false;
            statusMessage.textContent = "El correu ha de ser un Gmail vàlid (xxx@gmail.com).";
            statusMessage.style.color = "#f8d7da";
            return false;
        }

        gmailVerified = true;
        statusMessage.textContent = "Gmail verificat correctament!";
        statusMessage.style.color = "#b5f8c3";
        return true;
    }

    renderComments();

    emailInput.addEventListener("input", () => {
        gmailVerified = false;
        validateGmail();
    });
    emailInput.addEventListener("blur", validateGmail);

    sendBtn.addEventListener("click", () => {
        const nameValue = nameInput.value;
        const emailValue = emailInput.value;
        const messageValue = messageInput.value;

        if (!nameValue.trim() || !emailValue.trim() || !messageValue.trim()) {
            statusMessage.textContent = "Omple tots els camps abans d'enviar.";
            statusMessage.style.color = "#f8d7da";
            return;
        }

        if (!gmailVerified && !validateGmail()) {
            statusMessage.textContent = "Verifica el teu Gmail abans d'enviar.";
            statusMessage.style.color = "#f8d7da";
            return;
        }

        addComment(`${nameValue} (${emailValue})`, messageValue);
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
        statusMessage.textContent = "Comentari enviat!";
        statusMessage.style.color = "#b5f8c3";
        gmailVerified = false;
    });
});