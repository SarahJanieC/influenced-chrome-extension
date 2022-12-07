'use strict';


// Make Intro Available
var openIntro = function () {
  sub.classList.remove("hidden");
  warning.classList.add("hidden");
};
// Make Intro Unavailable
var closeIntro = function () {
  sub.classList.add("hidden");
  warning.classList.remove("hidden");
};

var openRequestTab = function () {
  // Show the specific tab content
  brandTab.classList.add("hidden");
  requestTab.classList.remove("hidden");
};
var openBrandDetailsTab = function () {
  // Show the specific tab content
  brandTab.classList.remove("hidden");
  requestTab.classList.add("hidden");
};

function check_url(url) {
    const websites = ["www.tiktok.com/", "www.instagram.com/", "www.facebook.com/"];
    let length = websites.length;
    let result = false;
    var profile = url.split("/")[3];
    while(length--){
      if(url.includes(websites[length])){
        result = true;
      }
    }
    if(profile.length === 0){
      result = false
    }
    return result;
}

// Saves options to chrome.storage
function save_options() {
    var brand = document.getElementById('brand').value;
    var company = document.getElementById('company').value;
    var ugcBudget = document.getElementById('ugcBudget').value;
    var adBudget = document.getElementById('adBudget').value;
    var igBudget = document.getElementById('igBudget').value;
  
    chrome.storage.sync.set({
      brand: brand,
      company: company,
      ugcBudget: ugcBudget,
      adBudget: adBudget,
      igBudget: igBudget,
  
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      // var status2 = document.getElementById('status2');
  
      status.textContent = 'Options saved.';
      // status2.textContent = 'Request Sent.';
  
      setTimeout(function() {
        status.textContent = '';
        // status2.textContent = '';
      }, 700);
    });
}
  
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
      brand: '-- Brand --',
      company: '-- Company --',
      ugcBudget: '$0',
      adBudget: '$0',
      igBudget: '$0',
  
    }, function(items) {
      document.getElementById('brand').value = items.brand;
      document.getElementById('company').value = items.company;
      document.getElementById('ugcBudget').value = items.ugcBudget;
      document.getElementById('adBudget').value = items.adBudget;
      document.getElementById('igBudget').value = items.igBudget;
  
    });
}
  
function getUser(url) {
    var profileName = url.split("/")[3];
    const text = `Woah! You're interested in ${profileName}.`;
    interestText.textContent = text;
}
  
const warning = document.getElementById('warning')
const sub = document.getElementById('sub')
const brandTab = document.getElementById('brand-details')
const requestTab = document.getElementById('request-details')
const btns = document.getElementsByClassName("tablink");
const interestText = document.getElementById("interest-text");
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);
document.getElementById('save2').addEventListener('click',send_request);
document.getElementById('brand-btn').addEventListener('click',openBrandDetailsTab);
document.getElementById('request-btn').addEventListener('click',openRequestTab);


window.onload = function() {
    chrome.tabs.query({active: true, lastFocusedWindow: true, currentWindow: true}, tabs => {
      let url = tabs[0].url;
      // use `url` here inside the callback because it's asynchronous!
      let pageCheck = check_url(url);
      if(pageCheck){
        openIntro();
        const userDetails = getUser(url);
      }
      else{
        closeIntro();
      }
    });
  };
  
  // Loop through the buttons and add the active class to the current/clicked button
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }
  