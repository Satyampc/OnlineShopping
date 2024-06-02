
const cars = new Array();
const bikes = ['MotorCycle', 'Tricycle', 'Bicyle'];


let b = cars.push('bmw', 'volvo', 'honda');

let c = cars.unshift(1);

let d = cars.push('Taxi');

let e = cars.concat(bikes);

let list = e.entries();


// console.log(cars);
console.log(e);
console.log(list);

const itemPrice = [128, 222, 193, 77, 89, 54];

function checkItemPrice(){
    if(itemPrice >= 50 && itemPrice <= 100){
        document.createElement('h1').innerHTML = "Affordable"
    } else if(itemPrice > 100){
        document.createElement('h1').innerHTML = "Think About it"
    }
}

