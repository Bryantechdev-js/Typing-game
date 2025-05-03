const htmlCode = document.querySelector("#html-code"),
cssCode=document.querySelector("#css-code"),
jsCode=document.querySelector("#js-code"),
outputCode=document.querySelector("#output")

function run(){
    outputCode.contentDocument.body.innerHTML = htmlCode.value + "<style>" + cssCode.value + "<style>"

    outputCode.contentWindow.eval(jsCode.value);
}

const copyCode =(code)=>{
   try{
     navigator.clipboard.writeText(code)
   }catch(err){
    console.log(err)
   }
   finally{
    alert("text copied")
   }
}


const checkCodeType =(codeType)=>{
   if(codeType == "html"){
     copyCode(htmlCode.value)
   }

   if(codeType == "css"){
     copyCode(cssCode.value)
   }
   
   if(codeType == "js"){
     copyCode(jsCode.value)
   }
}





