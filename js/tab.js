const h1Title=document.querySelector("h1");
async function getCurrentTab() {
    let queryOptions = {currentWindow: true};

    const getOpenTab=function(){
      return new Promise((resolve)=>{
        chrome.tabs.query(queryOptions,resolve);
      })
    }
    const fetchResult=await getOpenTab();
    let extract=[];
    let cnt=1;
    fetchResult.forEach((item)=>{
      extract.push({"id":cnt,"title":item.title,"url":item.url});
      cnt=cnt+1;
    })

    return extract;

    /*let tab = await chrome.tabs.query(queryOptions,(item)=>{
    //   return new Promise((resolve)=>{
    //     let array=[];
    //     item.forEach((item)=>{
    //       array.push({"title":item.title,"url":item.url})
    //     })
    //     resolve(array);
    //   });
    // })
    */
  }

  export {getCurrentTab};


