// Fetch Space Trivia
async function fetchTrivia() {
    const API_KEY = "AIzaSyB7RvEk0U0JYsr8UA7-szhn2vwPaqqxjCw";  
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    
    try {
        document.getElementById("trivia-content").innerHTML = "⏳ Generating a fun space fact...";

        let response = await fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Give me a fun and interesting fact about space." }] }]
            })
        });

        if (!response.ok) throw new Error(`API Error: ${response.status} - ${response.statusText}`);

        let data = await response.json();
        let triviaFact = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠ No trivia found.";

        document.getElementById("trivia-content").innerHTML = `<p>${triviaFact}</p>`;
    } catch (error) {
        document.getElementById("trivia-content").innerHTML = `<p>⚠ Failed to fetch trivia: ${error.message}</p>`;
    }
}

// Fetch Space News
async function fetchNews() {
    const url = "https://api.spaceflightnewsapi.net/v4/articles/?limit=3";

    try {
        document.getElementById("news-content").innerHTML = "⏳ Fetching latest space news...";
        
        let response = await fetch(url);
        if (!response.ok) throw new Error(`API Error: ${response.status} - ${response.statusText}`);

        let data = await response.json();

        let newsHTML = "";
        data.results.forEach(article => {
            newsHTML += `
                <div>
                    <h4>${article.title}</h4>
                    <p>${article.summary || "No summary available."}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                    <hr>
                </div>
            `;
        });

        document.getElementById("news-content").innerHTML = newsHTML;
    } catch (error) {
        document.getElementById("news-content").innerHTML = `<p>⚠ Failed to fetch news: ${error.message}</p>`;
    }
}

// Fetch Mars Rover Photos
async function fetchRoverPhotos() {
    const apiKey = "LPqsvHbVGPpxdBgW8NeJuFskTmrAP8OKGd6RuW8G"; 
    const sol = 1000;  
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${apiKey}`;

    try {
        document.getElementById("rover-content").innerHTML = "⏳ Loading Mars photos...";

        let response = await fetch(url);
        if (!response.ok) throw new Error(`API Error: ${response.status} - ${response.statusText}`);

        let data = await response.json();

        if (!data.photos || data.photos.length === 0) {
            document.getElementById("rover-content").innerHTML = `<p>⚠ No photos found for Sol ${sol}. Try another day!</p>`;
            return;
        }

        let photos = data.photos.slice(0, 3);
        let photoHTML = photos.map(photo => `<img src="${photo.img_src}" alt="Mars Rover Photo">`).join("");

        document.getElementById("rover-content").innerHTML = photoHTML;
    } catch (error) {
        document.getElementById("rover-content").innerHTML = `<p>⚠ Failed to fetch rover photos: ${error.message}</p>`;
    }
}

// NASA Image Library
function openNASAResources() {
    window.open("https://images.nasa.gov/", "_blank");
}
