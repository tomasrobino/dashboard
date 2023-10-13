const list = document.querySelector("#elements");

const data = [
    {img: "https://picsum.photos/40", title: "Compras", subtitle: "dasd"},
    {img: "https://picsum.photos/40", title: "Belleza", subtitle: ""},
    {img: "https://picsum.photos/40", title: "Educacion", subtitle: ""},
    {img: "https://picsum.photos/40", title: "Efectivo", subtitle: ""},
    {img: "https://picsum.photos/40", title: "Empresa", subtitle: ""}
]

var currentHover;

const listElements = [];
data.map((value) => {
    let img = document.createElement("img");
    img.className = "img";
    img.src = value.img;
    img.alt = "";


    let title = document.createElement("span");
    title.append(document.createTextNode(value.title));

    let subtitle = document.createElement("span");
    subtitle.append(document.createTextNode(value.subtitle));

    let tns = document.createElement("div");
    tns.className = "tns";
    tns.append(title);
    tns.append(subtitle);

    let div = document.createElement("div");
    div.className = "details";
    div.append(img);
    div.append(tns);

    let i = document.createElement("i");
    i.classList.add("uil", "uil-draggabledots");
    
    let item = document.createElement("li");
    item.className = "item";
    item.draggable = true;
    item.append(div, i);

    item.addEventListener("dragstart", (e) => {
        setTimeout( () => {
            if (item.querySelector("ul")!==null) {
                item.querySelector("ul").firstChild.classList.add("dragging");
            } else {
                item.classList.add("dragging");
            }
        }, 0);
    });
    item.addEventListener("dragend", dragEnd);
    item.addEventListener("dragenter", (e) => {
        if (e.currentTarget.parentNode.parentNode.tagName==="LI") {
            currentHover = e.currentTarget.parentNode.parentNode;
        } else {
            currentHover = e.currentTarget;
        }
        
    })

    listElements.push(item)
})

list.append(...listElements);

function dragEnd(e) {
    let draggingItem = e.target;
    draggingItem.classList.remove("dragging");
    
    if (draggingItem!==currentHover &&  e.clientY <= list.offsetTop+list.offsetHeight && e.clientY >= list.offsetTop && e.clientX > list.offsetLeft+50 && !draggingItem.classList.contains("nested")) {
        if (currentHover.classList.contains("nested")) {
            currentHover.querySelector("ul").append(draggingItem);
        } else {
            let childList = document.createElement("ul");
            childList.append(draggingItem);
            currentHover.append(childList);
            currentHover.classList.add("nested")
        }
    } else if (e.clientY > list.offsetTop+list.offsetHeight) {
        list.insertBefore(draggingItem, currentHover.nextSibling);
    } else {
        list.insertBefore(draggingItem, currentHover);
        if (draggingItem.querySelector("ul") !== null && draggingItem.querySelector("ul").querySelector("li") === null) {
            draggingItem.remove(draggingItem.querySelector("ul"));
            draggingItem.classList.remove("nested");
        }
    }
}