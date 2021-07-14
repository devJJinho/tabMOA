const loadBtn=document.querySelector("#loadBtn")
//   function processFile(file){
//     var reader=new FileReader();
//     reader.readAsText(file,"UTF-8");
//     reader.onload=(item)=>{
//     console.log(item.target.result);
//     }
//   }
  loadBtn.addEventListener("click",()=>{
    const input=document.querySelector("#inputFile");
    input.onchange=(event)=>{
        const file=event.target.files[0];
        var reader=new FileReader();
        reader.readAsText(file,"UTF-8");
        reader.onload=(item)=>{
        retResult(item.target.result);
        }
    }
    input.click();
  })

  function retResult(file){
    const urlArray=[];
    JSON.parse(file).forEach((item)=>{
        urlArray.push(item.url);
    });

    chrome.windows.create({"focused":true,url:urlArray})
    window.close();
  }


