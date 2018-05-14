// ==UserScript==
// @name         MetaBot for YouTube
// @namespace    yt-metabot-user-js
// @description  More information about users and videos on YouTube.
// @version      180514
// @homepageURL  https://vk.com/public159378864
// @supportURL   https://github.com/asrdri/yt-metabot-user-js/issues
// @updateURL    https://raw.githubusercontent.com/asrdri/yt-metabot-user-js/master/yt-metabot.meta.js
// @downloadURL  https://raw.githubusercontent.com/asrdri/yt-metabot-user-js/master/yt-metabot.user.js
// @icon         https://raw.githubusercontent.com/asrdri/yt-metabot-user-js/master/logo.png
// @include      https://*youtube.com/*
// @include      https://*dislikemeter.com/?v*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require      https://raw.githubusercontent.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// ==/UserScript==

GM_config.init( {
  'id': 'ytmetabot_config',
  'title': 'MetaBot/YT Settings',
  'fields': {
    'option1': {
      'label': 'Processing mode for comments by known bots',
      'type': 'int',
      'min': 1,
      'max': 2,
      'default': 1
    },
    'option2': {
      'label': 'Auto-dislike comments by known bots',
      'type': 'checkbox',
      'default': false
    },
    'option3': {
      'label': 'Hide long like/dislike/share button text',
      'type': 'checkbox',
      'default': true
    }
  },
});

const checkb = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAPCAMAAADXs89aAAAA+VBMVEUAAAD///+qqqp/f39mZmZubm5vb29sbGxtbW1tbW1tbW1ubm5ubm5tbW1ubm5tbW1ubm5ubm5ubm5tbW1tbW1ubm5ubm5tbW1ubm5ubm5tbW1ubm5ubm5vb29wcHBxcXFzc3N0dHR1dXV3d3d4eHh6enp7e3t8fHyAgICCgoKFhYWMjIyOjo6Pj4+QkJCSkpKUlJSWlpaZmZmampqdnZ2hoaGqqqqwsLC0tLS1tbW2tra5ubm+vr7ExMTKysrLy8vQ0NDR0dHS0tLU1NTV1dXW1tbe3t7i4uLj4+Pk5OTl5eXn5+fo6Ojq6urs7Ozu7u7w8PD9/f3////SCMufAAAAHHRSTlMAAAMEBSUnKCpbXV9htre6u87Q0dPp6uvs7u/8pkhKVQAAAMdJREFUeNpN0NdWwlAUANEbgvTeQhnQIE1B1ChYQcEC0gL+/8ewzPWwmMf9OMowDKWUP5YqU0pGTaXTHMqdOcM7G7LBIw4Vnc3b89i9BytwYH+uv7oAOqsbyJjCMb4d/urOgYhwqr55wmvdhIRwufXT0zzrgCVM1X2tA5xva1ARLvE4aQCMXoCCcJLaZNpvX71/3QJx4ShUBx+Lz4fp7hrCwmYWL3v5u7XTPmEVtLRfuk7+5OhJIKP9NO2psDIjCatSiId9/7oHY28awgWqV+8AAAAASUVORK5CYII=';
const mred = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAqFBMVEUAAAD/AAD/MwD+AAD4AAD+AAD+DAD+AAD+AgD+BwD9AAD+AAD+AQD+AgD+AAD9AAD+AQD+AgD+AAD+AAD+AgD+AgD+AgD9AQD/AAD/AgD/DAz/DQ3/EBD/ISH/IiL/IyP/Jib/OTn/PT3/QUH/Q0P/S0v/Tk7/T0//U1P/VFT/Wlr/Z2f/i4v/j4//srL/trb/yMj/zMz/19f/3t7/4uL/9fX/+Pj////schBBAAAAGHRSTlMABAUmJycqXF5ht7e5u8/Q0NTq6+3u7/0SYvJQAAAAgklEQVQIHQXBC1KDMBQAwM0jJWCt9z+mjoNAmo+7CVHyvrSz3ZPE+iyPF8d9HW/Z+pV9vBj3Fj894pmpqKyfKUpBx8C+RoaGBjl2GMNssMUChgFyNNB10OIEwwBnbuDoN+hxXxAl4K/GPCrKo6AeczHe6eFK39P52yWkNW+5nb1O/gHoZT3jykIiwQAAAABJRU5ErkJggg==';
const mgreen = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAyVBMVEUAAABVqlU/vz8zmTMpniktoy0snywqnSosnywrnysqoSosoCwrnyssoCwroCsrnyssnywsoCwrnysroCsrnysroCssnywsnywrnysroCssnywsoCwuoS44pTg5pjk6pjo8pzw9qD1LrktOr05UslRYtFhctVxgt2Bnu2dqvGptvW1vvm9ywHJ1wXV4wniRzZGs2qzE5MTJ5snS69LU69TW7NbY7djb79vn9Ofq9urw+PDz+fP1+vX5/Pn6/fr7/fv8/fz8/vz///9DdKfSAAAAG3RSTlMAAwQFJScoKltdX2G2t7q7ztDR0+nq6+zu7/wFCQO8AAAAm0lEQVR42jXK1xKCQBBE0WEVRZCsGNqAOeecdf7/o1yg9jx0za0aknKW20DdMQWliiEyQSHNGpRIl8+hqvam5QuyVHYOvEWJXGS6R/6tYVMD8W4AxCf+roCIgD3f+r0zf5YAmlTH8M7XC78XkKrkAKMH83uORJlMuePna4aUQSIAMJlm6WlEhQhKJU+S7iPjyUyIkh01q2VDk/cfpzAWsSatwJQAAAAASUVORK5CYII=';
const morange = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAA8FBMVEUAAAD/qgD/fwD/ZgD+fAD+fAD+fAD+fwD+fwD+fwD/fAD/fwD+fgD+fgD+fgD+fgD+fQD+fgD+fgD+fQD+fQD+fQD+fQD+fgD+fQD+fgD+fQD+fgD+fQD+fgD/fgD/fwH/fwL/gAT/gAX/ggf/gwr/hAz/hQ7/jBz/jh//jiH/lCv/lzL/mTX/mTb/mjf/oEP/oUX/o0j/pk7/pk//qVX/qVb/q1j/r2D/tGv/vHr/vn7/xIv/yJL/zZ3/1Kr/17D/2bP/2bX/27f/4ML/48j/5s7/6dT/6tb/7Nn/8+j/9+//9/D/+fT//vz//v3///+PfT9BAAAAHnRSTlMAAwQFJScpWlxeYGC1trm6u87Q0dPp6urr7O7u/P7y0GwDAAAAp0lEQVR42h2JVQLCUAwEQ6FAcSkOi7u7u2vufxteMz+T2ZDC7glmcumAoZHgNJFv9dslRHXJFDp3Zn7OkFSD3UT9xe/Dg38DRDTyAiv+NFG88h5wUwhojMdA4cInwE8ZCJUd8wRIEITymXmpnKW09IK/c8txCkhv+Sj2kSHuTntiF2lRy8PbyFLYRqQnAax5AyDmIIUeAaqzmvqqtNDc/kQ27nPZ1P0HrvQbttZfcNAAAAAASUVORK5CYII=';
const imgdm = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAQiSURBVEhLrZZ/TJR1HMe/GpRZ/+RWMtvKttZkudKadqnMbBTBbG2mC1GkX8YdDbrMwIkCMbPcoIRMOjR1sFR0pQjz8FC4O9HMSQlzyUaaTA84b3hw9zx3wOG9+3y/99wTBw8Crc/22n3v+32e9/s+n+/n+T7H7hVoZDFBO8sM2tgJ4sZdKxsINLLgwBnmkS3sfJ+ZfSWdZPOVyycXwV/ZTBI1kUE/7AxjQYaQLAzeOmaV69kC5fbxg4SXk8FtLdGx6D/DQFkFvGZWgCPsPkVKO0j8A2JQS2g8BhsYPHWCA1TmKEUyMpQM/pNBGNqrkJGZFSmy/4ayB5Mq0Vj46oXRkHSKJSryoSADU/gi+54ZaD86Xb2JMsTBHbOo7lPVOc7Rohh4LFHqdz7mc9SBIhtqhjZcYtHCQGlTtYs+z5iDfOMz6s23qqdhjm4pumoeUOc4rybqcKLkMfU7H8cnvSTGSjbwnGIrhQkZZIYv5NjKZ2BeXBwqtj+Opr2PYHXyfKxb87y6HqYkdzZeSdChbtejMBNLaVy6ZbZY462t7E1NyIQetJECx76diYTlC7Fw2WJs0Mfijjk6Yp0TaJyCbzY/hSWvvSzgYz7H10gzbNIrOo0mbowU+D+gjRdGvXXsaV4uv9ZFY+FvuB99lofgqZ+OIVtkMwyHjh1h0neS6XgmE342Lv4Ui2R9MVak7yXKYTDmYGtu+ijytuhR9vWbcNVGczMysbMuLcHh8BoPUWtuL0iFfvMvyMqvERyqbkaXs2cUNx3dOHT8HEw7kjDQyOZykwYtYU7AGgVfcyKka99BcjahoLgKhtxjqonF1gZZlkchSRIcjk5k5JQiJSP3SW6SN1L8Lv1y36UESK4/IPfehHT9B/ha38MXhZsmZMJxu904XH0O8WtKPmRBK4ulcgRVAyqL/GcOZI+LPrMxaHtYlIuvbct7d8ImXq8XLVfa8ca6UnP4WTFzES4mt6RC7uuC77fFqniYyZhwHJ2deGv97sshEzt7jgQHBq0PQnZfg3w5WZxZww04X+anRZjUnr6iKR7G6XTio02VkjDhQaLZQ9Yp8F9YQHui3f+1pkV4W78HKVmVWJ1VgZWGcnTcuq1pwMvV/lcH3vm4vE2xoIMSbCpls1tLPAzPru3nJ3C+Yi4uVD6L42Vx+LHqrBDt7u7GJwWH8f5nJnfqp/sda437HCvSyy7SxusUi1DwVycJFRIBLZOR9DdEw5BdDHevBy6XC9tKq7HeaHxBkbt3UMcto6xatISHwxujqDAZrVc70NPTg+8P1CM+decSRWb84KcnZcRfyVWE+tbkwvwo959m/fRiOrtxo+H35tbrolyZWw/6k9J2xSgSkwtRxiY2i/4svMjPIn5U/L2fTeNrr68tWbTKUH41bcO+O/EpO/Xihohg7B/pB5kCVYYVDwAAAABJRU5ErkJggg==';
const imgdma = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAABsFBMVEUAAAD//wD/qgD/vwD/zAD+xwD/vwD+xADwuAD+wAD+wgD0tgD1uwD+wAD0uQBZtl3+wgCtvC3yuQCstyv+wQD+wgD+wgD+wgDztwD+wgDxtwDytwD+wQD+wQDyuAD+wQD+wQDytwD+wQD+wgDzuAD1ugD+wQDzuABft1n+wQD+wgBatlz+wQDytwD5vQD+wgD+wgD9wAD+wQD+wQDxtwD+wgDyuAD7vwD+wQAoOD8wPT02QTs8RTk/RzhARzhCSThESjdHTDZZWDFat11eWy9nvWpyaCl1aih4wXR5tkl5ulh6t0l7uEl7xX1/cCaBu1CGt0CKukCOeiGReyCSfCCV0ZeWujqbx2qc1J6ihhumiRqrjBivjxeykRa3lBW4lBXBmhLCmxLEnBHbqwrksQjnswfutwXxwAbyuADyugT0uQD0ugD03ZP03pj06cT068/10Fj10V311nb11nf179318OP18ef18uv2uwD2yTv2zEf2zUn20mH3yDX4vQD4vQL5vQD6vgD6wAn6wQz7vwD7vwH7wAT8wAD8wAH9wAD9wQD9wQL+wQD+wgD/wgD////cSs4bAAAAOXRSTlMAAgMEBRcYGiQpLjE1QUlKTFRUWGNtdn6AgoeMlpmgqbKzt77AxtHY3uDn6Orw8vf4+fn6+/v8/v4dJMtLAAABQUlEQVR42nXP9VMCQRjG8VewEwO7ExQVu7DFBAMVUMSOs7tbwTye+5fdHXC4c/Dzyzu739nZXQqI1Bbq61pqyrLjSCEizwg/z25pvCxoDAh6aMxU/Ya0Bsg9C/nqwAkWFJ6EHP8dBvx11ZzISx6wsgb45h8BuLaBbdenUBHOnmsEhsaB9bYNAN1uwN2DKyGFSAtguX1utW8AzHTX0mLnDDxCEVEhmIXejsFNMF6byWTzQhSq1aRHKDtCNNUGl1t2C+NwTFgsI5OpJPuMvZ+TJCsfOqpEgPg+FiwMlQDc2+3ewbCyZID5ujk8378bVZaYVuDz9PLkVYRFWagY4vHFtQjAIck4iWLrX86OfAhRKP3j/hvchJWTpFk+zKyE5cLvzz2MKqspZOESyv8rpNYUGDAlL1VEv1RRyTq+5XSaeUj6AXAh19PAE4muAAAAAElFTkSuQmCC';
const imgdmd = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAZCAMAAACM5megAAAAllBMVEUAAAB/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f3+AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAx6H3iAAAAMXRSTlMABAgMFBgcICQoLDA8QERITFBUWGBkaGx4fICDj5OXo6evs7e7v8PH09ff4+fr8/f7vr5GKgAAAN5JREFUeAGFy/FagjAARfEbIoSCWqLJXJoZltEm9/1fru2DPidM+v19DhyjRXEorbftFH654tV7hBtJZsw+yFoKa0dDPcMl2Dqh8U1rA9dLTYvnAFagaNUpXIsLPaoQQBShEdX0kQByHQOWpFcFILGldaZfCkCXQBDHU96xf4DkHhPFAUqRGQoOu6yBFQcc86cxgNGJ983QSmVFPx3gakmvHVwHeugxXI+afVvcymr2ZOhYsyf8v1HokjR+NK3qk0aJriONBI05jVd0fdkfrZzGEl1zIYoJWuFGiBX+/AIRxGBfReXU6wAAAABJRU5ErkJggg==';
const imgyto = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAACJVBMVEX///+qAADMMzP/MzPjKiXbJiPVIyPZJSPFGx/QIiLBGB7cKSXRIiLeKSnkKyfOICHcIiLRISLJHB7jKybCGB/QISHVKSDgKifMGRnhKyXMHR/CGR3ZJSPiLCbdKSXiKybFFyLCGR7WJCLdJyTDGB3JHSDhKiXIHB/ZJiPMHiHQIiLXIyPTIyLKHR/FGCDFGh/lMxnjKyXDGR3GGx/cJyTEGR7BGh7NICDUIiLOHiPcLiLiKyXgKSXhKyXPHyHXJSPNICDgKibgKSbJHB/XJCPnLiLfKSXfKSTfKSbDGR7EGR7KHB/CGR3CGB3CGB7BGB7BGB3BGR3////NHyHLHiDo4ODWJCPMHiD//v7p4eHaJyTZJiTYJiTOICHXJSPYJSPPICHeKSXQISHVJCPunZzFGh/UIyPqmpvnzMv89PTlxMTYUVL78vL08fHomZrzzM399/f+/Pzm09PXTk7QNDbfKiXGGx/pmprnj47XSUvktrbompryxMXVOTncKCXKHSDHHB/t5+f7+vrdKCXbJyTsnJvcOTfhgYDIHB/18fHqm5v05eXaMzHZVFTYTEvHGx/++vrZLy3spKThiYnTLi78+vrs19fqnJzYKynVNDXjrq7VPT7rm5vJHSDebm3XKCbRISLZWFrTIyLSIiLtrKzEGh7cZmXWJiXgKibvtLTWQ0Tlvr7bXVzfd3bwvL3sm5vjW1nTIiLDGh7hKybtnJviKybCGR58TkH5AAAAUnRSTlMAAwUFie17+rn8r7n8HzqvFu9b73vWH1sK54nnida5/BaYr1uJ7fqal+cWOu/6H5oKr/q5mls6H9Y6Fnzte3vnfJeYmOcW7Zqa7e2Y1u/8/O/WqnF1KAAAAb9JREFUeF6FzGOb61AYheGV1B3btu05tLHbsY1j27Zt2/h9k7SnyZt0p7m/ruda0BAi59VkxGVlxWXUtEUKMBJhTflLpFgjwNO6qPC3TuHiZQiStPwDR3sStCwr9hpYaQFRnTliKLOa/IWNhBCmftafDqk+0OUdM5EHn2jbGRO2aMiKexU/zvVyFUOS6OhTjG85cKWPw5EIIL1fNc7Y5fM3+4OlA8KCIdUfxtjde18fDOktFVA2SEih5OL0s+eDOmWwdxJnmc+pk7Pv3ndq2JE7Rsih/7Tn85cxKhfNk8R3qQmcdhy6SpZmlL8injDV1p6OR9eUpRyun4Qc0tNduwOLC+GviUuMmrl9R1nCEfOCoOGO+w/JEoOEUWJKyW7cOjpKJSBqmNjP/Ha+eTysFYX5A4Q/7P74aUBvIVo8hBx2fzvoCdYCoYSEhxk7stnDUSIAqV2qbdtfdnGlAmiq8Cr2ePkqmiBZctzUGshKC56aKCiFT+wFE7H4r+hESEUIEOuuh1AnQpHs3GfImQxCrJowUCVCq2HVW47VDQiSnVP7S6c2Jxs8lflp/4i0/EoYERrj3WvXrd+wcZM7vlEANQfRAClqAtKfNQAAAABJRU5ErkJggg==';
const botTargetDay = Date.parse('1 June 2017');
const regexdate = /joinedDateText(.*?)"},{"text":"(.*?)"}]},/;
const regexdatemob = /joined_date_text(.*?)"}, {"text": "(.*?)"}]/;
const regexid = /"video_id":"(.*?)"/;
const regexlinew = /"logged_in","value":"(.*?)"/;
const regexliold = /"logged_in":"(.*?)"/;
const regexlang = /"host_language":"(.*?)"/;
const regexlangmob = /\\"host_language\\": \\"(.*?)\\"/;
const regexannyto = /(.*)(\r\n|\n\r|\n)([\W\w]+)/;
const ERKYurl = 'https://raw.githubusercontent.com/YTObserver/YT-ACC-DB/master/mainDB';
const annYTOurl = 'https://raw.githubusercontent.com/YTObserver/YT-ACC-DB/master/announcement.txt';
const minDCTime = 36*61;
const maxDCTime = 71*58;
var arrayERKY = [];
var annYTOtxt = [];
var orderedClicksArray = [];
var bDTaskSet = 0;
var bDBlur = 0;

if (window.location.hostname == "dislikemeter.com" || window.location.hostname == "www.dislikemeter.com") {
  var videoid = getURLParameter('v', location.search);
  if (videoid) {
    waitForKeyElements('input#form_vid', function dmIDins(jNode) {
      var pNode = jNode[0];
      pNode.value = videoid;
    });
    return;
  }
} else if (window.location.pathname == '/live_chat_replay' || window.location.pathname == '/live_chat') {
  var requestDB = new XMLHttpRequest();
  requestDB.onreadystatechange = function() {
    if (requestDB.readyState === 4) {
      if (requestDB.status === 404) {
        console.log("[MetaBot for Youtube - Chat] XMLHttpRequest succeed: ERKY-db not found.");
      }
      if (requestDB.status === 200) {
        var responseDB = requestDB.responseText;
        if (responseDB !== "") {
          console.log("[MetaBot for Youtube - Chat] XMLHttpRequest succeed: ERKY-db loaded.");
          arrayERKY = responseDB.match(/[^\r\n=]+/g);
          waitForKeyElements('a.ytd-menu-navigation-item-renderer', parsechat);
        } else {
          console.log("[MetaBot for Youtube] XMLHttpRequest failed.");
        }
      }
    }
  };
  requestDB.open("GET", ERKYurl, true);
  requestDB.send(null);
} else {
  var requestDB = new XMLHttpRequest();
  requestDB.onreadystatechange = function() {
    if (requestDB.readyState === 4) {
      if (requestDB.status === 404) {
        console.log("[MetaBot for Youtube] XMLHttpRequest succeed: ERKY-db not found.");
      }
      if (requestDB.status === 200) {
        var responseDB = requestDB.responseText;
        if (responseDB !== "") {
          console.log("[MetaBot for Youtube] XMLHttpRequest succeed: ERKY-db loaded.");
          arrayERKY = responseDB.match(/[^\r\n=]+/g);
          if (document.querySelector("meta[http-equiv='origin-trial']")) {
            console.log("[MetaBot for Youtube] YouTube New design detected.");
            spinnercheckNew();
            waitForKeyElements('div#main.style-scope.ytd-comment-renderer', parseitemNew);
            waitForKeyElements('yt-view-count-renderer.style-scope.ytd-video-primary-info-renderer', insertdmNew);
            waitForKeyElements('div#channel-header.ytd-c4-tabbed-header-renderer', insertchanNew);
          } else if (document.querySelector("meta[http-equiv='Content-Type']")) {
            console.log("[MetaBot for Youtube] YouTube Mobile mode detected.");
            waitForKeyElements('div.brb', parseitemMob);
          } else {
            console.log("[MetaBot for Youtube] YouTube Classic design detected.");
            waitForKeyElements('.comment-renderer-header', parseitem);
            waitForKeyElements('div#watch7-views-info', insertdm);
            waitForKeyElements('div#c4-primary-header-contents.primary-header-contents.clearfix', insertchan);
          }
        } else {
          console.log("[MetaBot for Youtube] XMLHttpRequest failed.");
        }
      }
    }
  };
  requestDB.open("GET", ERKYurl, true);
  requestDB.send(null);
  if (document.querySelector("meta[http-equiv='Content-Type']")) {
    return;
  }
  var requestANN = new XMLHttpRequest();
  requestANN.onreadystatechange = function() {
    if (requestANN.readyState === 4) {
      if (requestANN.status === 404) {
        console.log("[MetaBot for Youtube] XMLHttpRequest succeed: YTO-announcement not found.");
      }
      if (requestANN.status === 200) {
        var responseANN = requestANN.responseText;
        if (responseANN !== "") {
          console.log("[MetaBot for Youtube] XMLHttpRequest succeed: YTO-announcement loaded.");
          annYTOtxt = regexannyto.exec(responseANN);
          if (document.querySelector("meta[http-equiv='origin-trial']")) {
            waitForKeyElements('ytd-comments-header-renderer.ytd-item-section-renderer', insertannNew);
          } else {
            waitForKeyElements('div.comments-header-renderer', insertann);
          }
        } else {
          console.log("[MetaBot for Youtube] XMLHttpRequest failed (YTO-announcement).");
        }
      }
    }
  };
  requestANN.open("GET", annYTOurl, true);
  requestANN.send(null);
}

function parsechat(jNode) {
  if ($(jNode)[0].hasAttribute('href')) {
    var deftxt = $(jNode).find('yt-formatted-string.ytd-menu-navigation-item-renderer')[0].innerHTML;
    markchatmenu(jNode, deftxt);
    var mutationObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        markchatmenu(jNode, deftxt);
      });
    });
    mutationObserver.observe($(jNode)[0], {
      attributes: true,
      attributeFilter: ['href'],
      characterData: false,
      childList: false,
      subtree: false,
      attributeOldValue: false,
      characterDataOldValue: false
    });
  }
}

function markchatmenu(jNode, deftxt) {
  var userID = $(jNode)[0].href.split('/').pop();
  var foundID = arrayERKY.indexOf(userID);
  if (foundID > -1) {
    $(jNode).parent()[0].style.backgroundColor = 'rgba(250,100,100,0.3)';
    $(jNode).find('yt-formatted-string.ytd-menu-navigation-item-renderer')[0].innerHTML = deftxt + '<br><img src="' + mred + '" /> ' + arrayERKY[foundID + 1];
  } else {
    $(jNode).parent()[0].style.backgroundColor = '';
    $(jNode).find('yt-formatted-string.ytd-menu-navigation-item-renderer')[0].innerHTML = deftxt;
  }
}

function spinnercheckNew() {
  waitForKeyElements('paper-spinner-lite.ytd-item-section-renderer[aria-hidden="true"]', function(jNode) {
    if (getURLParameter('v', location.search) === null) {
      return;
    }
    console.log("[MetaBot for Youtube] Comment sorting spinner found.");
    var mutationObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if ($(jNode).find("#spinnerContainer").hasClass("cooldown")) {
          setTimeout(recheckallNew, 2000);
        } else {
          $('div#main.style-scope.ytd-comment-renderer').each(function() {
            var cNode = $(this).find("#published-time-text")[0];
            deleteitemNew(this, $(cNode).find("a")[0].href);
          });
        }
      });
    });
    mutationObserver.observe($(jNode)[0], {
      attributes: true,
      attributeFilter: ['active'],
      characterData: false,
      childList: false,
      subtree: true,
      attributeOldValue: false,
      characterDataOldValue: false
    });
  }, false);
  waitForKeyElements('div#continuations.ytd-item-section-renderer', function(jNode) {
    if (getURLParameter('v', location.search) === null) {
      return;
    }
    console.log("[MetaBot for Youtube] Comment loading spinner found.");
    var mutationObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (!$(jNode).find("#spinnerContainer").hasClass("cooldown")) {
          setTimeout(recheckallNew, 2000);
        }
      });
    });
    mutationObserver.observe($(jNode)[0], {
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
    console.log("[MetaBot for Youtube] Comment replies loading spinner found.");
    var mutationObserver = new MutationObserver(function(mutations) {
      if (mutations[0].removedNodes) {
        mutationObserver.disconnect();
        setTimeout(recheckallNew, 2000);
      }
    });
    mutationObserver.observe($(jNode)[0].parentNode, {
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

function insertchan(jNode) {
  var noticespan = document.createElement('div');
  var chanURL = $(jNode).find('a.spf-link.branded-page-header-title-link.yt-uix-sessionlink')[0].href;
  var userID = chanURL.split('/').pop();
  var foundID = arrayERKY.indexOf(userID);
  if (foundID > -1) {
    noticespan.innerHTML = '<img src="' + mred + '" /> Пользователь найден в списке ЕРКЮ, дата регистрации: <a href="' + chanURL + '/about" title="Открыть страницу с датой регистрации">' + arrayERKY[foundID + 1] + "</a>";
    noticespan.style = 'background:rgba(250,100,100,0.3);border-radius:5px;padding:4px 7px 4px 7px';
  } else {
    noticespan.innerHTML = 'Пользователь не найден в списке ЕРКЮ <a href="' + chanURL + '/about"><img src="' + morange + '" title="Открыть страницу с датой регистрации" /></a>';
    noticespan.style = 'background:rgba(100,100,100,0.2);border-radius:5px;padding:4px 7px 4px 7px';
  }
  noticespan.id = 'erkynotice';
  $(jNode).find('h1.branded-page-header-title').append(noticespan);
}

function insertchanNew(jNode) {
  this.addEventListener('yt-navigate-finish', function insertchanNewR() {
    this.removeEventListener('yt-navigate-finish', insertchanNewR);
    setTimeout(insertchanNew, 300, jNode);
  });
  var chanURL = window.location.protocol + '//' + window.location.hostname + window.location.pathname.replace(/\/featured|\/videos|\/playlists|\/channels|\/discussion|\/about/i, '');
  if (chanURL.slice(-1) == '/') {
    chanURL = chanURL.slice(0, -1);
  }
  var reuse = false;
  var userID = chanURL.split('/').pop();
  if ($(jNode).find('span#subscriber-count.ytd-c4-tabbed-header-renderer')[0]) {
    var noticespan = $(jNode).find('span#subscriber-count.ytd-c4-tabbed-header-renderer')[0];
    reuse = true;
  } else {
    var noticespan = document.createElement('span');
    noticespan.id = 'subscriber-count';
    noticespan.classList.add("ytd-c4-tabbed-header-renderer");
  }
  var foundID = arrayERKY.indexOf(userID);
  if (foundID > -1) {
    noticespan.innerHTML = '<img src="' + mred + '" /> Пользователь найден в списке ЕРКЮ, дата регистрации: <a href="' + chanURL + '/about" style="color:hsl(206.1, 79.3%, 52.7%);text-decoration:none" title="Открыть страницу с датой регистрации">' + arrayERKY[foundID + 1] + "</a>";
    noticespan.style = 'background:rgba(250,100,100,0.3);border-radius:5px;padding:4px 7px 4px 7px;font-weight:400;line-height:3rem;text-transform:none;color:var(--yt-lightsource-primary-title-color)';
  } else {
    noticespan.innerHTML = 'Пользователь не найден в списке ЕРКЮ <a href="' + chanURL + '/about"><img src="' + morange + '" title="Открыть страницу с датой регистрации" /></a>';
    noticespan.style = 'background:rgba(100,100,100,0.2);border-radius:5px;padding:4px 7px 4px 7px;font-weight:400;line-height:3rem;text-transform:none;color:var(--yt-lightsource-primary-title-color)';
  }
  if (!reuse) {
    $(jNode).find('h1#channel-title-container.ytd-c4-tabbed-header-renderer').after(noticespan);
    $(jNode).find('span#subscriber-count.ytd-c4-tabbed-header-renderer').after('<br>');
  }
}

function insertdm(jNode) {
  var videoid = getURLParameter('v', location.search);
  var pNode = $(jNode)[0];
  var newspan = document.createElement('span');
  newspan.innerHTML = '<a id="dmAdd" title="Добавить видео на анализатор Дизлайкметр" href="https://dislikemeter.com/?v=' + videoid + '"><img src="' + imgdma + '" /></a><span style="padding:0 1em 0 0"></span><a style="padding:0 0 0 1px" id="dmGo" title="Открыть статистику видео на анализаторе Дизлайкметр" href="https://dislikemeter.com/video/' + videoid + '" ><img src="' + imgdm + '" /></a>';
  newspan.id = 'dmPanel';
  $(pNode).css('text-align', 'right');
  pNode.insertBefore(newspan, pNode.firstChild);
  $(pNode).find("#dmPanel")[0].addEventListener("click", function dmClick() {
    this.removeEventListener("click", dmClick);
    var newspan = document.createElement('span');
    newspan.innerHTML = '<a target="_blank" title="Помочь проекту Дизлайкметр" href="https://dislikemeter.com/?donate"><img src="' + imgdmd + '" /></a><span style="padding:0 1em 0 0"></span>';
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
    setTimeout(insertdmNew, 300, jNode);
  });
  var videoid = getURLParameter('v', location.search);
  if (typeof videoid === 'undefined') {
    return;
  }
  if (!videoid) {
    return;
  }
  var pNode = $(jNode).parent().parent().parent().find('div#flex')[0];
  if (typeof pNode === 'undefined') {
    return;
  }
  if (GM_config.get('option3')) {
    var btnText = $(pNode).parent().find('ytd-button-renderer.ytd-menu-renderer')[0];
    if ($(btnText).find('yt-formatted-string#text').length > 0) {
      $(btnText).find('yt-formatted-string#text').html('');
    }
    if (!$(pNode).parent().find('ytd-sentiment-bar-renderer#sentiment').is(":visible")) {
      btnText = $(pNode).parent().find('ytd-toggle-button-renderer.ytd-menu-renderer.force-icon-button')[0];
      $(btnText).find('yt-formatted-string#text').html('');
      btnText = $(pNode).parent().find('ytd-toggle-button-renderer.ytd-menu-renderer.force-icon-button')[1];
      $(btnText).find('yt-formatted-string#text').html('');
    }
  }
  pNode.innerHTML = '';
  var newspan = document.createElement('span');
  newspan.innerHTML = '<yt-icon-button style="padding:0 0 0 0" class="style-scope ytd-toggle-button-renderer style-default-active" onclick="window.open(\'https://dislikemeter.com/?v=' + videoid + '\', \'_blank\');" title="Добавить видео на анализатор Дизлайкметр"><a style="padding:0 0 0 1px"><img src="' + imgdma + '" /></a></yt-icon-button><span style="padding:0 0.5em 0 0"></span><yt-icon-button style="padding:0 0 0 0" class="style-scope ytd-toggle-button-renderer style-default-active" onclick="window.open(\'https://dislikemeter.com/video/' + videoid + '\', \'_blank\');" title="Открыть статистику видео на анализаторе Дизлайкметр"><a style="padding:0 0 0 1px"><img src="' + imgdm + '" /></a></yt-icon-button><span style="padding:0 1em 0 0"></span>';
  newspan.id = 'dmPanel';
  $(pNode).css('text-align', 'right');
  pNode.insertBefore(newspan, pNode.firstChild);
  $(pNode).find("#dmPanel")[0].addEventListener("click", function dmClick() {
    this.removeEventListener("click", dmClick);
    var newspan = document.createElement('span');
    newspan.innerHTML = '<yt-icon-button style="padding:0 0 0 0" class="style-scope ytd-toggle-button-renderer style-default-active" onclick="window.open(\'https://dislikemeter.com/?donate\', \'_blank\');" title="Помочь проекту Дизлайкметр"><a style="padding:0 0 0 1px"><img src="' + imgdmd + '" /></a></yt-icon-button><span style="padding:0 0.5em 0 0"></span>';
    $(pNode).find("#dmPanel")[0].insertBefore(newspan, $(pNode).find("#dmPanel")[0].firstChild);
  }, false);
  $(pNode).find("#dmPanel")[0].addEventListener("mouseover", function dmOver() {
    this.removeEventListener("mouseover", dmOver);
  }, false);
}

function insertann(jNode) {
  $(jNode).find('h2.comment-section-header-renderer')[0].style = 'padding-bottom:10;display:inline-flex;align-items:center;line-height:2rem';
  var cfgspan = document.createElement('span');
  cfgspan.innerHTML = '<span style="opacity:0.4">[</span>\uD83D\uDD27<span style="opacity:0.4">]</span>';
  cfgspan.id = 'cfgbtn';
  cfgspan.title = 'Настройки MetaBot for YouTube';
  cfgspan.style = 'margin:-4px 0 0 0.5em;font-size:2.3em;height:2rem;cursor:pointer;color:#000';
  $(jNode).find('h2.comment-section-header-renderer').append(cfgspan);
  var annspan = document.createElement('span');
  annspan.innerHTML = '<span style="display:inline-flex;align-items:center"><span style="opacity:0.4">[</span>\uD83D\uDCE3<span style="color:#555;font-size:0.5em;font-weight:420;margin:-1.8em 0.2em 0 0.2em;height:0.3em;text-transform:none">' + Aparse(annYTOtxt[1], false) + '</span><span style="opacity:0.4">]</span></span>';
  annspan.id = 'annbtn';
  annspan.title = 'Последняя информация от Наблюдателя YouTube (#ЕРКЮ)';
  annspan.style = 'margin:-4px 0 0 0.5em;font-size:2.3em;height:2rem;cursor:pointer;color:#000';
  $(jNode).find('h2.comment-section-header-renderer').append(annspan);
  var ytoinfosspan = document.createElement('span');
  ytoinfosspan.innerHTML = '<span style="float:left;width:40px"><img src="' + imgyto + '" width="40px" height="40px" /></span><span style="float:right;margin: 0 0 0 10px;width:520px"><span id="urlyto" style="font-weight:500;cursor:pointer" data-url="https://www.youtube.com/channel/UCwBID52XA-aajCKYuwsQxWA">Наблюдатель Youtube #ЕРКЮ</span><br><span class="yt-badge" style="margin:4px 0 4px 0;text-align:center;text-transform:none;font-weight:500;width:100%;background-color:hsla(0, 0%, 93.3%, .6)">' + Aparse(annYTOtxt[1], false) + '</span><span id="annholder"></span></span>';
  ytoinfosspan.id = 'ytoinfo';
  ytoinfosspan.style = 'max-width:605px;margin:0 auto 1em auto;display:table';
  $(ytoinfosspan).toggle();
  $(jNode).find('h2.comment-section-header-renderer').after(ytoinfosspan);
  $(jNode).find("span#ytoinfo").toggle();
  var settingsspan = document.createElement('span');
  settingsspan.innerHTML = '<span style="float:left;width:100px"><img src="https://raw.githubusercontent.com/asrdri/yt-metabot-user-js/master/logo.png" width="100px" height="100px" /></span><span style="float:right;margin: 0 0 0 10px;width:460px"><span style="font-weight:500">' + GM_info.script.name + ' v' + GM_info.script.version + '</span>\u2003<span id="urlgithub" style="cursor:pointer" data-url="https://github.com/asrdri/yt-metabot-user-js/">GitHub</span>\u2003<span id="urlissues" style="cursor:pointer" data-url="https://github.com/asrdri/yt-metabot-user-js/issues">Предложения и баги</span><span class="yt-badge" style="margin:4px 0 4px 0;text-align:center;text-transform:none;font-weight:500;width:100%;background-color:hsla(0, 0%, 93.3%, .6)">Настройки</span>Комментарии от известных ботов <select id="mbcddm1"><option value="1">помечать</option><option value="2">скрывать</option></select><span id="mbcswg1"><br style="line-height:2em"><label title="Пункт 5.1.H Условий использования YouTube не нарушается - запросы отправляются со значительным интервалом"><input type="checkbox" id="mbcbox1">Автоматически нажимать \uD83D\uDC4E под комментариями от известных ботов</label></span><br style="line-height:2em"><span id="classicbtn" style="cursor:pointer">Включить новый дизайн YouTube</span><br><span id="resetbtn" style="cursor:pointer">Сбросить настройки</span><span id="configsaved" class="yt-badge" style="margin:4px 0 4px 0;text-align:center;text-transform:none;font-weight:500;width:100%;background-color:hsla(0, 0%, 93.3%, .6);display:none;-webkit-transition: background-color 0.3s ease-in-out;-moz-transition: background-color 0.3s ease-in-out;-ms-transition: background-color 0.3s ease-in-out;-o-transition: background-color 0.3s ease-in-out;transition: background-color 0.3s ease-in-out;">Настройки сохранены. Для вступления в силу необходимо <span style="cursor:pointer;text-decoration: underline" onclick="javascript:window.location.reload();">\uD83D\uDD03обновить страницу</span>.</span></span>';
  settingsspan.id = 'config';
  settingsspan.style = 'max-width:605px;margin:0 auto 1em auto;display:table';
  $(settingsspan).toggle();
  $(jNode).find('h2.comment-section-header-renderer').after(settingsspan);
  $(jNode).find("span#config").toggle();
  var annexspan = document.createElement('span');
  annexspan.innerHTML = Aparse(annYTOtxt[3], false);
  $(jNode).find('span#annholder').append(annexspan);
  $(jNode).find("span#cfgbtn")[0].addEventListener("click", function() {
    $(jNode).find("span#config").toggle();
    $(jNode).find("span#ytoinfo").hide();
  }, false);
  $(jNode).find("span#annbtn")[0].addEventListener("click", function() {
    $(jNode).find("span#ytoinfo").toggle();
    $(jNode).find("span#config").hide();
  }, false);
  $(jNode).find("span#cfgbtn").hover(function() {
    this.style.backgroundColor = 'hsl(206.1, 79.3%, 52.7%)';
  }, function() {
    this.style.backgroundColor = '';
  });
  $(jNode).find("span#annbtn").hover(function() {
    this.style.backgroundColor = 'hsl(206.1, 79.3%, 52.7%)';
  }, function() {
    this.style.backgroundColor = '';
  });
  $(jNode).find("span#classicbtn, span#resetbtn").hover(function() {
    this.style.textDecoration = "underline";
  }, function() {
    this.style.textDecoration = "";
  });
  $(jNode).find("span#urlgithub, span#urlissues, span#urlyto").hover(function() {
    this.style.textDecoration = "underline";
    this.style.color = "hsl(206.1, 79.3%, 52.7%)";
  }, function() {
    this.style.textDecoration = "";
    this.style.color = "";
  });
  $(jNode).find("span#urlgithub, span#urlissues, span#urlyto").click(function() {
    window.open($(this).attr('data-url'));
  });
  $(jNode).find("span#classicbtn").click(function() {
    ytNewDesign();
    saveconfig(jNode);
  });
  $(jNode).find("span#resetbtn").click(function() {
    resetconfig(jNode);
    saveconfig(jNode);
  });
  $(jNode).find("select#mbcddm1").val(GM_config.get('option1'));
  $(jNode).find("input#mbcbox1").prop('checked', GM_config.get('option2'));
  if ($(jNode).find("select#mbcddm1").val() == 2) {
    $(jNode).find("span#mbcswg1").hide();
  }
  $(jNode).find("input#mbcbox1, select#mbcddm1").change(function() {
    if ($(jNode).find("select#mbcddm1").val() == 2) {
      $(jNode).find("span#mbcswg1").hide();
    } else {
      $(jNode).find("span#mbcswg1").show();
    }
    saveconfig(jNode);
  });
}

function saveconfig(jNode) {
  GM_config.set('option1', $(jNode).find("select#mbcddm1").val());
  GM_config.set('option2', $(jNode).find("input#mbcbox1").is(":checked"));
  GM_config.save();
  $(jNode).find("span#configsaved").show();
  $(jNode).find("span#configsaved")[0].style.backgroundColor = 'rgba(40,150,230,1)';
  setTimeout(function(){$(jNode).find("span#configsaved")[0].style.backgroundColor = 'rgba(40,150,230,0)';}, 400);
}

function resetconfig(jNode) {
  $(jNode).find("span#mbcswg1").show();
  $(jNode).find("select#mbcddm1").val(1);
  $(jNode).find("input#mbcbox1").prop('checked', false);
}

function insertannNew(jNode) {
  waitForKeyElements('div#icon-label.yt-dropdown-menu', function(jNode) {jNode[0].innerHTML = '';}, true);
  var cfgspan = document.createElement('span');
  cfgspan.innerHTML = '<span style="opacity:0.4">[</span>\uD83D\uDD27<span style="opacity:0.4">]</span>';
  cfgspan.id = 'cfgbtn';
  cfgspan.title = 'Настройки MetaBot for YouTube';
  cfgspan.style = 'margin:-6px 0 0 0.5em;font-size:3em;height:1.05em;display:inline-flex;align-items:center;cursor:pointer';
  cfgspan.classList.add("content");
  cfgspan.classList.add("ytd-video-secondary-info-renderer");
  $(jNode).find('div#title').append(cfgspan);
  var annspan = document.createElement('span');
  annspan.innerHTML = '<span style="opacity:0.4">[</span>\uD83D\uDCE3<span style="font-size:0.5em;font-weight:420;margin:0 0.2em 0 0.2em">' + Aparse(annYTOtxt[1], true) + '</span><span style="opacity:0.4">]</span>';
  annspan.id = 'annbtn';
  annspan.title = 'Последняя информация от Наблюдателя YouTube (#ЕРКЮ)';
  annspan.style = 'margin:-6px 0 0 0.5em;font-size:3em;height:1.05em;display:inline-flex;align-items:center;cursor:pointer';
  annspan.classList.add("content");
  annspan.classList.add("ytd-video-secondary-info-renderer");
  $(jNode).find('div#title').append(annspan);
  var ytoinfosspan = document.createElement('span');
  ytoinfosspan.innerHTML = '<span style="float:left;width:40px"><img src="' + imgyto + '" width="40px" height="40px" /></span><span style="float:right;margin: 0 0 0 10px;width:585px"><span id="urlyto" style="font-weight:500;cursor:pointer" data-url="https://www.youtube.com/channel/UCwBID52XA-aajCKYuwsQxWA">Наблюдатель Youtube #ЕРКЮ</span><span class="badge badge-style-type-simple ytd-badge-supported-renderer" style="margin:4px 0 4px 0;text-align:center">' + Aparse(annYTOtxt[1], true) + '</span><span id="annholder"></span></span>';
  ytoinfosspan.id = 'ytoinfo';
  ytoinfosspan.classList.add("description");
  ytoinfosspan.classList.add("content");
  ytoinfosspan.classList.add("ytd-video-secondary-info-renderer");
  ytoinfosspan.style = 'max-width:640px;margin:-10px auto 1em auto;display:none';
  $(jNode).find('div#title').after(ytoinfosspan);
  var settingsspan = document.createElement('span');
  settingsspan.innerHTML = '<span style="float:left;width:100px"><img src="https://raw.githubusercontent.com/asrdri/yt-metabot-user-js/master/logo.png" width="100px" height="100px" /></span><span style="float:right;margin: 0 0 0 10px;width:525px"><span style="font-weight:500">' + GM_info.script.name + ' v' + GM_info.script.version + '</span>\u2003<span id="urlgithub" style="cursor:pointer" data-url="https://github.com/asrdri/yt-metabot-user-js/">GitHub</span>\u2003<span id="urlissues" style="cursor:pointer" data-url="https://github.com/asrdri/yt-metabot-user-js/issues">Предложения и баги</span><span class="badge badge-style-type-simple ytd-badge-supported-renderer" style="margin:4px 0 4px 0;text-align:center">Настройки</span>Комментарии от известных ботов <select id="mbcddm1"><option value="1">помечать</option><option value="2">скрывать</option></select><span id="mbcswg1"><br style="line-height:2em"><label title="Пункт 5.1.H Условий использования YouTube не нарушается - запросы отправляются со значительным интервалом"><input type="checkbox" id="mbcbox1">Автоматически нажимать \uD83D\uDC4E под комментариями от известных ботов</label></span><br style="line-height:2em"><label title="Актуально для русского интерфейса и небольшой ширины окна браузера"><input type="checkbox" id="mbcbox2">Скрывать длинные подписи кнопок Мне (не) понравилось / Поделиться</label><br style="line-height:2em"><span id="classicbtn" style="cursor:pointer">Включить классический дизайн YouTube</span><br><span id="resetbtn" style="cursor:pointer">Сбросить настройки</span><span id="configsaved" class="badge badge-style-type-simple ytd-badge-supported-renderer" style="margin:4px 0 4px 0;text-align:center;display:none;-webkit-transition: background-color 0.3s ease-in-out;-moz-transition: background-color 0.3s ease-in-out;-ms-transition: background-color 0.3s ease-in-out;-o-transition: background-color 0.3s ease-in-out;transition: background-color 0.3s ease-in-out;">Настройки сохранены. Для вступления в силу необходимо <span style="cursor:pointer;text-decoration: underline" onclick="javascript:window.location.reload();">\uD83D\uDD03обновить страницу</span>.</span></span>';
  settingsspan.id = 'config';
  settingsspan.classList.add("description");
  settingsspan.classList.add("content");
  settingsspan.classList.add("ytd-video-secondary-info-renderer");
  settingsspan.style = 'max-width:635px;margin:-10px auto 1em auto;display:none';
  $(jNode).find('div#title').after(settingsspan);
  var annexspan = document.createElement('span');
  annexspan.innerHTML = Aparse(annYTOtxt[3], true);
  annexspan.classList.add("content");
  annexspan.classList.add("ytd-video-secondary-info-renderer");
  $(jNode).find('span#annholder').append(annexspan);
  $(jNode).find("span#cfgbtn")[0].addEventListener("click", function() {
    $(jNode).find("span#config").toggle();
    $(jNode).find("span#ytoinfo").hide();
  }, false);
  $(jNode).find("span#annbtn")[0].addEventListener("click", function() {
    $(jNode).find("span#ytoinfo").toggle();
    $(jNode).find("span#config").hide();
  }, false);
  $(jNode).find("span#cfgbtn").hover(function() {
    this.style.backgroundColor = 'hsl(206.1, 79.3%, 52.7%)';
  }, function() {
    this.style.backgroundColor = '';
  });
  $(jNode).find("span#annbtn").hover(function() {
    this.style.backgroundColor = 'hsl(206.1, 79.3%, 52.7%)';
  }, function() {
    this.style.backgroundColor = '';
  });
  $(jNode).find("span#classicbtn, span#resetbtn").hover(function() {
    this.style.textDecoration = "underline";
  }, function() {
    this.style.textDecoration = "";
  });
  $(jNode).find("span#urlgithub, span#urlissues, span#urlyto").hover(function() {
    this.style.textDecoration = "underline";
    this.style.color = "hsl(206.1, 79.3%, 52.7%)";
  }, function() {
    this.style.textDecoration = "";
    this.style.color = "";
  });
  $(jNode).find("span#urlgithub, span#urlissues, span#urlyto").click(function() {
    window.open($(this).attr('data-url'));
  });
  $(jNode).find("span#classicbtn").click(function() {
    ytOldDesign();
    saveconfigNew(jNode);
  });
  $(jNode).find("span#resetbtn").click(function() {
    resetconfigNew(jNode);
    saveconfigNew(jNode);
  });
  $(jNode).find("select#mbcddm1").val(GM_config.get('option1'));
  $(jNode).find("input#mbcbox1").prop('checked', GM_config.get('option2'));
  $(jNode).find("input#mbcbox2").prop('checked', GM_config.get('option3'));
  if ($(jNode).find("select#mbcddm1").val() == 2) {
    $(jNode).find("span#mbcswg1").hide();
  }
  $(jNode).find("input#mbcbox1, input#mbcbox2, select#mbcddm1").change(function() {
    if ($(jNode).find("select#mbcddm1").val() == 2) {
      $(jNode).find("span#mbcswg1").hide();
    } else {
      $(jNode).find("span#mbcswg1").show();
    }
    saveconfigNew(jNode);
  });
}

function saveconfigNew(jNode) {
  GM_config.set('option1', $(jNode).find("select#mbcddm1").val());
  GM_config.set('option2', $(jNode).find("input#mbcbox1").is(":checked"));
  GM_config.set('option3', $(jNode).find("input#mbcbox2").is(":checked"));
  GM_config.save();
  $(jNode).find("span#configsaved").show();
  $(jNode).find("span#configsaved")[0].style.backgroundColor = 'rgba(40,150,230,1)';
  setTimeout(function(){$(jNode).find("span#configsaved")[0].style.backgroundColor = 'rgba(40,150,230,0)';}, 400);
}

function resetconfigNew(jNode) {
  $(jNode).find("span#mbcswg1").show();
  $(jNode).find("select#mbcddm1").val(1);
  $(jNode).find("input#mbcbox1").prop('checked', false);
  $(jNode).find("input#mbcbox2").prop('checked', true);
}

function parseitem(jNode) {
  var pNode = $(jNode).parent().parent()[0];
  $(pNode).hover(function blockShow() {
    $(pNode).find("#t30sp").show();
  }, function blockHide() {
    $(pNode).find("#t30sp").hide();
  });
  pNode = jNode[0];
  var userID = $(jNode).find("a")[0].href.split('/').pop();
  var foundID = arrayERKY.indexOf(userID);
  var comURL = $(jNode).find("span.comment-renderer-time")[0];
  if ($(jNode).find("span.comment-renderer-linked-comment").length > 0) {
    comURL = $(jNode).find("span.comment-renderer-linked-comment")[0];
  }
  var t30span = document.createElement('span');
  t30span.innerHTML = '\u2003<span id="about" style="cursor: pointer" title="Открыть страницу с датой регистрации">\u2753</span>\u2003<span id="top30" style="cursor: pointer" title="Найти другие комментарии автора с помощью агрегатора ТОП30"><font color="#7777fa">top</font><font color="#fa7777">30</font></span>';
  t30span.id = 't30sp';
  t30span.style = "display:none";
  if (foundID > -1) {
    console.log("[MetaBot for Youtube] user found in ERKY-db: " + userID);
    if (GM_config.get('option1') == 2) {
      var hidspan = document.createElement('span');
      hidspan.innerHTML = 'Комментарий скрыт: пользователь найден в списке ЕРКЮ';
      hidspan.classList.add('yt-badge');
      hidspan.style = 'margin:0 0 10px 0;text-align:center;text-transform:none;font-weight:500;width:100%;background-color:hsla(0, 0%, 93.3%, .6)';
      $(jNode).parent().parent().after(hidspan);
      $(jNode).parent().parent().hide();
    } else {
      markred(pNode, arrayERKY[foundID + 1]);
    }
    $(comURL).after(t30span);
  } else {
    var newspan = document.createElement('span');
    newspan.innerHTML = '<img id="checkbtn" src="' + checkb + '" title="Проверить дату регистрации" style="cursor: help" />';
    newspan.id = 'checksp';
    pNode.insertBefore(newspan, pNode.firstChild);
    t30span.innerHTML += '\u2003<span id="sendlinkoff" style="cursor: not-allowed" title="Извините, сообщения временно не принимаются">Сообщить</span><span id="sendlink" style="cursor: pointer; display: none" title="Помогите пополнить список известных ботов - отправьте нам ссылку на подозрительный комментарий">Сообщить</span>';
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
  }, false);
}

function parseitemMob(jNode) {
  var userID = $(jNode).find("a")[0].href.split('/').pop();
  var foundID = arrayERKY.indexOf(userID);
  if (foundID > -1) {
    console.log("[MetaBot for Youtube] user found in ERKY-db: " + userID);
    markredMob(jNode, arrayERKY[foundID + 1]);
  } else {
    $(jNode)[0].addEventListener("touchstart", function () {
      $(this).data('moved', '0');
    }, false);
    $(jNode)[0].addEventListener("touchmove", function () {
      $(this).data('moved', '1');
    }, false);
    $(jNode)[0].addEventListener("touchend", function ttend() {
      if ($(this).data('moved') == 0){
        if (['en', 'en-US', 'en-GB', 'ru', 'uk', 'be', 'bg'].indexOf(currentlangmob()) < 0) {
          alert('Функция поддерживается только на языках:\n \u2714 English\n \u2714 Русский\n \u2714 Українська\n \u2714 Беларуская \u2714 Български\nВы можете сменить язык интерфейса в меню настроек YouTube.');
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
  var foundID = arrayERKY.indexOf(userID);
  var comURL = $(jNode).find("#published-time-text")[0];
  var t30span = document.createElement('span');
  t30span.innerHTML = '\u2003<span id="about" style="cursor: pointer" title="Открыть страницу с датой регистрации">\u2753</span>\u2003<span id="top30" style="cursor: pointer" title="Найти другие комментарии автора с помощью агрегатора ТОП30"><font color="#7777fa">top</font><font color="#fa7777">30</font></span>';
  t30span.id = 't30sp';
  t30span.style = "display:none";
  var newspan = document.createElement('span');
  newspan.id = 'checksp';
  if (foundID > -1) {
    console.log("[MetaBot for Youtube] user found in ERKY-db: " + userID);
    if (GM_config.get('option1') == 2) {
      var hidspan = document.createElement('span');
      hidspan.innerHTML = 'Комментарий скрыт: пользователь найден в списке ЕРКЮ';
      hidspan.classList.add('badge');
      hidspan.classList.add('badge-style-type-simple');
      hidspan.classList.add('ytd-badge-supported-renderer');
      hidspan.style = 'margin: 0 0 10px 0;text-align:center';
      $(jNode).parent().parent().after(hidspan);
      $(jNode).parent().parent().hide();
    } else {
      markredNew($(pNode).parent(), arrayERKY[foundID + 1]);
    }
    $(comURL).append(t30span);
    $(newspan).attr('data-chan', $(jNode).find("a#author-text")[0].href);
    pNode.insertBefore(newspan, pNode.firstChild);
  } else {
    newspan.innerHTML = '<img id="checkbtn" src="' + checkb + '" title="Проверить дату регистрации" style="cursor: help" />';
    $(newspan).attr('data-chan', $(jNode).find("a#author-text")[0].href);
    pNode.insertBefore(newspan, pNode.firstChild);
    t30span.innerHTML += '\u2003<span id="sendlinkoff" style="cursor: not-allowed" title="Извините, сообщения временно не принимаются">СООБЩИТЬ</span><span id="sendlink" style="cursor: pointer; display: none" title="Помогите пополнить список известных ботов - отправьте нам ссылку на подозрительный комментарий">СООБЩИТЬ</span>';
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
  var checkre = $(jNode).find("#checksp")[0];
  if (typeof checkre !== 'undefined') {
    if ($(checkre).attr('data-chan') !== $(jNode).find("a#author-text")[0].href) {
      $(jNode).find("#checksp").remove();
      $(jNode).find("#t30sp").remove();
      $(jNode).find("#botmark").remove();
      var cNode = $(jNode).parent().parent().find("#content-text");
      $(cNode).parent().removeAttr('style');
      $(cNode).removeAttr('style');
      $(jNode).find("ytd-toggle-button-renderer.ytd-comment-action-buttons-renderer:eq(1)").removeAttr('style');
      parseitemNew(jNode);
    }
  }
}

function deleteitemNew(jNode, url) {
  if (url.length > 74) {
    $(jNode).parent().parent().remove();
  } else {
    $(jNode).parent().parent().parent().remove();
  }
}

function sendinfo(jNode, link, username, regexpid) {
}

function checkdate(jNode) {
  if (['en', 'en-US', 'en-GB', 'ru', 'uk', 'be', 'bg'].indexOf(currentlang()) < 0) {
    alert('Функция поддерживается только на языках:\n \u2714 English\n \u2714 Русский\n \u2714 Українська\n \u2714 Беларуская \u2714 Български\nВы можете сменить язык интерфейса в меню настроек YouTube.');
    return;
  }
  $(jNode).find("img")[0].remove();
  var channelURL = $(jNode).find("a")[0].href + '/about';
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        var response = request.responseText;
        if (response !== "") {
          console.log("[MetaBot for Youtube] XMLHttpRequest succeed.");
          window.tempHTML = document.createElement('html');
          tempHTML.innerHTML = response;
          window.aboutSTAT = tempHTML.getElementsByClassName('about-stat');
          var testday = Dparse(aboutSTAT[aboutSTAT.length - 1].innerHTML);
          if (Date.parse(testday) > botTargetDay) {
            $(jNode).find("a")[0].innerHTML = $(jNode).find("a")[0].innerHTML + ' <img src="' + morange + '" title="Дата регистрации позже 1 июня 2017" /> ' + testday;
            $(jNode).next().css({
              "background": "rgba(250,200,0,0.3)",
              "border-left": "3px solid rgba(250,200,0,0.3)",
              "padding-left": "3px"
            });
          } else {
            $(jNode).find("a")[0].innerHTML = $(jNode).find("a")[0].innerHTML + ' <img src="' + mgreen + '" title="Дата регистрации раньше 1 июня 2017" /> ' + testday;
            $(jNode).next().css({
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
    if (request.readyState === 4) {
      if (request.status === 200) {
        var response = request.responseText;
        if (response !== "") {
          console.log("[MetaBot for Youtube] XMLHttpRequest succeed.");
          var matches = regexdatemob.exec(response);
          var testday = Dparse(decodeURIComponent(JSON.parse('"' + matches[2] + '"')));
          if (Date.parse(testday) > botTargetDay) {
            $(jNode).parent().find("div.erb").find("a")[0].innerHTML = $(jNode).parent().find("div.erb").find("a")[0].innerHTML + ' <img src="' + morange + '" title="Дата регистрации позже 1 июня 2017" /> ' + testday;
            $(jNode).parent().find("div.zqb").css({
              "background": "rgba(250,200,0,0.3)",
              "border-left": "3px solid rgba(250,200,0,0.3)",
              "padding-left": "3px"
            });
          } else {
            $(jNode).parent().find("div.erb").find("a")[0].innerHTML = $(jNode).parent().find("div.erb").find("a")[0].innerHTML + ' <img src="' + mgreen + '" title="Дата регистрации раньше 1 июня 2017" /> ' + testday;
            $(jNode).parent().find("div.zqb").css({
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
  if (['en', 'en-US', 'en-GB', 'ru', 'uk', 'be', 'bg'].indexOf(currentlang()) < 0) {
    alert('Функция поддерживается только на языках:\n \u2714 English\n \u2714 Русский\n \u2714 Українська\n \u2714 Беларуская \u2714 Български\nВы можете сменить язык интерфейса в меню настроек YouTube.');
    return;
  }
  var idspan = document.createElement('span');
  idspan.id = 'checked';
  idspan.innerHTML = 'checked';
  $(jNode).find("#checkbtn")[0].remove();
  var userID = $(jNode).find("a")[0].href.split('/').pop();
  var foundID = arrayERKY.indexOf(userID);
  if (foundID > -1) {
    console.log("[MetaBot for Youtube] user found in ERKY-db: " + userID);
    markredNew(jNode, arrayERKY[foundID + 1]);
  } else {
    var channelURL = $(jNode).find("a")[0].href + '/about';
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          var response = request.responseText;
          if (response !== "") {
            console.log("[MetaBot for Youtube] XMLHttpRequest succeed.");
            var matches = regexdate.exec(response);
            var testday = Dparse(matches[2]);
            var aNode = $(jNode).find("#author-text")[0];
            var cNode = $(jNode).parent().find("#content-text")[0];
            var newspan = document.createElement('span');
            newspan.id = 'botmark';
            var checkBadge = $(aNode).parent().find('span#author-comment-badge')[0];
            if (Date.parse(testday) > botTargetDay) {
              newspan.innerHTML = '<img src="' + morange + '" title="Дата регистрации позже 1 июня 2017" /> ' + testday;
              $(aNode).append(newspan);
              if ($(checkBadge).length > 0) {
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
              if ($(checkBadge).length > 0) {
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
  $(jNode).find("a")[0].innerHTML = $(jNode).find("a")[0].innerHTML + ' <img src="' + mred + '" title="- найден в списке #ЕРКЮ, дата регистрации -" /> ' + day;
  $(jNode).next().css({
    "background": "rgba(250,100,100,0.3)",
    "border-left": "3px solid rgba(250,100,100,0.3)",
    "padding-left": "3px"
  });
  if (GM_config.get('option2') === true) {
    requestDislike(jNode, false);
  }
}

function markredMob(jNode, day) {
  $(jNode).parent().find("div.erb").find("a")[0].innerHTML = $(jNode).parent().find("div.erb").find("a")[0].innerHTML + ' <img src="' + mred + '" title="Пользователь найден в списке ЕРКЮ" /> ' + day;
  $(jNode).parent().find("div.zqb").css({
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
  newspanN.innerHTML = '<img src="' + mred + '" title="- найден в списке #ЕРКЮ, дата регистрации -" /> ' + day;
  $(aNode).append(newspanN);
  var checkBadge = $(aNode).parent().find('span#author-comment-badge')[0];
  if ($(checkBadge).length > 0) {
    $(checkBadge).attr('hidden', '');
    $(aNode).removeAttr('hidden');
  }
  $(cNode).parent().css({
    "background": "rgba(250,100,100,0.3)",
    "border-left": "3px solid rgba(250,100,100,0.3)",
    "padding-left": "3px"
  });
  if (GM_config.get('option2') === true) {
    requestDislike(jNode, true);
  }
}

function requestDislike(jNode, isNew) {
  var element;
  if (isNew) {
    element = $(jNode).parent().find("ytd-toggle-button-renderer.ytd-comment-action-buttons-renderer:not(.style-default-active)")[1];
  } else {
    element = $(jNode).parent().find(".yt-uix-button.comment-action-buttons-renderer-thumb[aria-checked='false']")[1];
  }
  if (element) orderedClicksArray.push(element);
  if (bDTaskSet == 0) {
    bDTaskSet = 1;
    setTimeout(scheduledDislike, minDCTime + Math.random() * (maxDCTime - minDCTime), isNew);
  }
}

function scheduledDislike(isNew) {
  if ( bDBlur || document.querySelector('paper-dialog.ytd-popup-container:not([style*="display:none"]):not([style*="display: none"])') || document.querySelector('div.yt-dialog-fg-content.yt-dialog-show-content') ) {
    setTimeout(scheduledDislike, minDCTime + Math.random() * (maxDCTime - minDCTime), isNew);
  } else {
    if (orderedClicksArray.length) {
      var element = orderedClicksArray.shift();
      if ( (isNew && !(element.classList.contains("style-default-active"))) || (element.getAttribute("aria-checked") == "false") ) {
        $(element).css({"background": "rgba(250,100,100,0.3)"});
        if (isNew) {$(element).css({"border-radius": "50%"});}
        element.click();
      } else {
        setTimeout(scheduledDislike, 100, isNew);
        return;
      }
      setTimeout(scheduledDislike, minDCTime + Math.random() * (maxDCTime - minDCTime), isNew);
    } else {
      bDTaskSet = 0;
    }
  }
}

function Dparse(day) {
  day = day.replace(/Joined |Дата регистрации: |Ви приєдналися |Член от |Далучыўся(-лася) /i, '');
  day = day.replace(/ янв\. | января | січ\. |\.01\./i, ' Jan, ');
  day = day.replace(/ февр\. | февраля | лют\. |\.02\./i, ' Feb, ');
  day = day.replace(/ мар\. | марта | бер\. |\.03\./i, ' Mar, ');
  day = day.replace(/ апр\. | апреля | квіт\. |\.04\./i, ' Apr, ');
  day = day.replace(/ мая\. | мая | трав\. |\.05\./i, ' May, ');
  day = day.replace(/ июн\. | июня | черв\.|\.06\./i, ' Jun, ');
  day = day.replace(/ июл\. | июля | лип\. |\.07\./i, ' Jul, ');
  day = day.replace(/ авг\. | августа | серп\. |\.08\./i, ' Aug, ');
  day = day.replace(/ сент\. | сентября | вер\. |\.09\./i, ' Sep, ');
  day = day.replace(/ окт\. | октября | жовт\. |\.10\./i, ' Oct, ');
  day = day.replace(/ нояб\. | ноября | лист\. |\.11\./i, ' Nov, ');
  day = day.replace(/ дек\. | декабря | груд\. |\.12\./i, ' Dec, ');
  day = day.replace(/ г\.| р\./i, '');
  return day;
}

function Aparse(text, isNew) {
  text = text.replace(/&/g, '&amp;');
  text = text.replace(/</g, '&lt;');
  text = text.replace(/>/g, '&gt;');
  text = text.replace(/\r\n/g, '<br>');
  if (isNew) {
    text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" style="color:rgba(39,147,230,1);">$1</a>');
  } else {
    text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>');
  }
  text = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  text = text.replace(/\*(.*?)\*/g, '<i>$1</i>');
  text = text.replace(/__(.*?)__/g, '<u>$1</u>');
  return text;
}

function currentlang() {
  return regexlang.exec(document.body.innerHTML)[1];
}

function currentlangmob() {
  return document.documentElement.lang;
}

function getURLParameter(name, link) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)').exec(link) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function ytOldDesign() {
  var getDesignCookie = function (cookie) {
    var prefs = cookie.split("; ").filter(function (v) {
      return v.indexOf("PREF=") === 0;
    })[0];
    if (!prefs) {
      return "PREF=f6=8";
    }
    var entries = prefs.substr(5).split('&');
    var set = false;
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].indexOf("f6=") === 0) {
        set = true;
        entries[i] = "f6=8";
      }
    }
    if (!set) {
      entries.push("f6=8");
    }
    return "PREF=" + entries.join('&');
  };
  document.cookie = getDesignCookie(document.cookie) + ";domain=.youtube.com;path=/";
}

function ytNewDesign() {
  var requestP = new XMLHttpRequest();
  requestDB.open("POST", "https://www.youtube.com/new?optin=true", true);
  requestDB.send(null);
}

$(window).focus(function() {
  bDBlur = 0;
});

$(window).blur(function() {
  bDBlur = 1;
});

function waitForKeyElements(selectorTxt, actionFunction, bWaitOnce, iframeSelector) {
  var targetNodes, btargetsFound;
  if (typeof iframeSelector == "undefined") targetNodes = $(selectorTxt);
  else targetNodes = $(iframeSelector).contents().find(selectorTxt);
  if (targetNodes && targetNodes.length > 0) {
    btargetsFound = true;
    targetNodes.each(function() {
      var jThis = $(this);
      var alreadyFound = jThis.data('alreadyFound') || false;
      if (!alreadyFound) {
        var cancelFound = actionFunction(jThis);
        if (cancelFound) btargetsFound = false;
        else jThis.data('alreadyFound', true);
      }
    });
  } else {
    btargetsFound = false;
  }
  var controlObj = waitForKeyElements.controlObj || {};
  var controlKey = selectorTxt.replace(/[^\w]/g, "_");
  var timeControl = controlObj[controlKey];
  if (btargetsFound && bWaitOnce && timeControl) {
    clearInterval(timeControl);
    delete controlObj[controlKey];
  } else {
    if (!timeControl) {
      timeControl = setInterval(function() {
        waitForKeyElements(selectorTxt, actionFunction, bWaitOnce, iframeSelector);
      }, 300);
      controlObj[controlKey] = timeControl;
    }
  }
  waitForKeyElements.controlObj = controlObj;
}