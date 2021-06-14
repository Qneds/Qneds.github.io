"use strict";
var last_deleted = null;
var selected_list = null;

function addItem(){

    let list_el = document.getElementById("input_1").value;
    if (selected_list === null) {
        alert("Żadna lista nie została wybrana");
        return;
    }
    if (!/\S/.test(list_el)) {
        return; 
    }
    let act_list = selected_list.getElementsByClassName("list_div")[0].getElementsByClassName("list-group")[0];
    if(list_el !== "") {
        let id_pref  = Date.now();
        document.getElementById("input_1").value = "";

        let textNode = document.createTextNode(list_el);
        let node = document.createElement("div");
        node.setAttribute("id", id_pref + "_text_div");
        node.setAttribute("class", "list_el_text_div");
        node.appendChild(textNode);
        node.addEventListener("click", itemClicked, false);

        let dateNode = document.createElement("div");

        dateNode.setAttribute("class", "list_el_date_div");

        let list_el_box = document.createElement("li");
        list_el_box.setAttribute("class", "list-group-item");
        list_el_box.style.width = "100%";
        list_el_box.setAttribute("id", id_pref + "_box");
        list_el_box.appendChild(node);
        list_el_box.appendChild(dateNode);

        act_list.appendChild(list_el_box);
        searchUpdate();


        // jQuery
        $("#" + id_pref + "_box").append("<button id=\"" + id_pref + "_delete_btn\" class=\"btn btn-danger\">X</button>");
        $("#" + id_pref + "_delete_btn").css({float: "right", height: "100%"});
        $("#" + id_pref + "_delete_btn").click(function() {
            
            let id = $(this).parent().attr("id");
            console.log(id);
            $("#myModal").val(id)
            $("#myModal").css({display: "block"});
            //$('#myModal').css({display : 'block'}).attr("aria-hidden","false");
        })
    }
}

$(function() {
    $("#modal_btn_yes").click(function() {
    
        if(last_deleted !== null) {
            last_deleted.remove();
        }
        let id = $("#myModal").val();
        last_deleted = $("#" + id);
        last_deleted.hide();
        $("#myModal").css({display: "none"});
    });

    $("#modal_btn_no").click(function() {
        $("#myModal").css({display: "none"});
    });
})



function itemClicked(event){

    let target  =  event.target;
    let dateDiv = target.parentElement.getElementsByClassName("list_el_date_div")[0];
    if (target.style.textDecoration === "line-through") {
        target.style.textDecoration = "none";
        target.style.color = "black";
        dateDiv.textContent = "";

    } else {
        target.style.textDecoration = "line-through";
        target.style.color = "grey";


        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0"); 
        let yyyy = today.getFullYear();

        let hh = today.getHours();
        hh = ("0" + hh).slice(-2);
        let min = today.getMinutes();
        min = ("0" + min).slice(-2);
        let sec = today.getSeconds();
        sec= ("0" + sec).slice(-2);

        today = "(" + mm + "/" + dd + "/" + yyyy + " " + hh + ":" + min + ":" + sec + ")";

        let textNode = document.createTextNode(today);
        dateDiv.appendChild(textNode);


    }
}

function undo() {
    if(last_deleted !== null) {
        last_deleted.show();
        last_deleted = null;
    }
}

function headerClicked(event) {
    let head = event.target;
    let target = head.parentElement.getElementsByClassName("list_div")[0];
    
    if (target === undefined)
        return;
    if (target.style.display !== "block") {
        target.style.display = "block";
        head.style.backgroundColor = "#e9ecef";

    } else {
        target.style.display = "none";
        head.style.backgroundColor = "darkgrey";
    }
}

function headerTextClicked(event) {
    event.target.parentElement.click();
}

function selectList(event) {
    if(selected_list !== null) {
        selected_list.getElementsByClassName("header_of_list_h")[0].style.color = "black";
    }
    selected_list = event.target.parentElement.parentElement;
    selected_list.getElementsByClassName("header_of_list_div")[0].getElementsByClassName("header_of_list_h")[0].style.color = "crimson";
}

function addList() {
    let hed = document.getElementById("input_1").value;

    if(hed !== "") {
        constructList(hed);
    }
}

function constructList(listName) {
    let id_pref  = Date.now();
    document.getElementById("input_1").value = "";

    let divForList = document.createElement("div");
    divForList.setAttribute("id", id_pref + "_list")

    let divForHead = document.createElement("div");
    divForHead.setAttribute("class", "input-group-text header_of_list_div");
    divForHead.style.justifyContent = "space-between";
    divForHead.addEventListener("click", headerClicked, false);

    let header = document.createElement("h2");
    header.setAttribute("class", "header_of_list_h");
    header.addEventListener("click", headerTextClicked, false);
        
    let textNode = document.createTextNode(listName);
    header.appendChild(textNode);

    divForHead.appendChild(header);

    let radio = document.createElement("input");
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "list_choice");
    radio.addEventListener("click", selectList, false);
    divForHead.appendChild(radio);

    let divForContent = document.createElement("div");
    divForContent.setAttribute("class", "list_div");
    divForContent.style.display = "block";

    let content = document.createElement("ul");
    content.setAttribute("id", id_pref + "_ul");
    content.setAttribute("class", "list-group");
    content.style.display = "flex";

    divForContent.appendChild(content);

    divForList.appendChild(divForHead);
    divForList.appendChild(divForContent);

    document.getElementById("input_lists").appendChild(divForList);
}


function searchUpdate() {
    let text = document.getElementById("search").value;
    if(document.getElementById("caseSensitve").checked === false){
        text = text.toLowerCase();
    }

    
    let collection = document.getElementsByClassName("list_el_text_div");
    for(let element of collection) {
        let checking = element.innerText;

        if(document.getElementById("caseSensitve").checked === false){
            checking = checking.toLowerCase();
        }
        if(text === "" || checking.includes(text)){
            element.parentNode.style.display = "block";
        } else {
            element.parentNode.style.display = "none";
        }
    }
}

window.onload = function() {
    constructList("Lista");
}