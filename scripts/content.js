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
    check.innerHTML =
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M20.06 8.66C21.37 9.33 22.25 10.57 22.25 12C22.25 13.43 21.37 14.67 20.06 15.34C20.52 16.73 20.26 18.24 19.25 19.25C18.24 20.26 16.73 20.51 15.34 20.06C14.68 21.37 13.43 22.25 12 22.25C10.57 22.25 9.33 21.37 8.66 20.06C7.27 20.51 5.76 20.26 4.75 19.25C3.74 18.24 3.49 16.73 3.95 15.34C2.64 14.67 1.75 13.43 1.75 12C1.75 10.57 2.64 9.33 3.95 8.66C3.49 7.27 3.74 5.76 4.75 4.75C5.76 3.74 7.27 3.48 8.67 3.94C9.33 2.63 10.57 1.75 12 1.75C13.43 1.75 14.68 2.63 15.34 3.94C16.73 3.48 18.24 3.74 19.25 4.75C20.26 5.76 20.52 7.27 20.06 8.66ZM15.55 9.99167H14.3833C14.3833 9.14058 13.4092 8.73108 12.6333 8.59167V11.4914C13.9429 11.6652 15.55 12.4201 15.55 14.075C15.55 15.7299 13.9429 16.4853 12.6333 16.6592V17.8667H11.4667V16.6627C9.96458 16.4778 8.55 15.5853 8.55 14.075H9.71667C9.71667 14.8777 10.622 15.3286 11.4667 15.475V12.5758C10.1052 12.3909 8.55 11.5702 8.55 9.99167C8.55 8.33675 10.1571 7.58192 11.4667 7.40808V6.2H12.6333V7.40808C13.9429 7.58192 15.55 8.33675 15.55 9.99167ZM11.4667 8.59167C10.6908 8.73108 9.71667 9.14058 9.71667 9.99167C9.71667 10.8066 10.6669 11.2435 11.4667 11.3911V8.59167ZM12.6333 15.475C13.4092 15.3356 14.3833 14.9261 14.3833 14.075C14.3833 13.2239 13.4092 12.8144 12.6333 12.675V15.475Z" fill="#1DA1F2"/>';
  });
}

async function go() {
  await waitForTimeline();
  console.log('checking if blue')
  await wait(500);
  const isBlueCheck = await isBlue();
  if (isBlueCheck) {
    console.log('IS BLUE')
    markAsBlue();
  }
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
