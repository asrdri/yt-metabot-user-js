// ==UserScript==
// @name         MetaBot for YouTube
// @namespace    yt-metabot-user-js
// @description  More information about users and videos on YouTube.
// @version      180226
// @homepageURL  https://vk.com/public159378864
// @supportURL   https://github.com/asrdri/yt-metabot-user-js/issues
// @updateURL    https://github.com/asrdri/yt-metabot-user-js/raw/master/yt-metabot.meta.js
// @downloadURL  https://github.com/asrdri/yt-metabot-user-js/raw/master/yt-metabot.user.js
// @icon         https://github.com/asrdri/yt-metabot-user-js/raw/master/logo.png
// @include      https://*youtube.com/*
// @include      https://*dislikemeter.com/?v*
// @exclude      https://*youtube.com/*/about
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require      https://github.com/dwachss/bililiteRange/raw/master/bililiteRange.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

const checkb = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAPCAMAAADXs89aAAAA+VBMVEUAAAD///+qqqp/f39mZmZubm5vb29sbGxtbW1tbW1tbW1ubm5ubm5tbW1ubm5tbW1ubm5ubm5ubm5tbW1tbW1ubm5ubm5tbW1ubm5ubm5tbW1ubm5ubm5vb29wcHBxcXFzc3N0dHR1dXV3d3d4eHh6enp7e3t8fHyAgICCgoKFhYWMjIyOjo6Pj4+QkJCSkpKUlJSWlpaZmZmampqdnZ2hoaGqqqqwsLC0tLS1tbW2tra5ubm+vr7ExMTKysrLy8vQ0NDR0dHS0tLU1NTV1dXW1tbe3t7i4uLj4+Pk5OTl5eXn5+fo6Ojq6urs7Ozu7u7w8PD9/f3////SCMufAAAAHHRSTlMAAAMEBSUnKCpbXV9htre6u87Q0dPp6uvs7u/8pkhKVQAAAMdJREFUeNpN0NdWwlAUANEbgvTeQhnQIE1B1ChYQcEC0gL+/8ewzPWwmMf9OMowDKWUP5YqU0pGTaXTHMqdOcM7G7LBIw4Vnc3b89i9BytwYH+uv7oAOqsbyJjCMb4d/urOgYhwqr55wmvdhIRwufXT0zzrgCVM1X2tA5xva1ARLvE4aQCMXoCCcJLaZNpvX71/3QJx4ShUBx+Lz4fp7hrCwmYWL3v5u7XTPmEVtLRfuk7+5OhJIKP9NO2psDIjCatSiId9/7oHY28awgWqV+8AAAAASUVORK5CYII=';
const mred = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAqFBMVEUAAAD/AAD/MwD+AAD4AAD+AAD+DAD+AAD+AgD+BwD9AAD+AAD+AQD+AgD+AAD9AAD+AQD+AgD+AAD+AAD+AgD+AgD+AgD9AQD/AAD/AgD/DAz/DQ3/EBD/ISH/IiL/IyP/Jib/OTn/PT3/QUH/Q0P/S0v/Tk7/T0//U1P/VFT/Wlr/Z2f/i4v/j4//srL/trb/yMj/zMz/19f/3t7/4uL/9fX/+Pj////schBBAAAAGHRSTlMABAUmJycqXF5ht7e5u8/Q0NTq6+3u7/0SYvJQAAAAgklEQVQIHQXBC1KDMBQAwM0jJWCt9z+mjoNAmo+7CVHyvrSz3ZPE+iyPF8d9HW/Z+pV9vBj3Fj894pmpqKyfKUpBx8C+RoaGBjl2GMNssMUChgFyNNB10OIEwwBnbuDoN+hxXxAl4K/GPCrKo6AeczHe6eFK39P52yWkNW+5nb1O/gHoZT3jykIiwQAAAABJRU5ErkJggg==';
const mgreen = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAyVBMVEUAAABVqlU/vz8zmTMpniktoy0snywqnSosnywrnysqoSosoCwrnyssoCwroCsrnyssnywsoCwrnysroCsrnysroCssnywsnywrnysroCssnywsoCwuoS44pTg5pjk6pjo8pzw9qD1LrktOr05UslRYtFhctVxgt2Bnu2dqvGptvW1vvm9ywHJ1wXV4wniRzZGs2qzE5MTJ5snS69LU69TW7NbY7djb79vn9Ofq9urw+PDz+fP1+vX5/Pn6/fr7/fv8/fz8/vz///9DdKfSAAAAG3RSTlMAAwQFJScoKltdX2G2t7q7ztDR0+nq6+zu7/wFCQO8AAAAm0lEQVR42jXK1xKCQBBE0WEVRZCsGNqAOeecdf7/o1yg9jx0za0aknKW20DdMQWliiEyQSHNGpRIl8+hqvam5QuyVHYOvEWJXGS6R/6tYVMD8W4AxCf+roCIgD3f+r0zf5YAmlTH8M7XC78XkKrkAKMH83uORJlMuePna4aUQSIAMJlm6WlEhQhKJU+S7iPjyUyIkh01q2VDk/cfpzAWsSatwJQAAAAASUVORK5CYII=';
const morange = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAA8FBMVEUAAAD/qgD/fwD/ZgD+fAD+fAD+fAD+fwD+fwD+fwD/fAD/fwD+fgD+fgD+fgD+fgD+fQD+fgD+fgD+fQD+fQD+fQD+fQD+fgD+fQD+fgD+fQD+fgD+fQD+fgD/fgD/fwH/fwL/gAT/gAX/ggf/gwr/hAz/hQ7/jBz/jh//jiH/lCv/lzL/mTX/mTb/mjf/oEP/oUX/o0j/pk7/pk//qVX/qVb/q1j/r2D/tGv/vHr/vn7/xIv/yJL/zZ3/1Kr/17D/2bP/2bX/27f/4ML/48j/5s7/6dT/6tb/7Nn/8+j/9+//9/D/+fT//vz//v3///+PfT9BAAAAHnRSTlMAAwQFJScpWlxeYGC1trm6u87Q0dPp6urr7O7u/P7y0GwDAAAAp0lEQVR42h2JVQLCUAwEQ6FAcSkOi7u7u2vufxteMz+T2ZDC7glmcumAoZHgNJFv9dslRHXJFDp3Zn7OkFSD3UT9xe/Dg38DRDTyAiv+NFG88h5wUwhojMdA4cInwE8ZCJUd8wRIEITymXmpnKW09IK/c8txCkhv+Sj2kSHuTntiF2lRy8PbyFLYRqQnAax5AyDmIIUeAaqzmvqqtNDc/kQ27nPZ1P0HrvQbttZfcNAAAAAASUVORK5CYII=';
const imgdm = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAQiSURBVEhLrZZ/TJR1HMe/GpRZ/+RWMtvKttZkudKadqnMbBTBbG2mC1GkX8YdDbrMwIkCMbPcoIRMOjR1sFR0pQjz8FC4O9HMSQlzyUaaTA84b3hw9zx3wOG9+3y/99wTBw8Crc/22n3v+32e9/s+n+/n+T7H7hVoZDFBO8sM2tgJ4sZdKxsINLLgwBnmkS3sfJ+ZfSWdZPOVyycXwV/ZTBI1kUE/7AxjQYaQLAzeOmaV69kC5fbxg4SXk8FtLdGx6D/DQFkFvGZWgCPsPkVKO0j8A2JQS2g8BhsYPHWCA1TmKEUyMpQM/pNBGNqrkJGZFSmy/4ayB5Mq0Vj46oXRkHSKJSryoSADU/gi+54ZaD86Xb2JMsTBHbOo7lPVOc7Rohh4LFHqdz7mc9SBIhtqhjZcYtHCQGlTtYs+z5iDfOMz6s23qqdhjm4pumoeUOc4rybqcKLkMfU7H8cnvSTGSjbwnGIrhQkZZIYv5NjKZ2BeXBwqtj+Opr2PYHXyfKxb87y6HqYkdzZeSdChbtejMBNLaVy6ZbZY462t7E1NyIQetJECx76diYTlC7Fw2WJs0Mfijjk6Yp0TaJyCbzY/hSWvvSzgYz7H10gzbNIrOo0mbowU+D+gjRdGvXXsaV4uv9ZFY+FvuB99lofgqZ+OIVtkMwyHjh1h0neS6XgmE342Lv4Ui2R9MVak7yXKYTDmYGtu+ijytuhR9vWbcNVGczMysbMuLcHh8BoPUWtuL0iFfvMvyMqvERyqbkaXs2cUNx3dOHT8HEw7kjDQyOZykwYtYU7AGgVfcyKka99BcjahoLgKhtxjqonF1gZZlkchSRIcjk5k5JQiJSP3SW6SN1L8Lv1y36UESK4/IPfehHT9B/ha38MXhZsmZMJxu904XH0O8WtKPmRBK4ulcgRVAyqL/GcOZI+LPrMxaHtYlIuvbct7d8ImXq8XLVfa8ca6UnP4WTFzES4mt6RC7uuC77fFqniYyZhwHJ2deGv97sshEzt7jgQHBq0PQnZfg3w5WZxZww04X+anRZjUnr6iKR7G6XTio02VkjDhQaLZQ9Yp8F9YQHui3f+1pkV4W78HKVmVWJ1VgZWGcnTcuq1pwMvV/lcH3vm4vE2xoIMSbCpls1tLPAzPru3nJ3C+Yi4uVD6L42Vx+LHqrBDt7u7GJwWH8f5nJnfqp/sda437HCvSyy7SxusUi1DwVycJFRIBLZOR9DdEw5BdDHevBy6XC9tKq7HeaHxBkbt3UMcto6xatISHwxujqDAZrVc70NPTg+8P1CM+decSRWb84KcnZcRfyVWE+tbkwvwo959m/fRiOrtxo+H35tbrolyZWw/6k9J2xSgSkwtRxiY2i/4svMjPIn5U/L2fTeNrr68tWbTKUH41bcO+O/EpO/Xihohg7B/pB5kCVYYVDwAAAABJRU5ErkJggg==';
const imgdma = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAABsFBMVEUAAAD//wD/qgD/vwD/zAD+xwD/vwD+xADwuAD+wAD+wgD0tgD1uwD+wAD0uQBZtl3+wgCtvC3yuQCstyv+wQD+wgD+wgD+wgDztwD+wgDxtwDytwD+wQD+wQDyuAD+wQD+wQDytwD+wQD+wgDzuAD1ugD+wQDzuABft1n+wQD+wgBatlz+wQDytwD5vQD+wgD+wgD9wAD+wQD+wQDxtwD+wgDyuAD7vwD+wQAoOD8wPT02QTs8RTk/RzhARzhCSThESjdHTDZZWDFat11eWy9nvWpyaCl1aih4wXR5tkl5ulh6t0l7uEl7xX1/cCaBu1CGt0CKukCOeiGReyCSfCCV0ZeWujqbx2qc1J6ihhumiRqrjBivjxeykRa3lBW4lBXBmhLCmxLEnBHbqwrksQjnswfutwXxwAbyuADyugT0uQD0ugD03ZP03pj06cT068/10Fj10V311nb11nf179318OP18ef18uv2uwD2yTv2zEf2zUn20mH3yDX4vQD4vQL5vQD6vgD6wAn6wQz7vwD7vwH7wAT8wAD8wAH9wAD9wQD9wQL+wQD+wgD/wgD////cSs4bAAAAOXRSTlMAAgMEBRcYGiQpLjE1QUlKTFRUWGNtdn6AgoeMlpmgqbKzt77AxtHY3uDn6Orw8vf4+fn6+/v8/v4dJMtLAAABQUlEQVR42nXP9VMCQRjG8VewEwO7ExQVu7DFBAMVUMSOs7tbwTye+5fdHXC4c/Dzyzu739nZXQqI1Bbq61pqyrLjSCEizwg/z25pvCxoDAh6aMxU/Ya0Bsg9C/nqwAkWFJ6EHP8dBvx11ZzISx6wsgb45h8BuLaBbdenUBHOnmsEhsaB9bYNAN1uwN2DKyGFSAtguX1utW8AzHTX0mLnDDxCEVEhmIXejsFNMF6byWTzQhSq1aRHKDtCNNUGl1t2C+NwTFgsI5OpJPuMvZ+TJCsfOqpEgPg+FiwMlQDc2+3ewbCyZID5ujk8378bVZaYVuDz9PLkVYRFWagY4vHFtQjAIck4iWLrX86OfAhRKP3j/hvchJWTpFk+zKyE5cLvzz2MKqspZOESyv8rpNYUGDAlL1VEv1RRyTq+5XSaeUj6AXAh19PAE4muAAAAAElFTkSuQmCC';
const imgdmd = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAZCAMAAACM5megAAAAllBMVEUAAAB/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f3+AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAx6H3iAAAAMXRSTlMABAgMFBgcICQoLDA8QERITFBUWGBkaGx4fICDj5OXo6evs7e7v8PH09ff4+fr8/f7vr5GKgAAAN5JREFUeAGFy/FagjAARfEbIoSCWqLJXJoZltEm9/1fru2DPidM+v19DhyjRXEorbftFH654tV7hBtJZsw+yFoKa0dDPcMl2Dqh8U1rA9dLTYvnAFagaNUpXIsLPaoQQBShEdX0kQByHQOWpFcFILGldaZfCkCXQBDHU96xf4DkHhPFAUqRGQoOu6yBFQcc86cxgNGJ983QSmVFPx3gakmvHVwHeugxXI+afVvcymr2ZOhYsyf8v1HokjR+NK3qk0aJriONBI05jVd0fdkfrZzGEl1zIYoJWuFGiBX+/AIRxGBfReXU6wAAAABJRU5ErkJggg==';
const botTargetDay = Date.parse('1 June 2017');
const regexdate = /joinedDateText(.*?)"},{"text":"(.*?)"}]},/;
const regexdatemob = /joined_date_text(.*?)"}, {"text": "(.*?)"}]/;
const regexid = /"video_id":"(.*?)"/;
const regexlinew = /"logged_in","value":"(.*?)"/;
const regexliold = /"logged_in":"(.*?)"/;
const regexlang = /"host_language":"(.*?)"/;
const regexlangmob = /\\"host_language\\": \\"(.*?)\\"/;
const mainDBurl = 'https://raw.githubusercontent.com/YTObserver/YT-ACC-DB/master/mainDB';
if(window.location.hostname == "dislikemeter.com" || window.location.hostname == "www.dislikemeter.com") {
  var videoid = getURLParameter('v', location.search);
  if(videoid) {
    waitForKeyElements('input#form_vid', function dmIDins(jNode) {
      var pNode = jNode.get(0);
      pNode.value = videoid;
    });
    return;
  }
} else if(window.location.pathname == '/channel/UCwBID52XA-aajCKYuwsQxWA/about') {
  var msgu = getURLParameter('msgu', location.search);
  var msgc = getURLParameter('msgc', location.search);
  var msgn = getURLParameter('msgn', location.search);
  if(msgu !== null & msgc !== null & msgn !== null) {
    if(document.querySelector("meta[http-equiv='origin-trial']")) {
      $.fn.sendkeys = function(x) {
        x = x.replace(/([^{])\n/g, '$1{enter}');
        return this.each(function() {
          bililiteRange(this).bounds('selection').sendkeys(x).select();
          this.focus();
        });
      };
      waitForKeyElements('div#labelAndInputContainer', function insertMsgNew(jNode) {
        $(jNode).find('input#input').sendkeys('MetaBot_report_v2: https://www.youtube.com/watch?v=' + msgu + '&lc=' + msgc + ' - ' + msgn);
      });
      waitForKeyElements('ytd-button-renderer.style-scope.ytd-channel-about-metadata-renderer.style-default', function sendMsgNew(jNode) {
        if($(jNode).find('g.style-scope.yt-icon').children().length == 2) {
          jNode.click();
        }
      });
    } else {
      waitForKeyElements('iframe#js-prefetch', function dmIDins(jNode) {
        document.querySelector('button.channel-msg-button').click();
        document.querySelector('textarea.compose-message').value = 'MetaBot_report_v1: https://www.youtube.com/watch?v=' + msgu + '&lc=' + msgc + ' - ' + msgn;
      });
      waitForKeyElements('button.channel-msg-button', function(jNode) {
        $(jNode).css({
          "border-color": "#77fa77",
          "background": "linear-gradient(to right bottom, rgba(0,0,0,0), rgba(100,250,100,0.4))",
          "border-width": "5px",
          "border-style": "solid"
        });
        $(jNode).find('span.yt-uix-button-content').html('Подождите загрузки формы');
        $(jNode).attr('data-tooltip-text', 'Подождите загрузки формы (~5 секунд)');
      });
    }
  }
} else {
  var arrayDB = [];
  var requestDB = new XMLHttpRequest();
  requestDB.onreadystatechange = function() {
    if(requestDB.readyState === 4) {
      if(requestDB.status === 404) {
        console.log("[MetaBot for Youtube] XMLHttpRequest succeed: mainDB not found.");
      }
      if(requestDB.status === 200) {
        var responseDB = requestDB.responseText;
        if(responseDB !== "") {
          console.log("[MetaBot for Youtube] XMLHttpRequest succeed: mainDB loaded.");
          arrayDB = responseDB.match(/[^\r\n=]+/g);
        } else {
          console.log("[MetaBot for Youtube] XMLHttpRequest failed.");
        }
      }
    }
  };
  requestDB.open("GET", mainDBurl, true);
  requestDB.send(null);
  if(document.querySelector("meta[http-equiv='origin-trial']")) {
    console.log('[MetaBot for Youtube] YouTube New design detected.');
    spinnercheckNew();
    waitForKeyElements('div#main.style-scope.ytd-comment-renderer', parseitemNew);
    waitForKeyElements('div#flex', insertdmNew);
  } else if(document.querySelector("meta[http-equiv='Content-Type']")) {
    console.log('[MetaBot for Youtube] YouTube Mobile mode detected.');
    waitForKeyElements('div.vpb', parseitemMob);
  } else {
    console.log('[MetaBot for Youtube] YouTube Classic design detected.');
    waitForKeyElements('.comment-renderer-header', parseitem);
    waitForKeyElements('div#watch7-views-info', insertdm);
  }
}

function spinnercheckNew() {
  waitForKeyElements('paper-spinner-lite.ytd-item-section-renderer[aria-hidden="true"]', function(jNode) {
    if (getURLParameter('v', location.search) === null) {
      return;
    }
    console.log('[MetaBot for Youtube] Comment sorting spinner found.');
    var mutationObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if($(jNode).find("#spinnerContainer").hasClass("cooldown")) {
          setTimeout(recheckallNew, 2000);
        } else {
          $('div#main.style-scope.ytd-comment-renderer').each(function() {
            var cNode = $(this).find("#published-time-text")[0];
            deleteitemNew(this, $(cNode).find("a")[0].href);
          });
        }
      });
    });
    mutationObserver.observe($(jNode).get(0), {
      attributes: true,
      attributeFilter: ['active'],
      characterData: false,
      childList: false,
      subtree: true,
      attributeOldValue: false,
      characterDataOldValue: false
    });
  }, false);
  waitForKeyElements('paper-spinner#spinner.yt-next-continuation[aria-hidden="true"]', function(jNode) {
    if (getURLParameter('v', location.search) === null) {
      return;
    }
    console.log('[MetaBot for Youtube] Comment loading spinner found.');
    var mutationObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if($(jNode).find("#spinnerContainer").hasClass("cooldown")) {
          setTimeout(recheckallNew, 2000);
        } else {
          setTimeout(recheckallNew, 2000);
        }
      });
    });
    mutationObserver.observe($(jNode).get(0), {
      attributes: true,
      attributeFilter: ['active'],
      characterData: false,
      childList: false,
      subtree: true,
      attributeOldValue: false,
      characterDataOldValue: false
    });
  }, false);
  waitForKeyElements('paper-spinner#spinner.yt-next-continuation[active]', function(jNode) {
    if (getURLParameter('v', location.search) === null) {
      return;
    }
    console.log('[MetaBot for Youtube] Comment replies loading spinner found.');
    var mutationObserver = new MutationObserver(function(mutations) {
      if (mutations[0].removedNodes) {
        mutationObserver.disconnect();
        setTimeout(recheckallNew, 2000);
      }
    });
    mutationObserver.observe($(jNode).get(0).parentNode, {
      attributes: true,
      characterData: false,
      childList: false,
      subtree: false,
      attributeOldValue: false,
      characterDataOldValue: false
    });
  }, false);
}

function recheckallNew(){
  $('div#main.style-scope.ytd-comment-renderer').each(function() {
    recheckNew(this);
  });
}

function insertdm(jNode) {
  var videoid = getURLParameter('v', location.search);
  var pNode = $(jNode).get(0);
  var newspan = document.createElement('span');
  newspan.innerHTML = '<a id="dmAdd" title="Добавить видео на анализатор Дизлайкметр" href="https://dislikemeter.com/?v=' + videoid + '"><img src="' + imgdma + '" /></a><span style="padding:0em 1em 0em 0em"></span><a style="padding:0px 0px 0px 1px" id="dmGo" title="Открыть статистику видео на анализаторе Дизлайкметр" href="https://dislikemeter.com/video/' + videoid + '" ><img src="' + imgdm + '" /></a>';
  newspan.id = 'dmPanel';
  $(pNode).css('text-align', 'right');
  pNode.insertBefore(newspan, pNode.firstChild);
  $(pNode).find("#dmPanel")[0].addEventListener("click", function dmClick() {
    this.removeEventListener("click", dmClick);
    var newspan = document.createElement('span');
    newspan.innerHTML = '<a target="_blank" title="Помочь проекту Дизлайкметр" href="https://dislikemeter.com/?donate"><img src="' + imgdmd + '" /></a><span style="padding:0em 1em 0em 0em"></span>';
    $(pNode).find("#dmPanel")[0].insertBefore(newspan, $(pNode).find("#dmPanel")[0].firstChild);
  }, false);
  $(pNode).find("#dmPanel")[0].addEventListener("mouseover", function dmOver() {
    this.removeEventListener("mouseover", dmOver);
    $(this).find("#dmAdd")[0].target = "_blank";
    $(this).find("#dmGo")[0].target = "_blank";
  }, false);
}

function insertdmNew(jNode) {
  this.addEventListener('yt-navigate-finish', function insertdmNewR() {
    this.removeEventListener('yt-navigate-finish', insertdmNewR);
    insertdmNew(jNode);
  });
  var videoid = getURLParameter('v', location.search);
  if(typeof videoid === 'undefined') {
    return;
  }
  if(!videoid) {
    return;
  }
  var pNode = $(jNode).get(0);
  if(typeof pNode === 'undefined') {
    return;
  }
  var shareRu = $('button#button[aria-label="Поделиться"]')[0];
  if($(shareRu).length > 0) {
    if($(shareRu).parent().parent().find('yt-formatted-string#text').length > 0) {
      $(shareRu).parent().parent().find('yt-formatted-string#text').html('');
    }
  }
  pNode.innerHTML = '';
  var newspan = document.createElement('span');
  newspan.innerHTML = '<yt-icon-button style="padding:0em 0em 0em 0em" class="style-scope ytd-toggle-button-renderer style-default-active" onclick="window.open(\'https://dislikemeter.com/?v=' + videoid + '\', \'_blank\');" title="Добавить видео на анализатор Дизлайкметр"><a style="padding:0px 0px 0px 1px"><img src="' + imgdma + '" /></a></yt-icon-button><span style="padding:0em 0.5em 0em 0em"></span><yt-icon-button style="padding:0em 0em 0em 0em" class="style-scope ytd-toggle-button-renderer style-default-active" onclick="window.open(\'https://dislikemeter.com/video/' + videoid + '\', \'_blank\');" title="Открыть статистику видео на анализаторе Дизлайкметр"><a style="padding:0px 0px 0px 1px"><img src="' + imgdm + '" /></a></yt-icon-button><span style="padding:0em 1em 0em 0em"></span>';
  newspan.id = 'dmPanel';
  $(pNode).css('text-align', 'right');
  pNode.insertBefore(newspan, pNode.firstChild);
  $(pNode).find("#dmPanel")[0].addEventListener("click", function dmClick() {
    this.removeEventListener("click", dmClick);
    var newspan = document.createElement('span');
    newspan.innerHTML = '<yt-icon-button style="padding:0em 0em 0em 0em" class="style-scope ytd-toggle-button-renderer style-default-active" onclick="window.open(\'https://dislikemeter.com/?donate\', \'_blank\');" title="Помочь проекту Дизлайкметр"><a style="padding:0px 0px 0px 1px"><img src="' + imgdmd + '" /></a></yt-icon-button><span style="padding:0em 0.5em 0em 0em"></span>';
    $(pNode).find("#dmPanel")[0].insertBefore(newspan, $(pNode).find("#dmPanel")[0].firstChild);
  }, false);
  $(pNode).find("#dmPanel")[0].addEventListener("mouseover", function dmOver() {
    this.removeEventListener("mouseover", dmOver);
  }, false);
}

function parseitem(jNode) {
  var pNode = $(jNode).parent().parent().get(0);
  $(pNode).hover(function blockShow() {
    $(pNode).find("#t30sp").show();
  }, function blockHide() {
    $(pNode).find("#t30sp").hide();
  });
  pNode = jNode.get(0);
  var userID = $(jNode).find("a")[0].href.split('/').pop();
  var foundID = arrayDB.indexOf(userID);
  var comURL = $(jNode).find("span")[0];
  var t30span = document.createElement('span');
  t30span.innerHTML = ' \u2022 <span id="about" style="cursor: pointer" title="Открыть страницу с датой регистрации">?</span> \u2022 <span id="top30" style="cursor: pointer" title="Найти другие комментарии автора с помощью агрегатора ТОП30"><font color="#7777fa">top</font><font color="#fa7777">30</font></span>';
  t30span.id = 't30sp';
  t30span.style = "display:none";
  if(foundID > -1) {
    console.log("[MetaBot for Youtube] user found in mainDB: " + userID);
    markred(pNode, arrayDB[foundID + 1]);
    $(comURL).after(t30span);
  } else {
    var newspan = document.createElement('span');
    newspan.innerHTML = '<img id="checkbtn" src="' + checkb + '" title="Проверить дату регистрации" style="cursor: help" />';
    newspan.id = 'checksp';
    pNode.insertBefore(newspan, pNode.firstChild);
    t30span.innerHTML += ' \u2022 <span id="sendlinkoff" title="Пожалуйста, проверьте другие комментарии пользователя кнопкой top30">Сообщить</span><span id="sendlink" style="cursor: pointer; display: none" title="Помогите пополнить список известных ботов - отправьте нам ссылку на подозрительный комментарий">Сообщить</span>';
    $(comURL).after(t30span);
    $(jNode).find("img")[0].addEventListener("click", function checkcomment() {
      checkdate(pNode);
    }, false);
    $(jNode).find("#sendlink")[0].addEventListener("click", function displayinfo() {
      sendinfo($(jNode).find("#sendlink"), $(comURL).find("a")[0].href, $(jNode).parent().parent().find("img")[0].alt, regexliold);
      $(jNode).find("#sendlink").css("text-decoration", "line-through");
    }, false);
  }
  $(jNode).find("#about")[0].addEventListener("click", function openaboutNew() {
    window.open($(jNode).find("a")[0].href + '/about');
  }, false);
  $(jNode).find("#top30")[0].addEventListener("click", function openaboutNew() {
    window.open('https://www.t30p.ru/search.aspx?s=' + $(jNode).find("a")[0].href.split('/').pop());
    $(jNode).find("#sendlinkoff").hide();
    $(jNode).find("#sendlink").show();
  }, false);
}

function parseitemMob(jNode) {
  var userID = $(jNode).find("a")[0].href.split('/').pop();
  var foundID = arrayDB.indexOf(userID);
  if(foundID > -1) {
    console.log("[MetaBot for Youtube] user found in mainDB: " + userID);
    markredMob(jNode, arrayDB[foundID + 1]);
  } else {
    $(jNode)[0].addEventListener("touchstart", function () {
      $(this).data('moved', '0');
    }, false);
    $(jNode)[0].addEventListener("touchmove", function () {
      $(this).data('moved', '1');
    }, false);
    $(jNode)[0].addEventListener("touchend", function ttend() {
      if($(this).data('moved') == 0){
        if(['en', 'en-US', 'en-GB', 'ru', 'uk'].indexOf(currentlangmob()) < 0) {
          alert('Функция поддерживается только на языках:\n \u2714 English\n \u2714 Русский\n \u2714 Українська\nВы можете сменить язык интерфейса в меню настроек YouTube.');
          return;
        }
        this.removeEventListener("touchend", ttend);
        checkdateMob(this);
      }
    }, false);
  }
}

function parseitemNew(jNode) {
  var pNode = $(jNode).find("#header-author.ytd-comment-renderer")[0];
  $(jNode).hover(function blockShow() {
    $(pNode).find("#t30sp").show();
  }, function blockHide() {
    $(pNode).find("#t30sp").hide();
  });
  var userID = $(jNode).find("a")[0].href.split('/').pop();
  var foundID = arrayDB.indexOf(userID);
  var comURL = $(jNode).find("#published-time-text")[0];
  var t30span = document.createElement('span');
  t30span.innerHTML = ' \u2022 <span id="about" style="cursor: pointer" title="Открыть страницу с датой регистрации">?</span> \u2022 <span id="top30" style="cursor: pointer" title="Найти другие комментарии автора с помощью агрегатора ТОП30"><font color="#7777fa">top</font><font color="#fa7777">30</font></span>';
  t30span.id = 't30sp';
  t30span.style = "display:none";
  var newspan = document.createElement('span');
  newspan.id = 'checksp';
  if(foundID > -1) {
    console.log("[MetaBot for Youtube] user found in mainDB: " + userID);
    markredNew($(pNode).parent(), arrayDB[foundID + 1]);
    $(comURL).append(t30span);
    $(newspan).attr('data-chan', $(jNode).find("a#author-text")[0].href);
    pNode.insertBefore(newspan, pNode.firstChild);
  } else {
    newspan.innerHTML = '<img id="checkbtn" src="' + checkb + '" title="Проверить дату регистрации" style="cursor: help" />';
    $(newspan).attr('data-chan', $(jNode).find("a#author-text")[0].href);
    pNode.insertBefore(newspan, pNode.firstChild);
    t30span.innerHTML += ' \u2022 <span id="sendlinkoff" title="Пожалуйста, проверьте другие комментарии пользователя кнопкой top30">СООБЩИТЬ</span><span id="sendlink" style="cursor: pointer; display: none" title="Помогите пополнить список известных ботов - отправьте нам ссылку на подозрительный комментарий">СООБЩИТЬ</span>';
    $(comURL).append(t30span);
    $(jNode).find("#checkbtn")[0].addEventListener("click", function checkcommentNew() {
      checkdateNew($(pNode).parent());
    }, false);
    $(jNode).find("#sendlink")[0].addEventListener("click", function displayinfoNew() {
      sendinfo($(comURL).find("#sendlink")[0], $(comURL).find("a")[0].href, $(jNode).parent().find("img#img")[0].alt, regexlinew);
      $(jNode).find("#sendlink").css("text-decoration", "line-through");
    }, false);
  }
  $(jNode).find("#about")[0].addEventListener("click", function openaboutNew() {
    window.open($(jNode).find("a")[0].href + '/about');
  }, false);
  $(jNode).find("#top30")[0].addEventListener("click", function openaboutNew() {
    window.open('https://www.t30p.ru/search.aspx?s=' + $(jNode).find("a")[0].href.split('/').pop());
    $(jNode).find("#sendlinkoff").hide();
    $(jNode).find("#sendlink").show();
  }, false);
  this.addEventListener('yt-navigate-start', function wipeitemNewS() {
    this.removeEventListener('yt-navigate-start', wipeitemNewS);
    deleteitemNew(jNode, $(comURL).find("a")[0].href);
  });
  this.addEventListener('yt-navigate-finish', function wipeitemNewF() {
    this.removeEventListener('yt-navigate-finish', wipeitemNewF);
    deleteitemNew(jNode, $(comURL).find("a")[0].href);
  });
}

function recheckNew(jNode) {
  var checkre = $(jNode).find("#checksp").get(0);
  if(typeof checkre !== 'undefined') {
    if($(checkre).attr('data-chan') !== $(jNode).find("a#author-text")[0].href) {
      $(jNode).find("#checksp").remove();
      $(jNode).find("#t30sp").remove();
      $(jNode).find("#botmark").remove();
      var cNode = $(jNode).parent().parent().find("#content-text");
      $(cNode).parent().removeAttr('style');
      $(cNode).removeAttr('style');
      parseitemNew(jNode);
    }
  }
}

function deleteitemNew(jNode, url) {
  if(url.length > 74) {
    $(jNode).parent().parent().remove();
  } else {
    $(jNode).parent().parent().parent().remove();
  }
}

function sendinfo(jNode, link, username, regexpid) {
  if(regexpid.exec(document.body.innerHTML)[1] == "1") {
    window.open('https://www.youtube.com/channel/UCwBID52XA-aajCKYuwsQxWA/about?msgu=' + getURLParameter('v', link) + '&msgc=' + getURLParameter('lc', link) + '&msgn=' + username);
  } else {
    alert("Для отправки сообщений необходимо войти в аккаунт Google.");
  }
}

function checkdate(jNode) {
  if(['en', 'en-US', 'en-GB', 'ru', 'uk'].indexOf(currentlang()) < 0) {
    alert('Функция поддерживается только на языках:\n \u2714 English\n \u2714 Русский\n \u2714 Українська\nВы можете сменить язык интерфейса в меню настроек YouTube.');
    return;
  }
  $(jNode).find("img")[0].remove();
  var channelURL = $(jNode).find("a")[0].href + '/about';
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if(request.readyState === 4) {
      if(request.status === 200) {
        var response = request.responseText;
        if(response !== "") {
          console.log("[MetaBot for Youtube] XMLHttpRequest succeed.");
          window.tempHTML = document.createElement('html');
          tempHTML.innerHTML = response;
          window.aboutSTAT = tempHTML.getElementsByClassName('about-stat');
          var testday = Dparse(aboutSTAT[aboutSTAT.length - 1].innerHTML);
          if(Date.parse(testday) > botTargetDay) {
            $(jNode).find("a")[0].innerHTML = $(jNode).find("a")[0].innerHTML + ' <img src="' + morange + '" title="Дата регистрации позже 1 июня 2017" /> ' + testday;
            cNode = jNode.nextSibling;
            $(cNode).css({
              "background": "rgba(250,200,0,0.3)",
              "border-left": "3px solid rgba(250,200,0,0.3)",
              "padding-left": "3px"
            });
          } else {
            $(jNode).find("a")[0].innerHTML = $(jNode).find("a")[0].innerHTML + ' <img src="' + mgreen + '" title="Дата регистрации раньше 1 июня 2017" /> ' + testday;
            cNode = jNode.nextSibling;
            $(cNode).css({
              "background": "rgba(100,250,100,0.3)",
              "border-left": "3px solid rgba(100,250,100,0.3)",
              "padding-left": "3px"
            });
          }
          delete window.aboutSTAT;
          delete window.tempHTML;
        } else {
          console.log("[MetaBot for Youtube] XMLHttpRequest failed.");
        }
      }
    }
  };
  request.open("GET", channelURL, true);
  request.send(null);
}

function checkdateMob(jNode) {
  var channelURL = $(jNode).find("a")[0].href + '/about?ajax=1';
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if(request.readyState === 4) {
      if(request.status === 200) {
        var response = request.responseText;
        if(response !== "") {
          console.log("[MetaBot for Youtube] XMLHttpRequest succeed.");
          var matches = regexdatemob.exec(response);
          var testday = Dparse(decodeURIComponent(JSON.parse('"' + matches[2] + '"')));
          if(Date.parse(testday) > botTargetDay) {
            $(jNode).find("a")[0].innerHTML = $(jNode).find("a")[0].innerHTML + ' <img src="' + morange + '" title="Дата регистрации позже 1 июня 2017" /> ' + testday;
            cNode = $(jNode).find("div.tpb")[0];
            $(cNode).css({
              "background": "rgba(250,200,0,0.3)",
              "border-left": "3px solid rgba(250,200,0,0.3)",
              "padding-left": "3px"
            });
          } else {
            $(jNode).find("a")[0].innerHTML = $(jNode).find("a")[0].innerHTML + ' <img src="' + mgreen + '" title="Дата регистрации раньше 1 июня 2017" /> ' + testday;
            cNode = $(jNode).find("div.tpb")[0];
            $(cNode).css({
              "background": "rgba(100,250,100,0.3)",
              "border-left": "3px solid rgba(100,250,100,0.3)",
              "padding-left": "3px"
            });
          }
        } else {
          console.log("[MetaBot for Youtube] XMLHttpRequest failed.");
        }
      }
    }
  };
  request.open("GET", channelURL, true);
  request.send(null);
}

function checkdateNew(jNode) {
  if(['en', 'en-US', 'en-GB', 'ru', 'uk'].indexOf(currentlang()) < 0) {
    alert('Функция поддерживается только на языках:\n \u2714 English\n \u2714 Русский\n \u2714 Українська\nВы можете сменить язык интерфейса в меню настроек YouTube.');
    return;
  }
  var idspan = document.createElement('span');
  idspan.id = 'checked';
  idspan.innerHTML = 'checked';
  $(jNode).find("#checkbtn")[0].remove();
  var userID = $(jNode).find("a")[0].href.split('/').pop();
  var foundID = arrayDB.indexOf(userID);
  if(foundID > -1) {
    console.log("[MetaBot for Youtube] user found in mainDB: " + userID);
    markredNew(jNode, arrayDB[foundID + 1]);
  } else {
    var channelURL = $(jNode).find("a")[0].href + '/about';
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if(request.readyState === 4) {
        if(request.status === 200) {
          var response = request.responseText;
          if(response !== "") {
            console.log("[MetaBot for Youtube] XMLHttpRequest succeed.");
            var matches = regexdate.exec(response);
            var testday = Dparse(matches[2]);
            var aNode = $(jNode).find("#author-text")[0];
            var cNode = $(jNode).parent().find("#content-text")[0];
            var newspan = document.createElement('span');
            newspan.id = 'botmark';
            var checkBadge = $(aNode).parent().find('span#author-comment-badge')[0];
            if(Date.parse(testday) > botTargetDay) {
              newspan.innerHTML = '<img src="' + morange + '" title="Дата регистрации позже 1 июня 2017" /> ' + testday;
              $(aNode).append(newspan);
              if($(checkBadge).length > 0) {
                $(checkBadge).attr('hidden', '');
                $(aNode).removeAttr('hidden');
              }
              $(cNode).parent().css({
                "background": "rgba(250,200,0,0.3)",
                "border-left": "3px solid rgba(250,200,0,0.3)",
                "padding-left": "3px"
              });
            } else {
              newspan.innerHTML = '<img src="' + mgreen + '" title="Дата регистрации раньше 1 июня 2017" /> ' + testday;
              $(aNode).append(newspan);
              if($(checkBadge).length > 0) {
                $(checkBadge).attr('hidden', '');
                $(aNode).removeAttr('hidden');
              }
              $(cNode).parent().css({
                "background": "rgba(100,250,100,0.3)",
                "border-left": "3px solid rgba(100,250,100,0.3)",
                "padding-left": "3px"
              });
            }
            aNode = $(jNode).find("#checksp");
            aNode.attr('data-chan', $(jNode).find("a#author-text")[0].href);
            aNode.hide();
          } else {
            console.log("[MetaBot for Youtube] XMLHttpRequest failed.");
          }
        }
      }
    };
    request.open("GET", channelURL, true);
    request.send(null);
  }
}

function markred(jNode, day) {
  $(jNode).find("a")[0].innerHTML = $(jNode).find("a")[0].innerHTML + ' <img src="' + mred + '" title="Пользователь найден в списке ЕРКЮ" /> ' + day;
  cNode = jNode.nextSibling;
  $(cNode).css({
    "background": "rgba(250,100,100,0.3)",
    "border-left": "3px solid rgba(250,100,100,0.3)",
    "padding-left": "3px"
  });
}

function markredMob(jNode, day) {
  $(jNode).find("a")[0].innerHTML = $(jNode).find("a")[0].innerHTML + ' <img src="' + mred + '" title="Пользователь найден в списке ЕРКЮ" /> ' + day;
  cNode = $(jNode).find("div.tpb")[0];
  $(cNode).css({
    "background": "rgba(250,100,100,0.3)",
    "border-left": "3px solid rgba(250,100,100,0.3)",
    "padding-left": "3px"
  });
}

function markredNew(jNode, day) {
  var aNode = $(jNode).find("#author-text")[0];
  var cNode = $(jNode).parent().find("#content-text")[0];
  var newspanN = document.createElement('span');
  newspanN.id = 'botmark';
  newspanN.innerHTML = '<img src="' + mred + '" title="Пользователь найден в списке ЕРКЮ" /> ' + day;
  $(aNode).append(newspanN);
  var checkBadge = $(aNode).parent().find('span#author-comment-badge')[0];
  if($(checkBadge).length > 0) {
    $(checkBadge).attr('hidden', '');
    $(aNode).removeAttr('hidden');
  }
  $(cNode).parent().css({
    "background": "rgba(250,100,100,0.3)",
    "border-left": "3px solid rgba(250,100,100,0.3)",
    "padding-left": "3px"
  });
}

function Dparse(day) {
  day = day.replace(/Joined |Дата регистрации: |Ви приєдналися /i, '');
  day = day.replace(/ янв. | января | січ. /i, ' Jan, ');
  day = day.replace(/ февр. | февраля | лют. /i, ' Feb, ');
  day = day.replace(/ мар. | марта | бер. /i, ' Mar, ');
  day = day.replace(/ апр. | апреля | квіт. /i, ' Apr, ');
  day = day.replace(/ мая. | мая | трав. /i, ' May, ');
  day = day.replace(/ июн. | июня | черв./i, ' Jun, ');
  day = day.replace(/ июл. | июля | лип. /i, ' Jul, ');
  day = day.replace(/ авг. | августа | серп. /i, ' Aug, ');
  day = day.replace(/ сент. | сентября | вер. /i, ' Sep, ');
  day = day.replace(/ окт. | октября | жовт. /i, ' Oct, ');
  day = day.replace(/ нояб. | ноября | лист. /i, ' Nov, ');
  day = day.replace(/ дек. | декабря | груд. /i, ' Dec, ');
  day = day.replace(/ г.| р./i, '');
  return day;
}

function currentlang() {
  return regexlang.exec(document.body.innerHTML)[1];
}

function currentlangmob() {
  return regexlangmob.exec(document.body.innerHTML)[1];
}

function getURLParameter(name, link) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(link) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function waitForKeyElements(selectorTxt, actionFunction, bWaitOnce, iframeSelector) {
  var targetNodes, btargetsFound;
  if(typeof iframeSelector == "undefined") targetNodes = $(selectorTxt);
  else targetNodes = $(iframeSelector).contents().find(selectorTxt);
  if(targetNodes && targetNodes.length > 0) {
    btargetsFound = true;
    targetNodes.each(function() {
      var jThis = $(this);
      var alreadyFound = jThis.data('alreadyFound') || false;
      if(!alreadyFound) {
        var cancelFound = actionFunction(jThis);
        if(cancelFound) btargetsFound = false;
        else jThis.data('alreadyFound', true);
      }
    });
  } else {
    btargetsFound = false;
  }
  var controlObj = waitForKeyElements.controlObj || {};
  var controlKey = selectorTxt.replace(/[^\w]/g, "_");
  var timeControl = controlObj[controlKey];
  if(btargetsFound && bWaitOnce && timeControl) {
    clearInterval(timeControl);
    delete controlObj[controlKey];
  } else {
    if(!timeControl) {
      timeControl = setInterval(function() {
        waitForKeyElements(selectorTxt, actionFunction, bWaitOnce, iframeSelector);
      }, 300);
      controlObj[controlKey] = timeControl;
    }
  }
  waitForKeyElements.controlObj = controlObj;
}