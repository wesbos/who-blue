const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

async function isBlue() {
  const checkmark = document.querySelector(`[aria-label*="Proporciona detalles sobre las cuentas verificadas"]`);

  if (!checkmark) return false;

  // click it
  checkmark.click();
  // wait for a bit
  await wait(50);
  const blueText = Array.from(document.querySelectorAll('span')).find(span => span.innerText.includes('suscrita a Twitter Blue'));

  checkmark.click();

  if (blueText) return true;
  return false;
}

function markAsBlue() {
  const originCheck = document.querySelectorAll(`svg[aria-label="Cuenta verificada"]`);
  const check = originCheck[0];
  const otherCheck = originCheck[1];

  if (!check) return;

  check.style.rotate = `0.5turn`;
  check.style.fill = `#ee8383`;
  otherCheck.style.rotate = `0.5turn`;
  otherCheck.style.fill = `#ee8383`;
}

async function go() {
  await waitForTimeline();
  console.log('Revisando si es verificado');
  await wait(1000);
  const isBlueCheck = await isBlue();
  if (isBlueCheck) {
    console.log('SI, ERES DE LOS 8$');
    markAsBlue();
  }
}

async function waitForTimeline() {
  return new Promise((resolve, reject) => {
    const interval = setInterval(function () {
      console.log('REVISANDO SU CRONOLOGIA ...');
      const timeline = document.querySelector(`[aria-label="Cronología de inicio"]`);
      if (timeline) {
        clearInterval(interval);
        resolve();
      }
    }, 50);
  });
}

go();
