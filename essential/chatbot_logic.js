/* CHATBOT LOGIC (UPDATE TEMPLATE LENGKAP) */

let hasGreeted = false;

// --- CONFIG: TEMPLATE JAWABAN ---
// Menambahkan template untuk topik baru (guru, fasilitas, kerjasama, visi_misi)
const responseTemplates = {
    jurusan: "Kompetensi Keahlian unggulan kami adalah: {data}.",
    guru: "Informasi Pengajar: {data}",
    fasilitas: "Kami memiliki fasilitas modern seperti: {data}.",
    ekskul: "Kembangkan bakatmu di ekstrakurikuler: {data}.",
    kerjasama: "Keunggulan hubungan industri kami meliputi: {data}.",
    syarat: "Dokumen yang perlu disiapkan: {data}.",
    ppdb_jalur: "Jalur pendaftaran yang tersedia: {data}.",
    visi_misi: "Cita-cita sekolah kami: {data}",
    biaya: "Info Biaya: {data}.",
    lokasi: "Lokasi kami di {data}.",
    kontak: "Hubungi kami via: {data}.",
    sapaan: "{data} Ada yang bisa saya bantu? (Tanya: Jurusan, Fasilitas, atau PPDB)",
    general: "Informasi: {data}."
};

// --- UI FUNCTIONS ---
function toggleChat() {
    document.body.classList.toggle("show-chat");
    if (document.body.classList.contains("show-chat")) {
        document.getElementById("userInput").focus();
        if (!hasGreeted) {
            setTimeout(() => {
                addMessage("👋 Halo! Asisten SMKN 15 Siap membantu. Tanya tentang Jurusan, Guru, atau Fasilitas ya!", 'bot-message');
                hasGreeted = true;
            }, 500);
        }
    }
}

function handleEnter(event) {
    if (event.key === "Enter") sendMessage();
}

function sendMessage() {
    const inputField = document.getElementById('userInput');
    const userText = inputField.value.trim();

    if (userText === "") return;

    addMessage(userText, 'user-message');
    inputField.value = '';

    const loadingId = addMessage("...", 'bot-message', true);

    setTimeout(() => {
        removeMessage(loadingId);
        
        // Cek Database Lokal
        const localAnswer = checkLocalKnowledge(userText);

        if (localAnswer) {
            addMessage(localAnswer, 'bot-message');
        } else {
            // Jika tidak ketemu, kasih tombol Google
            const googleBtn = createGoogleButton(userText);
            const chatBody = document.getElementById('chatBody');
            chatBody.appendChild(googleBtn);
            chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
        }
    }, 500);
}

// --- LOGIKA PENCARI ---
function checkLocalKnowledge(input) {
    // Ubah ke huruf kecil untuk pencarian
    const cleanInput = input.toLowerCase();

    if (typeof chatbotKnowledgeBase === 'undefined') return null;

    for (let item of chatbotKnowledgeBase) {
        // Cek apakah input mengandung salah satu keyword
        // Kita pakai .includes() sederhana agar cepat
        const isMatch = item.keywords.some(k => cleanInput.includes(k.toLowerCase()));

        if (isMatch) {
            // Rapikan data list menjadi koma
            let cleanData = "";
            if (Array.isArray(item.data)) {
                 // Jika datanya banyak, gabung pakai koma dan enter biar rapi
                 if(item.data.length > 3) {
                     cleanData = "<br>• " + item.data.join("<br>• ");
                 } else {
                     cleanData = item.data.join(", ");
                 }
            } else {
                 cleanData = item.data;
            }
            
            // Ambil template kalimat
            let reply = responseTemplates[item.topic] || responseTemplates.general;
            return reply.replace("{data}", cleanData);
        }
    }
    return null;
}

// --- GOOGLE BUTTON ---
function createGoogleButton(query) {
    const container = document.createElement('div');
    container.className = 'message-box bot-message';
    const searchQuery = query + " SMK Negeri 15 Kota Bekasi"; 
    const googleLink = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;

    container.innerHTML = `
        <div class="message-content">
            Maaf, info itu belum ada di database saya. 🙏<br>
            Coba cari di Google:<br>
            <a href="${googleLink}" target="_blank" style="color: #007bff; font-weight: bold; text-decoration: none;">
               🔍 Cari "${query}"
            </a>
        </div>
    `;
    return container;
}

// --- HELPER ---
function addMessage(text, className, isLoading = false) {
    const chatBody = document.getElementById('chatBody');
    const msg = document.createElement('div');
    msg.className = `message-box ${className}`;
    if (isLoading) msg.id = "loadingMessage";
    
    msg.innerHTML = `<div class="message-content">${text}</div>`;
    chatBody.appendChild(msg);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
    return msg.id;
}

function removeMessage(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}