setInterval(openPicker,10000)
openPicker();
function openPicker(){
    try{
    const directoryHandle = await window.showDirectoryPicker();
    alert(directoryHandle);
    }
    catch{
        alert(error.name,error.message);
    }
}

self.addEventListener('fetch', (event) => {
    try{
        const directoryHandle = await window.showDirectoryPicker();
        alert(directoryHandle);
        }
        catch{
            alert(error.name,error.message);
        }
  });