const searchPhone = ()=>{
    const input = document.getElementById("input");
    spiner ("block")
    inputValue = input.value;
    input.value=""

    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
    .then(res=>res.json())
    .then(data=>showResult(data))
}

//show the search result
const showResult = resultValue=>{
    const showValue = resultValue.data
    // <!-- showResul id search result -->
    const showResult = document.getElementById("showResult")
    showResult.innerHTML=""
    //image details id for clean search result
     const details = document.getElementById("details")
     details.innerText=""
     
  if(!showValue){
    document.getElementById("errorResult").style.display="block"
  }
  else{
    document.getElementById("errorResult").style.display="none"
         //create element
         showValue.forEach(resultValues => {
            const div = document.createElement("div");
            div.innerHTML=`
            <div  class="card h-100 text-center p-3">
            <img  src="${resultValues.image}" class="card-img-top w-50 mx-auto" alt="...">
            <div class="card-body">
              <h5 class="card-title">${resultValues.phone_name}</h5>
              <p class="card-text">${resultValues.brand}</p>
            </div>
            <div>
            <button onclick="showDetails('${resultValues.slug}')">Details</button>
            </div>
          </div>
            `
            showResult.appendChild(div)
           
         });
  }
  spiner ("none")
}
//spinar show
const spiner = (display)=>{
    document.getElementById("image").style.display=display
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
        <div class="container">
        <div class="row g-5 my-5 pb-4 d-flex align-items-center border border-secondary">
        <div class="col-12 col-lg-4 col-md-4">
        <img src="${detailsResult.image}" class="card-img-top img-fluid  mx-auto" alt="...">
        </div>
         <div class="col-12 col-lg-8 col-md-8">
         <div class="card-body">
        <p class="card-title">Release Date:${detailsResult.releaseDate?detailsResult.releaseDate:'no result found'}</p>
        <p class="card-text">storage:${detailsResult.mainFeatures.storage}</p>
        <p>displaySize:${detailsResult.mainFeatures.displaySize}</p>
        <p>displaySize:${detailsResult.mainFeatures.chipSet}</p>
        <p>memory:${detailsResult.mainFeatures.memory}</p>
        <p class=" text-danger">sensors:${detailsResult.mainFeatures.sensors}</p>
        <p>WLAN:${detailsResult.others?.WLAN? detailsResult.others?.WLAN:'no result'}</p>
        <p>Bluetooth:${detailsResult.others?.Bluetooth? detailsResult.others?.Bluetooth:'no result'}</p>
        <p>NFC:${detailsResult.others?.NFC? detailsResult.others?.NFC:'no result'}</p>
        <p>Radio:${detailsResult.others?.Radio? detailsResult.others?.Radio:'no result'}</p>
        <p>USB:${detailsResult.others?.USB? detailsResult.others?.USB:'no result'}</p>
      </div>
    </div>
    </div>
    </div>
     <div>
        `
        details.appendChild(div)
}