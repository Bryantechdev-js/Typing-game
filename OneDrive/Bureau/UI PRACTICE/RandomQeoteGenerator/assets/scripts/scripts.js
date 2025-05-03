const qoutQrapper =document.querySelector(".wrapper"),
buttonElement =document.querySelector("button")





// feching Qotes from DB

const getQote =()=>{
    fetch("http://127.0.0.1:5500//assets//DB//data.json",{
        method:"GET",
        content:"application/json"
    }).then(response => response.json()).then(data => generateRandomQote(data))
   
}






// geting random Qotes

const generateRandomQote=(Qotess)=>{
    console.log(Qotess.QuoteArray[0])
    const {QoteCategory,Qotes} = (Qotess.QuoteArray[0]);
    console.log(QoteCategory,Qotes)
    const gottenQotes = Qotes[Math.floor(Math.random() * Qotes.length
    )]; 


    displayQote(gottenQotes,QoteCategory)
    
}

// Display generated Qotes

const displayQote=(Qote,category)=>{
    console.log(Qote);
    qoutQrapper.innerHTML=`
    <div class="QoteWrapper">
    <p class="crator">${Qote.names}</p>
    <p class="qote">${Qote.qote}</p>
            <p class="date">${Qote.date}</p>
            <p class="category">${category}
            </p>
            </div>
            
            `
            
            setTimeout(()=>{
                qoutQrapper.style="display:inline;"
            },1000)
            buttonElement.textContent="Generate" 
            buttonElement.style.pointerEvents="visible"

            
            
        }
        
     buttonElement.onclick=()=>{
    qoutQrapper.style="display:none;"
    buttonElement.textContent="Generating...."
    buttonElement.style.pointerEvents="none"
    setTimeout(()=>{
        getQote()
    },1000)
}