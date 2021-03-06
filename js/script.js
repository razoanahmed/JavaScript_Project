const color = document.querySelector('.color-select');
const quoteTxt = document.querySelector('.quote');
const converterForm = document.querySelector('#converter form');
const seriesForm = document.querySelector('#series form');
const magicEditor = document.querySelector('#magic form');
const magicTxt = document.querySelector('#magic textarea');

let numbers = false;

// p elements for showing series results
let maxP = document.createElement('p');
let minP = document.createElement('p');
let sumP = document.createElement('p');
let avgP = document.createElement('p');
let reverseP = document.createElement('p');

generateQuote();

// event listener for converting
converterForm.addEventListener('submit', function(e){
    e.preventDefault();
    converter();
});

// event listener for number series
seriesForm.addEventListener('submit', function(e){
    e.preventDefault();
    const seriesArr = stringToArr();
    findMax(seriesArr);
    findMin(seriesArr);
    sumAvg(seriesArr);
    reverseArr(seriesArr);
});

// event listener for magic editor buttons
magicEditor.addEventListener('click', function(e){
    if(e.target.value === 'Clear it'){
        clearIt();
    }else if(e.target.value === 'Capitalize'){
        letterCaseToggle();
    }else if(e.target.value === 'Sort'){
        lineSort();
    }else if (e.target.value === 'Reverse') {
        txtReverse();
    }else if (e.target.value === 'Strip Blank') {
        stripBlank();
    }else if(e.target.value === 'Add Numbers'){
        addNumber();
    }else if(e.target.value === 'Shuffle'){
        shuffle();
    }
});

// event listener for changing quote box color
color.addEventListener('click', function(e){
    if(e.target.classList.contains('green')){
        changeColor('green', '#555', '#555');
    }
    if(e.target.classList.contains('yellow')){
        changeColor('yellow', '#555', '#555');
    }
    if(e.target.classList.contains('blue')){
        changeColor('blue', '#555', '#555');
    }
    if(e.target.classList.contains('orange')){
        changeColor('orange', '#555', '#555');
    }
});


// changing colors of quote box
function changeColor(bgColor, txtColor, borderColor){
    quoteTxt.style.backgroundColor = bgColor;
    quoteTxt.style.color = txtColor;
    quoteTxt.style.borderColor = borderColor;
}
// showing random quotes
function generateQuote(){
    const quotes = ['First become rich then become philosopher.'];
    quoteTxt.textContent = quotes[Math.floor(Math.random()*quotes.length)];
}

//converter
function converter(){
    const select = document.querySelector('#converter form select');
    const convertVal = document.querySelector('#converter form input[type=text]');
    const result = document.querySelector('#converter form p');

    if(select.value == 'toKg'){
        let val = parseFloat(convertVal.value)*0.4536.toFixed(4);
        if(convertVal.value==1){
            result.textContent = `${convertVal.value} pound = ${val} kilograms`;
        }else{
            result.textContent = `${convertVal.value} pounds = ${val} kilograms`;
        }
        
    }else{
        let val = parseFloat(convertVal.value)*2.2046.toFixed(4);
        if(convertVal.value==1){
            result.textContent = `${convertVal.value} kilogram = ${val} pounds`;
        }else{
            result.textContent = `${convertVal.value} kilograms = ${val} pounds`;
        }
    }
}

// string to number array
function stringToArr(){
    const series = document.querySelector('#series input[type=text]');
    const seriesArr = series.value.split(',');
    for(let i=0;i<seriesArr.length; i++){
        seriesArr[i] = parseFloat(seriesArr[i]);
    }
    return seriesArr;
}

// finding max value from an array and showing in the page
function findMax(arr){
    let max = Math.max.apply(null, arr);
    maxP.textContent = `Maximum = ${max}`;
    seriesForm.appendChild(maxP);
}
// finding min value from an array and showing in the page
function findMin(arr){
    let min = Math.min.apply(null, arr);
    minP.textContent = `Minimum = ${min}`;
    seriesForm.appendChild(minP);
}
//calculating the sum, average and showing in the page
function sumAvg(arr){
    let sum=0;
    arr.forEach(element => {
        sum+=element;
    });
    let avg = sum/arr.length;

    sumP.textContent = `Sum = ${sum}`;
    seriesForm.appendChild(sumP);

    avgP.textContent = `Average = ${avg}`;
    seriesForm.appendChild(avgP);
}

//reversing the array and showing in the page
function reverseArr(arr){
    arr.reverse();

    reverseP.textContent = `Reverse Order = ${arr.join()}`;
    seriesForm.appendChild(reverseP);
}

// clearing the texts from textarea
function clearIt(){
    magicTxt.value='';
    magicTxt.focus();
}

// toggling letters between upper and lowercase
function letterCaseToggle(){
    if(magicTxt.value != magicTxt.value.toUpperCase()){
        magicTxt.value = magicTxt.value.toUpperCase();
        magicTxt.focus();
    }else{
        magicTxt.value = magicTxt.value.toLowerCase();
        magicTxt.focus();
    }
}

// rearranging the lines by sorting
function lineSort(){
    let a = magicTxt.value.split("\n");
    a.sort();
    clearIt();
    magicTxt.value = a.join("\n");
}

// reversing letters of each line
function txtReverse() {
    let a = magicTxt.value.split("\n");
    clearIt();
    a.forEach(function(element, i){
        let texts = element.split(' ');
        texts.reverse();
        a[i] = texts.join(' ');
    });
    magicTxt.value = a.join("\n");
}

// removing empty lines and empty spaces at beginning or end of any line 
function stripBlank(){
    let a = magicTxt.value.split("\n");
    for(let i=0;i<a.length;i++){
        a[i] = a[i].trim();
        if (a[i]==="") {
            a.splice(i,1);
            i--;
        }
    }
    magicTxt.value = a.join('\n');
}

// adding numbers to each line
function addNumber() {
    if(!numbers){
        let a = magicTxt.value.split("\n");
        for(let i=0;i<a.length;i++){
            a[i] = i+1+'. ' +a[i];
        }
        magicTxt.value = a.join('\n');
        numbers = true;
    }
}

function shuffle() {
    let a = magicTxt.value.split("\n");
    for(let i=0; i<a.length-1; i++){
        let rand = i+Math.floor(Math.random()*(a.length-i));
        // console.log(rand);
        let temp = a[i];
        a[i] = a[rand];
        a[rand] = temp;
    }
    magicTxt.value = a.join('\n');
    
}