let accordionToggler = document.querySelectorAll(".arroyContainer"),
displayBox=document.querySelector(".displayFAQ")



const array =[
    {
        "questions":"what is an accordion",
        "answer":"an accordion is use to display website fital info, Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente necessitatibus tempore minus saepe debitis unde non quam fugit id, nostrum, sed laboriosam. Inventore expedita ratione voluptate ipsam minima a. Tempore suscipit nulla expedita voluptate. Repudiandae, voluptatibus maxime. Quaerat ducimus distinctio laudantium. Optio ad ducimus voluptates quaerat hic commodi maxime aut!"
    },
    {
        "questions":"what is an accordion",
        "answer":"an accordion is use to display website fital info, Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente necessitatibus tempore minus saepe debitis unde non quam fugit id, nostrum, sed laboriosam. Inventore expedita ratione voluptate ipsam minima a. Tempore suscipit nulla expedita voluptate. Repudiandae, voluptatibus maxime. Quaerat ducimus distinctio laudantium. Optio ad ducimus voluptates quaerat hic commodi maxime aut!"
    },
    {
        "questions":"what is an accordion",
        "answer":"an accordion is use to display website fital info, Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente necessitatibus tempore minus saepe debitis unde non quam fugit id, nostrum, sed laboriosam. Inventore expedita ratione voluptate ipsam minima a. Tempore suscipit nulla expedita voluptate. Repudiandae, voluptatibus maxime. Quaerat ducimus distinctio laudantium. Optio ad ducimus voluptates quaerat hic commodi maxime aut!"
    },
    {
        "questions":"what is an accordion",
        "answer":"an accordion is use to display website fital info, Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente necessitatibus tempore minus saepe debitis unde non quam fugit id, nostrum, sed laboriosam. Inventore expedita ratione voluptate ipsam minima a. Tempore suscipit nulla expedita voluptate. Repudiandae, voluptatibus maxime. Quaerat ducimus distinctio laudantium. Optio ad ducimus voluptates quaerat hic commodi maxime aut!"
    }
]

const createFAQ=()=>{
    displayBox.innerHTML=array.map(questions=>  `

           <div class="accordionContainer">
            <div class="titleContainer">
                <h2 class="title">${questions.questions}</h2>
                <div class="arroyContainer">
                    >
                </div>
            </div>
            <div class="accordionContent">
                <p class="content">${questions.answer}</p>
            </div>
        </div>
        `).join()

        accordionToggler = document.querySelectorAll(".arroyContainer")
}

createFAQ()


const setActive=(child)=>{
    let Perent = child.parentNode.parentNode
    Perent.classList.toggle("active")
}


accordionToggler.forEach((button)=>{
    button.addEventListener("click",()=>{
          setActive(button)
    })
})