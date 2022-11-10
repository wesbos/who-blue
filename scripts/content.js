addEventListener('popstate', go);
addEventListener('click', go);

const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

async function isBlue() {
  const checkmark = document.querySelector(`[aria-label*="verified accounts"]`);

  if (!checkmark) return false;

  // click it
  checkmark.click();
  // wait for a bit
  await wait(50);
  const blueText = Array.from(document.querySelectorAll('span')).find(span => span.innerText.includes('subscribed to Twitter Blue'));

  checkmark.click();

  if (blueText) return true;
  return false;
}

function markAsBlue() {
  const check = document.querySelector(`[aria-label*="verified accounts"] svg`);
  const otherCheck = document.querySelector(`svg[aria-label="Verified account"]`)

  if (!check) return;
  [check, otherCheck].filter(check => check.style).forEach(check => {
    check.style.rotate = `0.5turn`;
    check.style.fill = `#ee8383`;
  });
}

function markVerified() {
  const check = document.querySelector(`[aria-label*="verified accounts"] svg`);
  const otherCheck = document.querySelector(`svg[aria-label="Verified account"]`)

  if (!check) return;
  [check, otherCheck].filter(check => check.style).forEach(check => {
    check.style.rotate = `0.0turn`;
    check.style.fill = `#d6d9db`;
  });
}

async function go() {
  await waitForTimeline();
  console.log('checking if blue')
  await wait(500);
  const isBlueCheck = await isBlue();
  if (isBlueCheck) {
    console.log('IS BLUE')
    return markAsBlue();
  }
  console.log('IS VERIFIED')
  return markVerified();
}

async function waitForTimeline() {
  return new Promise((resolve, reject) => {
    const interval = setInterval(function() {
      console.log('checking for timeline...');
      const timeline = document.querySelector(`[aria-label="Home timeline"]`);

      if(timeline){
        console.log('IT WORKED')
        clearInterval(interval);
        resolve();
      }
    }, 50);
  });
}

go();
