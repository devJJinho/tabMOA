const h1Title=document.querySelector("h1");
async function getCurrentTab() {
    let queryOptions = { active: false, currentWindow: true};

    const getOpenTab=function(){
      return new Promise((resolve)=>{
        chrome.tabs.query(queryOptions,resolve);
      })
    }
    const fetchResult=await getOpenTab();
    let extract=[];
    fetchResult.forEach((item)=>{
      extract.push({"title":item.title,"url":item.url});
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


