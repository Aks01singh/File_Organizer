function organizeFn(dirPath){
    let destPath;
    if(dirPath==undefined){
        destPath=process.cwd();
    return;
    }
    else{
        let doesExist=fs.existsSync(dirPath);
        if(doesExist){
            //create -> organised files -> directory
            destPath=path.join(dirPath, "organized_files");
            if(fs.existsSync(destPath)==false)
                fs.mkdirSync(destPath);
        }
        else{
            console.log("kindly enter correct path");
            return;
        }
    }
    let src=dirPath;
    let dest=destPath;
    organizeHelper(src,dest);
    //3.identify categ of all files in tht directory
    
}
function organizeHelper(src,dest){
    let childnames=fs.readdirSync(src);
    for(let i=0;i<childnames.length;i++){
        let childAddress=path.join(src,childnames[i]);
        let isFile= fs.lstatSync(childAddress).isFile();
        if(isFile){            
            let category=getCategory(childnames[i]);
            //4.copy/cut files to that organised directory inside of any of categ folder
            sendFiles(childAddress,dest,category);// pick from childAdress' path, send to dest, under category- category
        }
    }
}
function sendFiles(srcFilePath,dest,category){
    let categoryPath =path.join(dest,category);
    if(fs.existsSync(categoryPath)==false)
        fs.mkdirSync(categoryPath);
    let fileName=path.basename(srcFilePath);
    let destFilePath=path.join(categoryPath,fileName);
    fs.copyFileSync(srcFilePath,destFilePath);
    fs.unlinkSync(srcFilePath); // remove original file if u want to
}
function getCategory(name){
    let ext= path.extname(name);
    ext=ext.slice(1);
    for(let type in types){
        let cTypeArray=types[type];
        for(let i=0;i<cTypeArray.length;i++)
        if(ext==cTypeArray[i])
        return type;
    }
    return "others";
}
module.exports={
    organizeKey: organizeFn
}