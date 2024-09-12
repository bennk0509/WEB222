
//1. function declaration
function sum(a,b)
{
    return a+b;
}

//2. function expression -- bind to a variable
const sum = function(a,b)
{
    return a+b;
}
const addUp = sum;
addUp(1,2);


//3. fat arrow function
const sum = (a,b) => a+b;
const addExtension = (fileName, ext) => {
    //deal with edge cases early, return early, return often
    if(!ext) return fileName
    return fileName + "." + ext;
}

const fullName2 = addExtension("index","html");
const fullName = addExtension("index");


//const total = sum("3","5");
console.log(fullName);
console.log(fullName2);