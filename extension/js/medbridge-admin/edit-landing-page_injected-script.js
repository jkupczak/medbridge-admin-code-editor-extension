// Access window variable from Content Script
// http://stackoverflow.com/a/20513730/556079

console.warn("[medbridge-admin-extension] loaded /js/medbridge-admin/medbridge-admin_injected_landing-page-editor.js");


// Set the editor and submit button
var editorDiv = document.querySelector("#page-content.ace_editor");
var submit = document.querySelector("#save-page-content");

// Change save button text
submit.innerHTML = '<div class="icon"><svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg></div><div class="text">Save</div>';
submit.classList.add("icon-and-text", "has-reminder", "modified-btn", "jk-editor-btn");

// Create wrapper for editor.
var editorWrapper = document.createElement("div");
editorWrapper.className = "editor-wrapper";

var reminder1 = document.createElement("div");
reminder1.innerHTML = "⌘ + S";
reminder1.classList.add("reminder");

var reminder2 = document.createElement("div");
reminder2.innerHTML = "esc";
reminder2.classList.add("reminder");

// Create expand editor button
var expandEditor = document.createElement("div");
expandEditor.className = "expand-editor btn_login_form dark-button icon-and-text has-reminder modified-btn jk-editor-btn";
expandEditor.innerHTML = '<div class="icon"><svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"/><path d="M0 0h24v24H0z" fill="none"/></svg></div><div class="text">Fullscreen</div>';
expandEditor.addEventListener("click", expEditor, false);

// Preview page button
var pagePreviewLink = document.querySelectorAll(".layoutRight h1 + p > a:last-child")[0].href;

var pagePreview = document.createElement("a");
pagePreview.className = "preview-page btn_login_form dark-button icon-and-text modified-btn jk-editor-btn";
pagePreview.target = "_blank";
pagePreview.href = pagePreviewLink;
pagePreview.innerHTML = '<div class="icon"><svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg></div><div class="text">Preview</div>';

var footerWrapper = document.createElement("div");
footerWrapper.className = "editor-footer";
footerWrapper.appendChild(submit);
footerWrapper.appendChild(reminder1);
footerWrapper.appendChild(pagePreview);
footerWrapper.appendChild(expandEditor);
footerWrapper.appendChild(reminder2);

// Add it it all to the DOM and wrap it.
var arr = [];
arr.push(editorDiv);
arr.push(footerWrapper);

wrapAll(arr, editorWrapper);

function expEditor() {
  document.documentElement.classList.toggle("fullscreen-editor");
  editor.resize();
}



//
// Wrap wrapper around nodes
// Just pass a collection of nodes, and a wrapper element
// http://stackoverflow.com/a/41391872/556079
//
function wrapAll(nodes, wrapper) {

  // Cache the current parent and previous sibling of the first node.
  if ( nodes.constructor === Array ) {
    var parent = nodes[0].parentNode;
    var previousSibling = nodes[0].previousSibling;
  } else {
    var parent = nodes.parentNode;
    var previousSibling = nodes.previousSibling;
  }

  // Place each node in wrapper.
  //  - If nodes is an array, we must increment the index we grab from
  //    after each loop.
  //  - If nodes is a NodeList, each node is automatically removed from
  //    the NodeList when it is removed from its parent with appendChild.
  for (var i = 0; nodes.length - i; wrapper.firstChild === nodes[0] && i++) {
      wrapper.appendChild(nodes[i]);
  }

  // Place the wrapper just after the cached previousSibling
  parent.insertBefore(wrapper, previousSibling.nextSibling);

  return wrapper;
}



// Detect changes in editor
editor.on("change", function() {
  submit.classList.add("save-needed");
});



// Override CMS+S to save page content when in fullscreen.
document.addEventListener("keydown", function(e) {
  if ( document.querySelector("html").classList.contains("fullscreen-editor") ) {

    // Save Code
    if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.keyCode == 83) {
      e.preventDefault();
      document.querySelector("#save-page-content").click();
    }

    // Override 'esc' to close a maximized editing window
    if ( e.keyCode == 27 ) {
      expEditor();
    };

  }
}, false);





// function savePageContent() {
//   if ( document.querySelector("html").classList.contains("fullscreen-editor") ) {
//     document.querySelector("#save-page-content").click();
//   }
// }
