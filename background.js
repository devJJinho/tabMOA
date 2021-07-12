async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    alert(tab);
    return tab;
  }

  getCurrentTab();