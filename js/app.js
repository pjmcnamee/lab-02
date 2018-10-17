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

  }).then(renderAllHornedAnimals);
}

function renderAllHornedAnimals (){
  allHornedAnimals.forEach(hornedAnimals => {
    hornedAnimals.render();
  })
  createDropDown();
}

function createDropDown() {
  let usedKeywords = [];
  // console.log('echo?');
  // console.log(allHornedAnimals);
  allHornedAnimals.forEach(hornedAnimal => {
    // console.log('horned animal', hornedAnimal);
    //Have we seen this keyword?
    if (!usedKeywords.includes(hornedAnimal.keyword)) {
      // Add keyword to usedKeywords
      usedKeywords.push(hornedAnimal.keyword);
      $('select').append(`<option value="${hornedAnimal.keyword}">${hornedAnimal.keyword}</option>`);
    }

  } );

  console.log(allHornedAnimals[0].keyword);

  for(let i = 0; i < allHornedAnimals.length; i++) {
    console.log(allHornedAnimals[i].keyword);
  }
}

readJSON();



// createDropDown();

