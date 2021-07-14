const loadBtn=document.querySelector("#loadBtn")

  loadBtn.addEventListener("click",()=>{
    const input=document.querySelector("#inputFile");
    input.onchange=(event)=>{
        const file=event.target.files[0];
        var reader=new FileReader();
        reader.readAsText(file,"UTF-8");
        reader.onload=(item)=>{
        openPages(item.target.result);
        }
    }
    input.click();
  })
  function openPages(file){
    const urlArray=[];
    JSON.parse(file).forEach((item)=>{
        urlArray.push(item.url);
    });
    chrome.windows.create({"focused":true,url:urlArray})
    window.close();
  }


