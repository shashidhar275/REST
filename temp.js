/*
const obj = {
    first_name : "Shashidhar",
    last_name: "Angadi",
    roll_no: 531
};

console.log(obj);
const str = JSON.stringify(obj);
console.log(str);

const original = JSON.parse(str);
console.log(original);
*/
/*
const arr = [ 100 , 'Shashidhar' , 'Y' , { name : 'Atharva', roll_no: 530}];
const str = JSON.stringify(arr);
console.log(str);

console.log('Done');

const original2  = JSON.parse(str);
console.log(original2);
*/


const  array = [1,2,34,5];
array.splice(2,1);
console.log(array);

const obje = [{'first':1,'third':3},{'second':2}]
async function fun()
{
    const result = await obje.find({});
    console.log('Result ',result);
}
fun();

