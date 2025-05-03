const containElement = document.querySelector(".container"),
tabButton = document.querySelectorAll("button"),
tabContent = document.querySelectorAll(".content")


containElement.addEventListener("click",(e)=>{
    console.log(e.target.dataset);

    const currentId =  e.target.dataset.id
    console.log(currentId);
    

    if(currentId){
        tabButton.forEach(tab=>tab.classList.remove("active"))

        e.target.classList.add("active");

        tabContent.forEach((content)=>{
            content.classList.remove("active")
            if(content.id.includes(currentId)){
                content.classList.add("active")
            }
        }
        )

   

    }
})