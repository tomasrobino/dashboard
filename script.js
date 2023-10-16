const list = document.querySelector("#elements");

const data = [
    {img: "https://picsum.photos/60", title: "Compras", subtitle: "10"},
    {img: "https://picsum.photos/60", title: "Belleza", subtitle: ""},
    {img: "https://picsum.photos/60", title: "Educacion", subtitle: ""},
    {img: "https://picsum.photos/60", title: "Efectivo", subtitle: ""},
    {img: "https://picsum.photos/60", title: "Empresa", subtitle: ""}
]

var currentHover;

const listElements = [];
data.map((value) => {
    let title = document.createElement("span");
    title.className = "title";
    title.append(document.createTextNode(value.title));

    let subtitle = document.createElement("span");
    subtitle.className = "subtitle"
    subtitle.append(document.createTextNode(value.subtitle+" transacciones"));

    let tns = document.createElement("div");
    tns.className = "tns";
    tns.append(title);
    tns.append(subtitle);

    let img = document.createElement("img");
    img.className = "img";
    img.src = value.img;
    img.alt = "";
    img.draggable = false;

    let dots = document.createElement("img");
    dots.className = "dots";
    dots.src = "assets/six-dots.png";
    dots.alt = "";
    dots.draggable = false;
    
    let left = document.createElement("div");
    left.className = "left";
    left.append(dots, img, tns);


    let buttons = document.createElement("div");
    buttons.className = "buttonDiv";

    [{src: "assets/plus.png", tooltip: "Añadir"}, {src: "assets/search.png", tooltip: "Ver transacciones"}, {src: "assets/pencil.png", tooltip: "Editar"}, {src: "assets/bin.png", tooltip: "Eliminar"},].forEach(element => {
        let button = document.createElement("img");
        button.className = "button";
        button.src = element.src;
        button.alt = "";
        button.draggable = false;

        let span = document.createElement("span");
        span.className = "tooltip";
        span.append(document.createTextNode(element.tooltip));
        

        let buttonDiv = document.createElement("div");
        buttonDiv.className = "bDiv";
        buttonDiv.append(button, span);
        buttons.append(buttonDiv);
    });

    
    let div = document.createElement("div");
    div.className = "details";
    div.append(left, buttons)
    
    let ul = document.createElement("ul");

    let item = document.createElement("li");
    item.className = "item";
    item.append(div, ul);

    let box = dots.parentNode.parentNode.parentNode


    dots.addEventListener("mousedown", (e) => {
        if (!box.querySelector("ul").querySelector("li")) {
            box.classList.remove("nested");
            box.classList.add("dragging");
        } else {
            box.classList.add("dragging");
        }

        let holding = box.querySelector("div").cloneNode(true);
        holding.classList.add("holding");
        list.parentNode.append(holding);
        holding.style.position = "absolute";
    })

    listElements.push(item)
})

window.addEventListener("mousemove", (e) => {
    let dragged = list.querySelector(".dragging");
    
    if (dragged) {
        let siblings = [...list.children];
        siblings.forEach((element, i) => {
            if (element.classList.contains("dragging")) {
                siblings.splice(i, 1);
            }
        });
        let nextSibling = siblings.find(sibling => {
            if (e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2) {
                return true;
            }
        });
        if (nextSibling) {
            if (e.clientX >= 50 && !dragged.classList.contains("nested")) {
                nextSibling.querySelector("ul").append(dragged);
                nextSibling.classList.add("nested");
            } else { //Can't nest because held item is itself nested
                list.insertBefore(dragged, nextSibling);
                if (!dragged.querySelector("ul").querySelector("li")) {
                    dragged.classList.remove("nested");
                }
            }
        } else {
            list.append(dragged);
        }
        //Cleanup
        siblings = [...list.querySelectorAll(".item:not(.dragging)")];
        siblings.forEach(element => {
            if (!element.querySelector("ul").querySelector("li")) {
                element.classList.remove("nested");
            }
        });
    }

    let holding = list.parentNode.querySelector(".holding");

    if (holding) {
        holding.style.left = e.clientX + "px";
        holding.style.top = e.clientY + "px";
    }
})

window.addEventListener("mouseup", (e) => {
    let dragged = list.querySelector(".dragging");
    if (dragged) {
        dragged.classList.remove("dragging");
    }
    let holding = list.parentNode.querySelector(".holding");
    if (holding) {
        e.preventDefault()
        holding.remove();
    }
})

list.append(...listElements);