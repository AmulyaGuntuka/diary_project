function generateQuote() {
    const mood = document.getElementById("mood").value;
    const quote = document.getElementById("quote");

    const quotes = {
        happy: "Happiness is not something ready-made. It comes from your own actions. - Dalai Lama",
        sad: "Tears come from the heart and not from the brain. - Leonardo da Vinci",
        motivated: "The only way to achieve the impossible is to believe it is possible. - Charles Kingsleigh",
        relaxed: "Peace comes from within. Do not seek it without. - Buddha"
    };

    quote.textContent = quotes[mood] || "";
}

function saveEntry(event) {
    event.preventDefault();

    const date = document.getElementById("entry-date").value;
    const title = document.getElementById("entry-title").value;
    const content = document.getElementById("entry-content").value;
    const photo = document.getElementById("photo-preview").src;

    const entries = JSON.parse(localStorage.getItem("entries")) || [];

    entries.push({ date, title, content, photo });
    localStorage.setItem("entries", JSON.stringify(entries));

    alert("Data saved successfully!");
    clearForm();
    displayEntries();
}

function displayEntries() {
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    const entriesList = document.getElementById("entries-list");
    entriesList.innerHTML = "";

    entries.forEach((entry) => {
        const entryDiv = document.createElement("div");
        entryDiv.className = "entry";
        entryDiv.innerHTML = `
            <h2>${entry.title}</h2>
            <p>${entry.date}</p>
            <p>${entry.content}</p>
            ${entry.photo !== "#" ? `<img src="${entry.photo}" alt="Photo of the day" style="max-width: 100%; height: auto;">` : ""}
        `;
        entriesList.appendChild(entryDiv);
    });
}

function searchEntries() {
    const searchTerm = document.getElementById("search-bar").value.toLowerCase();
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    const entriesList = document.getElementById("entries-list");
    entriesList.innerHTML = "";

    const filteredEntries = entries.filter(entry =>
        entry.title.toLowerCase().includes(searchTerm) ||
        entry.content.toLowerCase().includes(searchTerm)
    );

    filteredEntries.forEach(entry => {
        const entryDiv = document.createElement("div");
        entryDiv.className = "entry";
        entryDiv.innerHTML = `
            <h2>${entry.title}</h2>
            <p>${entry.date}</h2>
            <p>${entry.content}</p>
            ${entry.photo !== "#" ? `<img src="${entry.photo}" alt="Photo of the day" style="max-width: 100%; height: auto;">` : ""}
        `;
        entriesList.appendChild(entryDiv);
    });
}

function clearForm() {
    document.getElementById("entry-date").value = "";
    document.getElementById("entry-title").value = "";
    document.getElementById("entry-content").value = "";
    document.getElementById("mood").selectedIndex = 0;
    document.getElementById("quote").textContent = "";
    document.getElementById("photo-of-the-day").value = "";
    document.getElementById("photo-preview").src = "#";
    document.getElementById("photo-preview").style.display = "none";
}

function displayPhoto() {
    const fileInput = document.getElementById("photo-of-the-day");
    const photoPreview = document.getElementById("photo-preview");

    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            photoPreview.src = e.target.result;
            photoPreview.style.display = "block";
        };
        reader.readAsDataURL(file);
    } else {
        photoPreview.style.display = "none";
    }
}

function logout() {
    window.location.href = 'firstpage.html'; // Redirect to the login page
}

document.addEventListener("DOMContentLoaded", () => {
    displayEntries();

    const myEntriesLink = document.querySelector('a[href="#my-entries"]');
    myEntriesLink.addEventListener("click", () => {
        document.getElementById("home").style.display = "none";
        document.getElementById("new-entry").style.display = "none";
        document.getElementById("my-entries").style.display = "block";
    });

    const homeLink = document.querySelector('a[href="#home"]');
    homeLink.addEventListener("click", () => {
        document.getElementById("home").style.display = "block";
        document.getElementById("new-entry").style.display = "none";
        document.getElementById("my-entries").style.display = "none";
    });

    const newEntryLink = document.querySelector('a[href="#new-entry"]');
    newEntryLink.addEventListener("click", () => {
        document.getElementById("home").style.display = "none";
        document.getElementById("new-entry").style.display = "block";
        document.getElementById("my-entries").style.display = "none";
    });

    const logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", logout);
});
