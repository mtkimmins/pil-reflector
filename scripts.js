const INPUT1 = document.getElementById("input_1");
const INPUT2 = document.getElementById("input_2");
const INPUT3 = document.getElementById("input_3");
const INPUT4 = document.getElementById("input_4");
const INPUT5 = document.getElementById("input_5");
const INPUT6 = document.getElementById("input_6");
//BUTTONS
const CLEAR_BUTTON = document.getElementById("clear_button");
const COMPILE_BUTTON = document.getElementById("compile_button");

//OUTPUT FIELD
const OUTPUT = document.getElementById("compiled_body");



/////////////////////////////////////
//  CLASSES/FUNCTIONS
/////////////////////////////////////
function wipe(){
  // console.log("input1:", INPUT1.value);
  INPUT1.value = "";
  INPUT2.value = "";
  INPUT3.value = "";
  INPUT4.value = "";
  INPUT5.value = "";
  INPUT6.value = "";
  OUTPUT.innerText = "";

  //Memory clear
  localStorage.setItem("i1","");
  localStorage.setItem("i2","");
  localStorage.setItem("i3","");
  localStorage.setItem("i4","");
  localStorage.setItem("i5","");
  localStorage.setItem("i6","");
  localStorage.setItem("out","");
  CLEAR_BUTTON.textContent = "CLEARED!!";
  setTimeout(resetButton, 3000);
}

function compile(){
  document.getElementById("compiled_body").innerText = "...";
  let compile_text = ""
  // console.log("input1 value:",INPUT1.value);
  compile_text = compile_text.concat(INPUT1.value, "\n");
  compile_text = compile_text.concat(INPUT2.value, "\n");
  compile_text = compile_text.concat(INPUT3.value, "\n");
  compile_text = compile_text.concat(INPUT4.value, "\n");
  compile_text = compile_text.concat(INPUT5.value, "\n");
  compile_text = compile_text.concat(INPUT6.value, "\n");
  console.log("Compiled Text:", compile_text);

  document.getElementById("compiled_body").innerText = compile_text;
  saveData();
  //Copy to clipboard
  copyStringToClipboard(compile_text);
  //Visual feedback
  COMPILE_BUTTON.textContent = "COMPILED & COPIED!!";
  setTimeout(resetButton,3000);
}

function copyStringToClipboard(textToCopy) {
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      console.log("Text successfully copied to clipboard");
      // Optional: Provide user feedback (e.g., a toast notification or alert)
    })
    .catch(err => {
      console.error("Failed to copy text: ", err);
      // Optional: Handle the error gracefully
    });
}

function resetButton(){
  CLEAR_BUTTON.textContent = "CLEAR";
  COMPILE_BUTTON.textContent = "COMPILE & COPY";
}

function saveData(){
  localStorage.setItem("i1",document.getElementById("input_1").value);
  localStorage.setItem("i2",document.getElementById("input_2").value);
  localStorage.setItem("i3",document.getElementById("input_3").value);
  localStorage.setItem("i4",document.getElementById("input_4").value);
  localStorage.setItem("i5",document.getElementById("input_5").value);
  localStorage.setItem("i6",document.getElementById("input_6").value);
  localStorage.setItem("out",document.getElementById("compiled_body").innerText);
}

function loadData(){
  if (localStorage.getItem("i1") != null){
    document.getElementById("input_1").value = localStorage.getItem("i1");
  }
  if (localStorage.getItem("i2") != null){
    document.getElementById("input_2").value = localStorage.getItem("i2");
  }
  if (localStorage.getItem("i3") != null){
    document.getElementById("input_3").value = localStorage.getItem("i3");
  }
  if (localStorage.getItem("i4") != null){
    document.getElementById("input_4").value = localStorage.getItem("i4");
  }
  if (localStorage.getItem("i5") != null){
    document.getElementById("input_5").value = localStorage.getItem("i5");
  }
  if (localStorage.getItem("i6") != null){
    document.getElementById("input_6").value = localStorage.getItem("i6");
  }
  if (localStorage.getItem("out") != null){
    document.getElementById("compiled_body").innerText = localStorage.getItem("out");
  }
}


/////////////////////////////////////////
//  RUNTIME
/////////////////////////////////////////
document.addEventListener("DOMContentLoaded", loadData);
CLEAR_BUTTON.addEventListener("click", wipe);
COMPILE_BUTTON.addEventListener("click",compile);

setInterval(saveData, 60000);
// setInterval(resetButton, 3000);
