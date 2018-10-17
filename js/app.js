'use strict'

function HornedAnimals(hornedAnimals){
  this.name = hornedAnimals.title;
  this.image_url = hornedAnimals.image_url;
  this.description = hornedAnimals.description;
  this.keyword = hornedAnimals.keyword;
  this.horns = hornedAnimals.horns;

  allHornedAnimals.push(this);
}

const allHornedAnimals = [];


HornedAnimals.prototype.render = function(){
  console.log(this, 'is rendering');
  $('main').append('<div class="clone"></div>');
  let $hornedAnimalsContainer = $('div[class="clone"]');

  let $clonedHornedAnimals =$('#hornedAnimals-template').html();

  $hornedAnimalsContainer.html($clonedHornedAnimals);

  $hornedAnimalsContainer.find('h2').text(this.name);
  $hornedAnimalsContainer.find('img').attr('src', this.image_url);
  $hornedAnimalsContainer.find('p').text(this.description);

  $hornedAnimalsContainer.attr('class', '');
}

let readJSON = function(){
  $.getJSON('../data/page-1.json', data => {
    data.forEach(hornedAnimals => {
      new HornedAnimals(hornedAnimals);

    })

  }).then(renderAllHornedAnimals)
    .then(createDropDown);
}

function renderAllHornedAnimals (){
  // Clear all the divs in main
  // $('div').remove();
  $('main').html('');

  let filter = $('select').find(':selected').val();
  allHornedAnimals.forEach(hornedAnimals => {
    console.log(filter);
    if (filter === hornedAnimals.keyword || filter === 'default') {
      hornedAnimals.render();
    }
  });
}

function createDropDown() {
  let usedKeywords = [];
  allHornedAnimals.forEach(hornedAnimal => {
    //Have we seen this keyword?
    if (!usedKeywords.includes(hornedAnimal.keyword)) {
      // Add keyword to usedKeywords
      usedKeywords.push(hornedAnimal.keyword);
      $('select').append(`<option value="${hornedAnimal.keyword}">${hornedAnimal.keyword}</option>`);
    }
  } );
}

function getSelectListener() {
  $('select').on('change', renderAllHornedAnimals);
}

readJSON();
getSelectListener();

