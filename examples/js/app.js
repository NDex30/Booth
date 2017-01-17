;window.onerror = function() {
  if (window.console) {
    window.console.log(arguments);
  }
  return true;
};

if(typeof(Booth) !== "undefined"){
  var menuLeft = new Booth(document.getElementById('left-menu-button'), {});
  var menuRight = new Booth(document.getElementById('right-menu-button'), {});
}
