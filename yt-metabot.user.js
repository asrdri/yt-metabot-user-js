// ==UserScript==
// @name         MetaBot for YouTube
// @namespace    yt-metabot-user-js
// @description  More information about users and videos on YouTube.
// @version      200820
// @homepageURL  https://vk.com/public159378864
// @supportURL   https://github.com/asrdri/yt-metabot-user-js/issues
// @updateURL    https://raw.githubusercontent.com/asrdri/yt-metabot-user-js/master/yt-metabot.meta.js
// @downloadURL  https://raw.githubusercontent.com/asrdri/yt-metabot-user-js/master/yt-metabot.user.js
// @icon         https://raw.githubusercontent.com/asrdri/yt-metabot-user-js/master/logo.png
// @include      https://*youtube.com/*
// @include      https://*dislikemeter.com/?v*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// @require      https://raw.githubusercontent.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
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
    },
    'option4': {
      'label': 'Use additional lists',
      'type': 'checkbox',
      'default': true
    },
    'option5': {
      'label': 'Send alert to server',
      'type': 'checkbox',
      'default': false
    },
    'listp1': {
      'label': 'Bookmarks (personal list)',
      'type': 'text',
      'default': ''
    },
    'listc1': {
      'label': 'Custom list URL 1',
      'type': 'text',
      'default': 'https://github.com/asrdri/yt-metabot-user-js/raw/master/list-sample.txt'
    },
    'listc2': {
      'label': 'Custom list URL 2',
      'type': 'text',
      'default': ''
    },
    'listc3': {
      'label': 'Custom list URL 3',
      'type': 'text',
      'default': ''
    },
    'colorp1': {
      'label': 'Personal color',
      'type': 'int',
      'default': '33023'
    },
    'colorc1': {
      'label': 'Custom color 1',
      'type': 'int',
      'default': '8388863'
    },
    'colorc2': {
      'label': 'Custom color 2',
      'type': 'int',
      'default': '16744448'
    },
    'colorc3': {
      'label': 'Custom color 3',
      'type': 'int',
      'default': '8421504'
    }
  },
});

const checkb = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAPCAMAAADXs89aAAAA+VBMVEUAAAD///+qqqp/f39mZmZubm5vb29sbGxtbW1tbW1tbW1ubm5ubm5tbW1ubm5tbW1ubm5ubm5ubm5tbW1tbW1ubm5ubm5tbW1ubm5ubm5tbW1ubm5ubm5vb29wcHBxcXFzc3N0dHR1dXV3d3d4eHh6enp7e3t8fHyAgICCgoKFhYWMjIyOjo6Pj4+QkJCSkpKUlJSWlpaZmZmampqdnZ2hoaGqqqqwsLC0tLS1tbW2tra5ubm+vr7ExMTKysrLy8vQ0NDR0dHS0tLU1NTV1dXW1tbe3t7i4uLj4+Pk5OTl5eXn5+fo6Ojq6urs7Ozu7u7w8PD9/f3////SCMufAAAAHHRSTlMAAAMEBSUnKCpbXV9htre6u87Q0dPp6uvs7u/8pkhKVQAAAMdJREFUeNpN0NdWwlAUANEbgvTeQhnQIE1B1ChYQcEC0gL+/8ewzPWwmMf9OMowDKWUP5YqU0pGTaXTHMqdOcM7G7LBIw4Vnc3b89i9BytwYH+uv7oAOqsbyJjCMb4d/urOgYhwqr55wmvdhIRwufXT0zzrgCVM1X2tA5xva1ARLvE4aQCMXoCCcJLaZNpvX71/3QJx4ShUBx+Lz4fp7hrCwmYWL3v5u7XTPmEVtLRfuk7+5OhJIKP9NO2psDIjCatSiId9/7oHY28awgWqV+8AAAAASUVORK5CYII=';
const minf = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAM1BMVEUAAAB/f39vb29sbGxtbW1ubm5ubm5sbGxubm5ubm7////Pz8+Li4uampp8fHzb29uSkpKUSDd+AAAACXRSTlMABCcoXbfQ6/zS5clrAAAAYUlEQVQIHQXBAQLCMAgEsBxs+v/32oJJkE5lZ+8Suhu4Z7R6m2c/NVW28zbmew8xeV4A+FWgkjSkCuYDqAo4gNQCgK0BAFMLHsD2pqjL1rqnSSysOdt2U8C9I0insrN3+QOBPC04AhR0BwAAAABJRU5ErkJggg==';
const mred = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAApVBMVEUzMzP/MzP+MzP+MzP+MzP+MzP9MzP+NTP+NTP/XDP+NTP+NTP+MzP+MzP+NDP+NDP+PTP9NDP+OTP9MzP+NTP+NTP+MzP5MzP/MzP/////e3v/NTP/PT3/Tk7/YWH/UVH/TU3/9/f/+fn/cnL/5eX/QED/ZGT/09P/1tb/wcH/xcX/6Oj/Z2f/hYX/aWn/b2//39//cXH/dXX/oqL/paX/T0//dnb54rKOAAAAGHRSTlMABFzrJurQ1O4Fu+8nt7nQKv1ht17tzyc2HRLDAAAAj0lEQVQIHQXABVIDARAEwLmLuwK9SXB35/9Po5JktB5P9sP5tkmSZDlwsdvtfi2mSbI84rqqvuh1k9EAZ1V1h36TNZxW1Tm0GcOhqm5hlgm4rCvQyR7c1DNYZQju6wF0MgeP9QQ22YKX1zfQplnA+8cnHDfJtIfv+kGvmyQnfQ5/B/rdJEmadtZZdTZtk+QfVeIRvDroEMEAAAAASUVORK5CYII=';
const imgdm = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAACfFBMVEUAAAD+wgD+wQD+wQD/qgD/vwD1ugD+wQD/vwD+wQD+wQD+wgD+wgD5vwD+xwD9wAD7vwD5vQD+wQD1uwD/zADyuAD0uQDyuADytwDzuADxtwDztwDytwDwuAD+wgDzuAD+wgDyuQD+wgD1ugDxtwD0tgBaanv+wgBEW5H+wAD+wQDytwDxtgBIXpL+wQBPZZb+wgD+wQBmeKP+wgBXa5r//wD+wQBic5ldcZ9ccJ5SZ5dEW5H+wgD+wgBlcHD+wAD+wQBEXZD+wQD3vADzuAB0dGltfaZKX5T+xAD6vgDfnwBGXJFVaZpfcp5EWpD/wgDyuAD+wQD19fVuf7OOeiHyugT7vwD+wgCykRY8RTno6OiGgF1oeq7ksQinsc3nswf7vwHyuwr8wQL9wQD2zEf068/18OP03pj20mGBgnjv7++oscV9e2dpe6/CmxL11nf18uv11nb9wAByaCn2uwCrjBj8wADl5uZqd5J+fGiXiE3rtAXj5einsMWZiUrz8/NYaI1SZ5xCSTj8wAH3yDX9wQK0mTpTaJtabqNZbqJUaZrh5Orb3OF1aihESjdSZ5r03ZP06cSAjalpcHemiRr6vgD09PTBmhKFf1+0vNTp6enbqwpeWy/YrR7GoizIoyuwlz2dqcM2QTtvgKjKpSmReyD4vgVpdo32zUnxugv3vgb7wAT6wQz1ugD0ugAoOD/6wAn179310FgwPT2ihhvEnBFZWDHl5eb5vQCEfmDR1Nvv8PLr6+uEkrFARzi4lBW3lBWMgljS1+Ht7e2VoLs/RziSfCC6wdivjxdHTDbN0t7n6e34vQLutwV/cCb4vQD10V318ef2yTv0uQDkLrBbAAAAT3RSTlMATOr6AwQ4shjgmfhtLBf5/vJjNQWgSfyz2PuA8CT3wOdUvsaHMR9+ZCn+jDi3t9Au+fR22AKW7+XlyjiC+zJB0Typ+MPO9xgaMwg61+5oF3I9zwAAAY1JREFUeAFtzfObG1EUxvETu7Zt2zb63snERVMbTZPatm3b7tr2/kN7JzO7d7PPfn79Pue8pLE6LbamzZr37NWbEjSxO6DyfenakgSdHkJ5h45G0rQwoL7brLVJuxBB9Y8NVDf0aCjatg1xdmD7Q8B/qwRAzAt4YxHWvhWR1QFcLgOWf10J4EQACFxBlHUncgK4+/PX7z+PwL1OS8/IzYOPtSOygCsofLG7FFzYEwx6wpBYJxPZ0Jhq1pm6QPjwftVqxH1mg8ggwqtjx6/e3KrYf+CgmbpBI+1ZukyWVxQrDh0+4qIeiPv47tr1G9tkOd+tuPN3Xx/qC27N2nXrN2zcpBVu85Z+1H8AENmxc9cnCf9FOZo0mGgIpIrKKgkQhds7lGjY8G/ff/jB3ePlvlYejCCikSdPnYbizNlz5y9cVL9dGsXL6DFQ+R8/efrsuTv0cuy48RMmEmecNBm13rxNTkmdQnWmToNGyszKzplOgkk3Qw9IvpmzZheF5sylBMZ5882uBbRw0eIlpKgB/8u5fuwF0eAAAAAASUVORK5CYII=';
const imgdma = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAABsFBMVEUAAAD+wQD+wgD/qgD+wQD/vwD+wQD+wgD+wgD+wQD+xwBatlz/vwD+wQBft1n+wQDxtwD1ugD9wADyuAD0uQD/zAD7vwD5vQDxtwDzuADyuQDztwDyuADytwDytwDytwDwuAD+wgD0tgCstyvzuAD1uwD+wgD+wgD+wgD+wAD+wQD+wQD+wgD+wQD+wgD//wD+wQD+wgD+wgD+wAD+wQD+wQD+xACtvC1Ztl3/wgD///97uEnyuAD+wQCBu1CWujp7xX32uwCOeiGrjBiykRabx2qc1J5nvWryugRat108RTn7vwH7vwD+wgD9wADxwAb4vQB/cCaSfCAoOD95tkmGt0CihhteWy+ReyDBmhIwPT1HTDb8wAB6t0n6vgD7wAT2zUn03ZP06cR4wXQ2QTv9wQD2zEf068/18OP03pj20mF5ulhyaCnutwX11nf18uv11nb6wQzbqwr10V318ef2yTvksQjCmxI/Rzj6wAn179310FimiRr8wAH3yDX9wQKV0ZdZWDFARzj0uQD5vQDnswdCSTi4lBVESjeKukCvjxe3lBV1aij0ugD4vQLEnBHgcTooAAAAOXRSTlMA6kwD+gTgbfiyF+gYmd5jh8b5/EkF/vL72FSAoLOM8CT3MVjANee+fin+ty75dgKWgvtB0akaVEpkodaYAAABOUlEQVR4XnXPVXMiURCG4SYES4C4u7uvfSO4S9zd3d3d1/5yOAWEGYq8N33xVFdXUyS9RqfOzM3LSK8kWSkGLcIF/lbXSCBJgVi9+UXKKKQlQ9q0UKyKbMgBeBRKwzcUiM+alc3EAJzsA8HLfwDsHsBj7xYKcoj0WuBPH3A88ATg2QE4XmEVCok0AMbGh//fjQDA6P3L79N+BIQSIh0AvE8sbm4x8dt8PpsfolCmIjUS9SCUU0UMesx8KKfTxPODQ1UkecbsZXGchQ0j1UZBnJySipfqwjAzOze/IJd6BkvLK6tr6xtyaWgEurd3dvdE8HKhJogHh0ciACcnyUXU3HJ2fhFEAqHWq+sbsEwWFsfdsuEOSVs7wsXfIVJ2dCYUVte3r4RUSd8VeJNKKn2m/PHTyMTlcjP49QE0u4VtSVu7kQAAAABJRU5ErkJggg==';
const imgdmd = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAZCAMAAACM5megAAAAllBMVEUAAAB/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f3+AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAx6H3iAAAAMXRSTlMABAgMFBgcICQoLDA8QERITFBUWGBkaGx4fICDj5OXo6evs7e7v8PH09ff4+fr8/f7vr5GKgAAAN1JREFUGBl9wY1agjAABdAbIoSCWiIJLn8yLKNN7vu/XBvQJ87JOegZLfJDaew3U7ilklcfAW5EiTb7JGtRGFtq8hV9BTsntH5orNH3VrNx9mB4kkYdo29xoUPlAwgCtIKaLgJAqkI0BJ0qABEFGme6xQBUCXhhOOUDuycI7jCRHCAlmSDnsEsGrDjgmL6MAYxOfGyGTiwquikPV0s6bdF3oIMao+9Z8d4Gt5KadxJYMt7xYclok7AJar+KRvVFrYTtSC1Ca07tHbZvkhU6KbUlbPOiyCfo+OuiWOHfHxHEYF/PvYVrAAAAAElFTkSuQmCC';
const imgyto = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAACJVBMVEX///+qAADMMzP/MzPjKiXbJiPVIyPZJSPFGx/QIiLBGB7cKSXRIiLeKSnkKyfOICHcIiLRISLJHB7jKybCGB/QISHVKSDgKifMGRnhKyXMHR/CGR3ZJSPiLCbdKSXiKybFFyLCGR7WJCLdJyTDGB3JHSDhKiXIHB/ZJiPMHiHQIiLXIyPTIyLKHR/FGCDFGh/lMxnjKyXDGR3GGx/cJyTEGR7BGh7NICDUIiLOHiPcLiLiKyXgKSXhKyXPHyHXJSPNICDgKibgKSbJHB/XJCPnLiLfKSXfKSTfKSbDGR7EGR7KHB/CGR3CGB3CGB7BGB7BGB3BGR3////NHyHLHiDo4ODWJCPMHiD//v7p4eHaJyTZJiTYJiTOICHXJSPYJSPPICHeKSXQISHVJCPunZzFGh/UIyPqmpvnzMv89PTlxMTYUVL78vL08fHomZrzzM399/f+/Pzm09PXTk7QNDbfKiXGGx/pmprnj47XSUvktrbompryxMXVOTncKCXKHSDHHB/t5+f7+vrdKCXbJyTsnJvcOTfhgYDIHB/18fHqm5v05eXaMzHZVFTYTEvHGx/++vrZLy3spKThiYnTLi78+vrs19fqnJzYKynVNDXjrq7VPT7rm5vJHSDebm3XKCbRISLZWFrTIyLSIiLtrKzEGh7cZmXWJiXgKibvtLTWQ0Tlvr7bXVzfd3bwvL3sm5vjW1nTIiLDGh7hKybtnJviKybCGR58TkH5AAAAUnRSTlMAAwUFie17+rn8r7n8HzqvFu9b73vWH1sK54nnida5/BaYr1uJ7fqal+cWOu/6H5oKr/q5mls6H9Y6Fnzte3vnfJeYmOcW7Zqa7e2Y1u/8/O/WqnF1KAAAAb9JREFUeF6FzGOb61AYheGV1B3btu05tLHbsY1j27Zt2/h9k7SnyZt0p7m/ruda0BAi59VkxGVlxWXUtEUKMBJhTflLpFgjwNO6qPC3TuHiZQiStPwDR3sStCwr9hpYaQFRnTliKLOa/IWNhBCmftafDqk+0OUdM5EHn2jbGRO2aMiKexU/zvVyFUOS6OhTjG85cKWPw5EIIL1fNc7Y5fM3+4OlA8KCIdUfxtjde18fDOktFVA2SEih5OL0s+eDOmWwdxJnmc+pk7Pv3ndq2JE7Rsih/7Tn85cxKhfNk8R3qQmcdhy6SpZmlL8injDV1p6OR9eUpRyun4Qc0tNduwOLC+GviUuMmrl9R1nCEfOCoOGO+w/JEoOEUWJKyW7cOjpKJSBqmNjP/Ha+eTysFYX5A4Q/7P74aUBvIVo8hBx2fzvoCdYCoYSEhxk7stnDUSIAqV2qbdtfdnGlAmiq8Cr2ePkqmiBZctzUGshKC56aKCiFT+wFE7H4r+hESEUIEOuuh1AnQpHs3GfImQxCrJowUCVCq2HVW47VDQiSnVP7S6c2Jxs8lflp/4i0/EoYERrj3WvXrd+wcZM7vlEANQfRAClqAtKfNQAAAABJRU5ErkJggg==';
const regexalt = /\{(.*?)\}/;
const regexdate = /joinedDateText(.*?)ext":"(.*?)ext":"(.*?)"}/;
const regexid = /"video_id":"(.*?)"/;
const regexlinew = /"logged_in","value":"(.*?)"/;
const regexliold = /"logged_in":"(.*?)"/;
const regexun = /"user_display_name":"(.*?)"/;
const regexlang = /"hostLanguage":"(.*?)"/;
const regexannyto = /(.*)(\r\n|\n\r|\n)([\W\w]+)/;
const ERKYurl = 'https://raw.githubusercontent.com/FeignedAccomplice/YOUTUBOTS/master/KB.CSV';
const annYTOurl = 'https://raw.githubusercontent.com/FeignedAccomplice/Un-Yt-Kb-Rg/master/announcements.TXT';
const minDCTime = 36*61;
const maxDCTime = 71*58;
const alerturl = 'https://кремлеботы.рф/alert';
const reporturl = 'tg://resolve?domain=observers_chat';
var alertSent = false;
var annYTOtxt = [];
var arrayERKY = [];
var arrayListP1 = [];
var arrayListC1 = [];
var arrayListC2 = [];
var arrayListC3 = [];
var orderedClicksArray = [];
var bDTaskSet = 0;
var bDBlur = 0;
var ytmode = 0;
var listqueue = 0;
var descc1 = '';
var descc2 = '';
var descc3 = '';
var iconsdef = ["\uD83D\uDCCC", "\uD83D\uDD32", "\uD83D\uDD34", "\uD83D\uDD3B"];
const iconstyledef = 'font-family: Segoe UI Symbol; line-height: 1em;';
const iconp1 = '<span style="' + iconstyledef + '">' + iconsdef[0] + '</span> ';
const iconc1 = '<span style="' + iconstyledef + '">' + iconsdef[1] + '</span> ';
const iconc2 = '<span style="' + iconstyledef + '">' + iconsdef[2] + '</span> ';
const iconc3 = '<span style="' + iconstyledef + '">' + iconsdef[3] + '</span> ';
var txtlistpadd = '\u2003<span id="listpadd" style="cursor: pointer; ' + iconstyledef + '" title="Добавить в закладки">' + iconsdef[0] + '</span>';

if (window.location.hostname == "dislikemeter.com" || window.location.hostname == "www.dislikemeter.com") {
  var videoid = getURLParameter('v', location.search);
  if (videoid) {
    waitForKeyElements('input#form_vid', function dmIDins(jNode) {
      var pNode = jNode[0];
      pNode.value = videoid;
    });
    return;
  }
} else {
  if (document.querySelector("meta[http-equiv='origin-trial']")) {
    console.log("[MetaBot for Youtube] YouTube New design detected.");
    ytmode = 1;
  } else if (document.querySelector("meta[http-equiv='Content-Type']")) {
    console.log("[MetaBot for Youtube] YouTube Mobile mode detected.");
    ytmode = 3;
  } else {
    console.log("[MetaBot for Youtube] YouTube Classic design detected.");
    ytmode = 2;
    txtlistpadd = '\u2003<span id="listpadd" style="cursor: pointer; color: #767676;' + iconstyledef + '" title="Добавить в закладки">' + iconsdef[0] + '</span>';
  }
  if (ytmode !== 3) {
    listqueue++;
    getlist(filllist, -1, annYTOurl);
  }
  listqueue++;
  getlist(filllist, 0, ERKYurl);
  if (GM_config.get('option4') === true) {
    arrayListP1 = GM_config.get('listp1').match(/[^\r\n=]+/g);
    if (GM_config.get('listc1') !== '') {
      listqueue++;
      getlist(filllist, 1, GM_config.get('listc1'));
    }
    if (GM_config.get('listc2') !== '') {
      listqueue++;
      getlist(filllist, 2, GM_config.get('listc2'));
    }
    if (GM_config.get('listc3') !== '') {
      listqueue++;
      getlist(filllist, 3, GM_config.get('listc3'));
    }
  }
  waitforlists();
}

function filllist(numArr, response, code, url) {
  if (code !== 200) {
    console.log("[MetaBot for Youtube] List load error. URL " + url + " Code " + code);
  } else {
    switch (numArr) {
      case -1:
        annYTOtxt = regexannyto.exec(response);
        var dbname = "YTO announcement";
        switch (ytmode) {
          case 1:
            waitForKeyElements('ytd-comments-header-renderer.ytd-item-section-renderer', insertannNew);
            break;
          case 2:
            waitForKeyElements('div.comments-header-renderer', insertann);
        }
        break;
      case 0:
        arrayERKY = response.match(/[^\r\n=]+/g);
        var dbname = "ERKY-db";
        break;
      case 1:
        arrayListC1 = response.match(/[^\r\n=]+/g);
        var dbname = "Custom list #1";
        descc1 = '[' + (arrayListC1.length / 2 - 1) + '] ' + Aparse(arrayListC1[0]) + ': ' + Aparse(arrayListC1[1]) + '<br>\u2003';
        break;
      case 2:
        arrayListC2 = response.match(/[^\r\n=]+/g);
        var dbname = "Custom list #2";
        descc2 = '[' + (arrayListC2.length / 2 - 1) + '] ' + Aparse(arrayListC2[0]) + ': ' + Aparse(arrayListC2[1]) + '<br>\u2003';
        break;
      case 3:
        arrayListC3 = response.match(/[^\r\n=]+/g);
        var dbname = "Custom list #3";
        descc3 = '[' + (arrayListC3.length / 2 - 1) + '] ' + Aparse(arrayListC3[0]) + ': ' + Aparse(arrayListC3[1]) + '<br>\u2003';
    }
    if (code === 200) {
      console.log("[MetaBot for Youtube] " + dbname + " loaded. Code " + code);
    } else {
      console.log("[MetaBot for Youtube] " + dbname + " load error. Code " + code);
    }
  }
  listqueue--;
}

function waitforlists() {
  if (listqueue === 0) {
    switch (ytmode) {
      case 1:
        spinnercheckNew();
        waitForKeyElements('div#main.style-scope.ytd-comment-renderer', parseitemNew);
        waitForKeyElements('yt-view-count-renderer.style-scope.ytd-video-primary-info-renderer', preparedmNew);
        waitForKeyElements('div#channel-header.ytd-c4-tabbed-header-renderer', insertchanNew);
        break;
      case 2:
        waitForKeyElements('.comment-renderer-header', parseitem);
        waitForKeyElements('div#watch7-views-info', insertdm);
        waitForKeyElements('div#c4-primary-header-contents.primary-header-contents.clearfix', insertchan);
        break;
      case 3:
        console.log("[MetaBot for Youtube] YouTube Mobile mode not supported.");
    }
    return;
  } else {
    setTimeout(waitforlists, 500);
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
            var cNode = $(this).find(".published-time-text")[0];
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
    noticespan.innerHTML = '<img src="' + mred + '" /> Пользователь найден в ЕРКЮ, дата регистрации: <a href="' + chanURL + '/about" title="Открыть страницу с датой регистрации">' + arrayERKY[foundID + 1] + "</a>";
    noticespan.style = 'background:rgba(255,50,50,0.3);border-radius:5px;padding:4px 7px 4px 7px';
  } else {
    noticespan.innerHTML = 'Пользователь не найден в ЕРКЮ <a href="' + chanURL + '/about"><img src="' + minf + '" title="Открыть страницу с датой регистрации" /></a>';
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
    noticespan.innerHTML = '<img src="' + mred + '" /> Пользователь найден в ЕРКЮ, дата регистрации: <a href="' + chanURL + '/about" style="color:hsl(206.1, 79.3%, 52.7%);text-decoration:none" title="Открыть страницу с датой регистрации">' + arrayERKY[foundID + 1] + "</a>";
    noticespan.style = 'background:rgba(255,50,50,0.3);border-radius:5px;padding:4px 7px 4px 7px;font-weight:400;line-height:3rem;text-transform:none;color:var(--yt-lightsource-primary-title-color)';
  } else {
    noticespan.innerHTML = 'Пользователь не найден в ЕРКЮ <a href="' + chanURL + '/about"><img src="' + minf + '" title="Открыть страницу с датой регистрации" /></a>';
    noticespan.style = 'background:rgba(100,100,100,0.2);border-radius:5px;padding:4px 7px 4px 7px;font-weight:400;line-height:3rem;text-transform:none;color:var(--yt-lightsource-primary-title-color)';
  }
  if (!reuse) {
    $(jNode).find('ytd-channel-name#channel-name.ytd-c4-tabbed-header-renderer').after(noticespan);
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

function preparedmNew(jNode) {
  this.addEventListener('yt-navigate-finish', function preparedmNewR() {
    this.removeEventListener('yt-navigate-finish', preparedmNewR);
    setTimeout(preparedmNew, 300, jNode);
  });
  var videoid = getURLParameter('v', location.search);
  if (!videoid) {
    console.log("[MetaBot for Youtube] Dislikemeter: video id not found.");
    return;
  }
  var pNode = $(jNode).parent().parent().parent().find('div#flex')[0];
  if (typeof pNode === 'undefined') {
    console.log("[MetaBot for Youtube] Dislikemeter: node not found.");
    return;
  }
  pNode.innerHTML = '';
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
  console.log("[MetaBot for Youtube] Dislikemeter: requesting data for video id " + videoid);
  getlist(insertdmNew, pNode, 'https://dislikemeter.com/iframe/?vid=' + videoid);
}

function insertdmNew(jNode, response, code, url) {
  if (response.indexOf('"submit"') >= 0){
    console.log("[MetaBot for Youtube] Dislikemeter: video already added.");
    var dmurl = url.replace('iframe/?vid=', 'video/');
    var dmtxt = 'Открыть статистику видео на анализаторе Дизлайкметр';
    var dmclr = 'var(--yt-spec-call-to-action)';
  } else {
    console.log("[MetaBot for Youtube] Dislikemeter: video not added yet.");
    var dmurl = url.replace('iframe/?vid=', '?v=');
    var dmtxt = 'Добавить видео на анализатор Дизлайкметр';
    var dmclr = 'var(--yt-spec-icon-inactive)';
  }
  jNode.style.textAlign = "right";
  var dmbutton = document.createElement('ytd-button-renderer');
  dmbutton.id = 'dmbutton';
  dmbutton.setAttribute('button-renderer', '');
  dmbutton.setAttribute('is-icon-button', '');
  dmbutton.classList.add("style-scope");
  dmbutton.classList.add("ytd-menu-renderer");
  dmbutton.classList.add("force-icon-button");
  dmbutton.classList.add("style-default");
  dmbutton.classList.add("size-default");
  dmbutton.style.marginTop = "3px";
  dmbutton.style.marginRight = "4px";
  $(jNode).prepend(dmbutton);
  $(jNode).find('ytd-button-renderer#dmbutton').html('<a class="yt-simple-endpoint style-scope ytd-button-renderer"><yt-icon-button id="button" class="style-scope ytd-button-renderer style-default size-default" style="padding:8px;width:36px;height:36px;color:rgb(255,200,0)" onclick="window.open(\'' + dmurl + '\', \'_blank\');"><svg viewBox="0 0 20 20" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%; fill:' + dmclr + '"><g class="style-scope yt-icon"><path d="m0 2c0 5.5 8 5.5 8 0 0-1-2-1-2 0 0 3-4 3-4 0 0-1-2-1-2 0m12 0c0 5.5 8 5.5 8 0 0-1-2-1-2 0 0 3-4 3-4 0 0-1-2-1-2 0m-12 16q2-6.5 10-6.5v2q-6 0-8 4.5c0 0.5-2 0.7-2 0m6 2v-3l4-1v4m1 0v-8h4v8m1 0v-11l4-1v12" class="style-scope yt-icon"></path></g></svg></yt-icon-button><paper-tooltip>' + dmtxt + '</paper-tooltip></a>');
}

function insertann(jNode) {
  $(jNode).find('h2.comment-section-header-renderer')[0].style = 'padding-bottom:10;display:inline-flex;align-items:center;line-height:2rem';
  var cfgspan = document.createElement('span');
  cfgspan.innerHTML = '<span style="opacity:0.4">[</span><span style="font-family: Segoe UI Symbol; color: #848484">\uD83D\uDD27</span><span style="opacity:0.4">]</span>';
  cfgspan.id = 'cfgbtn';
  cfgspan.title = 'Настройки MetaBot for YouTube';
  cfgspan.style = 'margin:-4px 0 0 0.5em;font-size:2.3em;height:2rem;cursor:pointer;color:#000';
  $(jNode).find('h2.comment-section-header-renderer').append(cfgspan);
  var annspan = document.createElement('span');
  annspan.innerHTML = '<span style="display:inline-flex;align-items:center"><span style="opacity:0.4">[</span><span style="font-family: Segoe UI Symbol; color: #af1611">\uD83D\uDCE3</span><span style="color:#555;font-size:0.5em;font-weight:420;margin:-1.8em 0.2em 0 0.2em;height:0.3em;text-transform:none">' + Aparse(annYTOtxt[1]) + '</span><span style="opacity:0.4">]</span></span>';
  annspan.id = 'annbtn';
  annspan.title = 'Последняя информация от Наблюдателя YouTube (#ЕРКЮ)';
  annspan.style = 'margin:-4px 0 0 0.5em;font-size:2.3em;height:2rem;cursor:pointer;color:#000';
  $(jNode).find('h2.comment-section-header-renderer').append(annspan);
  var ytoinfosspan = document.createElement('span');
  ytoinfosspan.innerHTML = '<span style="float:left;width:40px"><img src="' + imgyto + '" width="40px" height="40px" /></span><span style="float:right;margin: 0 0 0 10px;width:520px"><span id="urlyto" style="font-weight:500;cursor:pointer" data-url="https://www.youtube.com/channel/UCwBID52XA-aajCKYuwsQxWA/playlists">Наблюдатель Youtube #ЕРКЮ</span><br><span class="yt-badge" style="margin:4px 0 4px 0;text-align:center;text-transform:none;font-weight:500;width:100%;background-color:hsla(0, 0%, 93.3%, .6)">' + Aparse(annYTOtxt[1]) + '</span><span id="annholder"></span></span>';
  ytoinfosspan.id = 'ytoinfo';
  ytoinfosspan.style = 'max-width:605px;margin:0 auto 1em auto;display:table';
  $(ytoinfosspan).toggle();
  $(jNode).find('h2.comment-section-header-renderer').after(ytoinfosspan);
  $(jNode).find("span#ytoinfo").toggle();
  var settingsspan = document.createElement('span');
  settingsspan.innerHTML = '<span style="float:left;width:100px"><img src="https://raw.githubusercontent.com/asrdri/yt-metabot-user-js/master/logo.png" width="100px" height="100px" /></span><span style="float:right;margin: 0 0 0 10px;width:460px"><span style="font-weight:500">' + GM_info.script.name + ' v' + GM_info.script.version + '</span>\u2003<span id="urlgithub" style="cursor:pointer" data-url="https://github.com/asrdri/yt-metabot-user-js/">GitHub</span>\u2003<span id="urlissues" style="cursor:pointer" data-url="https://github.com/asrdri/yt-metabot-user-js/issues">Предложения и баги</span>\u2003<span id="urllists" style="cursor:pointer" data-url="https://github.com/asrdri/yt-metabot-user-js/issues/23">Списки</span><span class="yt-badge" style="margin:4px 0 4px 0;text-align:center;text-transform:none;font-weight:500;width:100%;background-color:hsla(0, 0%, 93.3%, .6)">Настройки</span>Комментарии от известных ботов из ЕРКЮ <select id="mbcddm1"><option value="1">помечать</option><option value="2">скрывать</option></select><span id="mbcswg1"><br style="line-height:2em"><label title="Информация о наличии ботов под роликом будет отправлена на кремлеботы.рф"><input type="checkbox" id="mbcbox4">Уведомлять сервер при обнаружении ботов</label><br style="line-height:2em"><label title="Пункт 5.1.H Условий использования YouTube не нарушается - запросы отправляются со значительным интервалом"><input type="checkbox" id="mbcbox1">Автоматически ставить <span style="font-family: Segoe UI Symbol">\uD83D\uDC4E</span> комментариям от ботов из ЕРКЮ</label></span><br style="line-height:2em"><label><input type="checkbox" id="mbcbox3">Дополнительные списки</label><span id="mbcswg2"><br style="line-height:2em">' + iconp1 + ' Закладки: <input type="color" id="colorpersonal" style="height: 1rem; width: 40px"><br style="line-height:1.8em"><textarea id="listpersonal" rows="3" style="width: 440px"></textarea><br style="line-height:1.2em">Сторонние списки:<br>' + iconc1 + descc1 + '<input type="text" id="listcustom1" style="height: 1rem; width: 385px"> <input type="color" id="colorcustom1" style="height: 1rem; width: 40px"><br>' + iconc2 + descc2 + '<input type="text" id="listcustom2" style="height: 1rem; width: 385px"> <input type="color" id="colorcustom2" style="height: 1rem; width: 40px"><br>' + iconc3 + descc3 + '<input type="text" id="listcustom3" style="height: 1rem; width: 385px"> <input type="color" id="colorcustom3" style="height: 1rem; width: 40px"></span><br style="line-height:2em"><span id="classicbtn" style="cursor:pointer">Включить новый дизайн YouTube</span><br><span id="resetbtn" style="cursor:pointer">Сбросить настройки</span><span id="configsaved" class="yt-badge" style="margin:4px 0 4px 0;text-align:center;text-transform:none;font-weight:500;width:100%;background-color:hsla(0, 0%, 93.3%, .6);display:none;-webkit-transition: background-color 0.3s ease-in-out;-moz-transition: background-color 0.3s ease-in-out;-ms-transition: background-color 0.3s ease-in-out;-o-transition: background-color 0.3s ease-in-out;transition: background-color 0.3s ease-in-out;">Настройки сохранены. Для вступления в силу необходимо <span style="cursor:pointer;text-decoration: underline" onclick="javascript:window.location.reload();">\uD83D\uDD03обновить страницу</span>.</span></span>';
  settingsspan.id = 'config';
  settingsspan.style = 'max-width:605px;margin:0 auto 1em auto;display:table';
  $(settingsspan).toggle();
  $(jNode).find('h2.comment-section-header-renderer').after(settingsspan);
  $(jNode).find("span#config").toggle();
  var annexspan = document.createElement('span');
  annexspan.innerHTML = Aparse(annYTOtxt[3]);
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
  $(jNode).find("span#urlgithub, span#urlissues, span#urllists, span#urlyto").hover(function() {
    this.style.textDecoration = "underline";
    this.style.color = "hsl(206.1, 79.3%, 52.7%)";
  }, function() {
    this.style.textDecoration = "";
    this.style.color = "";
  });
  $(jNode).find("span#urlgithub, span#urlissues, span#urllists, span#urlyto").click(function() {
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
  $(jNode).find("input#mbcbox3").prop('checked', GM_config.get('option4'));
  $(jNode).find("input#mbcbox4").prop('checked', GM_config.get('option5'));
  $(jNode).find("textarea#listpersonal").text(GM_config.get('listp1'));
  $(jNode).find("input#listcustom1").val(GM_config.get('listc1'));
  $(jNode).find("input#listcustom2").val(GM_config.get('listc2'));
  $(jNode).find("input#listcustom3").val(GM_config.get('listc3'));
  $(jNode).find("input#colorpersonal").val(parseColor(GM_config.get('colorp1'), false));
  $(jNode).find("input#colorcustom1").val(parseColor(GM_config.get('colorc1'), false));
  $(jNode).find("input#colorcustom2").val(parseColor(GM_config.get('colorc2'), false));
  $(jNode).find("input#colorcustom3").val(parseColor(GM_config.get('colorc3'), false));
  if ($(jNode).find("select#mbcddm1").val() == 2) {
    $(jNode).find("span#mbcswg1").hide();
  }
  if ($(jNode).find("input#mbcbox3").prop('checked') == false) {
    $(jNode).find("span#mbcswg2").hide();
  }
  $(jNode).find("input#mbcbox1, input#mbcbox3, input#mbcbox4, select#mbcddm1, textarea#listpersonal, input#listcustom1, input#listcustom2, input#listcustom3, input#colorpersonal, input#colorcustom1, input#colorcustom2, input#colorcustom3").change(function() {
    if ($(jNode).find("select#mbcddm1").val() == 2) {
      $(jNode).find("span#mbcswg1").hide();
    } else {
      $(jNode).find("span#mbcswg1").show();
    }
    if ($(jNode).find("input#mbcbox3").prop('checked') == false) {
      $(jNode).find("span#mbcswg2").hide();
    } else {
      $(jNode).find("span#mbcswg2").show();
    }
    saveconfig(jNode);
  });
}

function insertannNew(jNode) {
  waitForKeyElements('div#icon-label.yt-dropdown-menu', function(jNode) {
    jNode[0].innerHTML = '';
    $(jNode).parent()[0].setAttribute("style","margin-top:-0.1em;height:1.9em;width:2.9em");
    $(jNode).parent().hover(function() {
      this.style.backgroundColor = 'hsl(206.1, 79.3%, 52.7%)';
    }, function() {
      this.style.backgroundColor = '';
    });
  }, false);
  var cfgspan = document.createElement('span');
  cfgspan.innerHTML = '<span style="opacity:0.4">[</span><span style="font-family: Segoe UI Symbol; color: #848484">\uD83D\uDD27</span><span style="opacity:0.4">]</span>';
  cfgspan.id = 'cfgbtn';
  cfgspan.title = 'Настройки MetaBot for YouTube';
  cfgspan.style = 'margin:-6px 0 0 0.5em;font-size:3em;height:1.05em;display:inline-flex;align-items:center;cursor:pointer';
  cfgspan.classList.add("content");
  cfgspan.classList.add("ytd-video-secondary-info-renderer");
  $(jNode).find('div#title').append(cfgspan);
  var annspan = document.createElement('span');
  annspan.innerHTML = '<span style="opacity:0.4">[</span><span style="font-family: Segoe UI Symbol; color: #af1611">\uD83D\uDCE3</span><span style="font-size:0.5em;font-weight:420;margin:0 0.2em 0 0.2em">' + Aparse(annYTOtxt[1]) + '</span><span style="opacity:0.4">]</span>';
  annspan.id = 'annbtn';
  annspan.title = 'Последняя информация от Наблюдателя YouTube (#ЕРКЮ)';
  annspan.style = 'margin:-6px 0 0 0.5em;font-size:3em;height:1.05em;display:inline-flex;align-items:center;cursor:pointer';
  annspan.classList.add("content");
  annspan.classList.add("ytd-video-secondary-info-renderer");
  $(jNode).find('div#title').append(annspan);
  var ytoinfosspan = document.createElement('span');
  ytoinfosspan.innerHTML = '<span style="float:left;width:40px"><img src="' + imgyto + '" width="40px" height="40px" /></span><span style="float:right;margin: 0 0 0 10px;width:585px"><span id="urlyto" style="font-weight:500;cursor:pointer" data-url="https://www.youtube.com/channel/UCwBID52XA-aajCKYuwsQxWA/playlists">Наблюдатель Youtube #ЕРКЮ</span><span class="badge badge-style-type-simple ytd-badge-supported-renderer" style="margin:4px 0 4px 0;text-align:center">' + Aparse(annYTOtxt[1]) + '</span><span id="annholder"></span></span>';
  ytoinfosspan.id = 'ytoinfo';
  ytoinfosspan.classList.add("description");
  ytoinfosspan.classList.add("content");
  ytoinfosspan.classList.add("ytd-video-secondary-info-renderer");
  ytoinfosspan.style = 'font-size:1.4rem;max-width:640px;margin:-10px auto 1em auto;display:none';
  $(jNode).find('div#title').after(ytoinfosspan);
  var settingsspan = document.createElement('span');
  settingsspan.innerHTML = '<span style="float:left;width:100px"><img src="https://raw.githubusercontent.com/asrdri/yt-metabot-user-js/master/logo.png" width="100px" height="100px" /></span><span style="float:right;margin: 0 0 0 10px;width:525px"><span style="font-weight:500">' + GM_info.script.name + ' v' + GM_info.script.version + '</span>\u2003<span id="urlgithub" style="cursor:pointer" data-url="https://github.com/asrdri/yt-metabot-user-js/">GitHub</span>\u2003<span id="urlissues" style="cursor:pointer" data-url="https://github.com/asrdri/yt-metabot-user-js/issues">Предложения и баги</span>\u2003<span id="urllists" style="cursor:pointer" data-url="https://github.com/asrdri/yt-metabot-user-js/issues/23">Списки</span><span class="badge badge-style-type-simple ytd-badge-supported-renderer" style="margin:4px 0 4px 0;text-align:center">Настройки</span>Комментарии от известных ботов из ЕРКЮ <select id="mbcddm1"><option value="1">помечать</option><option value="2">скрывать</option></select><span id="mbcswg1"><br style="line-height:2em"><label title="Информация о наличии ботов под роликом будет отправлена на кремлеботы.рф"><input type="checkbox" id="mbcbox4">Уведомлять сервер при обнаружении ботов</label><br style="line-height:2em"><label title="Пункт 5.1.H Условий использования YouTube не нарушается - запросы отправляются со значительным интервалом"><input type="checkbox" id="mbcbox1">Автоматически ставить <span style="font-family: Segoe UI Symbol">\uD83D\uDC4E</span> комментариям от ботов из ЕРКЮ</label></span><br style="line-height:2em"><label title="Актуально для русского интерфейса и небольшой ширины окна браузера"><input type="checkbox" id="mbcbox2">Скрывать длинные подписи кнопок Мне (не) понравилось / Поделиться</label><br style="line-height:2em"><label><input type="checkbox" id="mbcbox3">Дополнительные списки</label><span id="mbcswg2"><br style="line-height:2em">' + iconp1 + ' Закладки: <input type="color" id="colorpersonal" style="height: 1.8rem; width: 40px"><br style="line-height:1.8em"><textarea id="listpersonal" rows="3" style="width: 500px"></textarea><br style="line-height:1.2em">Сторонние списки:<br>' + iconc1 + descc1 + '<input type="text" id="listcustom1" style="height: 1.7rem; width: 440px"> <input type="color" id="colorcustom1" style="height: 1.8rem; width: 40px"><br>' + iconc2 + descc2 + '<input type="text" id="listcustom2" style="height: 1.7rem; width: 440px"> <input type="color" id="colorcustom2" style="height: 1.8rem; width: 40px"><br>' + iconc3 + descc3 + '<input type="text" id="listcustom3" style="height: 1.7rem; width: 440px"> <input type="color" id="colorcustom3" style="height: 1.8rem; width: 40px"></span><br style="line-height:2em"><span id="classicbtn" style="cursor:pointer">Включить классический дизайн YouTube</span><br><span id="resetbtn" style="cursor:pointer">Сбросить настройки</span><span id="configsaved" class="badge badge-style-type-simple ytd-badge-supported-renderer" style="margin:4px 0 4px 0;text-align:center;display:none;-webkit-transition: background-color 0.3s ease-in-out;-moz-transition: background-color 0.3s ease-in-out;-ms-transition: background-color 0.3s ease-in-out;-o-transition: background-color 0.3s ease-in-out;transition: background-color 0.3s ease-in-out;">Настройки сохранены. Для вступления в силу необходимо <span style="cursor:pointer;text-decoration: underline" onclick="javascript:window.location.reload();"><span style="font-family: Segoe UI Symbol">\uD83D\uDD03</span>обновить страницу</span>.</span></span>';
  settingsspan.id = 'config';
  settingsspan.classList.add("description");
  settingsspan.classList.add("content");
  settingsspan.classList.add("ytd-video-secondary-info-renderer");
  settingsspan.style = 'font-size:1.4rem;max-width:635px;margin:-10px auto 1em auto;display:none';
  $(jNode).find('div#title').after(settingsspan);
  var annexspan = document.createElement('span');
  annexspan.innerHTML = Aparse(annYTOtxt[3]);
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
  $(jNode).find("span#urlgithub, span#urlissues, span#urllists, span#urlyto").hover(function() {
    this.style.textDecoration = "underline";
    this.style.color = "hsl(206.1, 79.3%, 52.7%)";
  }, function() {
    this.style.textDecoration = "";
    this.style.color = "";
  });
  $(jNode).find("span#urlgithub, span#urlissues, span#urllists, span#urlyto").click(function() {
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
  $(jNode).find("input#mbcbox3").prop('checked', GM_config.get('option4'));
  $(jNode).find("input#mbcbox4").prop('checked', GM_config.get('option5'));
  $(jNode).find("textarea#listpersonal").text(GM_config.get('listp1'));
  $(jNode).find("input#listcustom1").val(GM_config.get('listc1'));
  $(jNode).find("input#listcustom2").val(GM_config.get('listc2'));
  $(jNode).find("input#listcustom3").val(GM_config.get('listc3'));
  $(jNode).find("input#colorpersonal").val(parseColor(GM_config.get('colorp1'), false));
  $(jNode).find("input#colorcustom1").val(parseColor(GM_config.get('colorc1'), false));
  $(jNode).find("input#colorcustom2").val(parseColor(GM_config.get('colorc2'), false));
  $(jNode).find("input#colorcustom3").val(parseColor(GM_config.get('colorc3'), false));
  if ($(jNode).find("select#mbcddm1").val() == 2) {
    $(jNode).find("span#mbcswg1").hide();
  }
  if ($(jNode).find("input#mbcbox3").prop('checked') == false) {
    $(jNode).find("span#mbcswg2").hide();
  }
  $(jNode).find("input#mbcbox1, input#mbcbox2, input#mbcbox3, input#mbcbox4, select#mbcddm1, textarea#listpersonal, input#listcustom1, input#listcustom2, input#listcustom3, input#colorpersonal, input#colorcustom1, input#colorcustom2, input#colorcustom3").change(function() {
    if ($(jNode).find("select#mbcddm1").val() == 2) {
      $(jNode).find("span#mbcswg1").hide();
    } else {
      $(jNode).find("span#mbcswg1").show();
    }
    if ($(jNode).find("input#mbcbox3").prop('checked') == false) {
      $(jNode).find("span#mbcswg2").hide();
    } else {
      $(jNode).find("span#mbcswg2").show();
    }
    saveconfigNew(jNode);
  });
}

function saveconfig(jNode) {
  GM_config.set('option1', $(jNode).find("select#mbcddm1").val());
  GM_config.set('option2', $(jNode).find("input#mbcbox1").is(":checked"));
  GM_config.set('option4', $(jNode).find("input#mbcbox3").is(":checked"));
  GM_config.set('option5', $(jNode).find("input#mbcbox4").is(":checked"));
  GM_config.set('listp1', $(jNode).find("textarea#listpersonal").val());
  GM_config.set('listc1', $(jNode).find("input#listcustom1").val());
  GM_config.set('listc2', $(jNode).find("input#listcustom2").val());
  GM_config.set('listc3', $(jNode).find("input#listcustom3").val());
  GM_config.set('colorp1', parseColor($(jNode).find("input#colorpersonal").val(), true));
  GM_config.set('colorc1', parseColor($(jNode).find("input#colorcustom1").val(), true));
  GM_config.set('colorc2', parseColor($(jNode).find("input#colorcustom2").val(), true));
  GM_config.set('colorc3', parseColor($(jNode).find("input#colorcustom3").val(), true));
  arrayListP1 = GM_config.get('listp1').match(/[^\r\n=]+/g);
  GM_config.save();
  $(jNode).find("span#configsaved").show();
  $(jNode).find("span#configsaved")[0].style.backgroundColor = 'rgba(40,150,230,1)';
  setTimeout(function(){$(jNode).find("span#configsaved")[0].style.backgroundColor = 'rgba(40,150,230,0)';}, 400);
}

function saveconfigNew(jNode) {
  GM_config.set('option1', $(jNode).find("select#mbcddm1").val());
  GM_config.set('option2', $(jNode).find("input#mbcbox1").is(":checked"));
  GM_config.set('option3', $(jNode).find("input#mbcbox2").is(":checked"));
  GM_config.set('option4', $(jNode).find("input#mbcbox3").is(":checked"));
  GM_config.set('option5', $(jNode).find("input#mbcbox4").is(":checked"));
  GM_config.set('listp1', $(jNode).find("textarea#listpersonal").val());
  GM_config.set('listc1', $(jNode).find("input#listcustom1").val());
  GM_config.set('listc2', $(jNode).find("input#listcustom2").val());
  GM_config.set('listc3', $(jNode).find("input#listcustom3").val());
  GM_config.set('colorp1', parseColor($(jNode).find("input#colorpersonal").val(), true));
  GM_config.set('colorc1', parseColor($(jNode).find("input#colorcustom1").val(), true));
  GM_config.set('colorc2', parseColor($(jNode).find("input#colorcustom2").val(), true));
  GM_config.set('colorc3', parseColor($(jNode).find("input#colorcustom3").val(), true));
  arrayListP1 = GM_config.get('listp1').match(/[^\r\n=]+/g);
  GM_config.save();
  $(jNode).find("span#configsaved").show();
  $(jNode).find("span#configsaved")[0].style.backgroundColor = 'rgba(40,150,230,1)';
  setTimeout(function(){$(jNode).find("span#configsaved")[0].style.backgroundColor = 'rgba(40,150,230,0)';}, 400);
}

function resetconfig(jNode) {
  $(jNode).find("span#mbcswg1").show();
  $(jNode).find("span#mbcswg2").show();
  $(jNode).find("select#mbcddm1").val(1);
  $(jNode).find("input#mbcbox1").prop('checked', false);
  $(jNode).find("input#mbcbox2").prop('checked', true);
  $(jNode).find("input#mbcbox3").prop('checked', true);
  $(jNode).find("input#mbcbox4").prop('checked', false);
  $(jNode).find("input#listcustom1").val('https://github.com/asrdri/yt-metabot-user-js/raw/master/list-sample.txt');
  $(jNode).find("input#listcustom2").val('');
  $(jNode).find("input#listcustom3").val('');
  $(jNode).find("input#colorpersonal").val(parseColor(33023, false));
  $(jNode).find("input#colorcustom1").val(parseColor(8388863, false));
  $(jNode).find("input#colorcustom2").val(parseColor(16744448, false));
  $(jNode).find("input#colorcustom3").val(parseColor(8421504, false));
}

function resetconfigNew(jNode) {
  $(jNode).find("span#mbcswg1").show();
  $(jNode).find("span#mbcswg2").show();
  $(jNode).find("select#mbcddm1").val(1);
  $(jNode).find("input#mbcbox1").prop('checked', false);
  $(jNode).find("input#mbcbox2").prop('checked', true);
  $(jNode).find("input#mbcbox3").prop('checked', true);
  $(jNode).find("input#mbcbox4").prop('checked', false);
  $(jNode).find("input#listcustom1").val('https://github.com/asrdri/yt-metabot-user-js/raw/master/list-sample.txt');
  $(jNode).find("input#listcustom2").val('');
  $(jNode).find("input#listcustom3").val('');
  $(jNode).find("input#colorpersonal").val(parseColor(33023, false));
  $(jNode).find("input#colorcustom1").val(parseColor(8388863, false));
  $(jNode).find("input#colorcustom2").val(parseColor(16744448, false));
  $(jNode).find("input#colorcustom3").val(parseColor(8421504, false));
}

function sendAlert(jNode) {
  if (alertSent || GM_config.get('option5') === false)
    return;
  if (ytmode === 1) {
    var commentURL = $(jNode).find('.published-time-text a').prop('href');
  } else {
    var commentURL = $(jNode).find('.comment-renderer-time a').prop('href');
  }
  var commendid = getURLParameter('lc', commentURL);
  var videoid = getURLParameter('v', commentURL);
  var data = $.param({v: videoid, lc: commendid});
  var request = new XMLHttpRequest();
  request.open("POST", alerturl, true);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.send(data);
  alertSent = true;
  this.addEventListener('yt-navigate-start', function clearAlertSentFlag() {
    this.removeEventListener('yt-navigate-start', clearAlertSentFlag);
    alertSent = false;
  });
}

function parseitem(jNode) {
  if (GM_config.get('option4') === true) {
    var spanlistpadd = txtlistpadd;
  } else {
    var spanlistpadd = '';
  }
  var pNode = $(jNode).parent().parent()[0];
  $(pNode).hover(function blockShow() {
    $(pNode).find("#t30sp").show();
  }, function blockHide() {
    $(pNode).find("#t30sp").hide();
  });
  pNode = jNode[0];
  var userID = $(jNode).find("a")[0].href.split('/').pop();
  var foundID = arrayERKY.indexOf(userID);
  var foundIDp1 = -1;
  var foundIDc1 = -1;
  var foundIDc2 = -1;
  var foundIDc3 = -1;
  if (GM_config.get('option4') === true) {
    if (arrayListP1 !== null) {
      foundIDp1 = arrayListP1.indexOf(userID);
    }
    if (typeof arrayListC1 !== 'undefined' && arrayListC1.length > 1) {
      foundIDc1 = arrayListC1.indexOf(userID);
    }
    if (typeof arrayListC2 !== 'undefined' && arrayListC2.length > 1) {
      foundIDc2 = arrayListC2.indexOf(userID);
    }
    if (typeof arrayListC3 !== 'undefined' && arrayListC3.length > 1) {
      foundIDc3 = arrayListC3.indexOf(userID);
    }
  }
  var comURL = $(jNode).find("span.comment-renderer-time")[0];
  if ($(jNode).find("span.comment-renderer-linked-comment").length > 0) {
    comURL = $(jNode).find("span.comment-renderer-linked-comment")[0];
  }
  var t30span = document.createElement('span');
  t30span.innerHTML = '\u2003<span id="about" style="cursor: pointer; font-family: Segoe UI Symbol; color: #767676" title="Открыть страницу с датой регистрации">\u2753</span>\u2003<span id="top30" style="cursor: pointer" title="Найти другие комментарии автора с помощью агрегатора ТОП30"><font color="#7777fa">top</font><font color="#fa7777">30</font></span>' + spanlistpadd;
  t30span.id = 't30sp';
  t30span.style = "display:none";
  if (foundID > -1) {
    sendAlert(jNode);
    console.log("[MetaBot for Youtube] user found in ERKY-db: " + userID);
    if (GM_config.get('option1') == 2) {
      foundIDp1 = -1;
      foundIDc1 = -1;
      foundIDc2 = -1;
      foundIDc3 = -1;
      var hidspan = document.createElement('span');
      hidspan.innerHTML = 'Комментарий скрыт: пользователь найден в ЕРКЮ';
      hidspan.classList.add('yt-badge');
      hidspan.style = 'margin:0 0 10px 0;text-align:center;text-transform:none;font-weight:500;width:100%;background-color:hsla(0, 0%, 93.3%, .6)';
      $(jNode).parent().parent().after(hidspan);
      $(jNode).parent().parent().hide();
    } else {
      markbot(pNode, arrayERKY[foundID + 1]);
    }
    $(comURL).after(t30span);
  } else {
    var newspan = document.createElement('span');
    newspan.innerHTML = '<img id="checkbtn" src="' + checkb + '" title="Проверить дату регистрации" style="cursor: help" />';
    newspan.id = 'checksp';
    pNode.insertBefore(newspan, pNode.firstChild);
    t30span.innerHTML += '\u2003<span id="sendlink" style="cursor: pointer" title="Помогите пополнить список известных ботов - отправьте нам данные о подозрительном комментарии">\u27A4</span>';
    $(comURL).after(t30span);
    $(jNode).find("img")[0].addEventListener("click", function checkcomment() {
      checkdate(pNode);
    }, false);
    $(jNode).find("#sendlink")[0].addEventListener("click", function displayinfo() {
      sendinfo();
    }, false);
  }
  if (GM_config.get('option4') === true) {
    if (foundIDc1 > -1) {
      markcustom(pNode, arrayListC1[foundIDc1 + 1], 1);
    }
    if (foundIDc2 > -1) {
      markcustom(pNode, arrayListC2[foundIDc2 + 1], 2);
    }
    if (foundIDc3 > -1) {
      markcustom(pNode, arrayListC3[foundIDc3 + 1], 3);
    }
    if (foundIDp1 > -1) {
      if ($(jNode).find("#checkbtn").length > 0) {
        $(jNode).find("#checkbtn")[0].remove();
      }
      markpersonal(pNode, arrayListP1[foundIDp1 + 1]);
    }
    $(jNode).find("#listpadd")[0].addEventListener("click", function addtolistNew() {
      if ($(pNode).find("span#bookmark").length > 0) {
        listpdel(pNode);
        $(jNode).find("#listpadd").html(iconsdef[0]);
        $(jNode).find("#listpadd")[0].title = 'Добавить в закладки';
      } else {
        if ($(jNode).find("#checkbtn").length > 0) {
          $(jNode).find("#checkbtn")[0].remove();
        }
        $(jNode).find("#listpadd").html('\u23F3');
        getpage(listpadd, pNode, $(jNode).find("a")[0].href + '/about')
      }
    }, false);
  }
  $(jNode).find("#about")[0].addEventListener("click", function openabout() {
    window.open($(jNode).find("a")[0].href + '/about');
  }, false);
  $(jNode).find("#top30")[0].addEventListener("click", function opent30() {
    window.open('https://www.t30p.ru/search.aspx?s=' + $(jNode).find("a")[0].href.split('/').pop());
  }, false);
}

function parseitemNew(jNode) {
  if (GM_config.get('option4') === true) {
    var spanlistpadd = txtlistpadd;
  } else {
    var spanlistpadd = '';
  }
  var pNode = $(jNode).find("#header-author.ytd-comment-renderer")[0];
  $(jNode).hover(function blockShow() {
    $(pNode).find("#t30sp").show();
  }, function blockHide() {
    $(pNode).find("#t30sp").hide();
  });
  var userID = $(jNode).find("a")[0].href.split('/').pop();
  var foundID = arrayERKY.indexOf(userID);
  var foundIDp1 = -1;
  var foundIDc1 = -1;
  var foundIDc2 = -1;
  var foundIDc3 = -1;
  if (GM_config.get('option4') === true) {
    if (arrayListP1 !== null) {
      foundIDp1 = arrayListP1.indexOf(userID);
    }
    if (typeof arrayListC1 !== 'undefined' && arrayListC1.length > 1) {
      foundIDc1 = arrayListC1.indexOf(userID);
    }
    if (typeof arrayListC2 !== 'undefined' && arrayListC2.length > 1) {
      foundIDc2 = arrayListC2.indexOf(userID);
    }
    if (typeof arrayListC3 !== 'undefined' && arrayListC3.length > 1) {
      foundIDc3 = arrayListC3.indexOf(userID);
    }
  }
  var comURL = $(jNode).find(".published-time-text")[0];
  var t30span = document.createElement('span');
  t30span.innerHTML = '\u2003<span id="about" style="cursor: pointer; ' + iconstyledef + '" title="Открыть страницу с датой регистрации">\u2753</span>\u2003<span id="top30" style="cursor: pointer" title="Найти другие комментарии автора с помощью агрегатора ТОП30"><font color="#7777fa">top</font><font color="#fa7777">30</font></span>' + spanlistpadd;
  t30span.id = 't30sp';
  t30span.style = "display:none";
  var newspan = document.createElement('span');
  newspan.id = 'checksp';
  if (foundID > -1) {
    sendAlert(jNode);
    console.log("[MetaBot for Youtube] user found in ERKY-db: " + userID);
    if (GM_config.get('option1') == 2) {
      foundIDp1 = -1;
      foundIDc1 = -1;
      foundIDc2 = -1;
      foundIDc3 = -1;
      var hidspan = document.createElement('span');
      hidspan.innerHTML = 'Комментарий скрыт: пользователь найден в ЕРКЮ';
      hidspan.classList.add('badge');
      hidspan.classList.add('badge-style-type-simple');
      hidspan.classList.add('ytd-badge-supported-renderer');
      hidspan.style = 'margin: 0 0 10px 0;text-align:center';
      $(jNode).parent().parent().after(hidspan);
      $(jNode).parent().parent().hide();
    } else {
      markbotNew($(pNode).parent(), arrayERKY[foundID + 1]);
    }
    $(comURL).append(t30span);
    $(newspan).attr('data-chan', $(jNode).find("a#author-text")[0].href);
    pNode.insertBefore(newspan, pNode.firstChild);
  } else {
    newspan.innerHTML = '<img id="checkbtn" src="' + checkb + '" title="Проверить дату регистрации" style="cursor: help" />';
    $(newspan).attr('data-chan', $(jNode).find("a#author-text")[0].href);
    pNode.insertBefore(newspan, pNode.firstChild);
    t30span.innerHTML += '\u2003<span id="sendlink" style="cursor: pointer" title="Помогите пополнить список известных ботов - отправьте нам данные о подозрительном комментарии">\u27A4</span>';
    $(comURL).append(t30span);
    $(jNode).find("#checkbtn")[0].addEventListener("click", function checkcommentNew() {
      checkdateNew($(pNode).parent());
    }, false);
    $(jNode).find("#sendlink")[0].addEventListener("click", function displayinfoNew() {
      sendinfo();
    }, false);
  }
  if (GM_config.get('option4') === true) {
    if (foundIDc1 > -1) {
      markcustomNew($(pNode).parent(), arrayListC1[foundIDc1 + 1], 1);
    }
    if (foundIDc2 > -1) {
      markcustomNew($(pNode).parent(), arrayListC2[foundIDc2 + 1], 2);
    }
    if (foundIDc3 > -1) {
      markcustomNew($(pNode).parent(), arrayListC3[foundIDc3 + 1], 3);
    }
    if (foundIDp1 > -1) {
      if ($(jNode).find("#checkbtn").length > 0) {
        $(jNode).find("#checkbtn")[0].remove();
      }
      markpersonalNew($(pNode).parent(), arrayListP1[foundIDp1 + 1]);
    }
    $(jNode).find("#listpadd")[0].addEventListener("click", function addtolistNew() {
      if ($(pNode).find("span#bookmark").length > 0) {
        listpdelNew(pNode);
        $(jNode).find("#listpadd").html(iconsdef[0]);
        $(jNode).find("#listpadd")[0].title = 'Добавить в закладки';
      } else {
        if ($(jNode).find("#checkbtn").length > 0) {
          $(jNode).find("#checkbtn")[0].remove();
        }
        $(jNode).find("#listpadd").html('\u23F3');
        getpage(listpaddNew, pNode, $(jNode).find("a")[0].href + '/about')
      }
    }, false);
  }
  $(jNode).find("#about")[0].addEventListener("click", function openaboutNew() {
    window.open($(jNode).find("a")[0].href + '/about');
  }, false);
  $(jNode).find("#top30")[0].addEventListener("click", function opent30New() {
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

function sendinfo() {
  var answer = confirm('Будет запущен Telegram.' +
    '\n\nПрисоединитесь к группе, отправьте ссылку на подозрительный' +
    '\nкомментарий (можно скопировать из даты публикации) и обоснуйте подозрения.\n\nПерейти к группе?');
  if (answer) {
    window.open(reporturl);
  }
}

function listpadd(jNode, response, url) {
  window.tempHTML = document.createElement('html');
  tempHTML.innerHTML = response;
  window.aboutSTAT = tempHTML.getElementsByClassName('about-stat');
  var day = Dparse(aboutSTAT[aboutSTAT.length - 1].innerHTML);
  $('textarea#listpersonal')[0].value += url.substring(0, url.length - 6).split('/').pop() + '=' + day + '\n';
  var tempArray = $('textarea#listpersonal')[0].value.split('\n');
  var uniqArray = tempArray.reduce(function(a,b){
    if (a.indexOf(b) < 0) a.push(b);
    return a;
  },[]);
  $('textarea#listpersonal')[0].value = uniqArray.join('\n');
  GM_config.set('listp1', uniqArray.join('\n'));
  GM_config.save();
  arrayListP1 = GM_config.get('listp1').match(/[^\r\n=]+/g);
  $(jNode).find("#listpadd").html('\u274C');
  $(jNode).find("#listpadd")[0].title = 'Удалить из закладок';
  markpersonal(jNode, day);
  console.log("[MetaBot for Youtube] Bookmarks (personal list) updated.");
}

function listpaddNew(jNode, response, url) {
  var matches = regexdate.exec(response);
  var day = Dparse(matches[3]);
  $('textarea#listpersonal')[0].value += url.substring(0, url.length - 6).split('/').pop() + '=' + day + '\n';
  var tempArray = $('textarea#listpersonal')[0].value.split('\n');
  var uniqArray = tempArray.reduce(function(a,b){
    if (a.indexOf(b) < 0) a.push(b);
    return a;
  },[]);
  $('textarea#listpersonal')[0].value = uniqArray.join('\n');
  GM_config.set('listp1', uniqArray.join('\n'));
  GM_config.save();
  arrayListP1 = GM_config.get('listp1').match(/[^\r\n=]+/g);
  $(jNode).find("#listpadd").html('\u274C');
  $(jNode).find("#listpadd")[0].title = 'Удалить из закладок';
  markpersonalNew($(jNode).parent(), day);
  console.log("[MetaBot for Youtube] Bookmarks (personal list) updated.");
}

function listpdel(jNode) {
  $(jNode).find("span#bookmark").remove();
  var tempArray = $('textarea#listpersonal')[0].value.split('\n');
  var itemDel = arrayListP1.indexOf($(jNode).find("a")[0].href.split('/').pop());
  tempArray.splice(itemDel / 2,1);
  $('textarea#listpersonal')[0].value = tempArray.join('\n');
  GM_config.set('listp1', tempArray.join('\n'));
  GM_config.save();
  arrayListP1 = GM_config.get('listp1').match(/[^\r\n=]+/g);
  $(jNode).next().css({
    "background-image": "none",
    "border-right": "",
    "padding-right": ""
  });
  console.log("[MetaBot for Youtube] Bookmarks (personal list) updated.");
}

function listpdelNew(jNode) {
  $(jNode).find("span#bookmark").remove();
  var tempArray = $('textarea#listpersonal')[0].value.split('\n');
  var itemDel = arrayListP1.indexOf($(jNode).find("a")[0].href.split('/').pop());
  tempArray.splice(itemDel / 2,1);
  $('textarea#listpersonal')[0].value = tempArray.join('\n');
  GM_config.set('listp1', tempArray.join('\n'));
  GM_config.save();
  arrayListP1 = GM_config.get('listp1').match(/[^\r\n=]+/g);
  $(jNode).parent().parent().find("#content-text").parent().css({
    "background-image": "none",
    "border-right": "",
    "padding-right": ""
  });
  console.log("[MetaBot for Youtube] Bookmarks (personal list) updated.");
}

function checkdate(jNode) {
  if (['en', 'en-US', 'en-GB', 'ru', 'uk', 'be', 'bg'].indexOf(currentlang()) < 0) {
    alert('Функция поддерживается только на языках:\n \u2714 English\n \u2714 Русский\n \u2714 Українська\n \u2714 Беларуская \u2714 Български\nВы можете сменить язык интерфейса в меню настроек YouTube.');
    return;
  }
  $(jNode).find("img")[0].remove();
  getpage(procdate, jNode, $(jNode).find("a")[0].href + '/about');
}

function checkdateNew(jNode) {
  if (['en', 'en-US', 'en-GB', 'ru', 'uk', 'be', 'bg'].indexOf(currentlang()) < 0) {
    alert('Функция поддерживается только на языках:\n \u2714 English\n \u2714 Русский\n \u2714 Українська\n \u2714 Беларуская \u2714 Български\nВы можете сменить язык интерфейса в меню настроек YouTube.');
    return;
  }
  $(jNode).find("#checkbtn")[0].remove();
  var userID = $(jNode).find("a")[0].href.split('/').pop();
  var foundID = arrayERKY.indexOf(userID);
  if (foundID > -1) {
    console.log("[MetaBot for Youtube] user found in ERKY-db: " + userID);
    markbotNew(jNode, arrayERKY[foundID + 1]);
  } else {
    getpage(procdateNew, jNode, $(jNode).find("a")[0].href + '/about');
  }
}

function procdate(jNode, response, url) {
  window.tempHTML = document.createElement('html');
  tempHTML.innerHTML = response;
  window.aboutSTAT = tempHTML.getElementsByClassName('about-stat');
  var testday = Dparse(aboutSTAT[aboutSTAT.length - 1].innerHTML);
  var newspan = document.createElement('span');
  newspan.id = 'botmark';
  newspan.innerHTML = ' <img src="' + minf + '" title="Дата регистрации:" /> ' + testday;
  $(jNode).find("a.comment-author-text").after(newspan);
  $(jNode).next().css({
    "background": "rgba(170,170,170,0.3)",
    "border-left": "3px solid rgba(170,170,170,0.3)",
    "padding-left": "3px"
  });
  delete window.aboutSTAT;
  delete window.tempHTML;
}

function procdateNew(jNode, response, url) {
  var matches = regexdate.exec(response);
  var testday = Dparse(matches[3]);
  var aNode = $(jNode).find("#author-text")[0];
  var cNode = $(jNode).parent().find("#content-text")[0];
  var newspan = document.createElement('span');
  newspan.id = 'botmark';
  var checkBadge = $(aNode).parent().find('span#author-comment-badge')[0];
  newspan.innerHTML = '<img src="' + minf + '" title="Дата регистрации:" /> ' + testday;
  $(aNode).append(newspan);
  if ($(checkBadge).length > 0) {
    $(checkBadge).attr('hidden', '');
    $(aNode).removeAttr('hidden');
  }
  $(cNode).parent().css({
    "background": "rgba(170,170,170,0.3)",
    "border-left": "3px solid rgba(170,170,170,0.3)",
    "padding-left": "3px"
  });
  aNode = $(jNode).find("#checksp");
  aNode.attr('data-chan', $(jNode).find("a#author-text")[0].href);
  aNode.hide();
}

function markbot(jNode, txt) {
  var newspan = document.createElement('span');
  newspan.id = 'botmark';
  newspan.innerHTML = ' <img src="' + mred + '" title="- пользователь найден в #ЕРКЮ, дата регистрации -" /> ' + txt;
  $(jNode).find("a.comment-author-text").after(newspan);
  $(jNode).next().css({
    "background": "rgba(255,50,50,0.3)",
    "border-left": "3px solid rgba(255,50,50,0.3)",
    "padding-left": "3px"
  });
  if (GM_config.get('option2') === true) {
    requestDislike(jNode, false);
  }
}

function markbotNew(jNode, txt) {
  var aNode = $(jNode).find("#author-text")[0];
  var cNode = $(jNode).parent().find("#content-text")[0];
  var newspan = document.createElement('span');
  newspan.id = 'botmark';
  newspan.innerHTML = '<img src="' + mred + '" title="- найден в #ЕРКЮ, дата регистрации -" /> ' + txt;
  $(aNode).append(newspan);
  var checkBadge = $(aNode).parent().find('span#author-comment-badge')[0];
  if ($(checkBadge).length > 0) {
    $(checkBadge).attr('hidden', '');
    $(aNode).removeAttr('hidden');
  }
  if (regexalt.exec(txt) === null) {
    $(cNode).parent().css({
      "background": "rgba(255,50,50,0.3)",
      "border-left": "3px solid rgba(255,50,50,0.3)",
      "padding-left": "3px"
    });
  } else {
    $(cNode).parent().css({
      "background": "rgba(255,0,150,0.3)",
      "border-left": "3px solid rgba(255,0,150,0.3)",
      "padding-left": "3px"
    });
    $(cNode).parent().parent().css({
      "background": "repeating-linear-gradient(135deg, rgba(140,140,140,0.1), rgba(140,140,140,0.1) 10px, rgba(0,0,0,0) 10px, rgba(0,0,0,0) 20px)"
    });
  }
  if (GM_config.get('option2') === true) {
    requestDislike(jNode, true);
  }
}

function markcustom(jNode, txt, list) {
  switch (list) {
    case 1:
      var listname = Aparse(arrayListC1[0]);
      break
    case 2:
      var listname = Aparse(arrayListC2[0]);
      break
    case 3:
      var listname = Aparse(arrayListC3[0]);
  }
  var botmark = $(jNode).find("#botmark");
  var rgbCustom = gmColor('colorc' + list, 1) + "," + gmColor('colorc' + list, 2) + "," + gmColor('colorc' + list, 3);
  var marktxt = ' <span style="' + iconstyledef + ' color: rgb(' + rgbCustom + '); font-size: 1.3em;" title="Найден в списке ' + listname + '">' + iconsdef[list] + '</span> ';
  if (botmark.length > 0) {
    $(botmark).prepend(marktxt);
  } else {
    $(jNode).find("#checkbtn")[0].remove();
    var newspan = document.createElement('span');
    newspan.id = 'botmark';
    newspan.innerHTML = marktxt + txt;
    $(jNode).find("a.comment-author-text").after(newspan);
    $(jNode).next().css({
      "background": "rgba(" + rgbCustom + ",.3)",
      "border-left": "3px solid rgba(" + rgbCustom + ",0.3)",
      "padding-left": "3px"
    });
  }
}

function markcustomNew(jNode, txt, list) {
  switch (list) {
    case 1:
      var listname = Aparse(arrayListC1[0]);
      break
    case 2:
      var listname = Aparse(arrayListC2[0]);
      break
    case 3:
      var listname = Aparse(arrayListC3[0]);
  }
  var aNode = $(jNode).find("#author-text")[0];
  var cNode = $(jNode).parent().find("#content-text")[0];
  var checkBadge = $(aNode).parent().find('span#author-comment-badge')[0];
  var botmark = $(cNode).parent().parent().parent().find("#botmark");
  var rgbCustom = gmColor('colorc' + list, 1) + "," + gmColor('colorc' + list, 2) + "," + gmColor('colorc' + list, 3);
  var marktxt = '<span style="' + iconstyledef + ' color: rgb(' + rgbCustom + '); font-size: 1.3em;" title="Найден в списке ' + listname + '">' + iconsdef[list] + '</span> ';
  if (botmark.length > 0) {
    $(botmark).prepend(marktxt);
  } else {
    $(jNode).find("#checkbtn")[0].remove();
    var newspan = document.createElement('span');
    newspan.id = 'botmark';
    newspan.innerHTML = marktxt + txt;
    $(aNode).append(newspan);
    if ($(checkBadge).length > 0) {
      $(checkBadge).attr('hidden', '');
      $(aNode).removeAttr('hidden');
    }
    $(cNode).parent().css({
      "background": "rgba(" + rgbCustom + ",.3)",
      "border-left": "3px solid rgba(" + rgbCustom + ",0.3)",
      "padding-left": "3px"
    });
  }
}

function markpersonal(jNode, txt) {
  $(jNode).find("#listpadd").html('\u274C');
  $(jNode).find("#listpadd")[0].title = 'Удалить из закладок';
  var botmark = $(jNode).parent().find("#botmark");
  var rgbCustom = gmColor('colorp1', 1) + "," + gmColor('colorp1', 2) + "," + gmColor('colorp1', 3);
  var marktxt = ' <span id="bookmark" style="' + iconstyledef + ' color: rgb(' + rgbCustom + '); font-size: 1.3em;" title="Добавлен в закладки">' + iconsdef[0] + '</span> ';
  if (botmark.length > 0) {
    $(botmark).prepend(marktxt);
    $(jNode).next().css({
      "background-image": "linear-gradient(230deg, rgba(" + rgbCustom + ",.4) 20%, rgba(0,0,0,0) 30%)"
    });
  } else {
    var newspan = document.createElement('span');
    newspan.id = 'botmark';
    newspan.innerHTML = marktxt + txt;
    $(jNode).find("a.comment-author-text").after(newspan);
    $(jNode).next().css({
      "background": "linear-gradient(230deg, rgba(" + rgbCustom + ",.4) 20%, rgba(0,0,0,0) 30%)"
    });
  }
  $(jNode).next().css({
    "background-origin": "border-box",
    "border-right": "3px solid rgba(" + rgbCustom + ",.3)",
    "padding-right": "3px"
  });
}

function markpersonalNew(jNode, txt) {
  $(jNode).find("#listpadd").html('\u274C');
  $(jNode).find("#listpadd")[0].title = 'Удалить из закладок';
  var aNode = $(jNode).find("#author-text")[0];
  var cNode = $(jNode).parent().find("#content-text")[0];
  var checkBadge = $(aNode).parent().find('span#author-comment-badge')[0];
  var botmark = $(cNode).parent().parent().parent().find("#botmark");
  var rgbCustom = gmColor('colorp1', 1) + "," + gmColor('colorp1', 2) + "," + gmColor('colorp1', 3);
  var marktxt = '<span id="bookmark" style="' + iconstyledef + ' color: rgb(' + rgbCustom + '); font-size: 1.3em;" title="Добавлен в закладки">' + iconsdef[0] + '</span> ';
  if (botmark.length > 0) {
    $(botmark).prepend(marktxt);
    $(cNode).parent().css({
      "background-image": "linear-gradient(230deg, rgba(" + rgbCustom + ",.4) 20%, rgba(0,0,0,0) 30%)"
    });
  } else {
    var newspan = document.createElement('span');
    newspan.id = 'botmark';
    newspan.innerHTML = marktxt + txt;
    $(aNode).append(newspan);
    if ($(checkBadge).length > 0) {
      $(checkBadge).attr('hidden', '');
      $(aNode).removeAttr('hidden');
    }
    $(cNode).parent().css({
      "background": "linear-gradient(230deg, rgba(" + rgbCustom + ",.4) 20%, rgba(0,0,0,0) 30%)"
    });
  }
  $(cNode).parent().css({
    "background-origin": "border-box",
    "border-right": "3px solid rgba(" + rgbCustom + ",.3)",
    "padding-right": "3px"
  });
}

function gmColor(gmVar, colpos) {
  return parseInt(parseColor(GM_config.get(gmVar), false).slice(colpos*2-1, colpos*2+1), 16)
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
  if ( bDBlur || document.querySelector('paper-dialog.ytd-popup-container:not([style*="display:none"]):not([style*="display: none"])') || document.querySelector('label.option-selectable-item-renderer-radio-container') ) {
    setTimeout(scheduledDislike, minDCTime + Math.random() * (maxDCTime - minDCTime), isNew);
  } else {
    if (orderedClicksArray.length) {
      var element = orderedClicksArray.shift();
      if ( (isNew && !(element.classList.contains("style-default-active"))) || (element.getAttribute("aria-checked") == "false") ) {
        $(element).css({"background": "rgba(255,50,50,0.3)"});
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

function Aparse(text) {
  if (ytmode === 1) {
    var isNew = true;
  } else {
    var isNew = false;
  }
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
  var requestSw = new XMLHttpRequest();
  requestSw.open("POST", "https://www.youtube.com/new?optin=true", true);
  requestSw.send(null);
}

function parseColor(color, toNumber) {
  if (toNumber === true) {
    if (typeof color === 'number') {
      return (color | 0);
    }
    if (typeof color === 'string' && color[0] === '#') {
      color = color.slice(1);
    }
    return parseInt(color, 16);
  } else {
    color = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
    return color;
  }
}

$(window).focus(function() {
  bDBlur = 0;
});

$(window).blur(function() {
  bDBlur = 1;
});

function getpage(callback, jNode, url) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        if (request.responseText !== "") {
          console.log("[MetaBot for Youtube] XMLHttpRequest done: " + url);
          callback(jNode, request.responseText, url);
        }
      }
    }
  };
  request.open("GET", url, true);
  request.send(null);
}

function getlist(callback, numArr, url) {
  if (typeof GM_xmlhttpRequest !== 'undefined') {
    GM_xmlhttpRequest({
      method: "GET",
      url: url,
      onload: function(response) {
        callback(numArr, response.responseText, response.status, url);
      }
    });
  } else if (typeof GM !== 'undefined') {
    GM.xmlHttpRequest({
      method: "GET",
      url: url,
      onload: function(response) {
        callback(numArr, response.responseText, response.status, url);
      }
    });
  } else {
    console.log("[MetaBot for Youtube] Unable to get supported cross-origin XMLHttpRequest function.");
  }
}

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