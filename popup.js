const h1Title=document.querySelector("h1");
const tabsDiv=document.querySelector("#tabsDiv");
const tabsUl=document.querySelector("#tabsUl");
const btn=document.querySelector("#save");
const btnSave=document.querySelector("#load");
const nameInput=document.querySelector("#file-name input");
//const defaultImg=require("/img/default.png");
import {getCurrentTab} from "/js/tab.js"

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
}

async function getFavicon(item){
  item.url;
}
//ajax로 파비콘 받아와서 적용하기 비동기 구현 필요
function paintTabs(row){
  const listItem=document.createElement("li");
  const span1=document.createElement("span");
  const span2=document.createElement("span");
  const img=document.createElement("img");
  const btn=document.createElement("button");
  span1.innerText=row.title;
  img.onerror=(evnet)=>{
    event.target.src="img/default.png";
  };
  img.src=`https://www.google.com/s2/favicons?sz=24&domain=${row.url}`;
  img.alt="";
  btn.innerText="❌";
  btn.addEventListener("click",deleteTab);
  listItem.id=row.id;
  span2.appendChild(img);
  listItem.appendChild(btn);
  listItem.appendChild(span2);
  listItem.appendChild(span1);
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

btnSave.addEventListener("click", async()=>{
  var popupWidth = 200;
  var popupHeight = 300;
  var popupX = (window.screen.width / 2) - (popupWidth / 2);
  var popupY= (window.screen.height / 2) - (popupHeight / 2);
  const popupWindow=window.open('filePicker.html', 'Please Choose a file', 'status=no, height=' + popupHeight  + ', width=' + popupWidth  + ', left='+ popupX + ', top='+ popupY);
  popupWindow.focus();
  window.close();
})

btn.addEventListener("click", async () => {
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

init();
