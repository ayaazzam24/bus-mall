'use strict';
let max = 25;
let attemps = 1;
let array = [];
let con = document.getElementById('container')
let Image1 = document.getElementById('imageOne');
let Image2 = document.getElementById('imageTwo');
let Image3 = document.getElementById('imagethree');
let arrOfSelected = [];
let arrNumofshowen = [];
let arrTwo = [];
let arrThree=[];


function prd(name, source) {
    this.productName = name;
    this.source = source;
    this.selectedPrd = 0;
    this.numofShowen = 0;
    array.push(this);
    arrTwo.push(this.productName);
   
}


new prd('bag', 'image/bag.jpg');
new prd('banana', 'image/banana.jpg');
new prd('bathroom.', 'image/bathroom.jpg');
new prd('boots', 'image/boots.jpg');
new prd('breakfast', 'image/breakfast.jpg');
new prd('bubblegum', 'image/bubblegum.jpg');
new prd('chair', 'image/chair.jpg');
new prd('cthulhu', 'image/cthulhu.jpg');
new prd('dog-duck', 'image/dog-duck.jpg');
new prd('dragon', 'image/dragon.jpg');
new prd('pen', 'image/pen.jpg');
new prd('pet-sweep', 'image/pet-sweep.jpg');
new prd('scissors', 'image/scissors.jpg');
new prd('shark', 'image/shark.jpg');
new prd('sweep', 'image/sweep.png');
new prd('tauntaun', 'image/tauntaun.jpg');
new prd('unicorn', 'image/unicorn.jpg');
new prd('usb', 'image/usb.gif');
new prd('water-can', 'image/water-can.jpg');
new prd('wine-glass', 'image/wine-glass.jpg');

let Image1Index;
let Image2Index;
let Image3Index;
function renderThreeRandomImages() {
    Image1Index = generateRandomIndex();
    Image2Index = generateRandomIndex();
    Image3Index = generateRandomIndex();
    while ((Image1Index === Image2Index) || (Image1Index === Image3Index) || (Image2Index === Image3Index)) {
        Image2Index = generateRandomIndex();
        Image3Index = generateRandomIndex();
    }

    Image1.setAttribute('src', array[Image1Index].source);
    Image2.setAttribute('src', array[Image2Index].source);
    Image3.setAttribute('src', array[Image3Index].source);

    array[Image1Index].numofShowen++;
    array[Image2Index].numofShowen++;
    array[Image3Index].numofShowen++;
    arrThree[0]= Image1Index ;
    arrThree[1]= Image2Index;
    arrThree[2]= Image3Index;
}
// console.log(array);

renderThreeRandomImages();





function generateRandomIndex() {
    let randomIndex = Math.floor(Math.random() * array.length);
    while(arrThree.includes(randomIndex)){
        randomIndex = Math.floor(Math.random() * array.length);
    }
    return randomIndex;
}

con.addEventListener('click', imageClick)
function imageClick(event) {
    if (attemps <= max) {
        if (event.target.id === 'imageOne') {
            attemps++;
            array[Image1Index].selectedPrd++;

        }
        if (event.target.id === 'imageTwo') {
            array[Image2Index].selectedPrd++;
            attemps++;

        }
        if (event.target.id === 'imagethree') {
            array[Image3Index].selectedPrd++;
            attemps++;

        }
        renderThreeRandomImages();
    }
    else {
        let lists = document.getElementById('lists')
        let li;
        for (let i = 0; i < array.length; i++) {
            li = document.createElement('li')
            lists.appendChild(li);
            li.textContent = `${array[i].productName} Has ${array[i].selectedPrd} selectedPrds and Showen ${array[i].numofShowen}`
        }
        for(let a = 0 ; a <array.length; a++){
            arrOfSelected.push(array[a].selectedPrd );
            arrNumofshowen.push(array[a].numofShowen);
        }
        
        chartRender();
        document.getElementById('view').style.display = 'block';
        con.removeEventListener('click', imageClick)

        toSave();
       
    }
    
    
    
    
   
} 


function viewResult() {
    document.getElementById('lists').style.display = 'block';

}




function chartRender(){
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels:arrTwo ,
        datasets: [{
            label: '# of Votes',
            data: arrOfSelected,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },{
            label: '# of showen',
            backgroundColor: '#f1d1d0',
            borderColor:'rgb(155,100,30)',
            data: arrNumofshowen,
        }]
    }, options:{}
});
}

function toSave(){
    let lists = JSON.stringify(array);
    localStorage.setItem('ALLlists', lists);
}

function toGet(){
    let getLists =  localStorage.getItem('ALLlists');
    let get = JSON.parse(getLists);
    if(get){ 
        array = get;
      }else{
        array = [];
      }
      renderThreeRandomImages();
}
toGet();