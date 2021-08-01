const tabsUl=document.querySelector("#tabsUl");
const btnSave=document.querySelector("#save");
const btnLoad=document.querySelector("#load");
const nameInput=document.querySelector("#file-name input");
const MOUSE_ACTION="btnMouseover";
const PLACEHOLDER="파일 이름을 입력해주세요. 기본값: 날짜";

import {getCurrentTab} from "/js/tab.js";
import './cs/style.css';

const handleTab=function (){
  let tabs=[];
  return {
      setArray:function(array){
          tabs=array;
      },
      addElement:function(element){
          tabs.push(element);
      },
      getArray:function(){
          let rtArray=[];
          tabs.forEach((item)=>{
            rtArray.push({"url":item.url});
          })
          return rtArray;
      },
      delElement:function(id){
          tabs=tabs.filter((item)=>{
            return id!=item.id;
          })
      }
  }
}();

async function init(){
  const tabArray=await getCurrentTab();
  handleTab.setArray(tabArray);
  tabArray.forEach((item)=>paintTabs(item));
  btnSave.addEventListener('mouseover',()=>{
    btnSave.classList.add(MOUSE_ACTION);
  })
  btnSave.addEventListener('mouseout',()=>{
    btnSave.classList.remove(MOUSE_ACTION);
  })
  btnLoad.addEventListener('mouseover',()=>{
    btnLoad.classList.add(MOUSE_ACTION);
  })
  btnLoad.addEventListener('mouseout',()=>{
    btnLoad.classList.remove(MOUSE_ACTION);
  })
  nameInput.addEventListener('focus',()=>{
    nameInput.classList.add("active");
    nameInput.removeAttribute('placeholder');
  })
  nameInput.addEventListener('blur',()=>{
    nameInput.classList.remove("active");
    nameInput.placeholder=PLACEHOLDER;
  })
  btnLoad.addEventListener("click", async()=>{
    const input=document.createElement("input");
    input.type="file";
    input.accept="text/plain";
    console.log("event");
    input.onchange=(event)=>{
      const file=event.target.files[0];
      var reader=new FileReader();
      reader.readAsText(file,"UTF-8");
      console.log(reader);//
      reader.onload=(item)=>{
        console.log(item.target.result);//
        openPages(item.target.result);
      }              
    }
    input.click();
  });

  btnSave.addEventListener("click", async () => {
    try {
      const tabsObj=handleTab.getArray();
      const tabsString=JSON.stringify(tabsObj);
      var blob = new Blob([tabsString], { type: 'text/plain' });
      const objURL = window.URL.createObjectURL(blob);
  
      let uniqueName;
      if(nameInput.value!=""){
        uniqueName=nameInput.value;
        nameInput.value="";
      }
      else{
        uniqueName=makeFileName();
        console.log(uniqueName);
      }
      const tabLen=tabsObj.length;
      const downFileName=`[${tabLen}]${uniqueName}.txt`;
  
      chrome.downloads.download({
        url:objURL,
        filename:downFileName
      })
   } catch (error) {
     alert(error.name, error.message);
    }
  });

}

function paintTabs(row){
  const listItem=document.createElement("li");
  listItem.id="itemLi";
  const span=document.createElement("span");
  span.id="listSpan";
  const faviconSpan=document.createElement("span");
  const img=document.createElement("img");
  const btnSave=document.createElement("button");
  btnSave.id="deleteBtn";
  span.innerText=row.title.substr(0,50);
  img.onerror=(event)=>{
    event.target.src="img/default.png";
  };
  const url=new URL(row.url);
  img.src=`chrome://favicon/size/24/${url.origin}`;
  img.alt="";
  btnSave.innerText="❌";
  btnSave.addEventListener("click",deleteTab);
  listItem.id=row.id;
  faviconSpan.appendChild(img);
  listItem.appendChild(btnSave);
  listItem.appendChild(faviconSpan);
  listItem.appendChild(span);
  tabsUl.appendChild(listItem);
}

function makeFileName(){
  const date=new Date();
  const year=date.getFullYear();
  const month=date.getMonth();
  const day=date.getDate();
  return `${month}_${day}_${year}`;
}

function deleteTab(event){
  const deleteObject=event.target.parentNode;
  console.log(event.target.parentNode.id);
  handleTab.delElement(deleteObject.id);
  deleteObject.remove();
}

function openPages(file){
  console.log(file);//
  const urlArray=[];
  JSON.parse(file).forEach((item)=>{
      urlArray.push(item.url);
  });
  console.log(urlArray);//
  chrome.windows.create({"focused":true,url:urlArray})
  window.close();
}

init();
