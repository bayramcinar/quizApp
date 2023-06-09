var startButton = document.getElementById("startButton");
var startContainer = document.querySelector(".startContainer");
var sectionButtons = document.querySelectorAll(".section");
var nextQuestion = document.querySelector("#next");
var dogruCevap;
var jsonDosyaURL = 'sorular.json';
var jsonVerisi = null;
var puan = document.querySelector(".puan");
var point = 0;
var süreH2 = document.querySelector(".süre");
var süre = 10;
var interval;
var soruIndex = 1;
var end = document.querySelector(".end");
var container = document.querySelector(".containerr");
var questionBar =document.querySelector(".quesitonH1");
var sıklar = document.querySelector(".sıklar");
var soruIndexText = document.querySelector(".soruIndex");
var dogruCevapSayısı =document.querySelector(".dogruCevapSayısı");
var yanlısCevapSayısı =document.querySelector(".yanlısCevapSayısı");
var result = document.querySelector(".result");
var repeat = document.querySelector(".repeat");

var istek = new XMLHttpRequest();
istek.open('GET', jsonDosyaURL, true);
    istek.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
    jsonVerisi = JSON.parse(this.responseText);
    }
};
istek.send();

var clickListener = function() {
  startTimer();
  if (jsonVerisi) {
    soruIndexText.innerHTML = "Soru : "+soruIndex+"/10";
    var randomIndex = Math.floor(Math.random() * jsonVerisi.length);
    var randomQuestion = jsonVerisi[randomIndex];
    dogruCevap = randomQuestion.doğru;
    console.log(dogruCevap);
    var soru = document.querySelector(".quesitonH1");
    var a = document.querySelector(".a");
    var b = document.querySelector(".b");
    var c = document.querySelector(".c");
    var d = document.querySelector(".d");
    var e = document.querySelector(".e");

    startContainer.style.display = "none";
    container.style.display = "block";

    soru.innerHTML = randomQuestion.soru;
    a.innerHTML = randomQuestion.a;
    b.innerHTML = randomQuestion.b;
    c.innerHTML = randomQuestion.c;
    d.innerHTML = randomQuestion.d;
    e.innerHTML = randomQuestion.e;

  }
  soruIndex++;
};




startButton.addEventListener("click", clickListener);

var nextListener = function() {
  soruIndexText.innerHTML = "Soru : "+(soruIndex)+"/10";
  clearInterval(interval); 
  süre = 10;
  startTimer();
  sectionButtons.forEach(function(btn) {  
    btn.disabled = false;
  });
  if (jsonVerisi && soruIndex<=10) {
    var randomIndex = Math.floor(Math.random() * jsonVerisi.length);
    var randomQuestion = jsonVerisi[randomIndex];
    dogruCevap = randomQuestion.doğru;
    var soru = document.querySelector(".quesitonH1");
    var a = document.querySelector(".a");
    var b = document.querySelector(".b");
    var c = document.querySelector(".c");
    var d = document.querySelector(".d");
    var e = document.querySelector(".e");

    soru.innerHTML = randomQuestion.soru;
    a.innerHTML = randomQuestion.a;
    b.innerHTML = randomQuestion.b;
    c.innerHTML = randomQuestion.c;
    d.innerHTML = randomQuestion.d;
    e.innerHTML = randomQuestion.e;

    sectionButtons.forEach(function(button) {
      button.style.backgroundColor = "";
    });
  }
  puan.innerHTML = "Puan: "+ point;
  if(soruIndex>10){
    clearInterval(interval);
    var dogruCevapSayısı1 = point/10;
    var yanlısCevapSayısı1 = 10-dogruCevapSayısı1;

    dogruCevapSayısı.innerHTML = "Doğru Cevap Sayısı: "+ dogruCevapSayısı1;
    yanlısCevapSayısı.innerHTML = "Yanlış Cevap Sayısı: "+ yanlısCevapSayısı1;

    questionBar.style.display = "none";
    sıklar.style.display = "none";
    soruIndexText.style.display = "none";
    nextQuestion.style.display = "none";
    end.style.display = "block";
    result.style.display = "block";
  }
  soruIndex++;
};

nextQuestion.addEventListener("click",nextListener);

var checkAnswer = function(button) {
  var classList = button.classList;
  if (classList.contains(dogruCevap)) {
    point = point+10;
    button.style.backgroundColor = "green"; 
    sectionButtons.forEach(function(btn) {  
          btn.disabled = true;
    });
  } else {
    button.style.backgroundColor = "red";
    sectionButtons.forEach(function(btn) {  
      if (btn.classList.contains(dogruCevap)) {
        btn.style.backgroundColor = "green";
      }
      btn.disabled = true;
    });
  }
};

sectionButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    clearInterval(interval);
    checkAnswer(button);
  });
});

function disableSectionButtons() {
  sectionButtons.forEach(function(button) {
    button.disabled = true;
  });
}


function startTimer() {
  süreH2.textContent = "Süre: "+ süre.toFixed(2); 
  interval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  süre -= 1; 
  süreH2.textContent ="Süre: "+ süre.toFixed(2); 

  if (süre <= 0) {
    clearInterval(interval); 
    süreH2.textContent = "Süre doldu!";
    süreH2.style.fontSize = "15px";
    disableSectionButtons();
  }
}