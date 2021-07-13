chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('popup.html', {
      bounds: {
        width: 500,
        height: 300
      }
    });
  });