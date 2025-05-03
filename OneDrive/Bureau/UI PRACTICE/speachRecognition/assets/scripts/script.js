const buttonElemetn = document.querySelector("button")

const recordSpeach =()=>{
    let m = "hi bryan tech" ;
   buttonElemetn.classList.add("animate")
   const isAnimating = buttonElemetn.classList.contains("animate")
   console.log(isAnimating)
    if(isAnimating){
         let recognition = new webkitSpeechRecognition;
         recognition.lang = "en-Us";
         recognition.start()
         recognition.onresult = e =>{
            m= e.results[0][0].transcript;
            console.log(m)

         }
    }
    return m;
}


buttonElemetn.addEventListener("click",()=>{
    console.log(recordSpeach())
})

