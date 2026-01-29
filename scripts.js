const INPUT1 = document.getElementById("input_1");
const INPUT2 = document.getElementById("input_2");
const INPUT3 = document.getElementById("input_3");
const INPUT4 = document.getElementById("input_4");
const INPUT5 = document.getElementById("input_5");
const INPUT6 = document.getElementById("input_6");
const input_list = [INPUT1,INPUT2,INPUT3,INPUT4,INPUT5,INPUT6];
//BUTTONS
const CLEAR_BUTTON = document.getElementById("clear_button");
const COMPILE_BUTTON = document.getElementById("compile_button");

//OUTPUT FIELD
const OUTPUT = document.getElementById("compile_body");



/////////////////////////////////////
//  CLASSES/FUNCTIONS
/////////////////////////////////////
function wipe(){
  for (inp in input_list){
    inp.value = "";
  }
  OUTPUT.value = "";
  CLEAR_BUTTON.value("CLEARED!!");
  setTimeout(resetButton, 3000);
}

function compile(){
  let compile_text = ""
  for (inp in input_list){
    compile_text += inp.value
    compile_text += "\n"
  }
  OUTPUT.value = compile_text;
  //Copy to clipboard
  OUTPUT.select();
  OUTPUT.setSelectionRange(0,99999);
  navigator.clipboard.writeText(compile_text);
  //Visual feedback
  COMPILE_BUTTON.value("COMPILED & COPIED!!");
  setTimeout(resetButton,3000);
}

function resetButton(){
  CLEAR_BUTTON.textContent("Clear");
  COMPILE_BUTTON.textContent("Compile");
}

function saveData(){
  localStorage.setItem("i1",INPUT_1.value);
  localStorage.setItem("i2",INPUT_2.value);
  localStorage.setItem("i3",INPUT_3.value);
  localStorage.setItem("i4",INPUT_4.value);
  localStorage.setItem("i5",INPUT_5.value);
  localStorage.setItem("i6",INPUT_6.value);
}

function loadData(){
  if (localStorage.getItem("i1") != null){
    INPUT_1.value = localStorage.getItem("i1");
  }
  if (localStorage.getItem("i2") != null){
    INPUT_2.value = localStorage.getItem("i2");
  }
  if (localStorage.getItem("i3") != null){
    INPUT_3.value = localStorage.getItem("i3");
  }
  if (localStorage.getItem("i4") != null){
    INPUT_4.value = localStorage.getItem("i4");
  }
  if (localStorage.getItem("i5") != null){
    INPUT_5.value = localStorage.getItem("i5");
  }
  if (localStorage.getItem("i6") != null){
    INPUT_6.value = localStorage.getItem("i6");
  }
  if (localStorage.getItem("out") != null){
    OUTPUT.value = localStorage.getItem("out");
  }
}

/////////////////////////////////////////
//  RUNTIME
/////////////////////////////////////////
document.addEventListener("DOMContentLoaded", loadData);
CLEAR_BUTTON.addEventListener("click", wipe);
COMPILE_BUTTON.addEventListener("click",compile);

setInterval(saveData, 60000);
