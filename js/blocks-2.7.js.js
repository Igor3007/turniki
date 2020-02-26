
function t121_setHeight(recid){
    var rec = $('#rec' + recid);
    var div=$("#youtubeiframe"+recid);
    var height=div.width() * 0.5625;
    div.height(height);
    div.parent().height(height);

    var videoLazy = rec.find('.t-video-lazyload');
    var iframeLazy = videoLazy.find('iframe');
    if (videoLazy != undefined) {
        var heightLazy = videoLazy.width() * 0.5625;
        videoLazy.height(heightLazy);
        iframeLazy.height(heightLazy);
    }
}
function t142_checkSize(recid){
  var el=$("#rec"+recid).find(".t142__submit");
  if(el.length){
    var btnheight = el.height() + 5;
    var textheight = el[0].scrollHeight;
    if (btnheight < textheight) {
      var btntext = el.text();
      el.addClass("t142__submit-overflowed");
      el.html("<span class=\"t142__text\">" + btntext + "</span>");
    }
  }
}
function t190_scrollToTop(){
    $('html, body').animate({scrollTop: 0}, 700);
}

function t226_floating_init(el){
    console.log('floating_init');

    var wnd=$(window);
    var col=el.parent();

    el.css('max-width',el.width());
    el.css('width','100%');
    col.css('min-height',el.height());

    var timer;
    var timer_count=0;
    var timer_react=5;

    wnd.scroll(function() {
        if(timer) {
            window.clearTimeout(timer);
            if(timer_count>=timer_react){
                t226_floating_scroll(el,wnd,col);
                timer_count=0;
            }
            timer_count++;
        }

        timer = window.setTimeout(function() {
                t226_floating_scroll(el,wnd,col);
                timer_count=0;
        }, 50);
    });


    wnd.resize(function() {
         wnd.scroll();
    });

    wnd.scroll();
}

function t226_floating_scroll(el,wnd,col){
    var wnd_height = wnd.height();
    var wnd_width = wnd.width();

    if(wnd_width<=1024){
        el.removeClass('t226__fixedTop');
        el.removeClass('t226__fixedBottom');
        el.removeClass('t226__floating');
        return('');
    }

    el.css('max-width',col.width());

    if(col.height()<el.height() && col.height()>0){
        col.height(el.height());
    }

    var el_height = el.height();
    var col_top = col.offset().top;
    var col_width = col.width();
    var col_height = col.height();
    var col_bottom = col_top + col_height;

    var wnd_top = wnd.scrollTop();
    var wnd_bottom = wnd_top + wnd_height;

    if(wnd_top+el_height+50 >= col_bottom){
        //console.log('fixedbottom');
        el.addClass('t226__fixedBottom');
        el.removeClass('t226__fixedTop');
        el.removeClass('t226__floating');
    }else if(wnd_top+50 > col_top){
        //console.log('floating');
        el.addClass('t226__floating');
        el.removeClass('t226__fixedBottom');
        el.removeClass('t226__fixedTop');
    }else{
        //console.log('fixedtop');
        el.addClass('t226__fixedTop');
        el.removeClass('t226__fixedBottom');
        el.removeClass('t226__floating');
    }
}
function t228_highlight(){
  var url=window.location.href;
  var pathname=window.location.pathname;
  if(url.substr(url.length - 1) == "/"){ url = url.slice(0,-1); }
  if(pathname.substr(pathname.length - 1) == "/"){ pathname = pathname.slice(0,-1); }
  if(pathname.charAt(0) == "/"){ pathname = pathname.slice(1); }
  if(pathname == ""){ pathname = "/"; }
  $(".t228__list_item a[href='"+url+"']").addClass("t-active");
  $(".t228__list_item a[href='"+url+"/']").addClass("t-active");
  $(".t228__list_item a[href='"+pathname+"']").addClass("t-active");
  $(".t228__list_item a[href='/"+pathname+"']").addClass("t-active");
  $(".t228__list_item a[href='"+pathname+"/']").addClass("t-active");
  $(".t228__list_item a[href='/"+pathname+"/']").addClass("t-active");
}

function t228_checkAnchorLinks(recid) {
    if ($(window).width() >= 960) {
        var t228_navLinks = $("#rec" + recid + " .t228__list_item a:not(.tooltipstered)[href*='#']");
        if (t228_navLinks.length > 0) {
            setTimeout(function(){
              t228_catchScroll(t228_navLinks);
            }, 500);
        }
    }
}

function t228_catchScroll(t228_navLinks) {
    var t228_clickedSectionId = null,
        t228_sections = new Array(),
        t228_sectionIdTonavigationLink = [],
        t228_interval = 100,
        t228_lastCall, t228_timeoutId;
    t228_navLinks = $(t228_navLinks.get().reverse());
    t228_navLinks.each(function() {
        var t228_cursection = t228_getSectionByHref($(this));
        if (typeof t228_cursection.attr("id") != "undefined") {
            t228_sections.push(t228_cursection);
        }
        t228_sectionIdTonavigationLink[t228_cursection.attr("id")] = $(this);
    });
		t228_updateSectionsOffsets(t228_sections);
    t228_sections.sort(function(a, b) {
      return b.attr("data-offset-top") - a.attr("data-offset-top");
    });
		$(window).bind('resize', t_throttle(function(){t228_updateSectionsOffsets(t228_sections);}, 200));
		$('.t228').bind('displayChanged',function(){t228_updateSectionsOffsets(t228_sections);});
		setInterval(function(){t228_updateSectionsOffsets(t228_sections);},5000);
    t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);

    t228_navLinks.click(function() {
        var t228_clickedSection = t228_getSectionByHref($(this));
        if (!$(this).hasClass("tooltipstered") && typeof t228_clickedSection.attr("id") != "undefined") {
            t228_navLinks.removeClass('t-active');
            $(this).addClass('t-active');
            t228_clickedSectionId = t228_getSectionByHref($(this)).attr("id");
        }
    });
    $(window).scroll(function() {
        var t228_now = new Date().getTime();
        if (t228_lastCall && t228_now < (t228_lastCall + t228_interval)) {
            clearTimeout(t228_timeoutId);
            t228_timeoutId = setTimeout(function() {
                t228_lastCall = t228_now;
                t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);
            }, t228_interval - (t228_now - t228_lastCall));
        } else {
            t228_lastCall = t228_now;
            t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);
        }
    });
}


function t228_updateSectionsOffsets(sections){
	$(sections).each(function(){
		var t228_curSection = $(this);
		t228_curSection.attr("data-offset-top",t228_curSection.offset().top);
	});
}


function t228_getSectionByHref(curlink) {
    var t228_curLinkValue = curlink.attr("href").replace(/\s+/g, '');
    if (t228_curLinkValue[0]=='/') { t228_curLinkValue = t228_curLinkValue.substring(1); }
    if (curlink.is('[href*="#rec"]')) {
        return $(".r[id='" + t228_curLinkValue.substring(1) + "']");
    } else {
        return $(".r[data-record-type='215']").has("a[name='" + t228_curLinkValue.substring(1) + "']");
    }
}

function t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId) {
    var t228_scrollPosition = $(window).scrollTop(),
        t228_valueToReturn = t228_clickedSectionId;
    /*if first section is not at the page top (under first blocks)*/
    if (t228_sections.length != 0 && t228_clickedSectionId == null && t228_sections[t228_sections.length-1].attr("data-offset-top") > (t228_scrollPosition + 300)){
      t228_navLinks.removeClass('t-active');
      return null;
    }

    $(t228_sections).each(function(e) {
        var t228_curSection = $(this),
            t228_sectionTop = t228_curSection.attr("data-offset-top"),
            t228_id = t228_curSection.attr('id'),
            t228_navLink = t228_sectionIdTonavigationLink[t228_id];
        if (((t228_scrollPosition + 300) >= t228_sectionTop) || (t228_sections[0].attr("id") == t228_id && t228_scrollPosition >= $(document).height() - $(window).height())) {
            if (t228_clickedSectionId == null && !t228_navLink.hasClass('t-active')) {
                t228_navLinks.removeClass('t-active');
                t228_navLink.addClass('t-active');
                t228_valueToReturn = null;
            } else {
                if (t228_clickedSectionId != null && t228_id == t228_clickedSectionId) {
                    t228_valueToReturn = null;
                }
            }
            return false;
        }
    });
    return t228_valueToReturn;
}

function t228_setPath(){
}

function t228_setWidth(recid){
  var window_width=$(window).width();
  if(window_width>980){
    $(".t228").each(function() {
      var el=$(this);
      var left_exist=el.find('.t228__leftcontainer').length;
      var left_w=el.find('.t228__leftcontainer').outerWidth(true);
      var max_w=left_w;
      var right_exist=el.find('.t228__rightcontainer').length;
      var right_w=el.find('.t228__rightcontainer').outerWidth(true);
	  var items_align=el.attr('data-menu-items-align');
      if(left_w<right_w)max_w=right_w;
      max_w=Math.ceil(max_w);
      var center_w=0;
      el.find('.t228__centercontainer').find('li').each(function() {
        center_w+=$(this).outerWidth(true);
      });
      var padd_w=40;
      var maincontainer_width=el.find(".t228__maincontainer").outerWidth();
      if(maincontainer_width-max_w*2-padd_w*2>center_w+20){
          //if(left_exist>0 && right_exist>0){
		  if(items_align=="center" || typeof items_align==="undefined"){
            el.find(".t228__leftside").css("min-width",max_w+"px");
            el.find(".t228__rightside").css("min-width",max_w+"px");
            el.find(".t228__list").removeClass("t228__list_hidden");
          }
       }else{
          el.find(".t228__leftside").css("min-width","");
          el.find(".t228__rightside").css("min-width","");

      }
    });
  }
}

function t228_setBg(recid){
  var window_width=$(window).width();
  if(window_width>980){
    $(".t228").each(function() {
      var el=$(this);
      if(el.attr('data-bgcolor-setbyscript')=="yes"){
        var bgcolor=el.attr("data-bgcolor-rgba");
        el.css("background-color",bgcolor);
      }
      });
      }else{
        $(".t228").each(function() {
          var el=$(this);
          var bgcolor=el.attr("data-bgcolor-hex");
          el.css("background-color",bgcolor);
          el.attr("data-bgcolor-setbyscript","yes");
      });
  }
}

function t228_appearMenu(recid) {
      var window_width=$(window).width();
      if(window_width>980){
           $(".t228").each(function() {
                  var el=$(this);
                  var appearoffset=el.attr("data-appearoffset");
                  if(appearoffset!=""){
                          if(appearoffset.indexOf('vh') > -1){
                              appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                          }

                          appearoffset=parseInt(appearoffset, 10);

                          if ($(window).scrollTop() >= appearoffset) {
                            if(el.css('visibility') == 'hidden'){
                                el.finish();
                                el.css("top","-50px");
                                el.css("visibility","visible");
                                var topoffset = el.data('top-offset');
                                if (topoffset && parseInt(topoffset) > 0) {
                                    el.animate({"opacity": "1","top": topoffset+"px"}, 200,function() {
                                    });

                                } else {
                                    el.animate({"opacity": "1","top": "0px"}, 200,function() {
                                    });
                                }
                            }
                          }else{
                            el.stop();
                            el.css("visibility","hidden");
							el.css("opacity","0");
                          }
                  }
           });
      }

}

function t228_changebgopacitymenu(recid) {
  var window_width=$(window).width();
  if(window_width>980){
    $(".t228").each(function() {
      var el=$(this);
      var bgcolor=el.attr("data-bgcolor-rgba");
      var bgcolor_afterscroll=el.attr("data-bgcolor-rgba-afterscroll");
      var bgopacityone=el.attr("data-bgopacity");
      var bgopacitytwo=el.attr("data-bgopacity-two");
      var menushadow=el.attr("data-menushadow");
      if(menushadow=='100'){
        var menushadowvalue=menushadow;
      }else{
        var menushadowvalue='0.'+menushadow;
      }
      if ($(window).scrollTop() > 20) {
        el.css("background-color",bgcolor_afterscroll);
        if(bgopacitytwo=='0' || (typeof menushadow == "undefined" && menushadow == false)){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }else{
        el.css("background-color",bgcolor);
        if(bgopacityone=='0.0' || (typeof menushadow == "undefined" && menushadow == false)){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }
    });
  }
}

function t228_createMobileMenu(recid){
  var window_width=$(window).width(),
      el=$("#rec"+recid),
      menu=el.find(".t228"),
      burger=el.find(".t228__mobile");
  burger.click(function(e){
    menu.fadeToggle(300);
    $(this).toggleClass("t228_opened")
  })
  $(window).bind('resize', t_throttle(function(){
    window_width=$(window).width();
    if(window_width>980){
      menu.fadeIn(0);
    }
  }, 200));
}

function t270_scroll(hash, offset) {
    var $root = $('html, body');
    var target = "";
    try {
        target = $(hash);
    } catch(event) {
        console.log("Exception t270: " + event.message);
    }
    if (target.length == 0) {
        target = $('a[name="' + hash.substr(1) + '"]');
        if (target.length == 0) {
            return false;
        }
    }
    $root.animate({
        scrollTop: target.offset().top - offset
    }, 500, function() {
        if(history.pushState) {
            history.pushState(null, null, hash);
        } else {
            window.location.hash = hash;
        }
    });
    return true;
}
function t280_showMenu(recid){
  var el=$("#rec"+recid);
  el.find('.t280__burger, .t280__menu__bg, .t280__menu__item:not(".tooltipstered"):not(".t280__menu__item_submenu")').click(function(){
    if ($(this).is(".t280__menu__item.tooltipstered, .t794__tm-link")) { return; }
    $('body').toggleClass('t280_opened');
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (window.location.hash && isChrome) {
        setTimeout(function () {
            var hash = window.location.hash;
            window.location.hash = "";
            window.location.hash = hash;
        }, 50);
    }
  });
  $('.t280').bind('clickedAnchorInTooltipMenu',function(){
    $('body').removeClass('t280_opened');
  });

  if (el.find('.t-menusub__link-item')) {
    el.find('.t-menusub__link-item').on('click', function() {
      $('body').removeClass('t280_opened');
    });
  }
}

function t280_changeSize(recid){
  var el=$("#rec"+recid);
  var div = el.find(".t280__menu").height();
  var bottomheight = el.find(".t280__bottom").height();
  var headerheight = el.find(".t280__container").height();
  var wrapper = el.find(".t280__menu__wrapper");
  var win = $(window).height() - bottomheight - headerheight - 40;
  if (div > win ) {
    wrapper.addClass('t280__menu_static');
  }
  else {
    wrapper.removeClass('t280__menu_static');
  }
}

function t280_changeBgOpacityMenu(recid) {
  var window_width=$(window).width();
  var record = $("#rec"+recid);
  record.find(".t280__container__bg").each(function() {
        var el=$(this);
        var bgcolor=el.attr("data-bgcolor-rgba");
        var bgcolor_afterscroll=el.attr("data-bgcolor-rgba-afterscroll");
        var bgopacity=el.attr("data-bgopacity");
        var bgopacity_afterscroll=el.attr("data-bgopacity2");
        var menu_shadow=el.attr("data-menu-shadow");
        if ($(window).scrollTop() > 20) {
            el.css("background-color",bgcolor_afterscroll);
            if (bgopacity_afterscroll != "0" && bgopacity_afterscroll != "0.0") {
              el.css('box-shadow',menu_shadow);
            } else {
              el.css('box-shadow','none');
            }
        }else{
            el.css("background-color",bgcolor);
            if (bgopacity != "0" && bgopacity != "0.0") {
              el.css('box-shadow',menu_shadow);
            } else {
              el.css('box-shadow','none');
            }
        }
  });
}

function t280_appearMenu() {
  $('.t280').each(function() {
    var el = $(this);
    var appearoffset = el.attr('data-appearoffset');
    if (appearoffset != '') {
      if (appearoffset.indexOf('vh') > -1) {
        appearoffset = Math.floor(
          window.innerHeight * (parseInt(appearoffset) / 100)
        );
      }
      appearoffset = parseInt(appearoffset, 10);
      if ($(window).scrollTop() >= appearoffset) {
        if (el.css('visibility') == 'hidden') {
          el.finish();
          el.css('top', '-50px');
          el.css('opacity', '1');
          el.css('visibility', 'visible');
        }
      } else {
        el.stop();
        el.css('opacity', '0');
        el.css('visibility', 'hidden');
      }
    }
  });
}

function t280_highlight(recid){
  var url=window.location.href;
  var pathname=window.location.pathname;
  if(url.substr(url.length - 1) == "/"){ url = url.slice(0,-1); }
  if(pathname.substr(pathname.length - 1) == "/"){ pathname = pathname.slice(0,-1); }
  if(pathname.charAt(0) == "/"){ pathname = pathname.slice(1); }
  if(pathname == ""){ pathname = "/"; }
  $(".t280__menu a[href='"+url+"']").addClass("t-active");
  $(".t280__menu a[href='"+url+"/']").addClass("t-active");
  $(".t280__menu a[href='"+pathname+"']").addClass("t-active");
  $(".t280__menu a[href='/"+pathname+"']").addClass("t-active");
  $(".t280__menu a[href='"+pathname+"/']").addClass("t-active");
  $(".t280__menu a[href='/"+pathname+"/']").addClass("t-active");
}

function t281_initPopup(recid){
  $('#rec'+recid).attr('data-animationappear','off');
  $('#rec'+recid).css('opacity','1');
  $('#rec'+recid).attr('data-popup-subscribe-inited','y');
  var el=$('#rec'+recid).find('.t-popup'),
      hook=el.attr('data-tooltip-hook'),
      analitics=el.attr('data-track-popup');
  if(hook!==''){
    var obj = $('a[href="'+hook+'"]');
    obj.click(function(e){
      t281_showPopup(recid);
      t281_resizePopup(recid);
      e.preventDefault();
      if(window.lazy=='y'){t_lazyload_update();}
      if (analitics > '') {
        Tilda.sendEventToStatistics(analitics, hook);
      }
    });
  }
}

function t281_lockScroll(){
  var body = $("body");
	if (!body.hasClass('t-body_scroll-locked')) {
		var bodyScrollTop = (typeof window.pageYOffset !== 'undefined') ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
		body.addClass('t-body_scroll-locked');
		body.css("top","-"+bodyScrollTop+"px");
    body.attr("data-popup-scrolltop",bodyScrollTop);
	}
}

function t281_unlockScroll(){
  var body = $("body");
	if (body.hasClass('t-body_scroll-locked')) {
    var bodyScrollTop = $("body").attr("data-popup-scrolltop");
		body.removeClass('t-body_scroll-locked');
		body.css("top","");
    body.removeAttr("data-popup-scrolltop")
		window.scrollTo(0, bodyScrollTop);
	}
}

function t281_showPopup(recid){
  var el=$('#rec'+recid),
      popup = el.find('.t-popup');

  popup.css('display', 'block');
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
  }, 50);

  $('body').addClass('t-body_popupshowed t281__body_popupshowed');
  /*fix IOS11 cursor bug + general IOS background scroll*/
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
    setTimeout(function() {
      t281_lockScroll();
    }, 500);
  }

  el.find('.t-popup').mousedown(function(e){
    if (e.target == this) { t281_closePopup(); }
  });

  el.find('.t-popup__close').click(function(e){
    t281_closePopup();
  });

  el.find('a[href*=#]').click(function(e){
    var url = $(this).attr('href');
    if (!url || (url.substring(0,7) != '#price:' && url.substring(0,7) != '#order:')) {
      t281_closePopup();
      if (!url || url.substring(0,7) == '#popup:') {
        setTimeout(function() {
          $('body').addClass('t-body_popupshowed');
        }, 300);
      }
    }
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) { t281_closePopup(); }
  });
}

function t281_closePopup(){
  $('body').removeClass('t-body_popupshowed t281__body_popupshowed');
  /*fix IOS11 cursor bug + general IOS background scroll*/
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
    t281_unlockScroll();
  }
  $('.t-popup').removeClass('t-popup_show');
  setTimeout(function() {
    $('.t-popup').not('.t-popup_show').css('display', 'none');
  }, 300);
}

function t281_resizePopup(recid){
  var el = $("#rec"+recid),
      div = el.find(".t-popup__container").height(),
      win = $(window).height() - 120,
      popup = el.find(".t-popup__container");
  if (div > win ) {
    popup.addClass('t-popup__container-static');
  } else {
    popup.removeClass('t-popup__container-static');
  }
}

function t281_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
      popupname = popupname.substring(7);
  }

  virtPage += popupname;
  virtTitle += popupname;
  if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
    Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0);
  } else {
    if(ga) {
      if (window.mainTracker != 'tilda') {
        ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
      }
    }

    if (window.mainMetrika > '' && window[window.mainMetrika]) {
      window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
    }
  }
}
function t282_showMenu(recid){
  var el=$("#rec"+recid);
  el.find('.t282__burger, .t282__menu__item:not(".tooltipstered"):not(".t282__menu__item_submenu"), .t282__overlay').click(function(){
    if ($(this).is(".t282__menu__item.tooltipstered, .t794__tm-link")) { return; }
    $('body').toggleClass('t282_opened');
    el.find('.t282__menu__container, .t282__overlay').toggleClass('t282__closed');
    el.find(".t282__menu__container").css({'top':(el.find(".t282__container").height()+'px')});
  });
  $('.t282').bind('clickedAnchorInTooltipMenu',function(){
    $('body').removeClass('t282_opened');
    $('#rec'+recid+' .t282__menu__container, #rec'+recid+' .t282__overlay').addClass('t282__closed');
  });

  if (el.find('.t-menusub__link-item')) {
    el.find('.t-menusub__link-item').on('click', function() {
      $('body').removeClass('t282_opened');
      $('#rec' + recid + ' .t282__menu__container, #rec' + recid + ' .t282__overlay').addClass('t282__closed')
    })
  }
}

function t282_changeSize(recid){
  var el=$("#rec"+recid);
  var bottomheight = el.find(".t282__menu__container");
  var headerheight = el.find(".t282__container");
  var menu = bottomheight.height() + headerheight.height();
  var win = $(window).height();
  if (menu > win ) {
    $("#nav"+recid).addClass('t282__menu_static');
  }
  else {
    $("#nav"+recid).removeClass('t282__menu_static');
  }
}

function t282_changeBgOpacityMenu(recid) {
 var window_width=$(window).width();
 var record = $("#rec"+recid);
 record.find(".t282__container__bg").each(function() {
    var el=$(this);
    var bgcolor=el.attr("data-bgcolor-rgba");
    var bgcolor_afterscroll=el.attr("data-bgcolor-rgba-afterscroll");
    var bgopacity=el.attr("data-bgopacity");
    var bgopacity_afterscroll=el.attr("data-bgopacity2");
    var menu_shadow=el.attr("data-menu-shadow");
    if ($(window).scrollTop() > 20) {
        el.css("background-color",bgcolor_afterscroll);
        if (bgopacity_afterscroll != "0" && bgopacity_afterscroll != "0.0") {
          el.css('box-shadow',menu_shadow);
        } else {
          el.css('box-shadow','none');
        }
    }else{
        el.css("background-color",bgcolor);
        if (bgopacity != "0" && bgopacity != "0.0") {
          el.css('box-shadow',menu_shadow);
        } else {
          el.css('box-shadow','none');
        }
    }
 });
}

function t282_highlight(recid){
  var url=window.location.href;
  var pathname=window.location.pathname;
  if(url.substr(url.length - 1) == "/"){ url = url.slice(0,-1); }
  if(pathname.substr(pathname.length - 1) == "/"){ pathname = pathname.slice(0,-1); }
  if(pathname.charAt(0) == "/"){ pathname = pathname.slice(1); }
  if(pathname == ""){ pathname = "/"; }
  $(".t282__menu a[href='"+url+"']").addClass("t-active");
  $(".t282__menu a[href='"+url+"/']").addClass("t-active");
  $(".t282__menu a[href='"+pathname+"']").addClass("t-active");
  $(".t282__menu a[href='/"+pathname+"']").addClass("t-active");
  $(".t282__menu a[href='"+pathname+"/']").addClass("t-active");
  $(".t282__menu a[href='/"+pathname+"/']").addClass("t-active");
}

function t282_appearMenu(recid) {
      var window_width=$(window).width();
           $(".t282").each(function() {
                  var el=$(this);
                  var appearoffset=el.attr("data-appearoffset");
                  if(appearoffset!=""){
                          if(appearoffset.indexOf('vh') > -1){
                              appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                          }

                          appearoffset=parseInt(appearoffset, 10);

                          if ($(window).scrollTop() >= appearoffset) {
                            if(el.css('visibility') == 'hidden'){
                                el.finish();
                                el.css("top","-50px");
                                el.css("visibility","visible");
                                el.animate({"opacity": "1","top": "0px"}, 200,function() {
                                });
                            }
                          }else{
                            el.stop();
                            el.css("visibility","hidden");
                          }
                  }
           });

}


function t347_setHeight(recid){
  var el=$('#rec'+recid);
  var div = el.find(".t347__table");
  var height=div.width() * 0.5625;
  div.height(height);
}

window.t347showvideo = function(recid){
    $(document).ready(function(){
        var el = $('#rec'+recid);
        var videourl = '';

        var youtubeid=$("#rec"+recid+" .t347__video-container").attr('data-content-popup-video-url-youtube');
        if(youtubeid > '') {
            videourl = 'https://www.youtube.com/embed/' + youtubeid;
        }

        $("#rec"+recid+" .t347__video-container").removeClass( "t347__hidden");
        $("#rec"+recid+" .t347__video-carier").html("<iframe id=\"youtubeiframe"+recid+"\" class=\"t347__iframe\" width=\"100%\" height=\"100%\" src=\"" + videourl + "?autoplay=1&rel=0\" frameborder=\"0\" allowfullscreen></iframe>");
    });
}

window.t347hidevideo = function(recid){
    $(document).ready(function(){
        $("#rec"+recid+" .t347__video-container").addClass( "t347__hidden");
        $("#rec"+recid+" .t347__video-carier").html("");
    });
}
function t367_createCookie(name,value,days) {
  /*if (days == '' || parseInt(days) <= 0) {
    return;
  }*/
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function t367_readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function t367_autoInit(recid){
  var el = $('#rec'+recid).find('.t367__opener');
  var name = el.attr('data-cookie-name');
  var time = el.attr('data-cookie-time');
  var value = "t367cookie";
  var cookie = t367_readCookie(name);
  var delay = el.attr('data-trigger-time');
  var delaytime = delay * 1000;
  if (cookie) {
    $("#rec"+recid+" .t367").html("");
  }else if (el.length){
    setTimeout(function () {
      el.trigger('click');
      $("#rec"+recid+" .t367").html("");
      t367_createCookie(name,value,time);
    }, delaytime);
  }
}
function t390_showPopup(recid){
  var el=$('#rec'+recid),
      popup = el.find('.t-popup');

  popup.css('display', 'block');
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
  }, 50);

  $('body').addClass('t-body_popupshowed');

  el.find('.t-popup').mousedown(function(e){
    var windowWidth = $(window).width();
    var maxScrollBarWidth = 17;
    var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
    if(e.clientX > windowWithoutScrollBar) {
        return;
    }
    if (e.target == this) {
      t390_closePopup();
    }
  });

  el.find('.t-popup__close').click(function(e){
    t390_closePopup();
  });

  el.find('a[href*=#]').click(function(e){
    var url = $(this).attr('href');
    if (!url || url.substring(0,7) != '#price:') {
      t390_closePopup();
      if (!url || url.substring(0,7) == '#popup:') {
        setTimeout(function() {
          $('body').addClass('t-body_popupshowed');
        }, 300);
      }
    }
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) { t390_closePopup(); }
  });
}

function t390_closePopup(){
  $('body').removeClass('t-body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  setTimeout(function() {
    $('.t-popup').not('.t-popup_show').css('display', 'none');
  }, 300);
}

function t390_resizePopup(recid){
  var el = $("#rec"+recid),
      div = el.find(".t-popup__container").height(),
      win = $(window).height() - 120,
      popup = el.find(".t-popup__container");
  if (div > win ) {
    popup.addClass('t-popup__container-static');
  } else {
    popup.removeClass('t-popup__container-static');
  }
}
/* deprecated */
function t390_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
      popupname = popupname.substring(7);
  }

  virtPage += popupname;
  virtTitle += popupname;
  if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
    Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0);
  } else {
    if(ga) {
      if (window.mainTracker != 'tilda') {
        ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
      }
    }

    if (window.mainMetrika > '' && window[window.mainMetrika]) {
      window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
    }
  }
}

function t390_initPopup(recid){
  $('#rec'+recid).attr('data-animationappear','off');
  $('#rec'+recid).css('opacity','1');
  var el=$('#rec'+recid).find('.t-popup'),
      hook=el.attr('data-tooltip-hook'),
      analitics=el.attr('data-track-popup');
  if(hook!==''){
    $('.r').on('click', 'a[href="' + hook + '"]', function(e) {
      t390_showPopup(recid);
      t390_resizePopup(recid);
      e.preventDefault();
      if(window.lazy=='y'){t_lazyload_update();}
      if (analitics > '') {
        var virtTitle = hook;
        if (virtTitle.substring(0,7) == '#popup:') {
            virtTitle = virtTitle.substring(7);
        }
        Tilda.sendEventToStatistics(analitics, virtTitle);
      }
    });
  }
}

function t396_init(recid){var data='';var res=t396_detectResolution();t396_initTNobj();t396_switchResolution(res);t396_updateTNobj();t396_artboard_build(data,recid);window.tn_window_width=$(window).width();$( window ).resize(function () {tn_console('>>>> t396: Window on Resize event >>>>');t396_waitForFinalEvent(function(){if($isMobile){var ww=$(window).width();if(ww!=window.tn_window_width){t396_doResize(recid);}}else{t396_doResize(recid);}}, 500, 'resizeruniqueid'+recid);});$(window).on("orientationchange",function(){tn_console('>>>> t396: Orient change event >>>>');t396_waitForFinalEvent(function(){t396_doResize(recid);}, 600, 'orientationuniqueid'+recid);});$( window ).load(function() {var ab=$('#rec'+recid).find('.t396__artboard');t396_allelems__renderView(ab);});var rec = $('#rec' + recid);if (rec.attr('data-connect-with-tab') == 'yes') {rec.find('.t396').bind('displayChanged', function() {var ab = rec.find('.t396__artboard');t396_allelems__renderView(ab);});}}function t396_doResize(recid){var ww=$(window).width();window.tn_window_width=ww;var res=t396_detectResolution();var ab=$('#rec'+recid).find('.t396__artboard');t396_switchResolution(res);t396_updateTNobj();t396_ab__renderView(ab);t396_allelems__renderView(ab);}function t396_detectResolution(){var ww=$(window).width();var res;res=1200;if(ww<1200){res=960;}if(ww<960){res=640;}if(ww<640){res=480;}if(ww<480){res=320;}return(res);}function t396_initTNobj(){tn_console('func: initTNobj');window.tn={};window.tn.canvas_min_sizes = ["320","480","640","960","1200"];window.tn.canvas_max_sizes = ["480","640","960","1200",""];window.tn.ab_fields = ["height","width","bgcolor","bgimg","bgattachment","bgposition","filteropacity","filtercolor","filteropacity2","filtercolor2","height_vh","valign"];}function t396_updateTNobj(){tn_console('func: updateTNobj');if(typeof window.zero_window_width_hook!='undefined' && window.zero_window_width_hook=='allrecords' && $('#allrecords').length){window.tn.window_width = parseInt($('#allrecords').width());}else{window.tn.window_width = parseInt($(window).width());}/* window.tn.window_width = parseInt($(window).width()); */window.tn.window_height = parseInt($(window).height());if(window.tn.curResolution==1200){window.tn.canvas_min_width = 1200;window.tn.canvas_max_width = window.tn.window_width;}if(window.tn.curResolution==960){window.tn.canvas_min_width = 960;window.tn.canvas_max_width = 1200;}if(window.tn.curResolution==640){window.tn.canvas_min_width = 640;window.tn.canvas_max_width = 960;}if(window.tn.curResolution==480){window.tn.canvas_min_width = 480;window.tn.canvas_max_width = 640;}if(window.tn.curResolution==320){window.tn.canvas_min_width = 320;window.tn.canvas_max_width = 480;}window.tn.grid_width = window.tn.canvas_min_width;window.tn.grid_offset_left = parseFloat( (window.tn.window_width-window.tn.grid_width)/2 );}var t396_waitForFinalEvent = (function () {var timers = {};return function (callback, ms, uniqueId) {if (!uniqueId) {uniqueId = "Don't call this twice without a uniqueId";}if (timers[uniqueId]) {clearTimeout (timers[uniqueId]);}timers[uniqueId] = setTimeout(callback, ms);};})();function t396_switchResolution(res,resmax){tn_console('func: switchResolution');if(typeof resmax=='undefined'){if(res==1200)resmax='';if(res==960)resmax=1200;if(res==640)resmax=960;if(res==480)resmax=640;if(res==320)resmax=480;}window.tn.curResolution=res;window.tn.curResolution_max=resmax;}function t396_artboard_build(data,recid){tn_console('func: t396_artboard_build. Recid:'+recid);tn_console(data);/* set style to artboard */var ab=$('#rec'+recid).find('.t396__artboard');t396_ab__renderView(ab);/* create elements */ab.find('.tn-elem').each(function() {var item=$(this);if(item.attr('data-elem-type')=='text'){t396_addText(ab,item);}if(item.attr('data-elem-type')=='image'){t396_addImage(ab,item);}if(item.attr('data-elem-type')=='shape'){t396_addShape(ab,item);}if(item.attr('data-elem-type')=='button'){t396_addButton(ab,item);}if(item.attr('data-elem-type')=='video'){t396_addVideo(ab,item);}if(item.attr('data-elem-type')=='html'){t396_addHtml(ab,item);}if(item.attr('data-elem-type')=='tooltip'){t396_addTooltip(ab,item);}if(item.attr('data-elem-type')=='form'){t396_addForm(ab,item);}if(item.attr('data-elem-type')=='gallery'){t396_addGallery(ab,item);}});$('#rec'+recid).find('.t396__artboard').removeClass('rendering').addClass('rendered');if(ab.attr('data-artboard-ovrflw')=='visible'){$('#allrecords').css('overflow','hidden');}if($isMobile){$('#rec'+recid).append('<style>@media only screen and (min-width:1366px) and (orientation:landscape) and (-webkit-min-device-pixel-ratio:2) {.t396__carrier {background-attachment:scroll!important;}}</style>');}}function t396_ab__renderView(ab){var fields = window.tn.ab_fields;for ( var i = 0; i < fields.length; i++ ) {t396_ab__renderViewOneField(ab,fields[i]);}var ab_min_height=t396_ab__getFieldValue(ab,'height');var ab_max_height=t396_ab__getHeight(ab);var offset_top=0;if(ab_min_height==ab_max_height){offset_top=0;}else{var ab_valign=t396_ab__getFieldValue(ab,'valign');if(ab_valign=='top'){offset_top=0;}else if(ab_valign=='center'){offset_top=parseFloat( (ab_max_height-ab_min_height)/2 ).toFixed(1);}else if(ab_valign=='bottom'){offset_top=parseFloat( (ab_max_height-ab_min_height) ).toFixed(1);}else if(ab_valign=='stretch'){offset_top=0;ab_min_height=ab_max_height;}else{offset_top=0;}}ab.attr('data-artboard-proxy-min-offset-top',offset_top);ab.attr('data-artboard-proxy-min-height',ab_min_height);ab.attr('data-artboard-proxy-max-height',ab_max_height);}function t396_addText(ab,el){tn_console('func: addText');/* add data atributes */var fields_str='top,left,width,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addImage(ab,el){tn_console('func: addImage');/* add data atributes */var fields_str='img,width,filewidth,fileheight,top,left,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);el.find('img').on("load", function() {t396_elem__renderViewOneField(el,'top');if(typeof $(this).attr('src')!='undefined' && $(this).attr('src')!=''){setTimeout( function() { t396_elem__renderViewOneField(el,'top');} , 2000);} }).each(function() {if(this.complete) $(this).load();}); el.find('img').on('tuwidget_done', function(e, file) { t396_elem__renderViewOneField(el,'top');});}function t396_addShape(ab,el){tn_console('func: addShape');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addButton(ab,el){tn_console('func: addButton');/* add data atributes */var fields_str='top,left,width,height,container,axisx,axisy,caption,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);return(el);}function t396_addVideo(ab,el){tn_console('func: addVideo');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);var viel=el.find('.tn-atom__videoiframe');var viatel=el.find('.tn-atom');viatel.css('background-color','#000');var vihascover=viatel.attr('data-atom-video-has-cover');if(typeof vihascover=='undefined'){vihascover='';}if(vihascover=='y'){viatel.click(function() {var viifel=viel.find('iframe');if(viifel.length){var foo=viifel.attr('data-original');viifel.attr('src',foo);}viatel.css('background-image','none');viatel.find('.tn-atom__video-play-link').css('display','none');});}var autoplay=t396_elem__getFieldValue(el,'autoplay');var showinfo=t396_elem__getFieldValue(el,'showinfo');var loop=t396_elem__getFieldValue(el,'loop');var mute=t396_elem__getFieldValue(el,'mute');var startsec=t396_elem__getFieldValue(el,'startsec');var endsec=t396_elem__getFieldValue(el,'endsec');var tmode=$('#allrecords').attr('data-tilda-mode');var url='';var viyid=viel.attr('data-youtubeid');if(typeof viyid!='undefined' && viyid!=''){ url='//www.youtube.com/embed/'; url+=viyid+'?rel=0&fmt=18&html5=1'; url+='&showinfo='+(showinfo=='y'?'1':'0'); if(loop=='y'){url+='&loop=1&playlist='+viyid;} if(startsec>0){url+='&start='+startsec;} if(endsec>0){url+='&end='+endsec;} if(mute=='y'){url+='&mute=1';} if(vihascover=='y'){ url+='&autoplay=1'; viel.html('<iframe id="youtubeiframe" width="100%" height="100%" data-original="'+url+'" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>'); }else{ if(typeof tmode!='undefined' && tmode=='edit'){}else{ if(autoplay=='y'){url+='&autoplay=1';} } if(window.lazy=='y'){ viel.html('<iframe id="youtubeiframe" class="t-iframe" width="100%" height="100%" data-original="'+url+'" frameborder="0" allowfullscreen data-flag-inst="lazy"></iframe>'); el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});</script>'); }else{ viel.html('<iframe id="youtubeiframe" width="100%" height="100%" src="'+url+'" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>'); } }}var vivid=viel.attr('data-vimeoid');if(typeof vivid!='undefined' && vivid>0){url='//player.vimeo.com/video/';url+=vivid+'?color=ffffff&badge=0';if(showinfo=='y'){url+='&title=1&byline=1&portrait=1';}else{url+='&title=0&byline=0&portrait=0';}if(loop=='y'){url+='&loop=1';}if(mute=='y'){url+='&muted=1';}if(vihascover=='y'){url+='&autoplay=1';viel.html('<iframe data-original="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');}else{if(typeof tmode!='undefined' && tmode=='edit'){}else{if(autoplay=='y'){url+='&autoplay=1';}}if(window.lazy=='y'){viel.html('<iframe class="t-iframe" data-original="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});</script>');}else{viel.html('<iframe src="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');}}}}function t396_addHtml(ab,el){tn_console('func: addHtml');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addTooltip(ab, el) {tn_console('func: addTooltip');var fields_str = 'width,height,top,left,';fields_str += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits,tipposition';var fields = fields_str.split(',');el.attr('data-fields', fields_str);t396_elem__renderView(el);var pinEl = el.find('.tn-atom__pin');var tipEl = el.find('.tn-atom__tip');var tipopen = el.attr('data-field-tipopen-value');if (isMobile || (typeof tipopen!='undefined' && tipopen=='click')) {t396_setUpTooltip_mobile(el,pinEl,tipEl);} else {t396_setUpTooltip_desktop(el,pinEl,tipEl);}setTimeout(function() {$('.tn-atom__tip-img').each(function() {var foo = $(this).attr('data-tipimg-original');if (typeof foo != 'undefined' && foo != '') {$(this).attr('src', foo);}})}, 3000);}function t396_addForm(ab,el){tn_console('func: addForm');/* add data atributes */var fields_str='width,top,left,';fields_str+='inputs,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addGallery(ab,el){tn_console('func: addForm');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='imgs,container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_elem__setFieldValue(el,prop,val,flag_render,flag_updateui,res){if(res=='')res=window.tn.curResolution;if(res<1200 && prop!='zindex'){el.attr('data-field-'+prop+'-res-'+res+'-value',val);}else{el.attr('data-field-'+prop+'-value',val);}if(flag_render=='render')elem__renderViewOneField(el,prop);if(flag_updateui=='updateui')panelSettings__updateUi(el,prop,val);}function t396_elem__getFieldValue(el,prop){var res=window.tn.curResolution;var r;if(res<1200){if(res==960){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}if(res==640){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}if(res==480){r=el.attr('data-field-'+prop+'-res-480-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}}if(res==320){r=el.attr('data-field-'+prop+'-res-320-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-480-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}}}}else{r=el.attr('data-field-'+prop+'-value');}return(r);}function t396_elem__renderView(el){tn_console('func: elem__renderView');var fields=el.attr('data-fields');if(! fields) {return false;}fields = fields.split(',');/* set to element value of every fieldvia css */for ( var i = 0; i < fields.length; i++ ) {t396_elem__renderViewOneField(el,fields[i]);}}function t396_elem__renderViewOneField(el,field){var value=t396_elem__getFieldValue(el,field);if(field=='left'){value = t396_elem__convertPosition__Local__toAbsolute(el,field,value);el.css('left',parseFloat(value).toFixed(1)+'px');}if(field=='top'){value = t396_elem__convertPosition__Local__toAbsolute(el,field,value);el.css('top',parseFloat(value).toFixed(1)+'px');}if(field=='width'){value = t396_elem__getWidth(el,value);el.css('width',parseFloat(value).toFixed(1)+'px');var eltype=el.attr('data-elem-type');if(eltype=='tooltip'){var pinSvgIcon = el.find('.tn-atom__pin-icon');/*add width to svg nearest parent to fix InternerExplorer problem*/if (pinSvgIcon.length > 0) {var pinSize = parseFloat(value).toFixed(1) + 'px';pinSvgIcon.css({'width': pinSize, 'height': pinSize});}el.css('height',parseInt(value).toFixed(1)+'px');}if(eltype=='gallery') {var borderWidth = t396_elem__getFieldValue(el, 'borderwidth');var borderStyle = t396_elem__getFieldValue(el, 'borderstyle');if (borderStyle=='none' || typeof borderStyle=='undefined' || typeof borderWidth=='undefined' || borderWidth=='') borderWidth=0;value = value*1 - borderWidth*2;el.css('width', parseFloat(value).toFixed(1)+'px');el.find('.t-slds__main').css('width', parseFloat(value).toFixed(1)+'px');el.find('.tn-atom__slds-img').css('width', parseFloat(value).toFixed(1)+'px');}}if(field=='height'){var eltype = el.attr('data-elem-type');if (eltype == 'tooltip') {return;}value=t396_elem__getHeight(el,value);el.css('height', parseFloat(value).toFixed(1)+'px');if (eltype === 'gallery') {var borderWidth = t396_elem__getFieldValue(el, 'borderwidth');var borderStyle = t396_elem__getFieldValue(el, 'borderstyle');if (borderStyle=='none' || typeof borderStyle=='undefined' || typeof borderWidth=='undefined' || borderWidth=='') borderWidth=0;value = value*1 - borderWidth*2;el.css('height',parseFloat(value).toFixed(1)+'px');el.find('.tn-atom__slds-img').css('height', parseFloat(value).toFixed(1) + 'px');el.find('.t-slds__main').css('height', parseFloat(value).toFixed(1) + 'px');}}if(field=='container'){t396_elem__renderViewOneField(el,'left');t396_elem__renderViewOneField(el,'top');}if(field=='width' || field=='height' || field=='fontsize' || field=='fontfamily' || field=='letterspacing' || field=='fontweight' || field=='img'){t396_elem__renderViewOneField(el,'left');t396_elem__renderViewOneField(el,'top');}if(field=='inputs'){value=el.find('.tn-atom__inputs-textarea').val();try {t_zeroForms__renderForm(el,value);} catch (err) {}}}function t396_elem__convertPosition__Local__toAbsolute(el,field,value){value = parseInt(value);if(field=='left'){var el_container,offset_left,el_container_width,el_width;var container=t396_elem__getFieldValue(el,'container');if(container=='grid'){el_container = 'grid';offset_left = window.tn.grid_offset_left;el_container_width = window.tn.grid_width;}else{el_container = 'window';offset_left = 0;el_container_width = window.tn.window_width;}/* fluid or not*/var el_leftunits=t396_elem__getFieldValue(el,'leftunits');if(el_leftunits=='%'){value = t396_roundFloat( el_container_width * value/100 );}value = offset_left + value;var el_axisx=t396_elem__getFieldValue(el,'axisx');if(el_axisx=='center'){el_width = t396_elem__getWidth(el);value = el_container_width/2 - el_width/2 + value;}if(el_axisx=='right'){el_width = t396_elem__getWidth(el);value = el_container_width - el_width + value;}}if(field=='top'){var ab=el.parent();var el_container,offset_top,el_container_height,el_height;var container=t396_elem__getFieldValue(el,'container');if(container=='grid'){el_container = 'grid';offset_top = parseFloat( ab.attr('data-artboard-proxy-min-offset-top') );el_container_height = parseFloat( ab.attr('data-artboard-proxy-min-height') );}else{el_container = 'window';offset_top = 0;el_container_height = parseFloat( ab.attr('data-artboard-proxy-max-height') );}/* fluid or not*/var el_topunits=t396_elem__getFieldValue(el,'topunits');if(el_topunits=='%'){value = ( el_container_height * (value/100) );}value = offset_top + value;var el_axisy=t396_elem__getFieldValue(el,'axisy');if(el_axisy=='center'){/* var el_height=parseFloat(el.innerHeight()); */el_height=t396_elem__getHeight(el);value = el_container_height/2 - el_height/2 + value;}if(el_axisy=='bottom'){/* var el_height=parseFloat(el.innerHeight()); */el_height=t396_elem__getHeight(el);value = el_container_height - el_height + value;} }return(value);}function t396_ab__setFieldValue(ab,prop,val,res){/* tn_console('func: ab__setFieldValue '+prop+'='+val);*/if(res=='')res=window.tn.curResolution;if(res<1200){ab.attr('data-artboard-'+prop+'-res-'+res,val);}else{ab.attr('data-artboard-'+prop,val);}}function t396_ab__getFieldValue(ab,prop){var res=window.tn.curResolution;var r;if(res<1200){if(res==960){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}if(res==640){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}if(res==480){r=ab.attr('data-artboard-'+prop+'-res-480');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}}if(res==320){r=ab.attr('data-artboard-'+prop+'-res-320');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-480');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}}}}else{r=ab.attr('data-artboard-'+prop);}return(r);}function t396_ab__renderViewOneField(ab,field){var value=t396_ab__getFieldValue(ab,field);}function t396_allelems__renderView(ab){tn_console('func: allelems__renderView: abid:'+ab.attr('data-artboard-recid'));ab.find(".tn-elem").each(function() {t396_elem__renderView($(this));});}function t396_ab__filterUpdate(ab){var filter=ab.find('.t396__filter');var c1=filter.attr('data-filtercolor-rgb');var c2=filter.attr('data-filtercolor2-rgb');var o1=filter.attr('data-filteropacity');var o2=filter.attr('data-filteropacity2');if((typeof c2=='undefined' || c2=='') && (typeof c1!='undefined' && c1!='')){filter.css("background-color", "rgba("+c1+","+o1+")");}else if((typeof c1=='undefined' || c1=='') && (typeof c2!='undefined' && c2!='')){filter.css("background-color", "rgba("+c2+","+o2+")");}else if(typeof c1!='undefined' && typeof c2!='undefined' && c1!='' && c2!=''){filter.css({background: "-webkit-gradient(linear, left top, left bottom, from(rgba("+c1+","+o1+")), to(rgba("+c2+","+o2+")) )" });}else{filter.css("background-color", 'transparent');}}function t396_ab__getHeight(ab, ab_height){if(typeof ab_height=='undefined')ab_height=t396_ab__getFieldValue(ab,'height');ab_height=parseFloat(ab_height);/* get Artboard height (fluid or px) */var ab_height_vh=t396_ab__getFieldValue(ab,'height_vh');if(ab_height_vh!=''){ab_height_vh=parseFloat(ab_height_vh);if(isNaN(ab_height_vh)===false){var ab_height_vh_px=parseFloat( window.tn.window_height * parseFloat(ab_height_vh/100) );if( ab_height < ab_height_vh_px ){ab_height=ab_height_vh_px;}}} return(ab_height);} function t396_hex2rgb(hexStr){/*note: hexStr should be #rrggbb */var hex = parseInt(hexStr.substring(1), 16);var r = (hex & 0xff0000) >> 16;var g = (hex & 0x00ff00) >> 8;var b = hex & 0x0000ff;return [r, g, b];}String.prototype.t396_replaceAll = function(search, replacement) {var target = this;return target.replace(new RegExp(search, 'g'), replacement);};function t396_elem__getWidth(el,value){if(typeof value=='undefined')value=parseFloat( t396_elem__getFieldValue(el,'width') );var el_widthunits=t396_elem__getFieldValue(el,'widthunits');if(el_widthunits=='%'){var el_container=t396_elem__getFieldValue(el,'container');if(el_container=='window'){value=parseFloat( window.tn.window_width * parseFloat( parseInt(value)/100 ) );}else{value=parseFloat( window.tn.grid_width * parseFloat( parseInt(value)/100 ) );}}return(value);}function t396_elem__getHeight(el,value){if(typeof value=='undefined')value=t396_elem__getFieldValue(el,'height');value=parseFloat(value);if(el.attr('data-elem-type')=='shape' || el.attr('data-elem-type')=='video' || el.attr('data-elem-type')=='html' || el.attr('data-elem-type')=='gallery'){var el_heightunits=t396_elem__getFieldValue(el,'heightunits');if(el_heightunits=='%'){var ab=el.parent();var ab_min_height=parseFloat( ab.attr('data-artboard-proxy-min-height') );var ab_max_height=parseFloat( ab.attr('data-artboard-proxy-max-height') );var el_container=t396_elem__getFieldValue(el,'container');if(el_container=='window'){value=parseFloat( ab_max_height * parseFloat( value/100 ) );}else{value=parseFloat( ab_min_height * parseFloat( value/100 ) );}}}else if(el.attr('data-elem-type')=='button'){value = value;}else{value =parseFloat(el.innerHeight());}return(value);}function t396_roundFloat(n){n = Math.round(n * 100) / 100;return(n);}function tn_console(str){if(window.tn_comments==1)console.log(str);}function t396_setUpTooltip_desktop(el, pinEl, tipEl) {var timer;pinEl.mouseover(function() {/*if any other tooltip is waiting its timeout to be hided — hide it*/$('.tn-atom__tip_visible').each(function(){var thisTipEl = $(this).parents('.t396__elem');if (thisTipEl.attr('data-elem-id') != el.attr('data-elem-id')) {t396_hideTooltip(thisTipEl, $(this));}});clearTimeout(timer);if (tipEl.css('display') == 'block') {return;}t396_showTooltip(el, tipEl);});pinEl.mouseout(function() {timer = setTimeout(function() {t396_hideTooltip(el, tipEl);}, 300);})}function t396_setUpTooltip_mobile(el,pinEl,tipEl) {pinEl.on('click', function(e) {if (tipEl.css('display') == 'block' && $(e.target).hasClass("tn-atom__pin")) {t396_hideTooltip(el,tipEl);} else {t396_showTooltip(el,tipEl);}});var id = el.attr("data-elem-id");$(document).click(function(e) {var isInsideTooltip = ($(e.target).hasClass("tn-atom__pin") || $(e.target).parents(".tn-atom__pin").length > 0);if (isInsideTooltip) {var clickedPinId = $(e.target).parents(".t396__elem").attr("data-elem-id");if (clickedPinId == id) {return;}}t396_hideTooltip(el,tipEl);})}function t396_hideTooltip(el, tipEl) {tipEl.css('display', '');tipEl.css({"left": "","transform": "","right": ""});tipEl.removeClass('tn-atom__tip_visible');el.css('z-index', '');}function t396_showTooltip(el, tipEl) {var pos = el.attr("data-field-tipposition-value");if (typeof pos == 'undefined' || pos == '') {pos = 'top';};var elSize = el.height();var elTop = el.offset().top;var elBottom = elTop + elSize;var elLeft = el.offset().left;var elRight = el.offset().left + elSize;var winTop = $(window).scrollTop();var winWidth = $(window).width();var winBottom = winTop + $(window).height();var tipElHeight = tipEl.outerHeight();var tipElWidth = tipEl.outerWidth();var padd=15;if (pos == 'right' || pos == 'left') {var tipElRight = elRight + padd + tipElWidth;var tipElLeft = elLeft - padd - tipElWidth;if ((pos == 'right' && tipElRight > winWidth) || (pos == 'left' && tipElLeft < 0)) {pos = 'top';}}if (pos == 'top' || pos == 'bottom') {var tipElRight = elRight + (tipElWidth / 2 - elSize / 2);var tipElLeft = elLeft - (tipElWidth / 2 - elSize / 2);if (tipElRight > winWidth) {var rightOffset = -(winWidth - elRight - padd);tipEl.css({"left": "auto","transform": "none","right": rightOffset + "px"});}if (tipElLeft < 0) {var leftOffset = -(elLeft - padd);tipEl.css({"left": leftOffset + "px","transform": "none"});}}if (pos == 'top') {var tipElTop = elTop - padd - tipElHeight;if (winTop > tipElTop) {pos = 'bottom';}}if (pos == 'bottom') {var tipElBottom = elBottom + padd + tipElHeight;if (winBottom < tipElBottom) {pos = 'top';}}tipEl.attr('data-tip-pos', pos);tipEl.css('display', 'block');tipEl.addClass('tn-atom__tip_visible');el.css('z-index', '1000');}function t396_hex2rgba(hexStr, opacity){var hex = parseInt(hexStr.substring(1), 16);var r = (hex & 0xff0000) >> 16;var g = (hex & 0x00ff00) >> 8;var b = hex & 0x0000ff;return [r, g, b, parseFloat(opacity)];}

function t397_init(recid) {
    var el = $('#rec' + recid);
    el.find('.t397__tab').click(function() {
        el.find('.t397__tab').removeClass('t397__tab_active');
        $(this).addClass('t397__tab_active');
        t397_alltabs_updateContent(recid);
        t397_updateSelect(recid);
        $('.t230, .t670, .t347, .t346, .t519, .t774, .t764, .t744, .t349, .t650, .t604, .t117, .t517, .t609, .t351, .t353, .t341, .t404, .t385, .t386, .t412, .t268, .t425, .t409, .t384, .t279, .t428, .t418, .t433, .t121, .t478, .t498, .t552, .t544, .t554, .t545, .t486, .t570, .t422, .t601, .t228, .t229, .t456, .t592, .t520, .t599, .t422, .t504, .t688, .t675, .t132, .t616, .t686, .t778, .t615, .t433, .t598, .t762, .t538, .t226, .t698, .t760, .t511, .t799, .t780, .t827, .t740, .t480, .t827, .t829, .t605, .t726, .t728, .t822, .t798, .t801, .t694, .t842, .t843, .t849, .t850, .t851, .t856, .t858, .t859, .t860, .t396, .t518, .t738, .t532, .t431, .t700, .t223, .t539, .t577, .t754, .t776, .t-feed, .t-store, .t477, .t923, .t902, .t734').trigger('displayChanged');
        setTimeout(function() {
            $('.t351, .t353, .t341, .t404, .t385, .t386, .t412, .t268, .t425, .t409, .t384, .t279, .t428, .t433, .t545, .t422, .t410, .t829, .t396, .t738').trigger('displayChanged')
        }, 50);
        t397_startUpdateLazyLoad($(this));
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    });
    t397_alltabs_updateContent(recid);
    t397_updateContentBySelect(recid);
    $('.t397').bind('displayChanged',function(){
        t397_alltabs_updateContent(recid);
        t397_updateContentBySelect(recid);
    });
    var bgcolor = el.css("background-color");
    var bgcolor_target = el.find(".t397__select, .t397__firefoxfix");
    bgcolor_target.css("background-color", bgcolor)
}

function t397_alltabs_updateContent(recid){
    var el = $('#rec' + recid);
    el.find(".t397__tab").each(function(i) {
        var rec_ids = $(this).attr('data-tab-rec-ids').split(',');
        rec_ids.forEach(function(rec_id, i, arr) {
            var rec_el = $('#rec' + rec_id);
            rec_el.attr('data-connect-with-tab', 'yes');
            rec_el.attr('data-animationappear', 'off');
            rec_el.addClass('t379__off')
        })
    });
    el.find(".t397__tab_active").each(function(i) {
        if ($(this).is(":visible") || el.find(".t397__select").is(":visible")) {
            var rec_ids = $(this).attr('data-tab-rec-ids').split(',');
            rec_ids.forEach(function(rec_id, i, arr) {
                var rec_el = $('#rec' + rec_id);
                rec_el.removeClass('t379__off');
                rec_el.css('opacity', '')
            })
        }
    });
}

function t397_updateContentBySelect(recid) {
    var el = $('#rec' + recid);
    el.find(".t397__select").change(function() {
        var select_val = el.find(".t397__select").val();
        var tab_index = el.find(".t397__tab[data-tab-rec-ids='" + select_val + "']");
        tab_index.trigger('click')
    })
}

function t397_updateSelect(recid) {
    var el = $('#rec' + recid);
    var current_tab = el.find(".t397__tab_active").attr('data-tab-rec-ids');
    var el_select = el.find(".t397__select");
    el_select.val(current_tab)
}

function t397_startUpdateLazyLoad($this) {
    var rec_ids = $this.attr('data-tab-rec-ids').split(',');
    rec_ids.forEach(function(rec_id, i, arr) {
	  var rec_el=$('#rec'+rec_id);

      var video = rec_el.find('.t-video-lazyload');
      if (video.length > 0) {
          t397_updateVideoLazyLoad(video);
      }
	});
}

function t397_updateVideoLazyLoad(video) {
    setTimeout(function() {
        video.each(function() {
            var div = $(this);

            if (!div.hasClass('t-video__isload')) {

                var height = div.attr('data-videolazy-height') ? $(this).attr('data-videolazy-height') : '100%';
                if (height.indexOf('vh') != -1) {
                    height = '100%';
                }

                var videoId = div.attr('data-videolazy-id').trim();
                var blockId = div.attr('data-blocklazy-id') || '';
                if (typeof div.attr('data-videolazy-two-id') != 'undefined') {
                  var videoTwoId = '_' + div.attr('data-videolazy-two-id') + '_';
                } else {
                  var videoTwoId = '';
                }

                if (div.attr('data-videolazy-type') == 'youtube') {
                    div.find('iframe').remove();
                    div.prepend('<iframe id="youtubeiframe' + videoTwoId + blockId + '" width="100%" height="' + height + '" src="//www.youtube.com/embed/' + videoId + '?rel=0&fmt=18&html5=1&showinfo=0" frameborder="0" allowfullscreen></iframe>');
                }
            }

            div.addClass('t-video__isload');
        });
    }, 0);
}

function t409_unifyHeights(recid) {
  if($(window).width()>=960){
    var el = $("#rec"+recid);
    var imgwidth = el.find(".t409__img").width();
    var imgwrapperwidth = el.find(".t409__imgwrapper").css("max-width");
    var imgwrapperwidthpx = parseInt(imgwrapperwidth, 10);
    var margin = imgwrapperwidthpx - imgwidth;
    el.find(".t409__img").css("margin-left", margin);
  }
}

function t410_init(recid) {
  var el=$('#rec'+recid);
  var firstimgurl = el.find(".t410__wrapper").attr("data-juxtapose-imgurl-first");
  var firstimgdescr = el.find(".t410__wrapper").attr("data-juxtapose-imgdescr-first");
  var firstimgalt = el.find(".t410__wrapper").attr("data-juxtapose-imgalt-first");
  var secondimgurl = el.find(".t410__wrapper").attr("data-juxtapose-imgurl-second");
  var secondimgdescr = el.find(".t410__wrapper").attr("data-juxtapose-imgdescr-second");
  var secondimgalt = el.find(".t410__wrapper").attr("data-juxtapose-imgalt-second");
  new juxtapose.JXSlider('#t410-juxtapose__' + recid + '', [{
      src: firstimgurl,
      label: firstimgdescr
  }, {
      src: secondimgurl,
      label: secondimgdescr
  }], {
      animate: false,
      showLabels: true,
      showCredits: false,
      startingPosition: '50%',
      makeResponsive: true,
      callback: function() {

        if (firstimgalt.length > 0) {
            el.find('.t410__wrapper .jx-image.jx-left img').attr('alt', firstimgalt);
        }

        if (secondimgalt.length > 0) {
            el.find('.t410__wrapper .jx-image.jx-right img').attr('alt', secondimgalt);
        }

        if (window.$isMobile) {
          el.find('.t410__wrapper').append('<div class="t410__mobile_left"></div><div class="t410__mobile_right"></div>');
          var hanlerWidth = el.find('.jx-handle').width(),
              leftSide = el.find('.jx-image.jx-left'),
              rightSide = el.find('.jx-image.jx-right'),
              leftWidth = leftSide.width() - hanlerWidth/2,
              rightWidth = rightSide.width() - hanlerWidth/2,
              wrapper = el.find('.t410__wrapper'),
              mobileLeft = el.find('.t410__mobile_left'),
              mobileRight = el.find('.t410__mobile_right');

          mobileLeft.css('width', leftWidth);
          mobileRight.css('width', rightWidth);

          wrapper.on('touchend', function() {
            leftWidth = leftSide.width() - hanlerWidth/2;
            rightWidth = rightSide.width() - hanlerWidth/2;
            mobileLeft.css('width', leftWidth);
            mobileRight.css('width', rightWidth);
          });
        }
      }
  });
}
function t418_checkSize(recid){
  var el=$("#rec"+recid);
  var sizer = el.find('.t418__height');
  var height = sizer.height();
  var width = sizer.width();
  var ratio = width/height;
  var gallerywrapper = el.find(".t418__checksize");
  var gallerywidth = gallerywrapper.width();
  gallerywrapper.css({'height':((gallerywidth/ratio)+'px')});

  var maxwidth = el.find(".t418__height").width();
  var windowwidth  = $(window).width();
  var value = windowwidth - 80;
  if (maxwidth > windowwidth) {
    el.find(".t418__item").css("max-width", value + "px");
    el.find(".t418__img").css("left", "20px");
    el.find(".t418__img").css("right", "20px");
  } else {
    el.find(".t418__item").css("max-width", "");
    el.find(".t418__img").css("left", "");
    el.find(".t418__img").css("right", "");
  }
}

function t418_init(recid){
  var el=$('#rec'+recid);
  var pos = 0;
  var t418_doResize;
  var totalSlides = el.find('.t418__item').length;
  var sliderWidth = el.find('.t418__item').width();

  $(window).resize(function() {
    if (t418_doResize) clearTimeout(t418_doResize);
    t418_doResize = setTimeout(function() {
      sliderWidth = el.find('.t418__item').width();
      el.find('.t418__slidecontainer').width(sliderWidth*totalSlides);
      console.log(sliderWidth);
    }, 200);
  });

  el.find('.t418__slidecontainer').width(sliderWidth*totalSlides);

  el.find('.t418__next').click(function(){
    slideRight(recid);
  });

  el.find('.t418__previous').click(function(){
    slideLeft(recid);
  });

  function slideLeft(recid){
    var el=$('#rec'+recid);
    pos--;
    if(pos==-1){ pos = totalSlides-1; }
    el.find('.t418__slidecontainer').css({transform: 'translate(-' + (sliderWidth*pos) + 'px, 0)'})
    el.find('.t418__slidecontainer').css("transition-duration", ".3s");
    if(window.lazy=='y'){t_lazyload_update();}
  }

  function slideRight(recid){
    var el=$('#rec'+recid);
    pos++;
    if(pos==totalSlides){ pos = 0; }
    el.find('.t418__slidecontainer').css({transform: 'translate(-' + (sliderWidth*pos) + 'px, 0)'})
    el.find('.t418__slidecontainer').css("transition-duration", ".3s");
    if(window.lazy=='y'){t_lazyload_update();}
  }

  var swipeOptions = {
      triggerOnTouchEnd: true,
      swipeStatus: swipeStatus,
      allowPageScroll: "vertical",
      threshold: 75
  };

  el.find(".t418__slidecontainer").swipe(swipeOptions);
  el.find(".t418__slidecontainer").swipe( {
    tap:function(event, target) {
      slideRight(recid);
    }
  });

  function swipeStatus(event, phase, direction, distance) {
      if (phase == "move" && (direction == "left" || direction == "right")) {
          var duration = 0;

          if (direction == "left") {
              scrollImages((sliderWidth * pos) + distance, duration);
          } else if (direction == "right") {
              scrollImages((sliderWidth * pos) - distance, duration);
          }

      } else if (phase == "cancel") {
          scrollImages(sliderWidth * pos);
      } else if (phase == "end") {
          if (direction == "right") {
              slideLeft(recid);
          } else if (direction == "left") {
              slideRight(recid);
          }
      }
  }

  function scrollImages(distance, duration) {
      //el.find(".t418__slidecontainer").css("transition-duration", "0s");
      el.find(".t418__slidecontainer").css("transition-duration", (duration / 1000).toFixed(1) + "s");
      var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
      el.find(".t418__slidecontainer").css("transform", "translate(" + value + "px, 0)");
  }
}



function t509_setHeight(recid) {
  var t509__el=$("#rec"+recid);
  var t509__image = t509__el.find(".t509__blockimg");
  t509__image.each(function() {
    var t509__width = $(this).attr("data-image-width");
    var t509__height = $(this).attr("data-image-height");
    var t509__ratio = t509__height/t509__width;
    var t509__padding = t509__ratio*100;
    $(this).css("padding-bottom",t509__padding+"%");
  });

  if ($(window).width()>960){
    var t509__textwr = t509__el.find(".t509__textwrapper");
    var t509__deskimg = t509__el.find(".t509__desktopimg");
    t509__textwr.each(function() {
    $(this).css("height", t509__deskimg.innerHeight());
    });
  }
}

function t527_setHeight(recid) {
  var t527__el=$("#rec"+recid),
      t527__image = t527__el.find(".t527__bgimg:first"),
      t527__width = t527__image.attr("data-image-width"),
      t527__height = t527__image.attr("data-image-height"),
      t527__ratio = t527__height/t527__width,
      t527__padding = t527__ratio*100;
  $("#rec"+recid+" .t527__bgimg").css("padding-bottom",t527__padding+"%");
}
function t604_init(recid) {
  t604_imageHeight(recid);
  t604_arrowWidth(recid);
  t604_show(recid);
  t604_hide(recid);
  $(window).bind('resize', t_throttle(function(){
    t604_arrowWidth(recid);
  }, 200));
}

function t604_show(recid) {
  var el=$("#rec"+recid),
      play = el.find('.t604__play');
  play.click(function(){
    if($(this).attr('data-slider-video-type')=='youtube'){
      var url = $(this).attr('data-slider-video-url');
      $(this).next().html("<iframe class=\"t604__iframe\" width=\"100%\" height=\"100%\" src=\"https://www.youtube.com/embed/"+url+"?autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
    }
    if($(this).attr('data-slider-video-type')=='vimeo'){
      var url = $(this).attr('data-slider-video-url');
      $(this).next().html("<iframe class=\"t604__iframe\" width=\"100%\" height=\"100%\" src=\"https://player.vimeo.com/video/"+url+"?autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
    }
    $(this).next().css('z-index', '3');
  });
}

function t604_hide(recid) {
  var el=$("#rec"+recid),
      body = el.find('.t604__frame');
  el.on('updateSlider', function(){
    body.html('').css('z-index', '');
  });
}

function t604_imageHeight(recid) {
  var el=$("#rec"+recid);
  var image = el.find(".t604__separator");
  image.each(function() {
    var width = $(this).attr("data-slider-image-width");
    var height = $(this).attr("data-slider-image-height");
    var ratio = height/width;
    var padding = ratio*100;
    $(this).css("padding-bottom",padding+"%");
  });
}

function t604_arrowWidth(recid) {
  var el=$("#rec"+recid),
      arrow = el.find('.t-slds__arrow_wrapper'),
      slideWidth = el.find('.t-slds__wrapper').width(),
      windowWidth = $(window).width(),
      arrowWidth = windowWidth-slideWidth;
  if(windowWidth>960){
    arrow.css('width', arrowWidth/2);
  } else {
    arrow.css('width', '');
  }
}
function t607_init(recid) {
	t607_checkAnchorLinks(recid);
}


function t607_checkAnchorLinks(recid) {
	if($(window).width()>=960) {
	  var t607_navLinks = $("#rec"+recid+" .t607__list_item a:not(.tooltipstered)[href*='#']");
      if (t607_navLinks.length>0){
      	t607_catchScroll(t607_navLinks);
      };
	}
}


function t607_catchScroll(t607_navLinks) {
    var t607_clickedSectionId = null,
      t607_sections = new Array(),
      t607_sectionIdTonavigationLink = {},
      t607_interval = 100,
      t607_lastCall,
      t607_timeoutId;
	t607_navLinks = $(t607_navLinks.get().reverse());
	t607_navLinks.each(function(){
		var t607_cursection = t607_getSectionByHref($(this));
		if (typeof t607_cursection.attr("id") != "undefined") { t607_sections.push(t607_cursection); }
		t607_sectionIdTonavigationLink[t607_cursection.attr("id")] = $(this);
	});
	t607_highlightNavLinks(t607_navLinks,t607_sections,t607_sectionIdTonavigationLink,t607_clickedSectionId);
	setTimeout(function() { t607_highlightNavLinks(t607_navLinks,t607_sections,t607_sectionIdTonavigationLink,t607_clickedSectionId); }, 1000);

	$(document).keydown(function(e) {
		var t607_direction = "";
		switch(e.which) {
				case 38: t607_direction = "top"; break;
				case 40: t607_direction = "bottom"; break;
				case 33: t607_direction = "top"; break;
				case 34: t607_direction = "bottom"; break;
				default: return;
		}
		if (t607_direction!="") {
			var t607_curActiveSectionId = t607_getSectionByHref(t607_navLinks.filter(".t-active")).attr("id"),
			 		t607_newActiveSectionIndex = $.map(t607_sections, function(obj, index) {
			    if(obj.attr("id") == t607_curActiveSectionId && t607_direction == "top") { return index + 1; }
					if(obj.attr("id") == t607_curActiveSectionId && t607_direction == "bottom") { return index - 1; }
			});
			var t607_newActiveSection = t607_sections[t607_newActiveSectionIndex[0]];
			if (typeof t607_newActiveSection == "undefined") { return; }

			t607_navLinks.removeClass('t-active');
			var	$root = $('html, body'),
					t607_offsetTop = $(".t607").attr("data-offset-top");
			t607_sectionIdTonavigationLink[t607_newActiveSection.attr("id")].addClass('t-active');
			t607_clickedSectionId = t607_newActiveSection.attr("id");
			if (typeof t607_offsetTop!="undefined") { $root.animate({ scrollTop: t607_newActiveSection.offset().top - t607_offsetTop}, 500); }
			else { $root.animate({ scrollTop: t607_newActiveSection.offset().top}, 500); }
		}
	});

	t607_navLinks.click(function() {
		if (!$(this).hasClass("tooltipstered")) {
		  t607_navLinks.removeClass('t-active');
			var t607_clickedSection = t607_getSectionByHref($(this)),
					$root = $('html, body'),
					t607_offsetTop = $(".t607").attr("data-offset-top");
		  if (!$(this).hasClass("t-active")) { t607_clickedSectionId = t607_clickedSection.attr("id"); }
          t607_sectionIdTonavigationLink[t607_clickedSection.attr("id")].addClass('t-active');
          if (typeof t607_offsetTop!="undefined") { $root.animate({ scrollTop: t607_clickedSection.offset().top - t607_offsetTop}, 500); }
          else { $root.animate({ scrollTop: t607_clickedSection.offset().top}, 500); }
          return false;
		}
  	});

	$(window).scroll( function() {
		var t607_now = new Date().getTime();
		if (t607_lastCall && t607_now < (t607_lastCall + t607_interval) ) {
				clearTimeout(t607_timeoutId);
				t607_timeoutId = setTimeout(function () {
						t607_lastCall = t607_now;
						t607_clickedSectionId = t607_highlightNavLinks(t607_navLinks,t607_sections,t607_sectionIdTonavigationLink,t607_clickedSectionId);
				}, t607_interval - (t607_now - t607_lastCall) );
		} else {
				t607_lastCall = t607_now;
				t607_clickedSectionId = t607_highlightNavLinks(t607_navLinks,t607_sections,t607_sectionIdTonavigationLink,t607_clickedSectionId);
		}
	});
}


function t607_getSectionByHref (curlink) {
  var t651_curLinkValue = curlink.attr("href").replace(/\s+/g, '');
  if (curlink.is('[href*="#rec"]')) {
      return $(".r[id='" + t651_curLinkValue.substring(1) + "']");
  } else {
      return $(".r[data-record-type='215']").has("a[name='" + t651_curLinkValue.substring(1) + "']");
  }
}


function t607_highlightNavLinks(t607_navLinks,t607_sections,t607_sectionIdTonavigationLink,t607_clickedSectionId) {
	var t607_scrollPosition = $(window).scrollTop(),
		t607_valueToReturn = t607_clickedSectionId;

	/*if the first section is too small*/
	if (typeof t607_sections[t607_sections.length-2]!="undefined" && t607_sections[t607_sections.length-2].offset().top <= $(window).height()/2 && t607_scrollPosition == 0) {
		t607_navLinks.removeClass('t-active');
		t607_navLink = t607_sectionIdTonavigationLink[t607_sections[t607_sections.length-1].attr("id")];
		t607_navLink.addClass('t-active');
		return null;
	}

	$(t607_sections).each(function(e) {
			var t607_curSection = $(this),
					t607_sectionTop = t607_curSection.offset().top,
					t607_id = t607_curSection.attr('id'),
					t607_navLink = t607_sectionIdTonavigationLink[t607_id];
			if ((t607_scrollPosition + $(window).height()/2) >= t607_sectionTop || (t607_sections[0].attr("id") == t607_id && $(window).scrollTop() >= $(document).height() - $(window).height())) {
				if (t607_clickedSectionId == null && !t607_navLink.hasClass('t-active')) {
					t607_navLinks.removeClass('t-active');
					t607_navLink.addClass('t-active');
					t607_valueToReturn = null;
				} else {
					if (t607_clickedSectionId != null && t607_id == t607_clickedSectionId) {
						t607_valueToReturn = null;
					}
				}
				return false;
			}
	});
	return t607_valueToReturn;
}

function t654_showPanel(recid){
  var t654_el = $('#rec'+recid),
      t654_block = t654_el.find('.t654'),
      t654_closeBtn = t654_el.find('.t654__icon-close'),
      t654_storageItem = t654_block.attr('data-storage-item'),
      t654_lastOpen = localStorage.getItem(t654_storageItem),
      t654_delta = t654_block.attr('data-storage-delta')*86400,
      t654_today = Math.floor(Date.now() / 1000),
      t654_curDelta = t654_today - t654_lastOpen;
  if (t654_lastOpen==null || t654_curDelta>=t654_delta){
	t654_block.removeClass('t654_closed');
  }
  t654_closeBtn.click(function(e){
    t654_block.addClass('t654_closed');
	if (t654_delta){localStorage.setItem(t654_storageItem, Math.floor(Date.now() / 1000));}
    e.preventDefault();
  });
}


function t654_setBg(recid){
  var window_width=$(window).width();
  if(window_width>980){
    $(".t654").each(function() {
      var el=$(this);
      if(el.attr('data-bgcolor-setbyscript')=="yes"){
        var bgcolor=el.attr("data-bgcolor-rgba");
        el.css("background-color",bgcolor);
      }
      });
      }else{
        $(".t654").each(function() {
          var el=$(this);
          var bgcolor=el.attr("data-bgcolor-hex");
          el.css("background-color",bgcolor);
          el.attr("data-bgcolor-setbyscript","yes");
      });
  }
}

function t654_appearMenu(recid) {
      var window_width=$(window).width();
      if(window_width>980){
           $(".t654").each(function() {
                  var el=$(this);
                  var appearoffset=el.attr("data-appearoffset");
                  if(appearoffset!=""){
                          if(appearoffset.indexOf('vh') > -1){
                              appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                          }

                          appearoffset=parseInt(appearoffset, 10);

                          if ($(window).scrollTop() >= appearoffset) {
                            if(el.css('visibility') == 'hidden'){
                                el.finish();
                                if (el.hasClass('t654_top')){
                                  el.css("top","-50px");
                                  el.css("visibility","visible");
                                  el.animate({"opacity": "1","top": "0px"}, 200,function() {});
                                }else{
                                  el.css("bottom","-50px");
                                  el.css("visibility","visible");
                                  el.animate({"opacity": "1","bottom": "0px"}, 200,function() {});
                                }
                            }
                          }else{
                            el.stop();
                            el.css("visibility","hidden");
                          }
                  }
           });
      }

}

function t654_changebgopacitymenu(recid) {
  var window_width=$(window).width();
  if(window_width>980){
    $(".t654").each(function() {
      var el=$(this);
      var bgcolor=el.attr("data-bgcolor-rgba");
      var bgcolor_afterscroll=el.attr("data-bgcolor-rgba-afterscroll");
      var bgopacityone=el.attr("data-bgopacity");
      var bgopacitytwo=el.attr("data-bgopacity-two");
      var menushadow=el.attr("data-menushadow");
      if(menushadow=='100'){
        var menushadowvalue=menushadow;
      }else{
        var menushadowvalue='0.'+menushadow;
      }
      if ($(window).scrollTop() > 20) {
        el.css("background-color",bgcolor_afterscroll);
        if(bgopacitytwo=='0' || menushadow==' '){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }else{
        el.css("background-color",bgcolor);
        if(bgopacityone=='0.0' || menushadow==' '){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }
    });
  }
}

function t668_init(recid){
  var el= $('#rec'+recid),
      toggler = el.find(".t668__header");

  toggler.click(function(){
    $(this).toggleClass("t668__opened");
    $(this).next().slideToggle();
    if(window.lazy=='y'){t_lazyload_update();}
  });
}

function t702_onSuccess(t702_form){
	var t702_inputsWrapper = t702_form.find('.t-form__inputsbox');
    var t702_inputsHeight = t702_inputsWrapper.height();
    var t702_inputsOffset = t702_inputsWrapper.offset().top;
    var t702_inputsBottom = t702_inputsHeight + t702_inputsOffset;
	var t702_targetOffset = t702_form.find('.t-form__successbox').offset().top;

    if ($(window).width()>960) {
        var t702_target = t702_targetOffset - 200;
    }	else {
        var t702_target = t702_targetOffset - 100;
    }

    if (t702_targetOffset > $(window).scrollTop() || ($(document).height() - t702_inputsBottom) < ($(window).height() - 100)) {
        t702_inputsWrapper.addClass('t702__inputsbox_hidden');
		setTimeout(function(){
			if ($(window).height() > $('.t-body').height()) {$('.t-tildalabel').animate({ opacity:0 }, 50);}
		}, 300);
    } else {
        $('html, body').animate({ scrollTop: t702_target}, 400);
        setTimeout(function(){t702_inputsWrapper.addClass('t702__inputsbox_hidden');}, 400);
    }

	var successurl = t702_form.data('success-url');
    if(successurl && successurl.length > 0) {
        setTimeout(function(){
            window.location.href= successurl;
        },500);
    }

}


function t702_lockScroll(){
  var body = $("body");
	if (!body.hasClass('t-body_scroll-locked')) {
		var bodyScrollTop = (typeof window.pageYOffset !== 'undefined') ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
		body.addClass('t-body_scroll-locked');
		body.css("top","-"+bodyScrollTop+"px");
    body.attr("data-popup-scrolltop",bodyScrollTop);
	}
}

function t702_unlockScroll(){
  var body = $("body");
	if (body.hasClass('t-body_scroll-locked')) {
    var bodyScrollTop = $("body").attr("data-popup-scrolltop");
		body.removeClass('t-body_scroll-locked');
		body.css("top","");
    body.removeAttr("data-popup-scrolltop")
		window.scrollTo(0, bodyScrollTop);
	}
}


function t702_showPopup(recid){
  var el=$('#rec'+recid),
      popup = el.find('.t-popup');

  popup.css('display', 'block');
  el.find('.t-range').trigger('popupOpened');
  if(window.lazy=='y'){t_lazyload_update();}
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
  }, 50);

  $('body').addClass('t-body_popupshowed t702__body_popupshowed');
  /*fix IOS11 cursor bug + general IOS background scroll*/
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
    setTimeout(function() {
      t702_lockScroll();
    }, 500);
  }
  el.find('.t-popup').mousedown(function(e){
    var windowWidth = $(window).width();
    var maxScrollBarWidth = 17;
    var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
    if(e.clientX > windowWithoutScrollBar) {
        return;
    }
    if (e.target == this) { t702_closePopup(); }
  });

  el.find('.t-popup__close').click(function(e){
    t702_closePopup();
  });

  el.find('a[href*="#"]').click(function(e){
    var url = $(this).attr('href');
    if (!url || url.substring(0,7) != '#price:') {
      t702_closePopup();
      if (!url || url.substring(0,7) == '#popup:') {
        setTimeout(function() {
          $('body').addClass('t-body_popupshowed');
        }, 300);
      }
    }
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) { t702_closePopup(); }
  });
}

function t702_closePopup(){
  $('body').removeClass('t-body_popupshowed t702__body_popupshowed');
  /*fix IOS11 cursor bug + general IOS background scroll*/
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
    t702_unlockScroll();
  }
  $('.t-popup').removeClass('t-popup_show');
  setTimeout(function() {
    $('.t-popup').not('.t-popup_show').css('display', 'none');
  }, 300);
}

function t702_resizePopup(recid){
  var el = $("#rec"+recid),
      div = el.find(".t-popup__container").height(),
      win = $(window).height() - 120,
      popup = el.find(".t-popup__container");
  if (div > win ) {
    popup.addClass('t-popup__container-static');
  } else {
    popup.removeClass('t-popup__container-static');
  }
}
/* deprecated */
function t702_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
      popupname = popupname.substring(7);
  }

  virtPage += popupname;
  virtTitle += popupname;
  if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
    Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0);
  } else {
    if(ga) {
      if (window.mainTracker != 'tilda') {
        ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
      }
    }

    if (window.mainMetrika > '' && window[window.mainMetrika]) {
      window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
    }
  }
}

function t702_initPopup(recid){
  $('#rec'+recid).attr('data-animationappear','off');
  $('#rec'+recid).css('opacity','1');
  var el=$('#rec'+recid).find('.t-popup'),
      hook=el.attr('data-tooltip-hook'),
      analitics=el.attr('data-track-popup');
  if(hook!==''){
    var obj = $('a[href="'+hook+'"]');
    obj.click(function(e){
      t702_showPopup(recid);
      t702_resizePopup(recid);
      e.preventDefault();
      if(window.lazy=='y'){t_lazyload_update();}
      if (analitics > '') {
          var virtTitle = hook;
        if (virtTitle.substring(0,7) == '#popup:') {
            virtTitle = virtTitle.substring(7);
        }

        Tilda.sendEventToStatistics(analitics, virtTitle);
      }

    });
  }
}

function t706_onSuccessCallback(t706_form){
 /*if (typeof localStorage === 'object') {
	try {
	  localStorage.removeItem("tcart");
	} catch (e) {
	  console.log('Your web browser does not support localStorage.');
	}
 }
 delete window.tcart;
 tcart__loadLocalObj();*/
 $( ".t706__cartwin-products" ).slideUp( 10, function() {
 });
 $( ".t706__cartwin-bottom" ).slideUp( 10, function() {
 });
 $( ".t706 .t-form__inputsbox" ).slideUp( 700, function() {
 });
 /*window.tcart_success='yes';*/
 try {
	/*fix IOS11 cursor bug + general IOS background scroll*/
	tcart__unlockScroll();
 } catch (e) {}
}
function t716_onSuccess(t716_form){
	var t716_inputsWrapper = t716_form.find('.t-form__inputsbox');
    var t716_inputsHeight = t716_inputsWrapper.height();
    var t716_inputsOffset = t716_inputsWrapper.offset().top;
    var t716_inputsBottom = t716_inputsHeight + t716_inputsOffset;
	var t716_targetOffset = t716_form.find('.t-form__successbox').offset().top;

    if ($(window).width()>960) {
        var t716_target = t716_targetOffset - 200;
    }	else {
        var t716_target = t716_targetOffset - 100;
    }

    if (t716_targetOffset > $(window).scrollTop() || ($(document).height() - t716_inputsBottom) < ($(window).height() - 100)) {
        t716_inputsWrapper.addClass('t716__inputsbox_hidden');
		setTimeout(function(){
			if ($(window).height() > $('.t-body').height()) {$('.t-tildalabel').animate({ opacity:0 }, 50);}
		}, 300);
    } else {
        $('html, body').animate({ scrollTop: t716_target}, 400);
        setTimeout(function(){t716_inputsWrapper.addClass('t716__inputsbox_hidden');}, 400);
    }

	var successurl = t716_form.data('success-url');
    if(successurl && successurl.length > 0) {
        setTimeout(function(){
            window.location.href= successurl;
        },500);
    }

}


function t716_fixcontentheight(id){
        /* correct cover height if content more when cover height */
        var el = $("#rec" + id);
        var hcover=el.find(".t-cover").height();
        var hcontent=el.find("div[data-hook-content]").outerHeight();
        if(hcontent>300 && hcover<hcontent){
         var hcontent=hcontent+120;
         if(hcontent>1000){hcontent+=100;}
         console.log('auto correct cover height: '+hcontent);
         el.find(".t-cover").height(hcontent);
         el.find(".t-cover__filter").height(hcontent);
         el.find(".t-cover__carrier").height(hcontent);
         el.find(".t-cover__wrapper").height(hcontent);
         if($isMobile == false){
          setTimeout(function() {
           var divvideo=el.find(".t-cover__carrier");
           if(divvideo.find('iframe').length>0){
            console.log('correct video from cover_fixcontentheight');
      setWidthHeightYoutubeVideo(divvideo, hcontent+'px');
     }
    }, 2000);
   }
        }
 }

function t718_onSuccess(t718_form){
	var t718_inputsWrapper = t718_form.find('.t-form__inputsbox');
    var t718_inputsHeight = t718_inputsWrapper.height();
    var t718_inputsOffset = t718_inputsWrapper.offset().top;
    var t718_inputsBottom = t718_inputsHeight + t718_inputsOffset;
	var t718_targetOffset = t718_form.find('.t-form__successbox').offset().top;

    if ($(window).width()>960) {
        var t718_target = t718_targetOffset - 200;
    }	else {
        var t718_target = t718_targetOffset - 100;
    }

    if (t718_targetOffset > $(window).scrollTop() || ($(document).height() - t718_inputsBottom) < ($(window).height() - 100)) {
        t718_inputsWrapper.addClass('t718__inputsbox_hidden');
		setTimeout(function(){
			if ($(window).height() > $('.t-body').height()) {$('.t-tildalabel').animate({ opacity:0 }, 50);}
		}, 300);
    } else {
        $('html, body').animate({ scrollTop: t718_target}, 400);
        setTimeout(function(){t718_inputsWrapper.addClass('t718__inputsbox_hidden');}, 400);
    }

	var successurl = t718_form.data('success-url');
    if(successurl && successurl.length > 0) {
        setTimeout(function(){
            window.location.href= successurl;
        },500);
    }

}

function t724_init(recid) {
    try {
        localStorage.setItem('localStorageTest', 1);
        localStorage.removeItem('localStorageTest');
    } catch (e) { return; }
    if (window.$isMobile) { return; }
    var el = $('#rec'+recid).find('.t724__opener');
    var name = el.attr('data-cookie-name');
    var time = el.attr('data-cookie-time')*24*60*60*1000;
    var html = document.documentElement;
    var lstorage = sessionStorage.getItem(name);
    $('html').on('mouseleave', function(e){
        if (e.clientY > 10) { return; }
        var curDate = Math.floor(Date.now());
        if (time==0){
            lstorage = sessionStorage.getItem(name);
        } else {
            lstorage = localStorage.getItem(name);
        }
        if (((lstorage==null || typeof lstorage=='undefined') && !el.hasClass('t724__opener_activated')) || (lstorage<(curDate-time) && time>0)) {
            el.trigger('click');
            el.addClass('t724__opener_activated');
            if (time==0){ sessionStorage.setItem(name, curDate); }
            if (time>0) { localStorage.setItem(name, curDate); }
        }
    });

}

function t744_init(recid){
  t_sldsInit(recid);

  setTimeout(function(){
    t_prod__init(recid);
    t744__hoverZoom_init(recid);
  }, 500);

  $('#rec'+recid).find('.t744').bind('displayChanged',function(){
      t744_updateSlider(recid);
  });
}

function t744__hoverZoom_init(recid) {
    if(isMobile) {
        return;
    }
    var rec = $('#rec'+recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function(url) {
                    var options = {
                        dataType: 'script',
                        cache: true,
                        url: url
                    };
                    return jQuery.ajax(options);
                };
            }
            $.cachedZoomScript(
                'https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js'
            ).done(function(script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function() {
                        t_hoverZoom_init(recid, ".t-slds__container");
                    }, 500);
                } else {
                    console.log('Upload script error: ' + textStatus);
                }
            });
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message);
    }
}

function t744_updateSlider(recid){
  var el=$('#rec'+recid);
  t_slds_SliderWidth(recid);
  sliderWrapper = el.find('.t-slds__items-wrapper');
  sliderWidth = el.find('.t-slds__container').width();
  pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
  sliderWrapper.css({
      transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
  });
  t_slds_UpdateSliderHeight(recid);
  t_slds_UpdateSliderArrowsHeight(recid);
}
function t760_init(recid){
  setTimeout(function(){
    t_prod__init(recid);
  }, 500);

  t760_floating(recid);
  $(window).bind('resize', t_throttle(function(){
    t760_floating(recid);
  }, 300));

  $('#rec'+recid).find('.t760').bind('displayChanged',function(){
    t760_floating(recid);
  });
}

function t760_floating(recid){
  var element = $('#rec'+recid);
  if($isMobile == false){
    element.find(".t760__floatable[data-floating='yes']").each(function() {
      var div=$(this);
      t760_floating_init(div);
    });
  }
}

function t760_floating_init(el){
  var wnd=$(window);
  var col=el.parent();

  el.css('max-width', '');
  el.css('max-width',el.width());
  el.css('width','100%');
  col.css('min-height', '');
  col.css('min-height',el.height());
  $(window).load(function(){
    col.css('min-height',el.height());
  });

  wnd.bind('scroll', t_throttle(function(){
     t760_floating_scroll(el,wnd,col);
  }, 20));

  wnd.resize(function() {
       wnd.scroll();
  });

  wnd.scroll();
}

function t760_floating_scroll(el,wnd,col){
  var wnd_height = wnd.height();
  var wnd_width = wnd.width();

  if(wnd_width<=1024){
    el.removeClass('t760__fixedTop');
    el.removeClass('t760__fixedBottom');
    el.removeClass('t760__floating');
    return('');
  }

  el.css('max-width',col.width());

  if(col.height()<el.height() && col.height()>0){
    col.height(el.height());
  }

  var el_height = el.height();
  var col_top = col.offset().top;
  var col_width = col.width();
  var col_height = col.height();
  var col_bottom = col_top + col_height;

  var wnd_top = wnd.scrollTop();
  var wnd_bottom = wnd_top + wnd_height;

  var offset = parseFloat(el.attr('data-offset-top'));

  if(wnd_top+el_height+offset >= col_bottom){
    el.css('top', '');
    el.addClass('t760__fixedBottom');
    el.removeClass('t760__fixedTop');
    el.removeClass('t760__floating');
  }else if(wnd_top+offset > col_top){
    el.css('top', offset);
    el.addClass('t760__floating');
    el.removeClass('t760__fixedBottom');
    el.removeClass('t760__fixedTop');
  }else{
    el.css('top', '');
    el.addClass('t760__fixedTop');
    el.removeClass('t760__fixedBottom');
    el.removeClass('t760__floating');
  }
}
function t774_init(recid){
  t774_unifyHeights(recid);

  $(window).bind('resize', t_throttle(function(){t774_unifyHeights(recid)}, 200));

  $(".t774").bind("displayChanged",function(){
    t774_unifyHeights(recid);
  });

    $(window).load(function() {
        t774_unifyHeights(recid);
    });

    setTimeout(function(){
      t774__updateLazyLoad(recid);
    }, 500);
}


function t774__updateLazyLoad(recid) {
  var scrollContainer = $("#rec"+recid+" .t774__container_mobile-flex");
  var curMode = $(".t-records").attr("data-tilda-mode");
  if (scrollContainer.length && curMode!="edit" && curMode!="preview" && window.lazy === "y") {
    scrollContainer.bind('scroll', t_throttle(function() {
        t_lazyload_update();
    }, 500));
  }
}


function t774_unifyHeights(recid){
    var t774_el = $('#rec'+recid),
        t774_blocksPerRow = t774_el.find(".t774__container").attr("data-blocks-per-row"),
        t774_cols = t774_el.find(".t774__content"),
		t774_mobScroll = t774_el.find(".t774__scroll-icon-wrapper").length;

	if($(window).width()<=480 && t774_mobScroll==0){
		t774_cols.css("height","auto");
		return;
	}

   	var t774_perRow = +t774_blocksPerRow;
	if ($(window).width()<=960 && t774_mobScroll>0) {var t774_perRow = t774_cols.length;}
	else { if ($(window).width()<=960) {var t774_perRow = 2;} }

	for( var i = 0; i < t774_cols.length; i +=t774_perRow ){
		var t774_maxHeight = 0,
			t774_row = t774_cols.slice(i, i + t774_perRow);
		t774_row.each(function(){
          var t774_curText = $(this).find(".t774__textwrapper"),
              t774_curBtns = $(this).find(".t774__btn-wrapper, .t774__btntext-wrapper"),
              t774_itemHeight = t774_curText.outerHeight() + t774_curBtns.outerHeight();
          if ( t774_itemHeight > t774_maxHeight ) { t774_maxHeight = t774_itemHeight; }
		});
		t774_row.css( "height", t774_maxHeight );
	}
}
function t778__init(recid){
  t778_unifyHeights(recid);
  $(window).load(function(){
    t778_unifyHeights(recid);
  });

  $(window).bind('resize', t_throttle(function(){t778_unifyHeights(recid)}, 200));

  $(".t778").bind("displayChanged",function(){
      t778_unifyHeights(recid);
  });

  setTimeout(function(){
    t_prod__init(recid);
    t778_initPopup(recid);
    t778__hoverZoom_init(recid);
    t778__updateLazyLoad(recid);
  }, 500);
}

function t778__hoverZoom_init(recid) {
    if(isMobile) {
        return;
    }
    var rec = $('#rec'+recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function(url) {
                    var options = {
                        dataType: 'script',
                        cache: true,
                        url: url
                    };
                    return jQuery.ajax(options);
                };
            }
            $.cachedZoomScript(
                'https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js'
            ).done(function(script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function() {
                        t_hoverZoom_init(recid, ".t-slds__container");
                    }, 500);
                } else {
                    console.log('Upload script error: ' + textStatus);
                }
            });
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message);
    }
}

function t778__updateLazyLoad(recid) {
  var scrollContainer = $("#rec"+recid+" .t778__container_mobile-flex");
  var curMode = $(".t-records").attr("data-tilda-mode");
  if (scrollContainer.length && curMode!="edit" && curMode!="preview") {
    scrollContainer.bind('scroll', t_throttle(function() {
        t_lazyload_update();
    }, 500));
  }
}

function t778_unifyHeights(recid){
    var t778_el = $('#rec'+recid),
        t778_blocksPerRow = t778_el.find(".t778__container").attr("data-blocks-per-row"),
        t778_cols = t778_el.find(".t778__content"),
		t778_mobScroll = t778_el.find(".t778__scroll-icon-wrapper").length;

	if($(window).width()<=480 && t778_mobScroll==0){
		t778_cols.css("height","auto");
		return;
	}

   	var t778_perRow = +t778_blocksPerRow;
	if ($(window).width()<=960 && t778_mobScroll>0) {var t778_perRow = t778_cols.length;}
	else { if ($(window).width()<=960) {var t778_perRow = 2;} }

	for( var i = 0; i < t778_cols.length; i +=t778_perRow ){
		var t778_maxHeight = 0,
			t778_row = t778_cols.slice(i, i + t778_perRow);
		t778_row.each(function(){
          var t778_curText = $(this).find(".t778__textwrapper"),
              t778_curBtns = $(this).find(".t778__btn-wrapper_absolute"),
              t778_itemHeight = t778_curText.outerHeight() + t778_curBtns.outerHeight();
          if ( t778_itemHeight > t778_maxHeight ) { t778_maxHeight = t778_itemHeight; }
		});
		t778_row.css( "height", t778_maxHeight );
	}
}


function t778_initPopup(recid){
  var rec=$('#rec'+recid);
  rec.find('[href^="#prodpopup"]').one( "click", function(e) {
      e.preventDefault();
	  var el_popup=rec.find('.t-popup');
	  var el_prod=$(this).closest('.js-product');
	  var lid_prod=el_prod.attr('data-product-lid');
	  t_sldsInit(recid+' #t778__product-' + lid_prod + '');
  });
  rec.find('[href^="#prodpopup"]').click(function(e){
      e.preventDefault();
      t778_showPopup(recid);
	  var el_popup=rec.find('.t-popup');
	  var el_prod=$(this).closest('.js-product');
	  var lid_prod=el_prod.attr('data-product-lid');
	  el_popup.find('.js-product').css('display','none');
	  var el_fullprod=el_popup.find('.js-product[data-product-lid="'+lid_prod+'"]');
	  el_fullprod.css('display','block');

    var analitics=el_popup.attr('data-track-popup');
    if (analitics > '') {
        var virtTitle = el_fullprod.find('.js-product-name').text();
        if (! virtTitle) {
            virtTitle = 'prod'+lid_prod;
        }
        Tilda.sendEventToStatistics(analitics, virtTitle);
    }

	  var curUrl = window.location.href;
      if (curUrl.indexOf('#!/tproduct/')<0 && curUrl.indexOf('%23!/tproduct/')<0) {
        if (typeof history.replaceState!='undefined'){
          window.history.replaceState('','',window.location.href+'#!/tproduct/'+recid+'-'+lid_prod);
        }
      }
      t778_updateSlider(recid+' #t778__product-' + lid_prod + '');
      if(window.lazy=='y'){t_lazyload_update();}
  });
  if ($('#record'+recid).length==0){ t778_checkUrl(recid); }
  t778_copyTypography(recid);
}

function t778_checkUrl(recid){
  var curUrl = window.location.href;
  var tprodIndex = curUrl.indexOf('#!/tproduct/');
  if(/iPhone|iPad|iPod/i.test(navigator.userAgent) && tprodIndex<0){ tprodIndex = curUrl.indexOf('%23!/tproduct/'); }
  if (tprodIndex>=0){
    var curUrl = curUrl.substring(tprodIndex,curUrl.length);
    var curProdLid = curUrl.substring(curUrl.indexOf('-')+1,curUrl.length);
    var rec=$('#rec'+recid);
    if (curUrl.indexOf(recid)>=0 && rec.find('[data-product-lid='+curProdLid+']').length) {
  	  rec.find('[data-product-lid='+curProdLid+'] [href^="#prodpopup"]').triggerHandler('click');
    }
  }
}

function t778_updateSlider(recid) {
    var el=$('#rec'+recid);
    t_slds_SliderWidth(recid);
    var sliderWrapper = el.find('.t-slds__items-wrapper');
    var sliderWidth = el.find('.t-slds__container').width();
    var pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_slds_UpdateSliderHeight(recid);
    t_slds_UpdateSliderArrowsHeight(recid);
}

function t778_showPopup(recid){
  var el=$('#rec'+recid);
  var popup = el.find('.t-popup');

  popup.css('display', 'block');
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
    if(window.lazy=='y'){t_lazyload_update();}
  }, 50);

  $('body').addClass('t-body_popupshowed');

  el.find('.t-popup').mousedown(function(e){
    var windowWidth = $(window).width();
    var maxScrollBarWidth = 17;
    var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
    if(e.clientX > windowWithoutScrollBar) {
        return;
    }
    if (e.target == this) {
      t778_closePopup();
    }
  });

  el.find('.t-popup__close, .t778__close-text').click(function(e){
    t778_closePopup();
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
      t778_closePopup();
    }
  });
}

function t778_closePopup(){
  $('body').removeClass('t-body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  var curUrl=window.location.href;
  var indexToRemove=curUrl.indexOf('#!/tproduct/');
  if(/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove<0){ indexToRemove=curUrl.indexOf('%23!/tproduct/'); }
  curUrl=curUrl.substring(0,indexToRemove);
  setTimeout(function() {
    $(".t-popup").scrollTop(0);
    $('.t-popup').not('.t-popup_show').css('display', 'none');
	if (typeof history.replaceState!='undefined'){
      window.history.replaceState('','',curUrl);
    }
  }, 300);
}

function t778_removeSizeStyles(styleStr){
	if(typeof styleStr!="undefined" && (styleStr.indexOf('font-size')>=0 || styleStr.indexOf('padding-top')>=0 || styleStr.indexOf('padding-bottom')>=0)){
		var styleStrSplitted = styleStr.split(';');
		styleStr = "";
		for (var i=0;i<styleStrSplitted.length;i++){
			if(styleStrSplitted[i].indexOf('font-size')>=0 || styleStrSplitted[i].indexOf('padding-top')>=0 || styleStrSplitted[i].indexOf('padding-bottom')>=0){
				styleStrSplitted.splice(i,1); i--; continue;
			}
			if(styleStrSplitted[i]==""){continue;}
			styleStr+=styleStrSplitted[i]+";";
		}
	}
	return styleStr;
}

function t778_copyTypography(recid){
  var rec=$('#rec'+recid);
  var titleStyle=rec.find('.t778__title').attr('style');
	var descrStyle=rec.find('.t778__descr').attr('style');
	rec.find('.t-popup .t778__title').attr("style",t778_removeSizeStyles(titleStyle));
	rec.find('.t-popup .t778__descr, .t-popup .t778__text').attr("style",t778_removeSizeStyles(descrStyle));
}
function t786__init(recid){
  setTimeout(function(){
    t_prod__init(recid);
    t786_initPopup(recid);
    t786__hoverZoom_init(recid);
    t786__updateLazyLoad(recid);
    t786__alignButtons_init(recid);
  }, 500);
}

function t786__alignButtons_init(recid) {
    var rec = $('#rec' + recid);
    if (rec.find('[data-buttons-v-align]')[0]) {
        try {
            t786__alignButtons(recid);
            $(window).bind(
                'resize',
                t_throttle(function() {
                    if (
                        typeof window.noAdaptive !== 'undefined' &&
                        window.noAdaptive === true &&
                        $isMobile
                    ) {
                        return;
                    }
                    t786__alignButtons(recid);
                }, 200)
            );

            $('.t786').bind('displayChanged', function() {
                t786__alignButtons(recid);
            });

            if ($isMobile) {
                $(window).on('orientationchange', function() {
                    t786__alignButtons(recid);
                });
            }
        } catch (e) {
            console.log('buttons-v-align error: ' + e.message);
        }
    }
}

function t786__alignButtons(recid) {
    var rec = $('#rec' + recid);
    var wrappers = rec.find('.t786__textwrapper');
    var maxHeight = 0;
    var itemsInRow = rec.find('.t-container').attr('data-blocks-per-row') * 1;

    var mobileView = $(window).width() <= 480;
    var tableView = $(window).width() <= 960 && $(window).width() > 480;
    var mobileOneRow =
        $(window).width() <= 960 && rec.find('.t786__container_mobile-flex')[0]
            ? true
            : false;
    var mobileTwoItemsInRow =
        $(window).width() <= 480 && rec.find('.t786 .mobile-two-columns')[0]
            ? true
            : false;

    if (mobileView) {
        itemsInRow = 1;
    }

    if (tableView) {
        itemsInRow = 2;
    }

    if (mobileTwoItemsInRow) {
        itemsInRow = 2;
    }

    if (mobileOneRow) {
        itemsInRow = 999999;
    }

    var i = 1;
    var wrappersInRow = [];

    $.each(wrappers, function(key, element) {
        element.style.height = 'auto';
        if (itemsInRow === 1) {
            element.style.height = 'auto';
        } else {
            wrappersInRow.push(element);
            if (element.offsetHeight > maxHeight) {
                maxHeight = element.offsetHeight;
            }

            $.each(wrappersInRow, function(key, wrapper) {
                wrapper.style.height = maxHeight + 'px';
            });

            if (i === itemsInRow) {
                i = 0;
                maxHeight = 0;
                wrappersInRow = [];
            }

            i++;
        }
    });
}


function t786__hoverZoom_init(recid) {
    if(isMobile) {
        return;
    }
    var rec = $('#rec'+recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function(url) {
                    var options = {
                        dataType: 'script',
                        cache: true,
                        url: url
                    };
                    return jQuery.ajax(options);
                };
            }
            $.cachedZoomScript(
                'https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js'
            ).done(function(script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function() {
                        t_hoverZoom_init(recid, ".t-slds__container");
                    }, 500);
                } else {
                    console.log('Upload script error: ' + textStatus);
                }
            });
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message);
    }
}

function t786__updateLazyLoad(recid) {
  var scrollContainer = $("#rec"+recid+" .t786__container_mobile-flex");
  var curMode = $(".t-records").attr("data-tilda-mode");
  if (scrollContainer.length && curMode!="edit" && curMode!="preview") {
    scrollContainer.bind('scroll', t_throttle(function() {
        t_lazyload_update();
    }, 500));
  }
}

function t786_initPopup(recid){
  var rec=$('#rec'+recid);
  rec.find('[href^="#prodpopup"]').one( "click", function(e) {
      e.preventDefault();
	  var el_popup=rec.find('.t-popup');
	  var el_prod=$(this).closest('.js-product');
	  var lid_prod=el_prod.attr('data-product-lid');
	  t_sldsInit(recid+' #t786__product-' + lid_prod + '');
  });
  rec.find('[href^="#prodpopup"]').click(function(e){
      e.preventDefault();
      t786_showPopup(recid);
	  var el_popup=rec.find('.t-popup');
	  var el_prod=$(this).closest('.js-product');
	  var lid_prod=el_prod.attr('data-product-lid');
	  el_popup.find('.js-product').css('display','none');
	  var el_fullprod=el_popup.find('.js-product[data-product-lid="'+lid_prod+'"]');
	  el_fullprod.css('display','block');

    var analitics=el_popup.attr('data-track-popup');
    if (analitics > '') {
        var virtTitle = el_fullprod.find('.js-product-name').text();
        if (! virtTitle) {
            virtTitle = 'prod'+lid_prod;
        }
        Tilda.sendEventToStatistics(analitics, virtTitle);
    }

	  var curUrl = window.location.href;
      if (curUrl.indexOf('#!/tproduct/')<0 && curUrl.indexOf('%23!/tproduct/')<0) {
		if (typeof history.replaceState!='undefined'){
		  window.history.replaceState('','',window.location.href+'#!/tproduct/'+recid+'-'+lid_prod);
		}
      }
      t786_updateSlider(recid+' #t786__product-' + lid_prod + '');
      if(window.lazy=='y'){t_lazyload_update();}
  });
  if ($('#record'+recid).length==0){ t786_checkUrl(recid); }
  t786_copyTypography(recid);
}

function t786_checkUrl(recid){
  var curUrl = window.location.href;
  var tprodIndex = curUrl.indexOf('#!/tproduct/');
  if(/iPhone|iPad|iPod/i.test(navigator.userAgent) && tprodIndex<0){ tprodIndex = curUrl.indexOf('%23!/tproduct/'); }
  if (tprodIndex>=0){
    var curUrl = curUrl.substring(tprodIndex,curUrl.length);
    var curProdLid = curUrl.substring(curUrl.indexOf('-')+1,curUrl.length);
    var rec=$('#rec'+recid);
    if (curUrl.indexOf(recid)>=0 && rec.find('[data-product-lid='+curProdLid+']').length) {
  	  rec.find('[data-product-lid='+curProdLid+'] [href^="#prodpopup"]').triggerHandler('click');
    }
  }
}

function t786_updateSlider(recid) {
    var el=$('#rec'+recid);
    t_slds_SliderWidth(recid);
    var sliderWrapper = el.find('.t-slds__items-wrapper');
    var sliderWidth = el.find('.t-slds__container').width();
    var pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_slds_UpdateSliderHeight(recid);
    t_slds_UpdateSliderArrowsHeight(recid);
}

function t786_showPopup(recid){
  var el=$('#rec'+recid);
  var popup = el.find('.t-popup');

  popup.css('display', 'block');
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
    if(window.lazy=='y'){t_lazyload_update();}
  }, 50);

  $('body').addClass('t-body_popupshowed');

  el.find('.t-popup').mousedown(function(e){
    var windowWidth = $(window).width();
    var maxScrollBarWidth = 17;
    var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
    if(e.clientX > windowWithoutScrollBar) {
        return;
    }
    if (e.target == this) {
      t786_closePopup();
    }
  });

  el.find('.t-popup__close, .t786__close-text').click(function(e){
    t786_closePopup();
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
      t786_closePopup();
    }
  });
}

function t786_closePopup(){
  $('body').removeClass('t-body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  var curUrl=window.location.href;
  var indexToRemove=curUrl.indexOf('#!/tproduct/');
  if(/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove<0){ indexToRemove=curUrl.indexOf('%23!/tproduct/'); }
  curUrl=curUrl.substring(0,indexToRemove);
  setTimeout(function() {
    $(".t-popup").scrollTop(0);
    $('.t-popup').not('.t-popup_show').css('display', 'none');
    if (typeof history.replaceState!='undefined'){
      window.history.replaceState('','',curUrl);
    }
  }, 300);
}

function t786_removeSizeStyles(styleStr){
	if(typeof styleStr!="undefined" && (styleStr.indexOf('font-size')>=0 || styleStr.indexOf('padding-top')>=0 || styleStr.indexOf('padding-bottom')>=0)){
		var styleStrSplitted = styleStr.split(';');
		styleStr = "";
		for (var i=0;i<styleStrSplitted.length;i++){
			if(styleStrSplitted[i].indexOf('font-size')>=0 || styleStrSplitted[i].indexOf('padding-top')>=0 || styleStrSplitted[i].indexOf('padding-bottom')>=0){
				styleStrSplitted.splice(i,1); i--; continue;
			}
			if(styleStrSplitted[i]==""){continue;}
			styleStr+=styleStrSplitted[i]+";";
		}
	}
	return styleStr;
}

function t786_copyTypography(recid){
  var rec=$('#rec'+recid);
  var titleStyle=rec.find('.t786__title').attr('style');
	var descrStyle=rec.find('.t786__descr').attr('style');
	rec.find('.t-popup .t786__title').attr("style",t786_removeSizeStyles(titleStyle));
	rec.find('.t-popup .t786__descr, .t-popup .t786__text').attr("style",t786_removeSizeStyles(descrStyle));
}
function t815_init(recid){
    var rec = $('#rec'+recid);
    var el = rec.find('.t815');
    var isFixed = (el.css('position') == 'fixed');
    var redactorMode = el.hasClass('t815_redactor-mode');

    if (!redactorMode) {
      	el.removeClass('t815__beforeready');

      	if (isFixed && el.attr('data-bgopacity-two')) {
            t815_changebgopacitymenu(recid);
            $(window).bind('scroll', t_throttle(function(){t815_changebgopacitymenu(recid)}, 200));
      	}

        if (isFixed && el.attr('data-appearoffset')) {
            el.removeClass('t815__beforeready');
            t815_appearMenu(recid);
            $(window).bind('scroll', t_throttle(function(){t815_appearMenu(recid)}, 200));
        }
    }

    t815_setBg(recid);
    $(window).bind('resize', t_throttle(function(){t815_setBg(recid);}, 200));
}


function t815_setBg(recid) {
    var window_width = $(window).width();
    if (window_width > 980) {
        $(".t815").each(function() {
            var el = $(this);
            if (el.attr('data-bgcolor-setbyscript') == "yes") {
                var bgcolor = el.attr("data-bgcolor-rgba");
                el.css("background-color",bgcolor);
            }
        });
    } else {
        $(".t815").each(function() {
            var el=$(this);
            var bgcolor = el.attr("data-bgcolor-hex");
            el.css("background-color",bgcolor);
            el.attr("data-bgcolor-setbyscript","yes");
        });
    }
}

function t815_appearMenu(recid) {
    var window_width = $(window).width();
    if (window_width > 980){
        $(".t815").each(function() {
            var el = $(this);
            var appearoffset = el.attr("data-appearoffset");
            if (appearoffset!="") {
                if(appearoffset.indexOf('vh') > -1) {
                    appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                }

                appearoffset = parseInt(appearoffset, 10);

                if ($(window).scrollTop() >= appearoffset) {
                    if (el.css('visibility') == 'hidden') {
                        el.finish();
                        el.css("top","-50px");
                        el.css("visibility","visible");
                        el.animate({"opacity": "1","top": "0px"}, 200, function() {});
                    }
                } else {
                    el.stop();
                    el.css("visibility","hidden");
                }
            }
        });
    }
}

function t815_changebgopacitymenu(recid) {
    var window_width = $(window).width();
    if(window_width > 980){
        $(".t815").each(function() {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-rgba");
            var bgcolor_afterscroll = el.attr("data-bgcolor-rgba-afterscroll");
            var bgopacityone = el.attr("data-bgopacity");
            var bgopacitytwo = el.attr("data-bgopacity-two");
            var menushadow = el.attr("data-menushadow");
            if (menushadow == '100') {
                var menushadowvalue = menushadow;
            } else {
                var menushadowvalue = '0.'+menushadow;
            }
            if ($(window).scrollTop() > 20) {
                el.css("background-color", bgcolor_afterscroll);
                if(bgopacitytwo == '0' || menushadow == ' '){
                  el.css("box-shadow", "none");
                } else {
                  el.css("box-shadow", "0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
                }
            } else {
                el.css("background-color",bgcolor);
                if (bgopacityone == '0.0' || menushadow == ' '){
                  el.css("box-shadow","none");
                } else {
                  el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
                }
            }
        });
    }
}

function t823_onSuccess(form){
	var inputsWrapper = form.find('.t-form__inputsbox');
  var inputsHeight = inputsWrapper.height();
  var inputsOffset = inputsWrapper.offset().top;
  var inputsBottom = inputsHeight + inputsOffset;
	var targetOffset = form.find('.t-form__successbox').offset().top;

  if ($(window).width()>960) {
    var target = targetOffset - 200;
  }	else {
    var target = targetOffset - 100;
  }

  if (targetOffset > $(window).scrollTop() || ($(document).height() - inputsBottom) < ($(window).height() - 100)) {
    inputsWrapper.addClass('t823__inputsbox_hidden');
		setTimeout(function(){
			if ($(window).height() > $('.t-body').height()) {$('.t-tildalabel').animate({ opacity:0 }, 50);}
		}, 300);
  } else {
    $('html, body').animate({ scrollTop: target}, 400);
    setTimeout(function(){inputsWrapper.addClass('t823__inputsbox_hidden');}, 400);
  }

	var successurl = form.data('success-url');
	if(successurl && successurl.length > 0) {
    setTimeout(function(){
      window.location.href= successurl;
    },500);
	}
}

function t825_initPopup(recid) {
  var rec = $('#rec' + recid);
  $('#rec' + recid).attr('data-animationappear', 'off');
  $('#rec' + recid).css('opacity', '1');
  var el = $('#rec' + recid).find('.t825__popup');
  var analitics = el.attr('data-track-popup');
  var hook="TildaSendMessageWidget" + recid;
  var obj = $('#rec' + recid + ' .t825__btn');

  obj.click(function(e) {
    if (obj.hasClass('t825__btn_active')) {
  		t825_closePopup(rec);
  		return;
	}
  obj.addClass('t825__btn_active');
	$('#rec' + recid + ' .t825').addClass('t825_active');
    t825_showPopup(recid);
    e.preventDefault();
    if (analitics > '') {
        Tilda.sendEventToStatistics(analitics, hook);
    }
  });

  if(window.lazy == 'y'){t_lazyload_update();}

  t825_checkPhoneNumber(recid);
}


function t825_showPopup(recid) {
  var el = $('#rec' + recid);
  var popup = el.find('.t825__popup');

  el.find('.t825__btn_wrapper').removeClass('t825__btn_animate');
  el.find('.t825__btn-text').css('display','none');
  if ($(window).width() < 960) { $('body').addClass('t825__body_popupshowed'); }

  popup.css('display', 'block');
  setTimeout(function() {
    popup.addClass('t825__popup_show');
  }, 50);

  el.find('.t825__mobile-icon-close').click(function(e) { t825_closePopup(el); });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) { t825_closePopup(el); }
  });

  if(window.lazy == 'y'){t_lazyload_update();}
}

function t825_closePopup(rec) {
  if ($(window).width() < 960) { $('body').removeClass('t825__body_popupshowed'); }
  rec.find('.t825').removeClass('t825_active');
  rec.find('.t825__btn').removeClass('t825__btn_active');
  rec.find('.t825__popup').removeClass('t825__popup_show');
  setTimeout(function() {
    rec.find('.t825__popup').not('.t825__popup_show').css('display', 'none');
  }, 300);
}


function t825_checkPhoneNumber(recid) {
  var el = $('#rec' + recid);
  var whatsapp = el.find('.t825__whatsapp').attr('data-messenger-whatsapp');
  var telegram = el.find('.t825__telegram').attr('data-messenger-telegram');
  var telegramLink = el.find('.t825__telegram_link').attr('data-messenger-telegram-link');
  var vk = el.find('.t825__vk').attr('data-messenger-vk');
  var skype = el.find('.t825__skype').attr('data-messenger-skype');
  var skypeChat = el.find('.t825__skype_chat').attr('data-messenger-skype-chat');
  var mail = el.find('.t825__mail').attr('data-messenger-mail');
  var viber = el.find('.t825__viber').attr('data-messenger-viber');
  var fb = el.find('.t825__fb').attr('data-messenger-fb');
  var phone = el.find('.t825__phone').attr('data-messenger-phone');

  if (typeof telegramLink != 'undefined') {
      if (telegramLink.search(/http/i) !== -1) {
          el.find('.t825__telegram_link').attr('href', telegramLink);
      } else {
          if (telegramLink.search(/tg/i) !== -1) {
            el.find('.t825__telegram_link').attr('href', telegramLink);
          } else {
            el.find('.t825__telegram_link').attr('href', 'https://'+telegramLink);
          }
      }
  }

  if (typeof whatsapp != 'undefined') {
    el.find('.t825__whatsapp').attr('href', 'https://api.whatsapp.com/send?phone='+whatsapp.replace(/[+?^${}()|[\]\\\s]/g,''));
  }

  el.find('.t825__telegram').attr('href', 'https://t.me/'+telegram);
  el.find('.t825__vk').attr('href', 'https://vk.me/'+vk);

  if (typeof skype != 'undefined') {
    el.find('.t825__skype').attr('href', 'skype:'+skype.replace(/[+?^${}()|[\]\\\s]/g,'')+'?call');
  }

  if (typeof skypeChat != 'undefined') {
    el.find('.t825__skype_chat').attr('href', 'skype:'+skypeChat.replace(/[+?^${}()|[\]\\\s]/g,'')+'?chat');
  }

  if (typeof viber != 'undefined') {
    el.find('.t825__viber').attr('href', 'viber://chat?number=%2B'+viber.replace(/[+?^${}()|[\]\\\s]/g,''));
  }

  el.find('.t825__mail').attr('href', 'mailto:'+mail);

  el.find('.t825__fb').attr('href', 'https://m.me/'+fb);

  if (typeof phone != 'undefined') {
    el.find('.t825__phone').attr('href', 'tel:+'+phone.replace(/[+?^${}()|[\]\\\s]/g,''));
  }
}

function t825_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
    popupname = popupname.substring(7);
  }

  virtPage += popupname;
  virtTitle += popupname;
  if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
    Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0);
  } else {
    if(ga) {
      if (window.mainTracker != 'tilda') {
        ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
      }
    }
    if (window.mainMetrika > '' && window[window.mainMetrika]) {
      window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
    }
  }
}

function t829_init(recid) {
  var rec = $('#rec'+recid);
  var grid = rec.find('.t829__grid');
  var sizer = rec.find('.t829__grid-sizer');
  var item = rec.find('.t829__grid-item');
  var images = rec.find('.t829__grid img');
  var startContainerWidth = rec.find('.t829__grid-sizer').width();

  images.load(function() {
    if (!(grid.hasClass('t829__container_mobile-flex') && $(window).width() < 768)) {
      t829_initMasonry(rec, recid, grid);
    }
  });

  if (!(grid.hasClass('t829__container_mobile-flex') && $(window).width() < 768)) {
    t829_initMasonry(rec, recid, grid);
    t829_calcColumnWidth(rec, startContainerWidth, grid, sizer, item);
  }

  grid.bind('touchmove scroll', function() {
    if (typeof $('.t-records').attr('data-tilda-mode') == 'undefined') {
      if(window.lazy == 'y'){t_lazyload_update();}
    }
  })

  $(window).bind('resize', function() {
    if (typeof window.noAdaptive!="undefined" && window.noAdaptive==true && $isMobile){return;}
    if (!(grid.hasClass('t829__container_mobile-flex') && $(window).width() < 768)) {
      t829_calcColumnWidth(rec, startContainerWidth, grid, sizer, item);
    }
  });

  $('.t829').bind('displayChanged', function() {
    if (grid.hasClass('t829__container_mobile-flex')) {
      if ($(window).width() >= 768) {
        t829_initMasonry(rec, recid, grid);
      }
    } else {
      t829_initMasonry(rec, recid, grid);
    }
    if (!(grid.hasClass('t829__container_mobile-flex') && $(window).width() < 768)) {
      t829_calcColumnWidth(rec, startContainerWidth, grid, sizer, item);
    }
  });

}

function t829_initMasonry(rec, recid, grid) {
  var $grid = grid;
  var gutterSizerWidth = rec.find('.t829__gutter-sizer').width();
  var gutterElement = rec.find('.t829__gutter-sizer').width() == 40 ? 39 : '#rec' + recid + ' .t829__gutter-sizer';
  $grid.imagesLoaded(function(){
    $grid.masonry({
      itemSelector: '#rec' + recid + ' .t829__grid-item',
      columnWidth: '#rec' + recid + ' .t829__grid-sizer',
      gutter: gutterElement,
      isFitWidth: true
    });
  });
}

function t829_calcColumnWidth(rec, startcontainerwidth, grid, sizer, item) {
  var containerWidth = rec.find('.t829__container').width();
  var sizerWidth = rec.find('.t829__grid-sizer').width();
  var itemWidth = rec.find('.t829__grid-item').width();
  var gutterSizerWidth = rec.find('.t829__gutter-sizer').width() == 40 ? 39 : rec.find('.t829__gutter-sizer').width();
  var columnAmount = Math.round(containerWidth / startcontainerwidth);
  var newSizerWidth = ((containerWidth - gutterSizerWidth * (columnAmount - 1)) / columnAmount);
  newSizerWidth = Math.floor(newSizerWidth);
  if (containerWidth >= itemWidth) {
    sizer.css('width', newSizerWidth);
    item.css('width', newSizerWidth);
  } else {
    grid.css('width', '100%');
    sizer.css('width', '100%');
    item.css('width', '100%');
  }
}

function t843_init(recid) {
  var rec = $('#rec' + recid);
  var container = rec.find('.t843');

  t843_setHeight(rec);

  $(window).bind('resize', t_throttle(function() {
    if (typeof window.noAdaptive!="undefined" && window.noAdaptive==true && $isMobile){return;}
    t843_setHeight(rec);
  }, 200));

  $('.t843').bind('displayChanged',function(){
    t843_setHeight(rec);
  });

  if (container.hasClass('t843__previewmode')) {
    setInterval(function() {
      t843_setHeight(rec);
    }, 5000);
  }
}

function t843_setHeight(rec) {
  var image = rec.find('.t843__blockimg');
  image.each(function() {
    var width = $(this).attr('data-image-width');
    var height = $(this).attr('data-image-height');
    var ratio = height / width;
    var padding = ratio * 100;
    $(this).css('padding-bottom', padding + '%');
  });

  if ($(window).width() > 960){
    var textwr = rec.find('.t843__textwrapper');
    var deskimg = rec.find('.t843__desktopimg');
    textwr.each(function(i) {
      $(this).css('height', $(deskimg[i]).innerHeight());
    });
  }
}

function t857__init(recid) {
    $('.t857__container_mobile-flex').bind('touchstart', function() {
        $('.t857__col').bind('touchmove', function() {
            if (typeof $(".t-records").attr('data-tilda-mode') == 'undefined') {
                if (window.lazy == 'y') {
                    t_lazyload_update();
                }
            }
        });
    }).mouseup(function() {
        $('.t857__col').unbind('touchend');
    });
}

function t875_init(recid) {
    if (document.layers) {document.captureEvents(Event.MOUSEDOWN);}
    document.onmousedown = t875_click;
    document.oncontextmenu = function(event) {
            var event = event || window.event;
            var sender = event.target || event.srcElement;
            if (sender.tagName.match(/INPUT|TEXTAREA/i)) {
                return;
            } else {
                return false;
            }
    };
    t875_preventSelection(document);
    t875_preventUserSelect();
}


function t875_preventUserSelect() {
    $('body').css({'-ms-user-select': 'none', '-moz-user-select': 'none', '-webkit-user-select': 'none', 'user-select': 'none', '-webkit-touch-callout': 'none'});
}

function t875_click(event) {
    t875_returnPrevent(event);

    if (document.all) {
        if (event.button == 2) {
            return false;
        }
    }
    if (document.layers) {
        if (event.which == 3) {
            return false;
        }
    }
}


function t875_preventSelection(element) {
    var preventSelection = false;

    t875_addHandler(element, 'mousemove', function() {
        if (preventSelection) {
            t875_removeSelection();
        }
    });

    t875_addHandler(element, 'mousedown', function(event) {
        var event = event || window.event;
        var sender = event.target || event.srcElement;
        preventSelection = !sender.tagName.match(/INPUT|TEXTAREA/i);
    });

    t875_addHandler(element, 'mouseup', function() {
        if (preventSelection) {
            t875_removeSelection();
        }
        preventSelection = false;
    });

    t875_addHandler(element, 'keydown', t875_killCtrlA);
    t875_addHandler(element, 'keyup', t875_killCtrlA);
    t875_addHandler(element, 'keydown', t875_killCtrlU);
    t875_addHandler(element, 'keyup', t875_killCtrlU);
    t875_addHandler(element, 'keydown', t875_killAltCmdI);
    t875_addHandler(element, 'keyup', t875_killAltCmdI);
    t875_addHandler(element, 'keydown', t875_killCtrlShiftI);
    t875_addHandler(element, 'keyup', t875_killCtrlShiftI);
}


function t875_addHandler(element, event, handler) {
    if (element.attachEvent) {
        element.attachEvent('on' + event, handler);
    } else {
        if (element.addEventListener) {
            element.addEventListener(event, handler, false);
        }
    }
}


function t875_removeSelection() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection && document.selection.clear) {
        document.selection.clear();
    }
}


function t875_killCtrlU(event) {
    t875_returnPrevent(event);

    var key = event.keyCode || event.which;
    if ((event.ctrlKey && key == 'U'.charCodeAt(0)) || (event.altKey && event.metaKey && (key == 'U'.charCodeAt(0) || key == 'u'.charCodeAt(0)))) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
}


function t875_killAltCmdI(event) {
    t875_returnPrevent(event);

    var key = event.keyCode || event.which;
    if (event.altKey && event.metaKey && (key == 'I'.charCodeAt(0) || key == 'i'.charCodeAt(0))) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
}


function t875_killCtrlShiftI(event) {
    t875_returnPrevent(event);

    var key = event.keyCode || event.which;
    if (event.shiftKey && event.ctrlKey && (key == 'I'.charCodeAt(0) || key == 'i'.charCodeAt(0))) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
}


function t875_killCtrlA(event) {
    var event = event || window.event;
    var sender = event.target || event.srcElement;
    if (sender.tagName.match(/INPUT|TEXTAREA|BUTTON/i)) {return;}

    var key = event.keyCode || event.which;
    if ((event.ctrlKey && key == 'A'.charCodeAt(0)) || (event.metaKey && key == 'A'.charCodeAt(0))) {
        t875_removeSelection();
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
}


function t875_returnPrevent(event) {
    var event = event || window.event;
    var sender = event.target || event.srcElement;
    if (sender.tagName.match(/INPUT|TEXTAREA/i)) {return;}
}

function t902_init(recid) {
  var rec = $('#rec' + recid);
  var container = rec.find('.t902');
  var doResize;

  t902_unifyHeights(rec);

  $(window).resize(function() {
    clearTimeout(doResize);
    doResize = setTimeout(function() {
      t902_unifyHeights(rec);
    }, 200);
  });

  $(window).load(function() {
    t902_unifyHeights(rec);
  });

  $('.t902').bind('displayChanged', function() {
    t902_unifyHeights(rec);
  });

  if (container.hasClass('t902__previewmode')) {
    setInterval(function() {
      t902_unifyHeights(rec);
    }, 2000);
  }
}

function t902_unifyHeights(rec) {
  if ($(window).width() >= 960) {
    rec.find('.t902 .t-container .t902__row').each(function() {
      var highestBox = 0;
      var row = $(this);
      $('.t902__inner-col', this).each(function() {
        var col = $(this);
        var wrap = col.find('.t902__wrap');
        var colHeight = wrap.outerHeight();
        if (colHeight > highestBox) {
          highestBox = colHeight;
        }
      });
      $('.t902__inner-col', this).css('height', highestBox);
      $('.t902__bgimg', this).css('height', highestBox);
    });
  } else {
    $('.t902__inner-col').css('height', 'auto');
    $('.t902__bgimg').css('height', 'auto');
  }
  t902_setMinHeight(rec);
}

function t902_setMinHeight(rec) {

  /*
    custom forEach function for work with NodeList object
  */

  var forEach = function(array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
      callback.call(scope, i, array[i]);
    }
  };



  var wrappers = t902_getWrappers(rec);

  /*
    check each wrapper in page, because user can
    set card height less than content size
  */

  forEach(wrappers, function(index, wrapper) {
    var content = wrapper.querySelector('.t902__content');
    if (wrapper.offsetHeight < content.offsetHeight) {
      wrapper.style.minHeight = content.offsetHeight + 'px';
    }
  });
}

function t902_getWrappers(rec) {
  var el = rec[0];
  var wrappers = el.querySelectorAll('.t902__wrap');

  return wrappers;
}

function t905_init(recid) {
  var rec = $('#rec' + recid);
  var container = rec.find('.t905');
  var doResize;

  setTimeout(function() {
    t905_unifyHeights(rec);
  }, 0);

  $(window).resize(function() {
    clearTimeout(doResize);
    doResize = setTimeout(function() {
      t905_unifyHeights(rec);
    }, 200);
  });

  $(window).load(function() {
    t905_unifyHeights(rec);
  });

  $('.t905').bind('displayChanged', function() {
    t905_unifyHeights(rec);
  });

  if (container.hasClass('t905__previewmode')) {
    setInterval(function() {
      t905_unifyHeights(rec);
    }, 2000);
  }
}

function t905_unifyHeights(rec) {
  if (!rec.length) {
    return;
  }

  var block = rec[0];
  var cards = block.querySelectorAll('.t905__card');

  try {
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var img = card.querySelector('.t905__image');

      var content = card.querySelector('.t905__content');

      if (content.offsetHeight > img.offsetHeight) {
        img.style.height = content.offsetHeight + 'px';
        img.style.paddingBottom = 'initial';
      }
    }
  } catch (e) {
    console.log(e.message);
  }
}
