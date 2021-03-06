const grid = document.querySelector(".grid");

function paint(){
    const grid = document.querySelector(".grid");
    grid.addEventListener("mousedown", setColor);
    grid.addEventListener("mouseup", stopFunction);
    grid.addEventListener("dragend", stopFunction);
}
function stopFunction(){
    let nodelist = document.querySelectorAll(".grid-element");
    for(let div of nodelist){
        div.removeEventListener("mousemove", greyScale);
        div.removeEventListener("mousemove", skittles);
        div.removeEventListener("mousemove", updateColor);
    }
}
const clear = document.querySelector("#clear");
clear.addEventListener("click", reset);
function createDivs(size){
    for(i = 1; i < size * size + 1; i++){
        let createdDivs = document.createElement("div")
        grid.appendChild(createdDivs)
        createdDivs.setAttribute("data-pos", i)
        createdDivs.setAttribute("class", "grid-element" )
    }
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
}
let newSize = [16]
let oldSize = [0]
const userInput = document.querySelector("#userInput");
userInput.addEventListener("input", function(e){
    resetRT();
    const sizeDisplay = document.querySelector("#sizeDisplay")
    sizeDisplay.textContent = `${userInput.value}x${userInput.value}`;
    let size = parseInt(userInput.value);
    newSize.unshift(size);
    oldSize = newSize.pop();
    createDivs(size);
    paint();
    return oldSize;
})
function reset(){
    let divs = document.querySelectorAll(".grid-element")
    divs.forEach(function(div){
        div.parentNode.removeChild(div);
        return false;
    });
    createDivs(newSize);
    paint();
}
function resetRT(size){
    let divs = document.querySelectorAll(".grid-element")
    divs.forEach(function(div){
        div.parentNode.removeChild(div);
        return false;
    });
    createDivs(size);
}
createDivs(16);
const li = document.querySelectorAll("ul li")
li.forEach(function(e){
    e.addEventListener("click", fetchClassName)  
})
let className = ["black"]
let oldClassName = ["black"]
let currentColor = "black"
function fetchClassName(e){
    className.unshift(e.srcElement.className);
    oldClassName = className.pop();
    paint();
}
function setColor(){
    let nodelist = document.querySelectorAll(".grid-element");
    let div;
    switch(className[0]){
        case "black":
            currentColor = "rgba(0, 0, 0, 0.99)"
            for(div of nodelist){
                div.removeEventListener("mousemove", greyScale);
                div.removeEventListener("mousemove", skittles);
                div.addEventListener("mousemove", updateColor);
            }
            break;
        case "white":
            currentColor = "rgba(255, 255, 255, 0.99)"
            for(div of nodelist){
                div.removeEventListener("mousemove", greyScale);
                div.removeEventListener("mousemove", skittles);
                div.addEventListener("mousemove", updateColor);
            }
            break;
        case "red":
            currentColor = "rgba(255, 0 ,0, 0.99)"
            for(div of nodelist){
                div.removeEventListener("mousemove", greyScale);
                div.removeEventListener("mousemove", skittles);
                div.addEventListener("mousemove", updateColor);
            }
            break;
        case "green":
            currentColor = "rgba(0, 255, 0, 0.99)"
            for(div of nodelist){
                div.removeEventListener("mousemove", greyScale);
                div.removeEventListener("mousemove", skittles);
                div.addEventListener("mousemove", updateColor);
            }
            break;
        case "blue":
            currentColor = "rgba(0, 0, 255, 0.99)"
            for(div of nodelist){
                div.removeEventListener("mousemove", greyScale);
                div.removeEventListener("mousemove", skittles);
                div.addEventListener("mousemove", updateColor);
            }
            break;
        case "rainbow":
            for(div of nodelist){
                div.removeEventListener("mousemove", greyScale);
                div.removeEventListener("mousemove", updateColor);
                div.addEventListener("mousemove", skittles);
            }
            break;
        case "erase":
            currentColor = "rgba(0, 0, 0, 0.1)"
            for(div of nodelist){
                div.removeEventListener("mousemove", greyScale);
                div.removeEventListener("mousemove", skittles);
                div.addEventListener("mousemove", updateColor);
            }
            break;
        case "greyscale":
            for(div of nodelist){
                div.style.backgroundColor = "rgba(0, 0, 0, 0.1)"
                div.removeEventListener("mousemove", skittles);
                div.removeEventListener("mousemove", updateColor);
                div.addEventListener("mousemove", greyScale);
            }
            break;
    }
}
function updateColor(e){
        e.target.style.backgroundColor = currentColor //className[0] works but not what I want
        console.log(currentColor)
}
function skittles(e){
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let rgb = `rgba(${r}, ${g}, ${b}, 0.7)`
        e.target.style.backgroundColor = rgb;
}
function greyScale(e){
    const value = getComputedStyle(e.target).getPropertyValue("background-color");
    const parts = value.match(/[\d.]+/g);
    parts[3] = Number(parts[3]) + 0.1;
    let rgba = `rgba(0, 0, 0, ${parts[3]})`
    e.target.style.backgroundColor = rgba;
}
paint();

