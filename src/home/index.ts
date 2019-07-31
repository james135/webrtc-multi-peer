const createLinkButton = document.getElementById('create-link');
const gotoLinkButton = document.getElementById('goto-link');
const hiddenArea = document.getElementById('hidden-area');
const copyLinkInput = document.getElementById('copy-link') as HTMLInputElement;

let currentLink = null;

// Utilities

const createRandomString = () => {
  const rnd = Math.random().toString(36); // e.g. 0.m7dh26hf3
  return rnd.substring(2, rnd.length);
}

const createRandomLink = () => {
  return `${location.origin}/video/${createRandomString()}`;
};

if (createLinkButton && gotoLinkButton) {
  createLinkButton.onclick = () => {
    currentLink = createRandomLink();
    copyLinkInput.value = currentLink;
    hiddenArea.style.display = 'block';
    copyLinkInput.select();
    document.execCommand('copy');
  }
  gotoLinkButton.onclick = () => {
    if (currentLink) {
      window.location.href = currentLink;
    }
  }
}