const TextAray=["Get the best of the Best"]
const pTag=document.querySelector("h1")

let counter=0;
const display=()=>{
    // console.log(counter)
    pTag.textContent+=TextAray[0].charAt(counter);
    
    
    setTimeout(()=>{
        counter+=1
        display()
    },100)
}
display()

String("hello")