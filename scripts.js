const INPUT_IDS = ["input_1", "input_2", "input_3", "input_4", "input_5", "input_6"];
const INPUTS = INPUT_IDS.map((id) => document.getElementById(id));
const WORD_COUNT_DISPLAY = document.getElementById("word_count");
const CLEAR_BUTTON = document.getElementById("clear_button");
const COMPILE_BUTTON = document.getElementById("compile_button");
const OUTPUT = document.getElementById("compiled_body");

const STORAGE_KEYS = {
  output: "out",
  inputs: {
    input_1: "i1",
    input_2: "i2",
    input_3: "i3",
    input_4: "i4",
    input_5: "i5",
    input_6: "i6",
  },
};

function setButtonFeedback(button, message, resetText) {
  button.textContent = message;
  setTimeout(() => {
    button.textContent = resetText;
  }, 2200);
}

function clearForm() {
  INPUTS.forEach((input) => {
    input.value = "";
  });

  OUTPUT.innerText = "...";
  saveData();
  updateWordCount();
  setButtonFeedback(CLEAR_BUTTON, "Cleared", "Clear Form");
}

function buildCompiledText() {
  return INPUTS.map((input) => input.value.trim()).join("\n");
}

async function copyStringToClipboard(textToCopy) {
  try {
    await navigator.clipboard.writeText(textToCopy);
    return true;
  } catch (err) {
    const hiddenInput = document.createElement("textarea");
    hiddenInput.value = textToCopy;
    hiddenInput.setAttribute("readonly", "");
    hiddenInput.style.position = "absolute";
    hiddenInput.style.left = "-9999px";
    document.body.appendChild(hiddenInput);
    hiddenInput.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(hiddenInput);
    return copied;
  }
}

async function compile() {
  const compiledText = buildCompiledText();
  OUTPUT.innerText = compiledText || "...";
  saveData();

  const copied = await copyStringToClipboard(compiledText);
  if (copied) {
    setButtonFeedback(COMPILE_BUTTON, "Compiled and Copied", "Compile and Copy");
  } else {
    setButtonFeedback(COMPILE_BUTTON, "Compiled (copy failed)", "Compile and Copy");
  }
}

function saveData() {
  INPUT_IDS.forEach((id) => {
    const key = STORAGE_KEYS.inputs[id];
    localStorage.setItem(key, document.getElementById(id).value);
  });
  localStorage.setItem(STORAGE_KEYS.output, OUTPUT.innerText);
}

function loadData() {
  INPUT_IDS.forEach((id) => {
    const key = STORAGE_KEYS.inputs[id];
    const value = localStorage.getItem(key);
    if (value !== null) {
      document.getElementById(id).value = value;
    }
  });

  const output = localStorage.getItem(STORAGE_KEYS.output);
  if (output !== null && output !== "") {
    OUTPUT.innerText = output;
  }
}

function updateWordCount() {
  const text = INPUTS.map((input) => input.value).join(" ").trim();
  const wordCount = text === "" ? 0 : text.split(/\s+/).length;
  WORD_COUNT_DISPLAY.innerText = wordCount;
}

document.addEventListener("DOMContentLoaded", () => {
  loadData();
  updateWordCount();
});

document.addEventListener("input", () => {
  updateWordCount();
  saveData();
});

CLEAR_BUTTON.addEventListener("click", clearForm);
COMPILE_BUTTON.addEventListener("click", compile);

setInterval(saveData, 60000);
