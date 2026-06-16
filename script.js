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

authDomain: "fikram-40e2f.firebaseapp.com",

databaseURL:
"https://fikram-40e2f-default-rtdb.asia-southeast1.firebasedatabase.app/",

projectId: "fikram-40e2f",

storageBucket:
"fikram-40e2f.firebasestorage.app",

messagingSenderId: "28997536264",

appId:
"1:28997536264:web:37838cac2df3eb32475fbd"

};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

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

const container =
document.getElementById("staffContainer");

staffList.forEach((nama,index)=>{

container.innerHTML += `

<div class="card">

<div class="nama">
${nama}
</div>

<div class="status" id="status-${index}">
Status : Standby
</div>

<div class="timer-box">

<div class="timer" id="timer-${index}">
16:00
</div>

</div>

<button
class="izin-btn"
onclick="mulaiTimer(${index})"
>
IZIN
</button>

<button
class="masuk-btn"
onclick="stopTimer(${index})"
>
MASUK
</button>

</div>

`;

});

const activeIntervals = {};

window.mulaiTimer = function(index){

const startTime = Date.now();

set(ref(db,"staff/"+index),{

status:"izin",

startTime:startTime

});

}

window.stopTimer = function(index){

if(activeIntervals[index]){

clearInterval(activeIntervals[index]);

}

set(ref(db,"staff/"+index),{

status:"standby",

startTime:0

});

}

for(let i=0;i<staffList.length;i++){

const staffRef = ref(db,"staff/"+i);

onValue(staffRef,(snapshot)=>{

const data = snapshot.val();

const timer =
document.getElementById("timer-"+i);

const status =
document.getElementById("status-"+i);

if(data){

if(data.status=="izin"){

status.innerHTML =
"Status : Sedang Izin";

updateTimer(i,data.startTime);

}else{

status.innerHTML =
"Status : Standby";

timer.innerHTML = "16:00";

if(activeIntervals[i]){

clearInterval(activeIntervals[i]);

}

}

}

});

}

function updateTimer(index,startTime){

const timer =
document.getElementById("timer-"+index);

if(activeIntervals[index]){

clearInterval(activeIntervals[index]);

}

activeIntervals[index] = setInterval(()=>{

const sekarang = Date.now();

const selisih =
16*60 - Math.floor((sekarang-startTime)/1000);

if(selisih<=0){

timer.innerHTML="SELESAI";

clearInterval(activeIntervals[index]);

return;

}

const menit =
Math.floor(selisih/60);

let detik =
selisih%60;

if(detik<10){

detik="0"+detik;

}

timer.innerHTML =
menit+":"+detik;

},1000);

}

window.filterNama = function(){

const input =
document.getElementById("searchInput")
.value
.toLowerCase();

const cards =
document.querySelectorAll(".card");

cards.forEach(card=>{

const nama =
card.querySelector(".nama")
.innerText
.toLowerCase();

if(nama.includes(input)){

card.style.display="block";

}else{

card.style.display="none";

}

});

}