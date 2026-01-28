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



CLEAR_BUTTON.addEventListener("click", wipe);
COMPILE_BUTTON.addEventListener("click",compile);


function wipe(){
  for (inp in input_list){
    inp.innerHTML("");
    CLEAR_BUTTON.textContent("CLEARED!!")
}

function compile(){
  let compile_text = ""
  for (inp in input_list){
    compile_text += inp.innerHTML
  }
  OUTPUT.innerHTML=compile_text;
  //Copy to clipboard
  OUTPUT.select();
  OUTPUT.setSelectionRange(0,99999);
  navigator.clipboard.writeText(compile_text);
  COMPILE_BUTTON.textContent("COMPILED & COPIED!!")
}

setInterval(save, 60000);
setInterval(resetButton, 3000);

function resetButton(){
  CLEAR_BUTTON.textContent("Clear");
  COMPILE_BUTTON.textContent("Compile");
}
