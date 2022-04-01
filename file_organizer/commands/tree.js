let fs=require("fs");
let path=require("path");
function treeFn(dirPath){    
    let destPath;
    if(dirPath==undefined){
        treeHelper(process.cwd(),""); //cwd is current working directory
    return;
    }
    else{
        let doesExist=fs.existsSync(dirPath);
        if(doesExist){
            treeHelper(dirPath,""); //empty string is for identation
        }
        else{
            console.log("kindly enter correct path");
            return;
        }
    }
}
function treeHelper(dirPath,indent){
    let isFile=fs.lstatSync(dirPath).isFile();
    if(isFile==true){
        let fileName=path.basename(dirPath);
        console.log(indent+"--->"+fileName)
    }
    else{
        let dirName=path.basename(dirPath);
        console.log(indent+"-"+dirName);
        let children=fs.readdirSync(dirPath);
        for(let i=0;i<children.length;i++)
        {
            let childPath= path.join(dirPath,children[i]);
            treeHelper(childPath,indent+"\t");
        }
    }

}
module.exports={
    treeKey:treeFn
}