const ToggleButton= document.querySelector("button")

const bodyElement = document.querySelector("body")


// bassic way to create a  theme mode

// ToggleButton.onclick=()=>{
//     if(bodyElement.classList.contains("light")){
//         bodyElement.classList.remove("light")
//         bodyElement.classList.add("dark")
//         if(ToggleButton.classList.contains("dark")){
//         ToggleButton.classList.remove("dark")
//             ToggleButton.style="color:white;"
//         }
//         else{
//         ToggleButton.classList.add("light")
            
//         }
//     }
//     else{
//         bodyElement.classList.add("light")
//         bodyElement.classList.remove("dark")
//     }

  
// }

// using data-theme property

ToggleButton.addEventListener("click",()=>{
    if(bodyElement.getAttribute("data-theme") === "dark"){
        bodyElement.setAttribute("data-theme",null)
    }
    else{
        bodyElement.setAttribute("data-theme","dark")
    }
    bodyElement.setAttribute("dta-theme","dark")
    ToggleButton.setAttribute("data-theme","dark")
})


// const student={
//     "name":"bryan tech",
//     "age":24
// }

// console.log(student["name"],student["age"])