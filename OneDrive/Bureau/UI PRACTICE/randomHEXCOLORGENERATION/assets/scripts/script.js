const hexButton = document.querySelector(".hexbtn"),
hexContainer = document.querySelector(".hex-color-container"),
hexColorText =document.querySelector(".hexColorValue"),
rgbButton =document.querySelector(".rgb"),
blueInputBox =document.querySelector("#blue"),
greenInputBox =document.querySelector("#green"),
redInputBox =document.querySelector("#red"),
rbgColorContainer =document.querySelector(".rgb-color-container"),
rgbInputs =document.querySelectorAll("input"),
copyButtons = document.querySelectorAll(".nb");

// fuctions data global variables

let  redValue,
 greenValue,
 blueValue,
 hexColorOutput;


// create random hex color

const createRandomHexColor =()=>{
    let characterSet = "0123456789ABCDEF";

    hexColorOutput = ""

    for(let i=0,characterSetLenght=characterSet.length;i<6; ++i ){
        hexColorOutput += characterSet.charAt(Math.floor(Math.random() *  characterSetLenght))
    }

    console.log(hexColorOutput);
    hexColorText.textContent=`#${hexColorOutput}`
    
    hexColorText.style=" filter: hue-rotate(360deg);"
    hexButton.style=" filter: hue-rotate(360deg);"
    hexButton.style=`color:#${hexColorOutput};`
    hexContainer.style=`background:#${hexColorOutput};`
}



// rgb color generator

const generateRGBColores =()=>{
     redValue = redInputBox.value;
     greenValue = greenInputBox.value;
     blueValue = blueInputBox.value;

     console.log(redValue,greenValue,blueValue)

     rbgColorContainer.style=`background:rgb(${redValue},${greenValue},${blueValue})`
     rgbButton.textContent=`rgb(${redValue},${greenValue},${blueValue})`
}

hexButton.addEventListener("click",()=>{
    createRandomHexColor()
})

rgbInputs.forEach((input)=>{
    input.addEventListener("change",()=> generateRGBColores())
})

const copyCodes =(ishex)=>{
    
    try{
        if(ishex){
            navigator.clipboard.writeText(`#${hexColorOutput}`).then(()=>
            {
               alert("hex code copied")
            })
        }
        else if(!ishex){
            navigator.clipboard.writeText(`rgb(${redValue},${greenValue},${blueValue})`).then(()=>{
                alert("rgb code copied")
            })
        }
        else{
            throw new Error("invalid code type")
        }
    }
    catch(error){
        console.error(error)
    }
}

const checkCodeType =(buttonElement)=>{
     if(buttonElement.classList.contains("rbgcopyCode") && redValue != undefined) copyCodes(false)
     else if(buttonElement.classList.contains("hexcopyCode") && hexColorOutput != undefined) copyCodes(true)
     else{
       copyCodes("")
    }
}


copyButtons.forEach(copyBottons=>{
    copyBottons.addEventListener("click",()=>{
        checkCodeType(copyBottons)
    })
})

// rgbButton.addEventListener("click",()=>{
//     generateRGBColores()
// })
