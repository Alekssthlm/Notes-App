'use strict';
// VARIABLES

let listViewEl = document.querySelector('#listView');
let notesContainerEl = document.querySelector('#notesContainer');

let notesArray = JSON.parse(localStorage.getItem('notesArray')) || [];
let dateEl = document.querySelector('#date');
dateEl.textContent = generateDate();

updatePage();

// FUNCTIONS

function updatePage(){
  while(notesContainerEl.firstChild) { 
    notesContainerEl.removeChild(notesContainerEl.firstChild); 
  } 

  for(let note of notesArray){
    let previewContainerEl = document.createElement('div');
    let previewTitleEl = document.createElement('h1');
    let previewContentEl = document.createElement('p');

    notesContainerEl.append(previewContainerEl);
    previewContainerEl.appendChild(previewTitleEl);
    previewContainerEl.appendChild(previewContentEl);

    previewContainerEl.classList.add('preview-box');
    previewTitleEl.classList.add('no-pointer');
    previewContentEl.classList.add('no-pointer');

    previewTitleEl.textContent = note.title;
    previewContentEl.textContent = note.content;
    previewContainerEl.setAttribute('data-id', `${note.id}`);

    previewContainerEl.addEventListener('click', displayClickedNote);
  }
}


function updateNotesIdByIndex() {
  for(let i = 0; i < notesArray.length; i++){
    notesArray[i].id = i;
  }
}


function createNote() {
  let newNote = {};

  // CREATE ENTRIES (KEYS AND VALUES)
  newNote.id = 0;
  newNote.title = 'Title';
  newNote.content = 'New note...';
  newNote.date = generateDate();
  newNote.edit = false;

  notesArray.unshift(newNote);
  updateNotesIdByIndex();
  localStorage.setItem('notesArray', JSON.stringify(notesArray));
  updatePage();

}

function displayNewNote(){

  let titleEl = document.querySelector('#newTitle');
  let contentEl = document.querySelector('#newNote');
  let dateEl = document.querySelector('#date');
  let idEl = document.querySelector('#idHolder');

  titleEl.textContent = notesArray[0].title;
  contentEl.textContent = notesArray[0].content;
  dateEl.textContent = notesArray[0].date;
  idEl.value = notesArray[0].id;
    
}


function saveNote(){
  let idEl = document.querySelector('#idHolder');
  let id = idEl.value;
  
  let titleEl = document.querySelector('#newTitle');
  let title = titleEl.textContent;

  let contentEl = document.querySelector('#newNote');
  let content = contentEl.textContent;

  let dateEl = document.querySelector('#date');
  let date = dateEl.textContent;

  let newNote = {};

  // CREATE ENTRIES (KEYS AND VALUES)
  newNote.id = 0;
  newNote.title = title;
  newNote.content = content;
  newNote.date = generateDate();

  notesArray.unshift(newNote);

  let oldNoteIndex = Number(id) + 1;
  console.log(oldNoteIndex);
  notesArray.splice(oldNoteIndex, 1);

  updateNotesIdByIndex();
  localStorage.setItem('notesArray', JSON.stringify(notesArray));
  updatePage();

}

function deleteNote(){
  var x = window.matchMedia("(max-width: 63rem)")
  if (x.matches) { // If media query matches
    listViewEl.style.transform = 'translateX(0%)';
    } 

  let idEl = document.querySelector('#idHolder');
  let id = idEl.value;
  
  let titleEl = document.querySelector('#newTitle');
  let title = titleEl.textContent;

  let contentEl = document.querySelector('#newNote');
  let content = contentEl.textContent;

  let dateEl = document.querySelector('#date');
  let date = dateEl.textContent;


  let currentNoteIndex = Number(id);
  notesArray.splice(currentNoteIndex, 1);

  updateNotesIdByIndex();
  localStorage.setItem('notesArray', JSON.stringify(notesArray));
  updatePage();
}


function clearInputs(){
  let titleEl = document.querySelector('#newTitle');
  titleEl.textContent = '';

  let contentEl = document.querySelector('#newNote');
  contentEl.textContent = '';
}


function displayClickedNote(e){
  var x = window.matchMedia("(max-width: 63rem)")
  if (x.matches) { // If media query matches
    listViewEl.style.transform = 'translateX(-100%)';
    } 
  let noteSelected = notesArray[e.target.getAttribute('data-id')];
  // noteSelected.edit = true;

  console.log(e.target.getAttribute('data-id'));
  let titleEl = document.querySelector('#newTitle');
  let contentEl = document.querySelector('#newNote');
  let dateEl = document.querySelector('#date');
  let idEl = document.querySelector('#idHolder');

  titleEl.textContent = noteSelected.title;
  contentEl.textContent = noteSelected.content;
  dateEl.textContent = noteSelected.date;
  idEl.value = noteSelected.id;
  console.log(`Id holder: ${idEl.value}`);
}


function generateDate(){
    // GENERATE DATE
    const date = new Date();
    let day = date.getDate();
    let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec"];
    let month = monthName[date.getMonth()];
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let currentDate = `${day}/${month}/${year} - ${hour}:${minutes}`;

    return currentDate;
}


// EVENT LISTENERS

// CLICKING NEW NOTE BUTTON 
let testEl = document.querySelector('#newNoteBtn');
testEl.addEventListener('click', function (){
  
  var x = window.matchMedia("(max-width: 63rem)")
  if (x.matches) { // If media query matches
    listViewEl.style.transform = 'translateX(-100%)';
    } 

  createNote();
  displayNewNote();
  clearInputs();
});

// CLICKING MENU BUTTON (ON MOBILE)
let menuBtnEl = document.querySelector('#menuBtn');
menuBtnEl.addEventListener('click', function (){
  
 listViewEl.style.transform = 'translateX(0%)';

  let titleEl = document.querySelector('#newTitle');
  let contentEl = document.querySelector('#newNote');

  if(titleEl.textContent || contentEl.textContent){
    saveNote();
  } else {
    console.log('Empty');
  }
});

// CLICKING SAVE BUTTON
let saveBtnEl = document.querySelector('#saveNoteBtn');
saveBtnEl.addEventListener('click', saveNote);

// CLICKING DELETE BUTTON
let deleteBtnEl = document.querySelector('#deleteNoteBtn');
deleteBtnEl.addEventListener('click', deleteNote);  