const starsElement = document.querySelectorAll(".star"),
ratingresultValeu =document.querySelector(".value");
let currentTotalSelectedStars = -1;



const handleupdatedratingState=(getCurrentRatingValue)=>{
   for(let i=0 ; i < 5 ; i++){
       if(i < getCurrentRatingValue){
        starsElement[i].classList.replace("fa-star-o","fa-star")
       }
       else{
        starsElement[i].classList.replace("fa-star","fa-star-o")
       }
   }
}

const handleMouseover=(e)=>{
   const currentRationValue =e.target.dataset.rating;
   if(!currentRationValue) return;
   else{
    handleupdatedratingState(currentRationValue)
   }

}

const handleClick=()=>{

}

const handlemouseLeave=()=>{

}
starsElement.forEach((starItem,index)=>{
    starItem.dataset.rating = index+1;
    starItem.addEventListener("mouseover",handleMouseover)

    starItem.addEventListener("click",()=>{
        handleClick()
    })

    starItem.addEventListener("mouseleave",()=>{
        handlemouseLeave()
    })
})