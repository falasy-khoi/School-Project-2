/* DATABASE CHATBOT (FIXED & UPDATE SPMB 2026)
   - Data mencakup Info Sekolah & Aturan Baru SPMB 2026.
   - Sapaan ditaruh paling bawah.
   - Keyword "p" dihapus.
*/

const chatbotKnowledgeBase = [
    // --- JURUSAN (Prioritas Utama) ---
    {
        keywords: ["jurusan", "prodi", "program keahlian", "ada apa saja", "minat", "kompetensi", "tamsis", "farmasi", "mesin"],
        topic: "jurusan",
        type: "list",
        data: [
            "Teknik Jaringan Komputer & Telekomunikasi (TJKT) - Unggulan",
            "Teknologi Farmasi (TF) - Langka & Akreditasi A",
            "Teknik Mesin (TM) - Standar Industri",
            "Teknik Instalasi Tenaga Listrik (TITL)",
            "Kecantikan dan Spa (KDS)"
        ]
    },
    // --- INFO SPMB 2026: JADWAL ---
    {
        keywords: ["jadwal", "kapan", "tanggal daftar", "pengumuman", "jadwal spmb","info spmb"],
        topic: "jadwal_spmb", // Topik baru
        type: "list",
        data: [
            "Tahap 1 (Domisili, Afirmasi, Mutasi): Daftar 10-16 Juni 2026 (Pengumuman 19 Juni)",
            "Tahap 2 (Prestasi): Daftar 24 Juni-1 Juli 2026 (Pengumuman 9 Juli)",
            "Awal Tahun Ajaran Baru: 14 Juli 2026"
        ]
    },
    // --- INFO SPMB 2026: KUOTA & JALUR ---
    {
        keywords: ["kuota", "jalur", "persentase", "zonasi", "afirmasi", "prestasi", "mutasi"],
        topic: "kuota_spmb", // Topik baru
        type: "list",
        data: [
            "SMK: Prestasi (55%), Afirmasi (30%), Domisili Terdekat (10%), Mutasi (5%)",
            "SMA: Domisili (35%), Afirmasi (30%), Prestasi (30%), Mutasi (5%)",
            "SLB: Tidak ada jalur (berdasarkan diagnosa ahli)"
        ]
    },
    // --- INFO SPMB 2026: SYARAT ---
    {
        keywords: ["syarat", "dokumen", "berkas", "bawa apa", "usia maksimal", "sptjm"],
        topic: "syarat", // Update data lama dengan aturan 2026
        type: "list",
        data: [
            "Usia Maksimal: 21 Tahun (per 1 Juli 2026)",
            "Dokumen Utama: Ijazah/SKL, Akta Kelahiran, KK (min. 1 tahun), KTP Ortu",
            "Dokumen Tambahan: SPTJM & Bukti Prestasi (jika ada)",
            "Pendaftaran Online via: Aplikasi Sapawarga / Disdik Jabar"
        ]
    },
    // --- INFO SPMB 2026: MEKANISME SELEKSI ---
    {
        keywords: ["seleksi", "tes", "cara masuk", "ketm", "sanggah", "ujian"],
        topic: "seleksi_spmb", // Topik baru
        type: "list",
        data: [
            "Jalur Prestasi SMA: 50% Nilai Rapor + 50% Tes Standar (Literasi & Numerasi)",
            "KETM (Ekonomi Tidak Mampu): Penyaluran langsung oleh Dinas ke sekolah terdekat",
            "Masa Sanggah: Tersedia jika ada ketidaksesuaian data verifikasi"
        ]
    },
    // --- LANDASAN HUKUM ---
    {
        keywords: ["aturan", "hukum", "dasar", "regulasi", "pergub", "prinsip"],
        topic: "hukum_spmb", // Topik baru
        type: "fact",
        data: "SPMB 2026 berlandaskan Permendikdasmen & Kepgub Jabar 2026 dengan prinsip: Objektif, Transparan, Akuntabel, dan Tanpa Diskriminasi."
    },
    // --- GURU & KEPALA SEKOLAH ---
    {
        keywords: ["kepala sekolah", "kepsek", "guru", "pengajar", "staf", "wali kelas", "siapa yang mengajar"],
        topic: "guru",
        type: "fact",
        data: "Sekolah dipimpin oleh Dra. Supriatin (Kepsek Berprestasi) dan didukung oleh ±60 guru tersertifikasi."
    },
    // --- FASILITAS ---
    {
        keywords: ["fasilitas", "gedung", "lab", "bengkel", "ruang praktik", "studio", "perpustakaan", "sarana"],
        topic: "fasilitas",
        type: "list",
        data: [
            "Gedung Bertingkat & RPS Standar Industri",
            "Laboratorium Farmasi",
            "Bengkel Mesin (Bubut & CNC)",
            "Studio Mabel (Konten Kreatif)",
            "Perpustakaan"
        ]
    },
    // --- LATAR BELAKANG ---
    {
        keywords: ["latar belakang","sejarah berdirinya","sejarah","bangun","dibuat" ],
        topic: "sejarah",
        type: "fact",
        data: "SMK Negeri 15 Kota Bekasi didirikan pada 19 April 2016 (SK Wali Kota No. 431.5) di Padurenan, Mustikajaya, di atas lahan seluas ±10.513 m²."
    },
    // --- EKSKUL ---
    {
        keywords: ["ekskul", "ekstrakurikuler", "kegiatan", "organisasi", "bakat"],
        topic: "ekskul",
        type: "list",
        data: [
            "Wajib: Pramuka",
            "Kepemimpinan: OSIS",
            "Olahraga: Futsal, Basket, Voli",
            "Seni: Tari, Paduan Suara",
            "Skill: Coding Club, English Club, japanese club"
        ]
    },
    // --- KERJASAMA INDUSTRI ---
    {
        keywords: ["kerjasama", "industri", "pkl", "prakerin", "magang", "kerja", "lulusan", "bkk", "pt"],
        topic: "kerjasama",
        type: "list",
        data: [
            "Magang di Perusahaan Manufaktur & Apotek Besar",
            "Guru Tamu dari Industri",
            "Penyaluran Kerja via BKK (Bursa Kerja Khusus)"
        ]
    },
    // --- VISI MISI ---
    {
        keywords: ["visi", "misi", "tujuan"],
        topic: "visi_misi",
        type: "fact",
        data: "Visi: Menghasilkan lulusan berakhlak mulia, kompeten, dan wirausaha. Misi: Pendidikan berbasis IT & Link and Match."
    },
    // --- UMUM (Biaya, Lokasi, Kontak) ---
    {
        keywords: ["biaya", "spp", "uang gedung", "bayar"],
        topic: "biaya",
        type: "fact",
        data: "Gratis / Bebas SPP (Sekolah Negeri)"
    },
    {
        keywords: ["alamat", "lokasi", "dimana", "peta"],
        topic: "lokasi",
        type: "fact",
        data: "Jl. Klp. Dua No.104, RT.003/RW.008, Padurenan, Kec. Mustika Jaya, Kota Bks, Jawa Barat 16340"
    },
    {
        keywords: ["kontak", "wa", "telepon", "hubungi"],
        topic: "kontak",
        type: "fact",
        data: "0812-3456-7890 (WA Tata Usaha)"
    },
    // --- SAPAAN (Ditaruh Paling Bawah) ---
    {
        keywords: ["hallo", "halo", "hai", "selamat pagi", "siang", "sore", "malam", "tes"],
        topic: "sapaan",
        type: "fact",
        data: "Halo! Saya Asisten Virtual SMKN 15 Bekasi siap membantu info SPMB 2026."
    }
];

// Opsi Fallback
const googleSearchUrl = "https://www.google.com/search?q=";