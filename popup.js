const h1Title=document.querySelector("h1");
const tabsDiv=document.querySelector("#tabsDiv");
const tabsUl=document.querySelector("#tabsUl");

import {getCurrentTab} from "/js/tab.js"

async function init(){
  const tabArray=await getCurrentTab();
  tabArray.forEach((item)=>paintTabs(item));
}

function paintTabs(row){
  const listItem=document.createElement("li");
  const span=document.createElement("span");
  const btn=document.createElement("button");
  span.innerText=row.title;
  btn.innerText="❌";
  btn.addEventListener("click",deleteTab);
  listItem.id=row.id;
  listItem.appendChild(btn);
  listItem.appendChild(span);
  tabsUl.appendChild(listItem);
}

function deleteTab(event){
  alert(event.target.parenNode.id);
}

init();