// Fungsi untuk mengonversi derajat ke radian
function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

// Fungsi untuk menambahkan karakter ke layar input
function appendCharacter(character) {
    const inputField = document.getElementById("expression");
    inputField.value += character;
}

// Fungsi untuk menambahkan fungsi matematika dengan tanda buka kurung
function appendFunction(func) {
    const inputField = document.getElementById("expression");
    inputField.value += func;
}

// Fungsi untuk menghapus layar input
function clearDisplay() {
    document.getElementById("expression").value = '';
}

// Fungsi untuk menghapus karakter terakhir di layar input
function deleteCharacter() {
    const inputField = document.getElementById("expression");
    inputField.value = inputField.value.slice(0, -1);  // Hapus karakter terakhir
}

// Fungsi untuk menghitung akar kuadrat
function sqrt() {
    const inputField = document.getElementById("expression");
    let value = inputField.value;

    // Periksa apakah inputnya valid (angka)
    if (value && !isNaN(value)) {
        value = parseFloat(value);  // Pastikan input menjadi angka
        if (value < 0) {
            inputField.value = "Kesalahan";  // Jangan biarkan akar dari angka negatif
        } else {
            inputField.value = Math.sqrt(value);  // Menghitung akar kuadrat
        }
    } else {
        inputField.value = "Kesalahan";  // Tampilkan kesalahan jika input tidak valid
    }
}

// Fungsi untuk menghitung persen
function percent() {
    const inputField = document.getElementById("expression");
    let value = inputField.value;

    // Jika input mengandung angka dan persen (%), kita bagi dengan 100
    if (value && !isNaN(value)) {
        value = parseFloat(value);  // Pastikan input menjadi angka
        inputField.value = value / 100;  // Menghitung persen (dibagi 100)
    } else {
        inputField.value = "Kesalahan";  // Tampilkan kesalahan jika input tidak valid
    }
}

// Fungsi untuk menghitung ekspresi
function calculate() {
    const inputField = document.getElementById("expression");
    let expr = inputField.value;

    try {
        // Ganti sin(), cos(), tan() dengan derajat ke radian (degToRad) jika perlu
        expr = expr.replace(/sin\(([^)]+)\)/g, function(match, angle) {
            return `Math.sin(degToRad(${angle}))`;  // Mengonversi derajat ke radian
        });
        expr = expr.replace(/cos\(([^)]+)\)/g, function(match, angle) {
            return `Math.cos(degToRad(${angle}))`;  // Mengonversi derajat ke radian
        });
        expr = expr.replace(/tan\(([^)]+)\)/g, function(match, angle) {
            return `Math.tan(degToRad(${angle}))`;  // Mengonversi derajat ke radian
        });

        // Evaluasi ekspresi
        let result = eval(expr);

        // Jika ada pembagian dengan nol atau kesalahan lain, tampilkan "Kesalahan"
        if (result === Infinity || result === -Infinity || isNaN(result)) {
            result = "Kesalahan";
        }
        inputField.value = result;
    } catch (error) {
        inputField.value = 'Kesalahan';  // Menampilkan pesan kesalahan jika ada error
    }
}
