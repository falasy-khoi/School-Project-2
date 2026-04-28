// FILE: data_reader.js
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// ==============================================================
// ⚠️ TEMPELKAN API KEY GEMINI ANDA DI SINI
const API_KEY = "TAIzaSyDJ-SYx-g3eoVeavgvM0QzhnObbwjhGOdA"; 
// ==============================================================

const genAI = new GoogleGenerativeAI(API_KEY);
const dataFolder = path.join(__dirname, 'data');
const dbFile = path.join(__dirname, 'chatbot_data.js');

function fileToGenerativePart(filePath, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
            mimeType
        },
    };
}

// Fungsi Delay (Jeda) Anti-Spam
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function processData() {
    console.log("=========================================");
    console.log("🚀 MENJALANKAN DATA READER (VERSI 5 - ANTI LIMIT) 🚀");
    console.log("=========================================");
    console.log("🔍 Memindai folder 'data'...");
    
    if (!fs.existsSync(dataFolder)) {
        console.log("Folder 'data' tidak ditemukan. Membuat folder otomatis...");
        fs.mkdirSync(dataFolder);
        return;
    }

    const files = fs.readdirSync(dataFolder);
    
    // Kita langsung gunakan model yang terdeteksi di akun Anda (2.0)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
    Saya memberikan sebuah gambar/teks berisi informasi sekolah, jurusan, atau layanan.
    Tugas Anda adalah mengekstrak informasi penting tersebut dan mengubahnya menjadi format objek JavaScript persis seperti ini:
    {
        keywords: ["kata_kunci1", "kata_kunci2"],
        topic: "topik_pembahasan",
        type: "list",
        data: ["Poin 1", "Poin 2", "Poin 3"]
    }
    
    Aturan:
    1. 'keywords' minimal 5 kata kunci yang relevan.
    2. 'type' isi dengan 'list' jika informasinya banyak, atau 'fact' jika hanya 1 kalimat.
    3. HANYA KELUARKAN TEKS JSON SAJA, tanpa tanda kutip markdown (\`\`\`) dan tanpa kata-kata pengantar.
    `;

    let processedCount = 0;

    for (const file of files) {
        const filePath = path.join(dataFolder, file);
        const ext = path.extname(file).toLowerCase();

        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.webp') {
            console.log(`\n⚙️  Memproses gambar: ${file}... (Tunggu sebentar ya)`);
            
            let mimeType = "image/jpeg";
            if (ext === '.png') mimeType = "image/png";
            else if (ext === '.webp') mimeType = "image/webp";

            const imagePart = fileToGenerativePart(filePath, mimeType);
            
            try {
                // Proses ke AI
                const result = await model.generateContent([prompt, imagePart]);
                let responseText = result.response.text();
                
                // Bersihkan teks
                responseText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();

                // Masukkan ke database
                injectToDatabase(responseText, file);
                
                // Hapus file
                fs.unlinkSync(filePath); 
                console.log(`✅ Selesai memproses dan file gambar telah dihapus: ${file}`);
                processedCount++;
                
                // JEDA 5 DETIK AGAR TIDAK TERKENA LIMIT GOOGLE LAGI
                if (files.length > 1) {
                    console.log("⏳ Menunggu 5 detik sebelum memproses gambar berikutnya (Anti-Spam)...");
                    await delay(5000); 
                }

            } catch (error) {
                console.error(`❌ Gagal memproses ${file}. Alasan:`, error.message);
                if (error.message.includes("429")) {
                    console.log("🚨 KESIMPULAN: Anda masih terkena Limit Kuota. Silakan tunggu 5 menit lagi sebelum mencoba.");
                }
            }
        }
    }

    if (processedCount === 0) {
        console.log("📂 Tidak ada gambar baru di folder 'data' untuk diproses.");
    } else {
        console.log("\n🎉 Proses selesai! Silakan cek file chatbot_data.js Anda.");
    }
}

function injectToDatabase(newJsonString, fileName) {
    let dbContent = fs.readFileSync(dbFile, 'utf8');
    const insertIndex = dbContent.lastIndexOf('];');

    if (insertIndex === -1) {
        console.error("Format chatbot_data.js tidak valid. Pastikan array diakhiri dengan '];'");
        return;
    }

    const newDataFormatted = `\n    // --- DATA OTOMATIS DARI: ${fileName} ---\n    , ${newJsonString}\n`;
    const updatedDbContent = dbContent.slice(0, insertIndex) + newDataFormatted + dbContent.slice(insertIndex);

    fs.writeFileSync(dbFile, updatedDbContent, 'utf8');
    console.log(`   💾 Data dari gambar berhasil disuntikkan ke database!`);
}

processData();