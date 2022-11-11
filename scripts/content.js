const currentLang = navigator.language || navigator.userLanguage;
console.log("CURRENT LANG IS :", currentLang);

differences = [];

//ADD LANGUAGE KEYPHRASE ARRAY

ptPack = [
  "Dá detalhes sobre contas verificadas",
  "inscrita no Twitter Blue",
  "Conta verificada",
  "Pular para a timeline da página inicial",
];

esPack = [
  "Proporciona detalles sobre las cuentas verificadas",
  "suscrita a Twitter Blue",
  "Cuenta verificada",
  "Cronología de inicio",
];

engPack = [
  "verified accounts",
  "subscribed to Twitter Blue",
  "Verified account",
  "Home timeline",
];

// Maybe add switch case or something prettier
if (currentLang === "pt-PT") {
  differences = ptPack;
}

if (currentLang === "es_ES") {
  differences = esPack;
}

if (currentLang === "en-US") {
  differences = engPack;
}

const wait = (amount = 0) =>
  new Promise((resolve) => setTimeout(resolve, amount));

async function isBlue() {
  const checkmark = document.querySelector(`[aria-label*="${differences[0]}"]`);
  if (!checkmark) return false;

  // click it
  checkmark.click();
  // wait for a bit
  await wait(500);
  const blueText = Array.from(document.querySelectorAll("span")).find((span) =>
    span.innerText.includes("inscrita no Twitter Blue")
  );

  await wait(500);
  checkmark.click();

  if (blueText) return true;
  return false;
}

function markAsBlue() {
  const originCheck = document.querySelectorAll(
    `svg[aria-label="Conta verificada"]`
  );
  const check = originCheck[0];
  const otherCheck = originCheck[1];

  if (!check) return;
  [check, otherCheck]
    .filter((check) => check.style)
    .forEach((check) => {
      check.style.rotate = `0.5turn`;
      check.style.fill = `#ee8383`;
    });
}

async function go() {
  await waitForTimeline();
  console.log("checking if blue");
  await wait(1000);
  const isBlueCheck = await isBlue();
  if (isBlueCheck) {
    console.log("IS BLUE");
    markAsBlue();
  }
}

async function waitForTimeline() {
  return new Promise((resolve, reject) => {
    const interval = setInterval(function () {
      console.log("checking for timeline...");
      const timeline = document.querySelector(
        `[aria-label="Pular para a timeline da página inicial"]`
      );

      if (timeline) {
        console.log("IT WORKED");
        clearInterval(interval);
        resolve();
      }
    }, 50);
  });
}

go();
