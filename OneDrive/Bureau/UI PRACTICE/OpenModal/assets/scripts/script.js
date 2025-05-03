const modalButton = document.querySelector("#open"),
modalBg = document.querySelector(".modalBackground"),
closeBtn = document.querySelector(".close")





modalButton.onclick=()=>{
    modalBg.classList.add("active")
}

closeBtn.onclick=()=>{
    modalBg.classList.remove("active")
}

modalBg.onclick=()=>{
    modalBg.classList.contains("active") ? modalBg.classList.remove("active") : " "
}

