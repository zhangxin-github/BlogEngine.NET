(function(win, doc) {
  /**
   * @param {string} path
   * @param {Function} onload
   * @param {string} type
   * @return {undefined}
   */
  var load = function(path, onload, type) {
    try {
      if (type == "js") {
        /** @type {Element} */
        var el = doc.createElement("script");
        /** @type {string} */
        el.src = path;
        /** @type {string} */
        el.type = "text/javascript";
        /** @type {function (): undefined} */
        el.onload = el.onreadystatechange = function() {
          if (!this.readyState || (this.readyState === "loaded" || this.readyState === "complete")) {
            /** @type {null} */
            el.onload = el.onreadystatechange = null;
            onload();
          }
        };
      }
      if (type == "css") {
        /** @type {Element} */
        el = doc.createElement("link");
        /** @type {string} */
        el.href = path;
        /** @type {string} */
        el.rel = "stylesheet";
        /** @type {string} */
        el.type = "text/css";
        /** @type {number} */
        var nchars = doc.styleSheets.length;
        /** @type {number} */
        var poll = setInterval(function() {
          if (doc.styleSheets.length > nchars) {
            onload();
            clearInterval(poll);
          }
        }, 10);
      }
      doc.getElementsByTagName("head")[0].appendChild(el);
    } catch (h) {
      onload();
    }
  };
  var data = {
    /**
     * @return {undefined}
     */
    url : function() {
      var e = iShare.url || e.location.href;
      if (K.B.ie) {
        e.clipboardData.setData("Text", e);
        alert("复制成功,请粘贴到你的QQ/MSN上推荐给你的好友！");
      } else {
        if (window.prompt("你使用的是非IE核心浏览器，请按下 Ctrl+C 复制代码到剪贴板", e)) {
          alert("复制成功,请粘贴到你的QQ/MSN上推荐给你的好友！");
        } else {
          alert("目前只支持IE，请复制地址栏URL,推荐给你的QQ/MSN好友！");
        }
      }
    },
    /**
     * @return {undefined}
     */
    print : function() {
      win.print();
    },
    /**
     * @return {?}
     */
    save : function() {
      var panel = iShare.title || document.title;
      var s = panel.location.href;
      if (confirm("网站名称：" + panel + "\n网址：" + s + "\n确定添加收藏?")) {
        /** @type {string} */
        var c = navigator.userAgent.toLowerCase();
        if (K.B.ie8) {
          external.AddToFavoritesBar(s, panel, "");
        } else {
          try {
            panel.external.addFavorite(s, panel);
          } catch (d) {
            try {
              panel.sidebar.addPanel(panel, s, "");
            } catch (d) {
              alert("加入收藏失败，请使用Ctrl+D进行添加");
            }
          }
        }
      }
      return false;
    },
    /**
     * @param {string} value
     * @param {string} sUrl
     * @param {?} dataAndEvents
     * @return {?}
     */
    weibo : function(value, sUrl, dataAndEvents) {
      /** @type {string} */
      var url = "http://share.v.t.qq.com/index.php";
      /** @type {Array} */
      var messages = [];
      var class2remove = value || document.title;
      var q = sUrl || window.location.href;
      /** @type {string} */
      var lixiang0522 = "lixiang0522";
      /** @type {string} */
      var visible = encodeURI("3eef3dc2a3254c5cb5b2506bc8f9765f");
      /** @type {string} */
      var optsData = "";
      return KK("img").len > 0 && KK("img").each(function($slide, dataAndEvents) {
        if ($slide.width() > 150) {
          if ($slide.height() > 150) {
            if (messages.length !== 1) {
              messages.push($slide.attr("src"));
            }
          }
        }
      }), messages.length > 0 ? optsData = url + "?c=share&a=index&f=q2&url=" + encodeURIComponent(q) + "&appkey=" + visible + "&assname=" + lixiang0522 + "&title=" + class2remove + "&pic=" + encodeURIComponent(messages.join("|")) : optsData = url + "?c=share&a=index&f=q2&url=" + encodeURIComponent(q) + "&appkey=" + visible + "&assname=" + lixiang0522 + "&title=" + class2remove, optsData;
    },
    /**
     * @param {string} value
     * @param {string} sUrl
     * @param {?} dataAndEvents
     * @return {?}
     */
    sina : function(value, sUrl, dataAndEvents) {
      "http://service.weibo.com/share/share.php?url=http%3A%2F%2Fopen.weibo.com%2Fsharebutton&appkey=&title=&pic=&ralateUid=1652709070&language=";
      /** @type {string} */
      var url = "http://v.t.sina.com.cn/share/share.php";
      /** @type {Array} */
      var messages = [];
      var class2remove = value || document.title;
      var q = sUrl || window.location.href;
      /** @type {string} */
      var optsData = "";
      /** @type {string} */
      var urlConfigHtml = "";
      /** @type {string} */
      var later = "";
      return KK("img").len > 0 && KK("img").each(function($slide, dataAndEvents) {
        if ($slide.width() > 150) {
          if ($slide.height() > 150) {
            if (messages.length !== 1) {
              messages.push($slide.attr("src"));
            }
          }
        }
      }), messages.length > 0 ? later = url + "?url=" + encodeURIComponent(q) + "&appkey=" + urlConfigHtml + "&title=" + class2remove + "&pic=" + encodeURIComponent(messages.join("|")) + "&ralateUid=" + optsData + "&language=" : later = url + "?url=" + encodeURIComponent(q) + "&appkey=" + urlConfigHtml + "&title=" + class2remove + "&ralateUid=" + optsData + "&language=", later;
    },
    /**
     * @param {string} value
     * @param {string} sUrl
     * @return {?}
     */
    qzone : function(value, sUrl) {
      /** @type {string} */
      var url = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey";
      /** @type {Array} */
      var messages = [];
      var encodedValue = value || document.title;
      var q = sUrl || window.location.href;
      /** @type {string} */
      var optsData = "";
      /** @type {string} */
      var match = "";
      return KK("img").len > 0 && KK("img").each(function($slide, dataAndEvents) {
        if ($slide.width() > 150) {
          if ($slide.height() > 150) {
            if (messages.length !== 1) {
              messages.push($slide.attr("src"));
            }
          }
        }
      }), KK("meta").len > 0 && KK("meta").each(function(meta, dataAndEvents) {
        if (meta.attr("name").toLowerCase() == "description") {
          match = meta.attr("content");
        }
      }), messages.length > 0 ? optsData = url + "?to=qzone&url=" + encodeURIComponent(q) + "&title=" + encodeURIComponent(encodedValue) + "&pics=" + encodeURIComponent(messages.join("|")) + "&summary=" + encodeURIComponent(match) : optsData = url + "?to=qzone&url=" + encodeURIComponent(q) + "&title=" + encodeURIComponent(encodedValue) + "&summary=" + encodeURIComponent(match), optsData;
    },
    /**
     * @param {string} value
     * @param {string} sUrl
     * @return {?}
     */
    pengyou : function(value, sUrl) {
      /** @type {string} */
      var url = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey";
      /** @type {Array} */
      var messages = [];
      var encodedValue = value || document.title;
      var q = sUrl || window.location.href;
      /** @type {string} */
      var optsData = "";
      /** @type {string} */
      var match = "";
      return KK("img").len > 0 && KK("img").each(function($slide, dataAndEvents) {
        if ($slide.width() > 150) {
          if ($slide.height() > 150) {
            if (messages.length !== 1) {
              messages.push($slide.attr("src"));
            }
          }
        }
      }), KK("meta").len > 0 && KK("meta").each(function(meta, dataAndEvents) {
        if (meta.attr("name").toLowerCase() == "description") {
          match = meta.attr("content");
        }
      }), messages.length > 0 ? optsData = url + "?to=pengyou&url=" + encodeURIComponent(q) + "&title=" + encodeURIComponent(encodedValue) + "&pics=" + encodeURIComponent(messages.join("|")) + "&summary=" + encodeURIComponent(match) : optsData = url + "?to=pengyou&url=" + encodeURIComponent(q) + "&title=" + encodeURIComponent(encodedValue) + "&summary=" + encodeURIComponent(match), optsData;
    },
    /**
     * @param {string} value
     * @param {string} sUrl
     * @return {?}
     */
    qmail : function(value, sUrl) {
      /** @type {string} */
      var url = "http://mail.qq.com/cgi-bin/qm_share";
      /** @type {Array} */
      var params = [];
      var encodedValue = value || document.title;
      var q = sUrl || window.location.href;
      /** @type {string} */
      var optsData = "";
      /** @type {string} */
      var match = "";
      return KK("img").len > 0 && KK("img").each(function($slide, dataAndEvents) {
        if ($slide.width() > 150) {
          if ($slide.height() > 150) {
            if (params.length !== 1) {
              params.push($slide.attr("src"));
            }
          }
        }
      }), KK("meta").len > 0 && KK("meta").each(function(meta, dataAndEvents) {
        if (meta.attr("name").toLowerCase() == "description") {
          match = meta.attr("content");
        }
      }), params.length > 0 ? optsData = url + "?url=" + encodeURIComponent(q) + "&to=qqmail&desc=&summary=" + encodeURIComponent(match) + "&title=" + encodeURIComponent(encodedValue) + "&site=&pics=" + encodeURIComponent(params[0]) : optsData = url + "?url=" + encodeURIComponent(q) + "&to=qqmail&desc=&summary=" + encodeURIComponent(match) + "&title=" + encodeURIComponent(encodedValue) + "&site=", optsData;
    },
    /**
     * @param {string} value
     * @param {string} sUrl
     * @return {?}
     */
    shuqian : function(value, sUrl) {
      /** @type {string} */
      var inName = "http://shuqian.qq.com/post";
      var inValue = value || document.title;
      var url = sUrl || window.location.href;
      /** @type {string} */
      var optsData = "";
      return optsData = inName + "?from=3&title=" + encodeURIComponent(inValue) + "&uri=" + url + "&jumpback=2&noui=1", optsData;
    },
    /**
     * @param {string} value
     * @param {string} sUrl
     * @return {?}
     */
    kaixin : function(value, sUrl) {
      /** @type {string} */
      var inName = "http://www.kaixin001.com/rest/records.php";
      var inValue = value || document.title;
      var url = sUrl || window.location.href;
      /** @type {string} */
      var optsData = "";
      /** @type {Array} */
      var params = [];
      return KK("img").len > 0 && KK("img").each(function($slide, dataAndEvents) {
        if ($slide.width() > 150) {
          if ($slide.height() > 150) {
            if (params.length !== 1) {
              params.push($slide.attr("src"));
            }
          }
        }
      }), params.length > 0 ? optsData = inName + "?content=" + encodeURIComponent(inValue) + "&url=" + url + "&&starid=&aid=&style=11&pic=" + encodeURIComponent(params[0]) + "&t=10" : optsData = inName + "?content=" + encodeURIComponent(inValue) + "&url=" + url + "&&starid=&aid=&style=11&t=10", optsData;
    },
    /**
     * @param {string} value
     * @param {string} sUrl
     * @return {?}
     */
    douban : function(value, sUrl) {
      /** @type {string} */
      var url = "http://shuo.douban.com/!service/share";
      var encodedValue = value || document.title;
      var q = sUrl || window.location.href;
      /** @type {string} */
      var optsData = "";
      /** @type {Array} */
      var params = [];
      return KK("img").len > 0 && KK("img").each(function($slide, dataAndEvents) {
        if ($slide.width() > 150) {
          if ($slide.height() > 150) {
            if (params.length !== 1) {
              params.push($slide.attr("src"));
            }
          }
        }
      }), params.length > 0 ? optsData = url + "?image=" + encodeURIComponent(params[0]) + "&href=" + encodeURIComponent(q) + "&name=" + encodeURIComponent(encodedValue) : optsData = url + "?href=" + encodeURIComponent(q) + "&name=" + encodeURIComponent(encodedValue), optsData;
    },
    /**
     * @param {string} value
     * @param {?} dataAndEvents
     * @return {?}
     */
    xianguo : function(value, dataAndEvents) {
      /** @type {string} */
      var url = "http://xianguo.com/service/submitdigg/";
      /** @type {string} */
      var path = window.location.href;
      var encodedValue = value || document.title;
      return str = url + "?url=" + encodeURIComponent(path) + "&title=" + encodeURIComponent(encodedValue), str;
    },
    /**
     * @param {string} value
     * @param {string} sUrl
     * @return {?}
     */
    renren : function(value, sUrl) {
      /** @type {string} */
      var url = "http://widget.renren.com/dialog/share";
      var encodedValue = value || document.title;
      var q = sUrl || window.location.href;
      /** @type {string} */
      var optsData = "";
      /** @type {Array} */
      var params = [];
      /** @type {string} */
      var match = "";
      return KK("img").len > 0 && KK("img").each(function($slide, dataAndEvents) {
        if ($slide.width() > 150) {
          if ($slide.height() > 150) {
            if (params.length !== 1) {
              params.push($slide.attr("src"));
            }
          }
        }
      }), KK("meta").len > 0 && KK("meta").each(function(meta, dataAndEvents) {
        if (meta.attr("name").toLowerCase() == "description") {
          match = meta.attr("content");
        }
      }), params.length > 0 ? optsData = url + "?resourceUrl=" + encodeURIComponent(q) + "&pic=" + encodeURIComponent(params[0]) + "&title=" + encodeURIComponent(encodedValue) + "&description=" + encodeURIComponent(match) + "&charset=GB2312" : optsData = url + "?resourceUrl=" + encodeURIComponent(q) + "&title=" + encodeURIComponent(encodedValue) + "&description=" + encodeURIComponent(match) + "&charset=GB2312", optsData;
    }
  };
  /** @type {function (?): undefined} */
  var e = win.shareQQ = function(panel) {
    load("http://joke.qq.com/qshare/iShare.css", function() {
      load("http://mat1.gtimg.com/joke/Koala/Koala.min.1.3.3.js", function() {
        load("http://mat1.gtimg.com/joke/Koala/plus/plus_fx_v1.0.0.js", function() {
          new Panel(panel);
          KK("#iShare a").bind("click", function() {
            var $scope = this;
            $scope.share = data;
            this.name = this.classNames();
            this.name = this.name.split("_")[1];
            var dat = $scope.share["" + this.name + ""](iShare.title, iShare.url, iShare.imgUrl);
            window.open(dat, "shareQQ", "height=600,width=708,top=100,left=200,toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
            var uHostName = K("iShare").classNames();
            /** @type {string} */
            var url = window.location.href;
            /** @type {Array.<string>} */
            url = url.split("//");
            /** @type {Array.<string>} */
            url = url[1].split(".");
            uHostName = uHostName.split(" ");
            uHostName = uHostName[1] || iShareP1;
            /** @type {Image} */
            var resource = new Image(1, 1);
            /** @type {string} */
            resource.src = "http://btrace.qq.com/collect?sIp=&iQQ=&sBiz=iShare&sOp=" + this.name + "&iStar=1&iTy=1547&iFlow=&iType=" + uHostName + "&sUrl=" + window.location.href + "&sRefer=" + document.referrer + "&iRse3=" + url[0] + "";
          });
          if (K("shareXfImg")) {
            /** @type {null} */
            var loadingTimer = null;
            K("iShareBd").bind("mouseover", function(event) {
              clearInterval(loadingTimer);
              event = event ? event : window.event;
              var element = event.srcElement ? event.srcElement : event.target;
              if (element.tagName == "DIV" || element.tagName == "IMG") {
                K("iShare").go({
                  right : "0px"
                }, 200, "linear");
              }
            });
            K("iShareBd").bind("mouseout", function(event) {
              event = event ? event : window.event;
              var obj = event.srcElement ? event.srcElement : event.target;
              /** @type {number} */
              loadingTimer = setTimeout(function() {
                K("iShare").go({
                  right : "-152px"
                }, 200, "linear", function() {
                  K("iShareTips").hide();
                });
              }, 100);
            });
            K("iShareFcBd").find("em").bind("click", function() {
              K("iShareTips").show();
            });
            K("iShareTips").find("b").item(0).bind("click", function() {
              K("iShareBd").hide();
            });
            K("iShareTips").find("b").item(1).bind("click", function() {
              K("iShareTips").hide();
            });
          }
        }, "js");
      }, "js");
    }, "css");
  };
  /**
   * @param {?} parent
   * @return {undefined}
   */
  var Panel = function(parent) {
    this.isMore = parent.isMore || false;
    /** @type {boolean} */
    this.isHide = true;
    this.positionTL = parent.positionTL;
    this.positionX = parent.positionX || 0;
    this.positionY = parent.positionY || 0;
    this.optionArr = data;
    this.isgTop = parent.isgTop;
    this.isXfShare = parent.isXfShare;
    this.WBok = parent.WB;
    if (this.webQQCofing) {
      if (self != top) {
        K.webQQ();
      }
    }
    if (this.isMore) {
      this.isMoreFn();
    }
    this.creatHTML();
    this.getConfing();
    this.bindEvent();
    if (this.WBok) {
      this.PW_init();
    }
  };
  Panel.prototype = {
    /**
     * @return {undefined}
     */
    creatHTML : function() {
      if (this.WBok) {
        KK("body").item(0).append('<div id="ShareWordP" class="iShare ShareWordP"><ul><li name="weibo" class="Qs_weibo" title="分享到腾讯微博">腾讯微博</li><li name="qzone" class="Qs_qzone" title="分享到QQ空间">QQ空间</li><li name="sina" class="Qs_sina">新浪微博</li><li name="pengyou" class="Qs_pengyou" title="分享到朋友网">朋友网</li><li name="qmail" class="Qs_qmail" title="分享到QQ邮箱">QQ邮箱</li><li name="kaixin" class="Qs_kaixin" title="分享到开心网">开心网</li><li name="renren" class="Qs_renren" title="分享到人人网">人人网</li></ul></div>')
        ;
      }
    },
    /**
     * @return {undefined}
     */
    getConfing : function() {
      if (K.B.ie6) {
        this.ie6hack();
      }
    },
    /**
     * @return {undefined}
     */
    ie6hack : function() {
      KK("html").item(0).css("position:relative;overflow-x:hidden;");
    },
    /**
     * @return {undefined}
     */
    bindEvent : function() {
      var c = this;
      /** @type {number} */
      var right = parseInt(K("iShare").css("top"));
      if (K.B.ie6) {
        K().bind("scroll", function() {
          /** @type {number} */
          var left = document.documentElement.scrollTop || document.body.scrollTop;
          K("iShare").css("top:" + (right + left) + "px");
        });
      }
    },
    /**
     * @return {undefined}
     */
    PW_init : function() {
      var node = this;
      /**
       * @return {?}
       */
      var getSelection = function() {
        if (win.getSelection) {
          return win.getSelection().toString();
        }
        if (doc.getSelection) {
          return doc.getSelection();
        }
        if (doc.selection) {
          return doc.selection.createRange().text;
        }
      };
      /** @type {boolean} */
      var e = false;
      KK("body").item(0).bind("mouseup", function(d) {
        if (K.B.ie6) {
          /** @type {number} */
          var r2Y = document.documentElement.scrollTop || document.body.scrollTop;
          if (d.page.y > 100) {
            if (K("ShareWordP")) {
              if (getSelection().length > 5 && !e) {
                K("ShareWordP").css({
                  left : d.page.x - 150 + "px",
                  top : d.page.y + r2Y - 50 + "px"
                }).show();
              } else {
                K("ShareWordP").hide();
                /** @type {boolean} */
                e = false;
              }
            }
          } else {
            if (K("ShareWordP")) {
              if (getSelection().length > 5 && !e) {
                K("ShareWordP").css({
                  left : d.page.x - 150 + "px",
                  top : d.page.y + r2Y + 10 + "px"
                }).show();
              } else {
                K("ShareWordP").hide();
                /** @type {boolean} */
                e = false;
              }
            }
          }
        } else {
          if (d.page.y > 100) {
            if (K("ShareWordP")) {
              if (getSelection().length > 5 && !e) {
                K("ShareWordP").css({
                  left : d.page.x - 150 + "px",
                  top : d.page.y - 50 + "px"
                }).show();
              } else {
                K("ShareWordP").hide();
                /** @type {boolean} */
                e = false;
              }
            }
          } else {
            if (K("ShareWordP")) {
              if (getSelection().length > 5 && !e) {
                K("ShareWordP").css({
                  left : d.page.x - 150 + "px",
                  top : d.page.y + 10 + "px"
                }).show();
              } else {
                K("ShareWordP").hide();
                /** @type {boolean} */
                e = false;
              }
            }
          }
        }
      });
      KK("body").item(0).bind("mousedown", function(dataAndEvents) {
        if (K("ShareWordP")) {
          if (K("ShareWordP").css("display") == "block") {
            K("ShareWordP").fadeOut("fast");
            /** @type {boolean} */
            e = false;
          }
        }
      });
      K("ShareWordP").bind("mousedown", function() {
        if (K("ShareWordP")) {
          var txt = getSelection();
          return K("ShareWordP").fadeOut(), K("ShareWordP").find("li").each(function(elements, dataAndEvents) {
            elements.click(function() {
              win.open(node.optionArr[elements.attr("name")](txt, iShare.url), "shareQQ", "height=600,width=708,top=100,left=200,toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
              var uHostName = K("iShare").classNames();
              /** @type {string} */
              var url = window.location.href;
              /** @type {Array.<string>} */
              url = url.split("//");
              /** @type {Array.<string>} */
              url = url[1].split(".");
              uHostName = uHostName.split(" ");
              uHostName = uHostName[1] || iShareP1;
              /** @type {Image} */
              var resource = new Image(1, 1);
              /** @type {string} */
              resource.src = "http://btrace.qq.com/collect?sIp=&iQQ=&sBiz=iShare&sOp=" + this.name + "&iStar=1&iTy=1547&iFlow=&iType=" + uHostName + "&sUrl=" + window.location.href + "&sRefer=" + document.referrer + "&iRse3=" + url[0] + "";
            });
          }), e = true, win.getSelection ? win.getSelection().removeAllRanges() : doc.selection.empty(), false;
        }
      });
      K("ShareWordP").bind("mouseup", function() {
        if (K("ShareWordP")) {
          return false;
        }
      });
    },
    /**
     * @return {undefined}
     */
    isMoreFn : function() {
      KK("#iShare > span.Qs_more").bind("mouseover", function() {
        K("iShare").find(".Qs_moreShare").item(0).show();
      });
      KK("#iShare > .Qs_more").bind("mouseout", function() {
        K("iShare").find(".Qs_moreShare").item(0).hide();
      });
    }
  };
})(window, document);
