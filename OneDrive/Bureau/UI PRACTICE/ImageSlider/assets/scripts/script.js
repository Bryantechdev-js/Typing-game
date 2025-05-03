const slider = document.querySelector(".slide"),
imgElement=document.querySelector("#img"),
dotContainer=document.querySelector(".dots-container"),
categorySelection = document.querySelectorAll(".selectCategory span")


let category ="food"
index=0

const displayImages=(imageArray)=>{
   slider.innerHTML=imageArray.map((item,index)=>`
      <div class="slider">
          <img src=${item.path} alt=${index++} />
      </div>
    `).join(" ");
      
    dotContainer.innerHTML = imageArray.map((button,index)=> `
        <span class="dot ${index === 0 ? "active" : ""}" data-slide=${index}></span>
          
        `).join(" ")
     
}
const fetchListofImages = async()=>{
    try{
        let data = await fetch("http://127.0.0.1:5501/assets/DB/imageDB.json",{
            method:"GET",
            content:"application/json"
        })
        data = await data.json()
         CategoryImage=data.ImageArray.find(items=>items.category === category)
        const {foodImage , carsImage}=CategoryImage;
        console.log(foodImage  ?? carsImage)
    if(!!data) displayImages(foodImage ?? carsImage)

        // imgElement.src=foodImage[0].path
    }
    catch(error){
        console.error(error)
    }
    
}

fetchListofImages()



// slider functionality


setTimeout(()=>{
    const slides = document.querySelectorAll(".slider"),

    PrevioseButton = document.querySelector(".prev"),
    nextButton = document.querySelector(".next"),
    dotButton=document.querySelectorAll(".dot")
    
    console.log("this is the slide lenght" ,dotButton.length-1);
    
    // setTimeout(()=>{
    //     dotButton=document.querySelectorAll(".dot")
    // })
    
    let currentSlide = 0;
    
    function activeDot(slideIndex){
          document.querySelectorAll(".dot").forEach((button)=>{
              button.classList.remove("active");
          })
    
          document.querySelectorAll(".dot")[slideIndex].classList.add("active")
    }
    
    
    const chageCurrentSlide=(slidesIndex)=>{
          
        slides.forEach((slides,index)=>{
            slides.style.transform = `translateX(-${100 * (index - slidesIndex) }%)`
        })
    
    }
    // chageCurrentSlide(currentSlide)
    // chageCurrentSlide()
    // chageCurrentSlide()
    
    nextButton.addEventListener("click",()=>{
        console.log(dotButton.length-1)
         currentSlide+=1
         if(currentSlide > (dotButton.length-1) ){
            currentSlide=0;
            chageCurrentSlide(currentSlide)
            activeDot(currentSlide)
         }
         else{

             chageCurrentSlide(currentSlide)
             activeDot(currentSlide)
        }
    })
    
    PrevioseButton.addEventListener("click",()=>{
       currentSlide-=1
       if(currentSlide < 0){
          currentSlide = dotButton.length -1;
          chageCurrentSlide(currentSlide)
          activeDot(currentSlide)
       }
       chageCurrentSlide(currentSlide)
       activeDot(currentSlide)
    })
    
    console.log("this is the dot buttons at the last level",dotButton);
    
    dotButton.forEach((button,index)=>{
        button.addEventListener("click",()=>{
            chageCurrentSlide(index)
            activeDot(index)
        })
    })
},1000)


categorySelection.forEach((cat)=>{
    cat.addEventListener("click",()=>{
        category=cat.textContent;
        fetchListofImages()
    })
})


