const searchPhone = ()=>{
    const input = document.getElementById("input");
    inputValue = input.value;
    input.value=""

    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
    .then(res=>res.json())
    .then(data=>showResult(data))
}

//show the search result
const showResult = resultValue=>{
    const showValue = resultValue.data
    const showResult = document.getElementById("showResult")
    showResult.innerHTML=""
    const details = document.getElementById("details")
    details.innerText=""
    showValue.forEach(resultValues => {
       const div = document.createElement("div");
       div.innerHTML=`
       <div onclick="showDetails('${resultValues.slug}')" class="card h-100 text-center p-3">
       <img  src="${resultValues.image}" class="card-img-top w-50 mx-auto" alt="...">
       <div class="card-body">
         <h5 class="card-title">${resultValues.phone_name}</h5>
         <p class="card-text">${resultValues.brand}</p>
       </div>
       <div>
       <button>Details</button>
       </div>
     </div>
       `
       showResult.appendChild(div)
      
    });
}

//show the image details
const showDetails =detailsValue=>{
    fetch(` https://openapi.programming-hero.com/api/phone/${detailsValue}`)
    .then(res=>res.json())
    .then(data=>fullDetails(data))
}

const fullDetails = fullDetailsValue=>{
    const detailsResult = fullDetailsValue.data
    //image details id
    const details = document.getElementById("details")
    details.innerText=""
    //create element
        const div = document.createElement("div");
        div.innerHTML=`
        <div class="card mx-auto text-center my-4 p-3" style="width: 18rem;">
        <img src="${detailsResult.image}" class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body">
          <p class="card-title">Release Date:${detailsResult.releaseDate?detailsResult.releaseDate:'no result found'}</p>
          <p class="card-text">storage:${detailsResult.mainFeatures.storage}</p>
          <p>displaySize:${detailsResult.displaySize}</p>
          
        </div>
      </div>
        `
        details.appendChild(div)
}