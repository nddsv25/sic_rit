/* ==========================================================
   CẤU HÌNH NỘI DUNG CÁ NHÂN HÓA (165 KM)
   ========================================================== */
const INITIAL_DISTANCE_KM = 165; // Khoảng cách chuẩn 165 km của 2 bạn
const LETTER_TEXT = 
`Gửi hăn - cô gái xinh đẹp nhứt thế giới cụa tuiii,

Hôm ni đạt làm trang nho nhỏ này để gửi cái ôm ấm áp từ xa đến hănn. Cảm ưn hăn vì dù ở xa nhau, hăn vẫn lun kiên nhẫn, dịu dàng và là động lực lớn nhất của tui mỗi ngày.

Chúc công chúa của tui ngày 20/10 luôn tươi cười, rạng rỡ và nhớ là ở đầu bên này luôn có một người thưn hăn zô điều kiện! 

Lớp diu lớp diuuuu 💖💖💖💖💖`;

const TEASE_TEXTS = [
  "Ơ kìa, sao lại bấm nút đó 😝",
  "Tui nhắc emmm đóa nhann 💖",
  "Nút này bị khóa cho ngừi đẹp ôiii 🙈",
  "Hông chọn đựt đâu liu liuu 👑",
  "Bắt được nút này cũng hông cho bấm đựt đâu 🏃‍♂️💨"
];

const WHISPER_TEXTS = [
  "Đang truyền hơi ấm vượt 165 km... 🔥",
  "Hai chú gấu đang ôm chặt nhau kìa... 🐻🐼",
  "Nhớ nụ cười của hăn qáaa! 🥰",
  "Khoảng cách đang rút ngắn dần về 0 km rùi... ✈️",
  "Giữ thêm chút nữa thui, sắp chạm tới tim hăn rùi! 💖"
];

/* ==========================================================
   HỆ THỐNG NHẠC DU DƯƠNG DỄ THƯƠNG (MUSIC BOX + MP3)
   ========================================================== */
const bgMusic = document.getElementById('bgMusic');
const musicToggleBtn = document.getElementById('musicToggle');
let musicStarted = false;
let isMuted = false;
let audioCtx = null;
let melodyTimer = null;

// Giai điệu Music Box ngọt ngào, du dương (Tần số nốt nhạc)
const CUTE_MELODY = [
  523.25, 659.25, 783.99, 1046.50, 783.99, 659.25, // C5 E5 G5 C6 G5 E5
  587.33, 698.46, 880.00, 1174.66, 880.00, 698.46, // D5 F5 A5 D6 A5 F5
  493.88, 587.33, 783.99, 987.77,  783.99, 587.33, // B4 D5 G5 B5 G5 D5
  523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50 // C5 E5 G5 C6 G5 C6
];
let noteIndex = 0;

function playMusicBoxNote(freq) {
  if (isMuted) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine'; // Âm thanh tròn trịa như đàn hộp nhạc (Music Box)
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.4);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 1.45);
  } catch (e) {}
}

function startCuteMusicBox() {
  if (melodyTimer) return;
  melodyTimer = setInterval(() => {
    if (!isMuted) {
      playMusicBoxNote(CUTE_MELODY[noteIndex]);
      noteIndex = (noteIndex + 1) % CUTE_MELODY.length;
    }
  }, 420);
}

function ensureMusicPlays() {
  if (!musicStarted) {
    musicStarted = true;
    bgMusic.volume = 0.45;
    bgMusic.play().catch(() => {});
    startCuteMusicBox();
  }
}

function toggleMusic() {
  ensureMusicPlays();
  isMuted = !isMuted;
  bgMusic.muted = isMuted;
  musicToggleBtn.innerText = isMuted ? '🔇 Nhạc: Tắt' : '🎵 Nhạc: Bật';
}

/* ==========================================================
   XỬ LÝ MÀN HÌNH 1: NÚT BẤM CHẠY TRỐN & PHÁO GIẤY
   ========================================================== */
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const teaseMsg = document.getElementById('teaseMessage');
let dodgeCount = 0;

function runAway(e) {
  if (e) e.preventDefault();
  ensureMusicPlays();

  dodgeCount++;
  teaseMsg.innerText = TEASE_TEXTS[dodgeCount % TEASE_TEXTS.length];
  teaseMsg.style.transform = 'scale(1.1)';
  setTimeout(() => teaseMsg.style.transform = 'scale(1)', 200);

  const yesScale = Math.min(1 + dodgeCount * 0.08, 1.45);
  yesBtn.style.transform = `scale(${yesScale})`;

  noBtn.style.position = 'fixed';
  const maxX = window.innerWidth - noBtn.offsetWidth - 30;
  const maxY = window.innerHeight - noBtn.offsetHeight - 30;
  const randomX = Math.max(20, Math.floor(Math.random() * maxX));
  const randomY = Math.max(20, Math.floor(Math.random() * maxY));

  noBtn.style.left = randomX + 'px';
  noBtn.style.top = randomY + 'px';
}

noBtn.addEventListener('mouseover', runAway);
noBtn.addEventListener('touchstart', runAway, { passive: false });
noBtn.addEventListener('click', runAway);

function passQuiz() {
  ensureMusicPlays();
  
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
  }

  document.getElementById('screenQuiz').classList.add('hidden');
  setTimeout(() => {
    document.getElementById('screen1').classList.remove('hidden');
  }, 500);
}

/* ==========================================================
   XỬ LÝ MÀN HÌNH 2: NHẤN GIỮ GIẢM KM, THẢ TAY TĂNG LẠI KM
   ========================================================== */
const hugBtn = document.getElementById('hugBtn');
const pulseWave = document.getElementById('pulseWave');
const circle = document.getElementById('progressCircle');
const statusText = document.getElementById('statusText');
const distanceText = document.getElementById('distanceText');
const hugWhisper = document.getElementById('hugWhisper');

const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

let progress = 0; // Từ 0 đến 100
let pressTimer = null;
let releaseTimer = null;
let hugCompleted = false;

function updateHugUI() {
  const offset = circumference - (progress / 100) * circumference;
  circle.style.strokeDashoffset = offset;

  // Tính số km hiện tại từ 165 km giảm dần về 0 km
  const currentKm = Math.max(0, Math.round(INITIAL_DISTANCE_KM * (1 - progress / 100)));
  const displayPercent = Math.round(progress);

  statusText.innerText = `Đang truyền hơi ấm từ xa: ${displayPercent}%`;
  distanceText.innerText = `📍 Khoảng cách hiện tại: ${currentKm} km`;
}

function spawnFloatingHeart() {
  const heart = document.createElement('div');
  heart.classList.add('floating-heart');
  const icons = ['❤️', '💖', '🥰', '💕', '🌸', '✨'];
  heart.innerText = icons[Math.floor(Math.random() * icons.length)];
  heart.style.left = Math.random() * 80 + 10 + '%';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1900);
}

function startPress(e) {
  e.preventDefault();
  if (hugCompleted) return;
  ensureMusicPlays();

  // Dừng chu trình tăng lại km nếu đang thả tay
  clearInterval(releaseTimer);
  clearInterval(pressTimer);

  hugBtn.classList.add('pressing');
  pulseWave.classList.add('active');
  document.body.classList.add('warm-bg');

  let tick = 0;
  // Giảm từ từ: Mỗi 50ms tăng 0.8% -> Mất khoảng 6.2 giây để đi hết 165km về 0km
  pressTimer = setInterval(() => {
    progress += 0.8;
    tick++;
    if (progress >= 100) progress = 100;

    updateHugUI();

    const whisperIndex = Math.min(Math.floor(progress / 22), WHISPER_TEXTS.length - 1);
    hugWhisper.innerText = WHISPER_TEXTS[whisperIndex];

    if (tick % 5 === 0) spawnFloatingHeart();

    if (navigator.vibrate && tick % 8 === 0) {
      navigator.vibrate(35);
    }

    if (progress >= 100) {
      clearInterval(pressTimer);
      completeHug();
    }
  }, 50);
}

function endPress() {
  if (hugCompleted) return;
  clearInterval(pressTimer);
  hugBtn.classList.remove('pressing');
  pulseWave.classList.remove('active');

  if (progress > 0 && progress < 100) {
    hugWhisper.innerText = `Ơ đừng buông tay roaa, khoảng cách đang bị kéo xa ra lại rùi kìa! 🥺`;

    // Khi thả tay ra: Khoảng cách từ từ tăng ngược trở lại về 165 km
    clearInterval(releaseTimer);
    releaseTimer = setInterval(() => {
      progress -= 0.6;
      if (progress <= 0) {
        progress = 0;
        clearInterval(releaseTimer);
        hugWhisper.innerText = `Chạm và giữ lại vào 2 chú gấu để kéo gần 165 km nhé...`;
      }
      updateHugUI();
    }, 50);
  }
}

function completeHug() {
  hugCompleted = true;
  clearInterval(pressTimer);
  clearInterval(releaseTimer);

  hugBtn.classList.remove('pressing');
  pulseWave.classList.remove('active');
  hugWhisper.innerText = 'Khoảng cách = 0 km! Đạt đang ở ngay cạnh hăn rùi nèe ❤️';
  statusText.innerText = 'Đã nạp đầy 100% cái ôm!';
  distanceText.innerText = '📍 Khoảng cách hiện tại: 0 km ❤️';

  if (typeof confetti === 'function') {
    confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
  }

  setTimeout(() => {
    document.getElementById('screen1').classList.add('hidden');
    document.getElementById('screen2').classList.remove('hidden');
  }, 1300);
}

hugBtn.addEventListener('mousedown', startPress);
hugBtn.addEventListener('touchstart', startPress, { passive: false });
window.addEventListener('mouseup', endPress);
window.addEventListener('touchend', endPress);

/* ==========================================================
   XỬ LÝ MÀN HÌNH 3: PHONG BÌ RUNG LẮC & LÁ THƯ NHẢY VỌT RA
   ========================================================== */
let envelopeOpened = false;

function openEnvelope() {
  if (envelopeOpened) return;
  envelopeOpened = true;
  ensureMusicPlays();

  const wrapper = document.getElementById('envelopeWrapper');
  
  // Bước 1: Phong bì rung lắc lấy đà (0.45 giây)
  wrapper.classList.add('shake');

  setTimeout(() => {
    // Bước 2: Mở nắp & Lá thư nhảy vọt lên cao + bắn pháo giấy nhẹ
    wrapper.classList.remove('shake');
    wrapper.classList.add('open');

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.55 }
      });
    }
  }, 450);

  // Bước 3: Sau khi thư nhảy vọt lên đỉnh, bung rộng thành khung đọc thư
  setTimeout(() => {
    wrapper.style.display = 'none';
    document.getElementById('envelopeHint').style.display = 'none';
    const modal = document.getElementById('letterModal');
    modal.style.display = 'block';
    startTypewriter();
  }, 1700);
}

function startTypewriter() {
  const container = document.getElementById('typewriterText');
  const cursor = document.getElementById('cursor');
  let index = 0;
  const speed = 32;

  function type() {
    if (index < LETTER_TEXT.length) {
      container.innerHTML += LETTER_TEXT.charAt(index);
      index++;
      setTimeout(type, speed);
    } else {
      cursor.style.display = 'none';
      document.getElementById('flowerBtn').style.display = 'block';
    }
  }
  type();
}

/* ==========================================================
   XỬ LÝ MÀN HÌNH 4: BÓ HOA & PHÁO HOA KÉP
   ========================================================== */
let petalMode = false;

function fireCelebration() {
  if (typeof confetti !== 'function') return;
  confetti({ particleCount: 85, angle: 60, spread: 60, origin: { x: 0, y: 0.7 } });
  confetti({ particleCount: 85, angle: 120, spread: 60, origin: { x: 1, y: 0.7 } });
}

function showBouquet() {
  document.getElementById('screen2').classList.add('hidden');
  document.getElementById('screen3').classList.remove('hidden');
  petalMode = true;
  fireCelebration();
}

/* ==========================================================
   HIỆU ỨNG VỆT LẤP LÁNH THEO NGÓN TAY / CHUỘT
   ========================================================== */
function createSparkle(x, y) {
  const sp = document.createElement('div');
  sp.classList.add('cursor-sparkle');
  const icons = ['✨', '💗', '🌸'];
  sp.innerText = icons[Math.floor(Math.random() * icons.length)];
  sp.style.left = x + 'px';
  sp.style.top = y + 'px';
  document.body.appendChild(sp);
  setTimeout(() => sp.remove(), 800);
}

let lastSparkleTime = 0;
window.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastSparkleTime > 65) {
    createSparkle(e.clientX, e.clientY);
    lastSparkleTime = now;
  }
});

window.addEventListener('touchmove', (e) => {
  const now = Date.now();
  if (now - lastSparkleTime > 65 && e.touches[0]) {
    createSparkle(e.touches[0].clientX, e.touches[0].clientY);
    lastSparkleTime = now;
  }
});

/* ==========================================================
   HIỆU ỨNG CANVAS: SAO LẤP LÁNH & MƯA CÁNH HOA ĐÀO LỚN
   ========================================================== */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const items = [];
for (let i = 0; i < 55; i++) {
  items.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 5.5 + 3.5,
    speedY: Math.random() * 1.2 + 0.6,
    speedX: Math.random() * 1 - 0.5,
    angle: Math.random() * 360
  });
}

function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  items.forEach(p => {
    ctx.save();
    if (!petalMode) {
      ctx.fillStyle = 'rgba(255, 195, 208, 0.7)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
      p.y -= p.speedY;
      if (p.y < 0) p.y = canvas.height;
    } else {
      ctx.translate(p.x, p.y);
      ctx.rotate((p.angle * Math.PI) / 180);
      ctx.fillStyle = '#ff7597';
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 2, p.size * 1.1, 0, 0, Math.PI * 2);
      ctx.fill();
      p.y += p.speedY * 1.8;
      p.x += Math.sin(p.y * 0.02) + p.speedX;
      p.angle += 1.5;
      if (p.y > canvas.height) {
        p.y = -15;
        p.x = Math.random() * canvas.width;
      }
    }
    ctx.restore();
  });

  requestAnimationFrame(animateCanvas);
}

animateCanvas();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});