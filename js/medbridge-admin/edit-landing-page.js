// Access window variable from Content Script
// http://stackoverflow.com/a/20513730/556079
injectScript( chrome.extension.getURL('/js/medbridge-admin/edit-landing-page_injected-script.js'), 'body');

var submit = document.querySelector("#save-page-content");

document.arrive(".editor-footer strong", function(e) {

  submit.classList.remove("save-needed");

});
