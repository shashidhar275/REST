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
/*

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
*/

/*
function fun()
{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('hi');
            resolve(10);
        },2000);
    });
}
/*

/* One  way of handling promise in asynchronous way 
fun().then((value)=>{
    console.log(value);
}).catch(err=>{
    console.log(err);
});
*/
/*
async function fun1()
{
    const value = await fun();
    console.log('Done and dusted');
    console.log(value);
}
fun1();

console.log('Shashidhar is the greatest');
*/

return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log('hi');
        reject(10);
    },2000);
});