let fs = require("fs");
let inputArr = process.argv.slice(2);
// let a  = inputArr[0];
// console.log(a);
let optionsArr =[];
let filesArr =[];

for(let i=0 ; i<inputArr.length ; i++){
    let firstChar = inputArr[i].charAt(0);
    if(firstChar == "-"){
        optionsArr.push(inputArr[i]);
    }
    else{
        filesArr.push(inputArr[i]);
    }
}

for(let i=0 ; i< filesArr.length ; i++){
    let ans = fs.existsSync(filesArr[i]);
    if(ans == false){
        console.log("File does not exists");
        return;
    }
}

//*************************************** content appended for multiple files *******************************************************

let content = "";
for(let i=0 ; i<filesArr.length ; i++){
     content = content + fs.readFileSync(filesArr[i]);
   
}
//**************************************** Implementing the -s command *********************************************** 

//  console.log(content);
let contentArr = content.split("\n");
// console.log(contentArr);
let isSPresent = optionsArr.includes("-s");
if(isSPresent==true){
    for(let i=1 ; i<contentArr.length ; i++){
        if(contentArr[i] == "" && contentArr[i-1] == ""){
            contentArr[i]=null;
        }
        else if(contentArr[i] == "" && contentArr[i-1] == null){
            contentArr[i] = null;
        }
    }
}

// console.log(contentArr);
 
let newArr =[]
for(let i=0 ; i<contentArr.length ; i++){
    if(contentArr[i] !== null){
        newArr.push(contentArr[i]);
    }
}
contentArr = newArr;


 console.log(contentArr.join("\n"));

let indexOfN = optionsArr.indexOf("-n");
let indexOfB = optionsArr.indexOf("-b");
let finalOption ="";
if(indexOfN >-1 && indexOfB >-1){
    //index --> smaller
    if(indexOfN<indexOfB){
        finalOption="-n";
    }
    else{
        finalOption="-b";
    }
}
else{
    if(indexOfN>-1){
        finalOption="-n";
    }
    else if(indexOfB >-1){
        finalOption="-b";
    }
}

if(finalOption != ""){
    if(finalOption == "-n"){
        modifycontentByN(contentArr);
    }
    else if (finalOption ="-b"){
        modifycontentByB(contentArr);
    }
}
// console.log(finalOption);
function modifycontentByN(contentArr){
    for(let i= 0 ; i<contentArr.length ; i++){
    contentArr[i] = (i+1) + "." + contentArr[i];
}
}

function modifycontentByB(contentArr){
let count =1;
for(let i=0 ; i<contentArr.length ;i++){
    if(contentArr[i] != ""){
    contentArr[i] = count + contentArr[i];
    count++;
    }
    
}
}
console.log(contentArr.join("\n")); 