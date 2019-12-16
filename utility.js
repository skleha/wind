
function closeIntro() {
  let introModal = document.getElementById('intro-modal');
  let introModalChild = document.getElementById('intro-modal-child');
  let introModalButton = document.getElementById('intro-modal-button');

  introModalButton.addEventListener('click', () => {
    introModal.classList.toggle('close');
    introModalChild.classList.toggle('close');
  })
}

function openModal() {
  let openModalButton = document.getElementById("about-button");
  let modal = document.getElementById('modal');
  let modalChild = document.getElementById('modal-child');
  
  openModalButton.addEventListener('click', () => {
    modal.classList.toggle('open');
    modalChild.classList.toggle('open');
  })
}

function closeModal() {
  let closeModalButton = document.getElementById("close-button")
  let modal = document.getElementById('modal');
  let modalChild = document.getElementById('modal-child');

  closeModalButton.addEventListener('click', () => {
    modal.classList.toggle('open');
    modalChild.classList.toggle('open');
  })
}

function fireWhenReady(func) {
  document.addEventListener('DOMContentLoaded', func);
}

fireWhenReady(openModal);
fireWhenReady(closeModal);

function delayLoad() {
  setTimeout(showGraph, 3000);
}

function showGraph() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("my_dataviz").style.display = "block";
}
