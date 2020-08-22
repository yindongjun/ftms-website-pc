/**
 * Created by mochao on 2018/9/20.
 */

// 判断终端是在移动端，则设置当前html元素font-size为当前终端的屏幕大小／10
// iphone6: 37.5px
// iphone5: 32px
// ...

(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    reFunc = function () {
      var clientWidth = docEl.clientWidth;
      // console.log(clientWidth)
      // clientWidth = clientWidth < 320 ? 320 : clientWidth;
      // clientWidth = clientWidth > 750 ? 750 : clientWidth;
      if (!clientWidth) return;
      // docEl.style.fontSize = clientWidth / 10 + 'px';

      if (clientWidth <= 1200) {
        docEl.style.fontSize = 100 * (1200 / 1920) + 'px';
      } else {
          docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
      }
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, reFunc, false);
  doc.addEventListener('DOMContentLoaded', reFunc, false);

})(document, window);
