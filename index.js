const searchPhone = ()=>{
    const input = document.getElementById("input");
    inputValue = input.value;
    input.value=""
    spiner ("block")
    if(inputValue==""){
       document.getElementById("Searcherror").style.display="block"
       spiner ("none")
     // <!-- showResul id search result -->
    const showResult = document.getElementById("showResult")
    showResult.innerHTML=""
       //image details id for clean search result
       const details = document.getElementById("details")
       details.innerText=""
       document.getElementById("errorResult").style.display="none"
    }
    else{
      document.getElementById("Searcherror").style.display="none"

      fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
    .then(res=>res.json())
    .then(data=>showResult(data))
    }
}

//show the search result
const showResult = resultValue=>{
    const showValue = resultValue.data
    const isStatus = resultValue.status
    // <!-- showResul id search result -->
    const showResult = document.getElementById("showResult")
    showResult.innerHTML=""
    //image details id for clean search result
    const details = document.getElementById("details")
    details.innerText="" 

  if(!showValue || isStatus== false){
   document.getElementById("errorResult").style.display="block"
  }
  else{
    document.getElementById("errorResult").style.display="none"
         //create element
         showValue.slice(0,20).forEach(resultValues=> {
            const div = document.createElement("div");
            div.innerHTML=`
                <div class="container">
                <div  class="card h-100 text-center p-3 ">
                <img  src="${resultValues.image}" class="card-img-top w-50 mx-auto" alt="...">
                <div class="card-body">
                  <h5 class="card-title ">${resultValues.phone_name}</h5>
                  <p class="card-text "><span style="font-weight:bold">Brand:</span>${resultValues.brand}</p>
                </div>
                <div>
                <button class="btn btn-primary" onclick="showDetails('${resultValues.slug}')">Details</button>
                </div>
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
        <div class="container px-5 ">
        <div class="  row  g-5 my-5 border border-secondary align-items-center ">
        <div class="col-12 col-lg-4 col-md-4 ">
        <img src="${detailsResult.image}" class="card-img-top img-fluid  mx-auto" alt="...">
        </div>
         <div class="col-12 col-lg-8 col-md-8">
         <div class="card-body">
        <p class="card-title"><span style="font-weight:bold">Release Date:</span>${detailsResult.releaseDate?detailsResult.releaseDate:'no result found'}</p>
        <p class="card-text"><span style="font-weight:bold">Storage:</span>${detailsResult.mainFeatures.storage}</p>
        <p><span style="font-weight:bold">DisplaySize:</span>${detailsResult.mainFeatures.displaySize}</p>
        <p><span style="font-weight:bold">ChipSet:</span>${detailsResult.mainFeatures.chipSet}</p>
        <p><span style="font-weight:bold">Memory:</span>${detailsResult.mainFeatures.memory}</p>
        <p ><span style="font-weight:bold">Sensors:</span>${detailsResult.mainFeatures.sensors[0]}${detailsResult.mainFeatures.sensors[1]}${detailsResult.mainFeatures.sensors[2]}
        ${detailsResult.mainFeatures.sensors[3]}${detailsResult.mainFeatures.sensors[4]}${detailsResult.mainFeatures.sensors[5]}</p>
        <p><span style="font-weight:bold">WLAN:</span>${detailsResult.others?.WLAN? detailsResult.others?.WLAN:'no result'}</p>
        <p><span style="font-weight:bold">Bluetooth:</span>${detailsResult.others?.Bluetooth? detailsResult.others?.Bluetooth:'no result'}</p>
        <p><span style="font-weight:bold">NFC:</span>${detailsResult.others?.NFC? detailsResult.others?.NFC:'no result'}</p>
        <p><span style="font-weight:bold">Radio:
        </sapn>${detailsResult.others?.Radio? detailsResult.others?.Radio:'no result'}</p>
        <p><span style="font-weight:bold">USB:</span>${detailsResult.others?.USB? detailsResult.others?.USB:'no result'}</p>
      </div>
    </div>
    </div>
    </div>
     <div>
        `
        details.appendChild(div)
}