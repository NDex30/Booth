/*
  Booth JS
 Version: 0.1.1
  Author: NDex30
 Website: https://ndex30.github.io/
    Docs: https://github.com/NDex30/Booth
    Repo: https://github.com/NDex30/Booth
  Issues: https://github.com/NDex30/Booth/issues
 */
window.Booth = function(el, options) {
  el = document.getElementById(el);
  this.openbtn = el;
  this.options = this.extend( {}, this.options );
  var tmp = el.getAttribute('data-booth-options');
  if(tmp != null){
    tmp = tmp.replace(/[{}]/g, "").split(',');
    if(tmp.length > 0){
      for(x in tmp){
        var s = tmp[x].split(':');
        this.options[s[0].trim()] = s[1].trim();
      }
    }
  }
  this.extend( this.options, options );
  this.bodyEl = document.body;
  if(this.options.contentid != null){
    this.mainContent = document.getElementById( this.options.contentid );
  }else{
    var tmpMc = document.getElementsByClassName('booth-content');
    if(tmpMc.length > 0)
      this.mainContent = tmpMc[0];
  }
  if(this.options.menuwrapid != null){
    this.menuWrap = document.getElementById( this.options.menuwrapid );
  }else{
    var tmpMw = document.getElementsByClassName('booth-menu');
    if(tmpMw.length > 0)
      this.menuWrap = tmpMw[0];
  }
  if(this.options.closebtnid != null){
    this.closebtn = document.getElementById( this.options.closebtnid );
  }else{
    var tmpCb = this.menuWrap.getElementsByClassName('booth-close-button');
    if(tmpCb.length > 0)
      this.closebtn = tmpCb[0];
  }
  this.isOpen = false;
  this.init();
};
window.Booth.prototype.options = {
	location: 'left',
	slideType : 'ease',
  contentid: null,
  closebtnid: null,
  menuwrapid: null,
	speed : 300,
  clickWait: 500,
};
window.Booth.prototype.init = function(){
  this.has3d = this.check3d();
  this.transitionEvent = this.whichTransitionEvent();
  this.initMenu(this.options.location);
  this.initEvents();
};
window.Booth.prototype.initMenu = function(location){
  this.menuWrap.classList.add('booth-menu-'+location);
  if(!this.has3d){
    this.menuWrap.classList.add('booth-no3d');
    this.mainContent.classList.add('booth-no3d');
  }
};
window.Booth.prototype.initEvents = function(){
  var self = this;
  this.openbtn.addEventListener( 'click', function(ev) {
    self.toggleMenu();
  } );
  if( this.closebtn ) {
    this.closebtn.addEventListener( 'click', function(ev){
      self.toggleMenu();
    } );
  }
  // close the menu element if the target it´s not the menu element or one of its descendants..
  this.mainContent.addEventListener( 'click', function(ev) {
    var target = ev.target;
    if( self.isOpen && target !== self.openbtn && !target.classList.contains('booth-menu-button')) {
      self.toggleMenu();
    }
  } );

  this.menuWrap.addEventListener(this.transitionEvent, function(d) {
    if(this.classList.contains("booth-menu") && !this.classList.contains("booth-active")){
      this.style.visibility = "hidden";
    }
    //if(console)console.log('Transition complete!  This is the callback, no library needed! Display Value == ',this.style.display);
  });
}
window.Booth.prototype.toggleMenu = function(){
  var self = this;
  if( this.isOpen ) {
    self.closeMenu();
  }
  else {
    self.openMenu();
  }
  this.isOpen = !this.isOpen;
};
window.Booth.prototype.openMenu = function(){
  this.menuWrap.style.visibility = "visible";
  if(this.has3d){
    this.mainContent.classList.add('booth-content-'+this.options.location);
    this.mainContent.classList.add('booth-active');
    this.menuWrap.classList.add('booth-active');
  }else{
    alert("Please try an updated browser!");
  }
};
window.Booth.prototype.closeMenu = function(){
  if(this.has3d){
    this.menuWrap.classList.remove('booth-active');
    this.mainContent.classList.remove('booth-active');
    this.mainContent.classList.remove('booth-content-'+this.options.location);
  }else {
    alert("Please try an updated browser!");
  }
};
window.Booth.prototype.check3d = function(){
  if (!window.getComputedStyle) {
      return false;
  }

  var el = document.createElement('p'),
      has3d,
      transforms = {
          'webkitTransform':'-webkit-transform',
          'OTransform':'-o-transform',
          'msTransform':'-ms-transform',
          'MozTransform':'-moz-transform',
          'transform':'transform'
      };

  // Add it to the body to get the computed style.
  document.body.insertBefore(el, null);

  for (var t in transforms) {
      if (el.style[t] !== undefined) {
          el.style[t] = "translate3d(1px,1px,1px)";
          has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
      }
  }

  document.body.removeChild(el);

  return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
};
window.Booth.prototype.whichTransitionEvent = function(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
};
window.Booth.prototype.extend = function( a, b ) {
  for( var key in b ) {
    if( b.hasOwnProperty( key ) ) {
      a[key] = b[key];
		}
	}
	return a;
};
