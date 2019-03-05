
function setClass(id,classname)
{
  var el = document.getElementById(id);
  if(el.className.indexOf(" "+classname) != -1)
    el.className = el.className.replace(classname, ''); 
  else
    el.className += " "+classname; //(classname == el.className)?prev:
  return false;
}

function defaultFocus()
{
  setFocus('focus');
}

function setFocus(id)
{
  var focusEl = document.getElementById(id);
  if(focusEl)
    focusEl.select(); 
}

//tools
var tools = 
{
  inArray:function(value, values)
  {
    for (var i=0; i<values.length; i++) 
    {
      if(values[i] == value) return true;
    }  
    return false;
  },
  
  initXML:function(xmlString) 
  {
    if(window.DOMParser) //Mozilla
    {
      var parser = new DOMParser();
      var xml = parser.parseFromString(xmlString,'text/xml');
    }
    else //IE
    {
      var xml = new ActiveXObject('Msxml.DOMDocument');
      xml.async = false;
      xml.loadXML(xmlString);
    }
    return xml;
  },
    
  xmlStr:function(xml)
  { 
      if(window.XMLSerializer)
      {
        var serializer = new XMLSerializer();
        var xmlstr = serializer.serializeToString(xml);
        alert(xmlstr);
      }
      else
        alert(xml.xml);
  },
  
  //convert a string to an element
  getElement:function(html)
  {
    if(html == "") return new Array();
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.childNodes[0];
  },
  
  //sets focus on a form element
  setFocus:function(id)
  {
    if(document.getElementById(id+"_focus"))
    {
      try{ document.getElementById(id+"_focus").focus(); }catch(e){}
    }
  },
  
  leadingZero:function(value, zeros)
  {
    if(!zeros)
      var zeros = 1;
    while((value+'').length < zeros+1)
      value = "0"+value;
    return value;
  },
  
  trailingZero:function(value)
  {
    if((value+'').indexOf(".") == -1)
      return value + ".00";
    else if((value+'').substring((value+'').indexOf(".")).length < 3)
      return value + "0";  
    else 
      return value;   
  },
  
  checkForm:function(form)
  {
    var warnedels = [];
    for (var i=0; i<form.elements.length; i++) 
    {
      var el = form.elements[i];    
      //clear
      el.className = el.className.replace(' required','');
      if(el.getAttribute('check'))
      {
        switch(el.nodeName.toLowerCase())
        {
          case 'input':
          case 'textarea':
            if(el.value == '')
            {
              el.className += ' required';
              warnedels.push(el);
            }
          break;
          case 'select':
            if(el.value == el.getAttribute("default") && el.getAttribute("default"))  
            {
              el.className += ' required';
              warnedels.push(el);
            }
          break
        }
      }
    }    
    return (warnedels.length == 0)?true:false;
  }
}

function changeField(id, value)
{
  document.getElementById(id).value = value;
  return false;
}




//javascript extensions
Function.prototype.getName = function ()
{
  return ("" + this).match(/function\s*([^(\s]*)/)[1];
};

Function.prototype.addMethods = function ()
{
  for (var i = 0; i < arguments.length; i++)
  {
    var name = arguments[i].getName();
    this.prototype[name] = arguments[i];

    window[name] = undefined;
  }
};
