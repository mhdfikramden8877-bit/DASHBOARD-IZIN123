import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getDatabase,
ref,
set,
onValue
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {

  apiKey: "AIzaSyBn3LXmBVnX3r820EcjtiIhh50WaPzvy9I",

  authDomain:
  "fikram-40e2f.firebaseapp.com",

  databaseURL:
  "https://fikram-40e2f-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId:
  "fikram-40e2f",

  storageBucket:
  "fikram-40e2f.appspot.com",

  messagingSenderId:
  "28997536264",

  appId:
  "1:28997536264:web:37838cac2df3eb32475fbd"

};

const app =
initializeApp(firebaseConfig);

const db =
getDatabase(app);

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
"STEPHANIE CANG - E9519256",
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

const container =
document.getElementById("staffContainer");

staffList.forEach((nama,index)=>{

container.innerHTML += `

<div class="card">

<div class="nama">
${nama}
</div>

<div
class="status"
id="status-${index}">
Status : Standby
</div>

<div class="timer-box">

<div
class="timer"
id="timer-${index}">
16:00
</div>

</div>

<button
class="izin-btn"
onclick="mulaiIzin(${index})">
IZIN
</button>

<button
class="masuk-btn"
onclick="masuk(${index})">
MASUK
</button>

</div>

`;

});

window.mulaiIzin = function(index){

const startTime =
Date.now();

set(
ref(db,'izin/'+index),
{

status:'izin',

startTime:startTime

}

);

}

window.masuk = function(index){

set(
ref(db,'izin/'+index),
{

status:'standby',

startTime:null

}

);

}

staffList.forEach((nama,index)=>{

onValue(
ref(db,'izin/'+index),
(snapshot)=>{

const data =
snapshot.val();

const timer =
document.getElementById(
`timer-${index}`
);

const status =
document.getElementById(
`status-${index}`
);

if(!data){

timer.innerHTML =
"16:00";

status.innerHTML =
"Status : Standby";

return;

}

if(data.status === "izin"){

status.innerHTML =
"Status : Sedang Izin";

setInterval(()=>{

const now =
Date.now();

const diff =
16*60 -
Math.floor(
(now - data.startTime)/1000
);

if(diff <= 0){

timer.innerHTML =
"TELAT";

status.innerHTML =
"Status : Telat";

return;

}

let minutes =
Math.floor(diff/60);

let seconds =
diff % 60;

if(seconds < 10){

seconds =
"0"+seconds;

}

timer.innerHTML =
minutes + ":" + seconds;

},1000);

}else{

timer.innerHTML =
"16:00";

status.innerHTML =
"Status : Standby";

}

});

});

window.filterNama = function(){

const input =
document.getElementById(
"searchInput"
)
.value
.toLowerCase();

const cards =
document.querySelectorAll(
".card"
);

cards.forEach(card=>{

const nama =
card.querySelector(".nama")
.innerText
.toLowerCase();

if(nama.includes(input)){

card.style.display =
"block";

}else{

card.style.display =
"none";

}

});

}