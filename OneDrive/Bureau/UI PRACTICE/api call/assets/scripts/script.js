// how to call an api//
const postlistElements = document.querySelector(".posts-list-container")


// fetch using XHR//

// const fetchUsingXHR = function(){
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET","http://127.0.0.1:5501//assets//scripts//data.json")

//     xhr.responseType = "json"
//     xhr.send()

//     xhr.onload =()=>{
//         if(xhr.status === 200){
//            let array = xhr
//            console.log(array);
           
           
//            displayResult(xhr)
           
//         }
//         else{
//             console.log("Some Error ocurred");
//         }
//     }
// }

// fetchUsingXHR()

// displayResult(fetchUsingXHR())

function displayResult(posts){
    postlistElements.innerHTML=posts.at(0).others.map(customer=>`
           <li class="data">${customer.name} is  ${customer.age} years old </li>
        `
    ).join();
    
}


// using fetch to get data using promise


// const fetchData =()=>{
//      fetch("http://http://127.0.0.1:5501///assets//scripts//data.json",{
//         method:"GET",
//         content:"application/json"
//      }).then(response => response.json()).then(result => displayResult(result.array)).catch(e=>console.error(e)
//      )

//     //  data =data.json().then(result=>result)
    
//     //  console.log(data);
//     //  displayResult(data)
     
// }

// fetchData()


// fetchData using async and awit

const getAsyncData= async()=>{
    let data = await fetch("http://127.0.0.1:5501//assets//scripts//data.json",{
        method:"GET",
        content:"application/json"
    }).then(response =>response.json()).then(result => displayResult(result.array))
    

//    let result = await data.json().then(result => console.log(result))

    // console.log("async and await: " + result.array)
}

getAsyncData()

// const fetchAsyncAwait= async()=>{
//       let data = await fetch("http://127.0.0.1:5501//assets//scripts//data.json",{
//         method:"GET",
//         content:"application/json"
//       })

//       data = await data.json()
//     //   console.log("async await is working",result)
//       displayResult(data.array)
// }

// fetchAsyncAwait()


// combining all fetching feutures

// const helperMethod = function(method,url){
//      const promise = new Promise((resulve,reject)=>{
//           const xhr = new XMLHttpRequest()
//           xhr.open(method,url)
//           xhr.responseType="json"
//            xhr.send()
//           xhr.onload = function(){
//                 if(xhr.status === 200){
//                     resulve(xhr.response)
//                 }
//                 else{
//                     reject(xhr.response)
//                 }
//           }

//      })

//      return promise;
// }

// const fetchUsingXHRAndAsyncAwait = async function(){
//       const response = await helperMethod("GET","http://127.0.0.1:5501//assets//scripts//data.json")

//       displayResult(response.array)

//       console.log(response);
      
// }

// fetchUsingXHRAndAsyncAwait()



