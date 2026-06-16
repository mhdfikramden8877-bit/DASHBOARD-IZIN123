```javascript
const staffList = [

"KENDRICK TANRIO - X1318081",
"ZIDAN FEBRIANSYAH - C9256551",
"FAHMI RIZKI SABTOMI - E0311971",
"MUHAMMAD VALHANS LUBIS - C9039911",
"MUHAMMAD FIKRAM DENALDO - X8318440",
"HOSEA LEGI - C8645072",
"NOPIYANTO - E4486513",
"VINNA - E2372975",
"SWENDY - C6797317",
"JUNAIDY KELVIN - C8356199",
"CARISSA AGNESIA WIJAYA - E5381421",
"VIKI DWI PRATAMA - E1944595",
"ANJU RAWINA - E1243462",
"FAZIRA NAZWA FITRI LUBIS - E8262013",
"MUHAMMAD RIDHO - E5112295",
"NANDA PRATAMA - E6628682",
"DEA PHASYA JUAND - E5022709",
"STEPHANIE CANG E9519256",
"DIEGO ALLANANDA PRAYOGA - E0289424",
"FERI ANDIKA - E1715387",
"MUHAMMAD YASIR - X7096487",
"SYARIFAH - E1228020",
"MUHAMMAD IDRIS - E5048127",
"SET FERNANDO SINURAYA - E6048589",
"NICO ANDREAS SIANIPAR - E7092770",
"GUNTUR ERZAN SYAHPUTRA - E2801763",
"WIKNIS PREN - E6039891",
"MUHAMMAD SALEH - E6973024",
"RAHMAD EFENDI SIREGAR - E8493173",
"SALSA AIDILA SYAFIRA - X4779111",
"DELVIC GOLDSTEIN - E4558911",
"WIKNES SUREN - X7110749"

];

const container = document.getElementById("staffContainer");

staffList.forEach(nama => {

  container.innerHTML += `

  <div class="card">

    <div class="nama">
      ${nama}
    </div>

    <div class="status">
      Status : Standby
    </div>

    <div class="timer-box">
      <div class="timer">
        16:00
      </div>
    </div>

    <button class="izin-btn" onclick="mulaiTimer(this)">
      IZIN
    </button>

    <button class="masuk-btn" onclick="stopTimer(this)">
      MASUK
    </button>

  </div>

  `;

});

let timers = new Map();

function mulaiTimer(button){

  const card = button.parentElement;

  const timerDisplay = card.querySelector(".timer");

  const status = card.querySelector(".status");

  if(timers.has(card)){
    return;
  }

  let waktu = 16 * 60;

  status.innerHTML = "Status : Sedang Izin";

  const interval = setInterval(function(){

    let menit = Math.floor(waktu / 60);

    let detik = waktu % 60;

    if(detik < 10){
      detik = "0" + detik;
    }

    timerDisplay.innerHTML = menit + ":" + detik;

    waktu--;

    if(waktu < 0){

      clearInterval(interval);

      timerDisplay.innerHTML = "SELESAI";

      status.innerHTML = "Status : Kembali";

      timers.delete(card);

    }

  },1000);

  timers.set(card, interval);

}

function stopTimer(button){

  const card = button.parentElement;

  const timerDisplay = card.querySelector(".timer");

  const status = card.querySelector(".status");

  if(timers.has(card)){

    clearInterval(timers.get(card));

    timers.delete(card);

  }

  timerDisplay.innerHTML = "16:00";

  status.innerHTML = "Status : Standby";

}

function filterNama(){

  const input = document
  .getElementById("searchInput")
  .value
  .toLowerCase();

  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {

    const nama = card
    .querySelector(".nama")
    .innerText
    .toLowerCase();

    if(nama.includes(input)){

      card.style.display = "block";

    }else{

      card.style.display = "none";

    }

  });

}
```
