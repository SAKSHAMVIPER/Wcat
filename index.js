#!/usr/bin/env node

const { log } = require("console");
const fs = require("fs");
let arguments = process.argv.slice(2);

let flags = [];
let filenames = [];
let secondaryArguments = [];

for(let i of arguments) {
    if(i[0] == "-") {
        flags.push(i);
    } else if(i[0] == "$") {
        secondaryArguments.push(i.slice(1));
    } else {
        filenames.push(i);
    }
}

// if(flags.length == 0) {
//     for(let file of filenames) {
//         console.log(fs.readFileSync(file,"utf-8"));
//     }
// } else {
//     for(let flag of flags) {
//         if(flag == "-rs") {
//             for(let file of filenames) {
//                 let fileData = fs.readFileSync(file,"utf-8");
//                 console.log(fileData.split(" ").join(""));
//             }
//         } else if
//     }
// }


for(let file of filenames) {
    let fileData = fs.readFileSync(file,"utf-8");
    for(let flag of flags) {
        if(flag == "-rs") {
            fileData = removeAll(fileData," ");  //remove space
        }
        if(flag == "-rn"){
            fileData = removeAll(fileData, "\r\n") // remove extra line
        }
        if(flag == "-rsc") {
            for(let secondaryArgument of secondaryArguments) {   //remove special character
                fileData = removeAll(fileData,secondaryArgument);
            }
        }
        if(flag == "-s"){
            let data = addsequence(fileData);
            console.log(data);
        }
        if(flag == "-sn"){
            let data = addsequencenline(fileData);
            console.log(data);
        }
        if(flag == "-rel"){
            let pdata = addsequencenextraline(fileData);
            for(let i = 0;i < pdata.length;i++){
                console.log(pdata[i]);
            }
        }
    }
    // console.log(fileData);
}

function removeAll(string, removalData) {
    return string.split(removalData).join("");
}
  function addsequence(content){
      let contentarr = content.split("\r\n");
      for(let i = 0;i < contentarr.length;i++){
         contentarr[i] = (i+1) + " " +contentarr[i];
      }
      return contentarr;
       
  }


  function addsequencenline(content){
    let contentarr = content.split("\r\n");
    let count = 1;
    for(let i = 0;i < contentarr.length;i++){
        if(contentarr[i] != ""){
       contentarr[i] = count + " " +contentarr[i];
       count++;
        }
    }
    return contentarr;
}



function addsequencenextraline(fileData){
    let contentArr=fileData.split("\r\n");
    let data=[];
    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i]=="" && contentArr[i-1]==""){
            contentArr[i]=null;
        }
        if(contentArr[i]=="" && contentArr[i-1]==null){
            contentArr[i]=null;
        }
    }

    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=null){
            data.push(contentArr[i]);
        }
    }
    return data;
}