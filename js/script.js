function generateFields(){
    let i=0;

    const fieldPart = document.querySelector("field-parts");

    for (i=0 ; i<25 ; i++){
        
        const field = document.createElement("field-part") ;
        field.classList.add("grass");
        fieldPart.appendChild(field);
        
        
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function attachToolsEvent(){
    const tools = document.querySelectorAll("tool");

    for (const tool of tools){
        tool.addEventListener("click", toolClicked);
    }
}

function toolClicked(event){

    const tools = document.querySelectorAll("tool");

    for (const tool of tools){
        tool.classList.toggle("active", tool===event.target);
    }

}

window.addEventListener("load", attachToolsEvent);

function attachFarmland(){
    const farms = document.querySelectorAll("field-parts");

    for (const farm of farms){
        farm.addEventListener("click", farmClicked);
    }
}

function farmClicked(event){
    const farms = document.querySelectorAll("field-parts");
    const tool = document.querySelector(".active");
    let stock = document.querySelector("stock");

    switch(tool.id){
        case "tool-hoe" :
            if(event.target.classList.contains("grass"))
            {
                event.target.classList.add("farmland");
                event.target.classList.remove("grass");
            }
            break;
        case "tool-water" :
            if(event.target.classList.contains("farmland")){
                event.target.classList.add("hydrated");
                setTimeout(dryFarmland, 10000, event.target);
                //alternative : setTimeout( ()=>{dryFarmland(event.target)},10000 );
            }
            break;
        case "tool-sow" :
            if(event.target.classList.contains("farmland.hydrated") || event.target.classList.contains("farmland")){
                event.target.dataset.seed = 1;
            }
            break;
        case "tool-harvest" :
            console.log(event.target.dataset.seed);
            if(event.target.dataset.seed == 7){
                stock.innerHTML++;
            }  
            event.target.dataset.seed = 0;
            break;
    }

}

function grow(){
    const farms = document.querySelectorAll("field-part");
    
    for (const farm of farms){
        console.log(farm.classList)
        if(farm.dataset.seed < 7 && farm.dataset.seed >= 1){
            if(farm.classList.contains("hydrated") && getRandomInt(100)<30){
                console.log("ça pousse (mouillé)")
                farm.dataset.seed++;
            }
            else if (!farm.classList.contains("hydrated") && getRandomInt(100)<5){
                console.log("ça pousse (sec)")
                farm.dataset.seed++;
            }
            
        }
        else if (!farm.classList.contains("hydrated") && getRandomInt(100)<1){
            farm.classList.add("grass");
            farm.classList.remove("farmland");
        }
    }
    
    setTimeout(grow,1000);

}

function dryFarmland(farm){
    farm.classList.remove("hydrated");
}

//--------------------------------------------------------------------------------------------

window.addEventListener("load", generateFields);

grow();

window.addEventListener("load", attachFarmland);