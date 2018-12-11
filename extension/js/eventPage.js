// https://developer.chrome.com/extensions/webRequest
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      console.log(details);
      // return {cancel: true};

      var newUrl = details.url;
      if ( /\?dl=1/i.test(newUrl) ) {
        newUrl = newUrl.replace(/\?dl=1/,"?dl=0");
      } else {
        newUrl = "https://www.dropbox.com/s/" + newUrl.replace(/^.+?\/s\//i,"");
      }


      return { redirectUrl: newUrl /*Redirection URL*/ };
      // return {cancel: details.url.indexOf("://www.evil.com/") != -1};
    },
    {
      urls: ["*://*.dropbox.com/s/*/*?dl=1", "*://*.dropboxusercontent.com/s/*"]
      // urls: ["*://*.medbridgeeducation.com/*"]
    },
    ["blocking"]
);
