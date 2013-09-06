function Modal(title,body,width){
  
  this.title = title;
  this.body = body;
  this.width = width ? width : 300;
  this.buttons = [];
  var existCheck = document.getElementById('backgroundModal');
  
  if(!existCheck){
   var fragment = document.createDocumentFragment();
   var back = document.createElement('div');
   back.setAttribute('id','backgroundModal');
   var mainModalContainer = document.createElement('div');
   var prototypethis = Object.getPrototypeOf(this);
   console.log(prototypethis);
   console.log(prototypethis);
   prototypethis.mainModalContainer = mainModalContainer;
   mainModalContainer.setAttribute('id','mainModalContainer');
   fragment.appendChild(mainModalContainer);
   fragment.appendChild(back);
   var body = document.getElementsByTagName('body')[0];
   body.insertBefore(fragment,body.firstChild);
   var that = this;
   this.mainModalContainer.addEventListener('click', function(event){
   that.hide();
  })
   
  }
}
Modal.prototype = {
 pageWidth: function(){
  return window.innerWidth != null ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body != null ? document.body.clientWidth : null;
 },
 pageHeight: function(){
  return window.innerHeight != null ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body != null ? document.body.clientHeight : null;
 },
 posLeft: function(){
 return typeof window.pageXOffset != 'undefined' ? window.pageXOffset : document.documentElement && document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ? document.body.scrollLeft: 0;
 },
 posTop: function(){
  return typeof window.pageYOffset != 'undefined' ? window.pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;
 },
 addButton: function(text){
    thatArguments = arguments;
    var button = function(text){
     this.text = text;
     this.arguments = [];
     for(var i = 1; i < thatArguments.length; i++){
      this.arguments.push(thatArguments[i]);
     }
    }
    var thisButton = new button(text);
    this.buttons.push(thisButton);
 },
 addCallback: function(fn){
  this.callback = fn; 
 },
 show: function(left, top){
  var that = this;
  left = left ? left : 'center';
  top = top ? top : 'center';
  var back = document.getElementById('backgroundModal');
  var mainBlock = document.createElement('div');
  var buttonBlock = document.createElement('div');
  buttonBlock.setAttribute('id','buttonBlock');
  mainBlock.setAttribute('id','mainBlockDialog');
  mainBlock.style.width = this.width;
  var title = document.createElement('h3');
  var bodyModal = document.createElement('div');
  var bodyModalClassName = bodyModal.className;
  bodyModalClassName += ' '; 
  bodyModalClassName += 'bodyModal';
  var titleText = document.createTextNode(this.title);
  var bodyText = document.createTextNode(this.body);
  title.appendChild(titleText);
  bodyModal.appendChild(bodyText);
  mainBlock.appendChild(title);
  mainBlock.appendChild(bodyModal);
  if(this.buttons.length != 0){
  for(var i = 0; i<this.buttons.length; i++){
   var divBut = document.createElement('div');
   var classNameBut = divBut.className;
   classNameBut == '' ? '' : classNameBut += ' ';
   classNameBut += 'button ';
   classNameBut += ('button'+i);
   divBut.className = classNameBut;
   var butText = document.createTextNode(this.buttons[i].text);
   divBut.appendChild(butText);
   buttonBlock.appendChild(divBut);
   var argumentsOuter = this.buttons[i].arguments;

   if(this.callback){
   (function(argumentsOuter){
    divBut.addEventListener('click',function(event){
     that.callback.apply(that, argumentsOuter);
    });   
   })(argumentsOuter);

   }
   
  }  
  }else{
   var divBut = document.createElement('div');
   divBut.className = 'OKbut';
   divBut.appendChild(document.createTextNode('OK'));
   buttonBlock.appendChild(divBut);
  }
  mainBlock.appendChild(buttonBlock);
  setTimeout(function(){
  that.centerChildren(buttonBlock);
  },0)
  
  back.style.left = this.posLeft()+'px';
  back.style.top = '0px'; 
  back.style.width = '100%';
  back.style.height = '100%';
  back.style.display = 'block';
  
  switch(left){
   case 'center':
   mbw = this.width ? this.width : 300;
   mainBlock.style.left = this.posLeft() + ((this.pageWidth()/2)-(mbw/2));
   break;
   default:
   mainBlock.style.left = left;
  }
  
  switch(top){
   case 'center':
   mbh = mainBlock.offsetHeight;
   mainBlock.style.top = this.posTop() + ((this.pageHeight()-mbh)/2);
   break;
   default:
   mainBlock.style.top = top;
  }
  this.mainModalContainer.appendChild(mainBlock);
 },
 hide: function(){
    var mainBlock = document.getElementById('mainBlockDialog');
    var mainModalContainer = document.getElementById('mainModalContainer');
    mainModalContainer.removeChild(mainBlock);
    var back = document.getElementById('backgroundModal');
    back.style.display = 'none';
 },
 centerChildren: function(parrent){
  var children = parrent.children;
  var childrenTotalLength = 0;
  for(var i = 0; i < children.length; i++){
   var style = children[i].currentStyle || window.getComputedStyle(children[i]);
   
   if(i==0){
    childrenTotalLength += parseInt(style.marginRight);
   } else if((i+1)==children.length){
   childrenTotalLength += parseInt(style.marginLeft);
   }else{
    childrenTotalLength += parseInt(style.marginRight);
    childrenTotalLength += parseInt(style.marginLeft);
   }
   childrenTotalLength += parseInt(style.paddingLeft);
   childrenTotalLength += parseInt(style.paddingRight);
   childrenTotalLength += parseInt(children[i].offsetWidth);

  }
  var style = parrent.currentStyle || window.getComputedStyle(parrent);
  var parrentwidth = parseInt(parrent.offsetWidth);
  var center = parrentwidth/2;
  var centerChildren = childrenTotalLength/2;
  var leftChildren = center - centerChildren;
  var firstChild = parrent.childNodes[0];
  firstChild.style.marginLeft = leftChildren+'px';
 }
}

