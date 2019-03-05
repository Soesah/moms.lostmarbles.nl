function Comm()
{
}

var xmlhttp = null;
var focusel = null;
var activeDialogs = [];

Comm.addMethods(
  
  function init()
  {
    this.history = [];
  },
  
  function go(href)
  {
    document.location.href = href;
    return false;
  },
  
  function back()
  { 
    //remove current
    this.history.pop();
    if(this.history.length > 0)
    {
      //reload last
      this.send(this.history.pop());
      return false;
    }
    return true;
  },
    
  function sendForm(form, name)
  {
    if(!tools.checkForm(form)) return false;    
    var xml = tools.initXML("<"+name+"/>");
    var action = form.getAttribute('action');
    var method = form.getAttribute('method');
    action += (method == "get")?"?":"";
    
    for (var i=0; i<form.elements.length; i++) 
    {      
      var el = form.elements[i];
      if(el.tagName.toLowerCase() == 'button' || el.value == "") continue;

      if(method == "get")
        action += el.name +"="+el.value+"&";
    
      var node = xml.createElement(el.name);
      node.appendChild(xml.createTextNode(el.value));    

      xml.documentElement.appendChild(node);
    }
    this.send(action ,xml, method);
     
   return false; 
  },
    
  //send the xml to the server
  function send(href, xml, method, async)
  {
  
    comm.history.push(href);
    //if(xml)
    //    alert("sending:\n"+xml.xml);
    if(!method)
      method = "post"
    if(typeof(async) == 'undefined')
      async = true;
    
    if (window.XMLHttpRequest) //Mozilla, etc.
      xmlhttp=new XMLHttpRequest();
    else if (window.ActiveXObject) //IE5, 6
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    
    if (xmlhttp != null)
    {
      var me = this;
      xmlhttp.onreadystatechange= function(){me.handleResponse(me);};
      xmlhttp.open(method,href,async)
      if(!xml) 
        xml = tools.initXML("<dummy/>");

      xmlhttp.send(xml);  
    }
    else
    {
      this.disabled = true;
    }
    return false;
  },
  
  function handleResponse(me)
  {
    if (xmlhttp.readyState==4) //loaded
    {
      var response = xmlhttp.responseText;
      
      //alert(response);
      if (response!='')
      {
        if(response.indexOf("<div") != -1)
        {
          var element = tools.getElement(xmlhttp.responseText);
          var id = element.getAttribute("id");
          if(id == "children") // a collection of elements
          {
            while(element.childNodes)
            {
                var child = element.childNodes[0];
                if(typeof(child) == "undefined") break;
                if(child.nodeType == 1) 
                    me.handleElements(child,child.getAttribute("id"));
                else
                    element.removeChild(child);
            }
          }
          else if(id == "script") //script lines
          {
            while(element.childNodes)
            {
                var child = element.childNodes[0];
                if(typeof(child) == "undefined") break;
                if(child.nodeType == 1)
                {
                    var line = child.textContent || child.innerText
                    eval(line);
                    element.removeChild(child);
                }
                else
                    element.removeChild(child);
            }
          }
          else // a single element
              me.handleElements(element,id);
              
          tools.setFocus(id.substring(0,id.indexOf("_")));

        } 
        else
           alert("response:\n"+response);
      }        
    }
  },
  
  function handleElements(element,id)
  {
      if(document.getElementById(id))                   //replace it if it exists
        document.getElementById(id).parentNode.replaceChild(element,document.getElementById(id));
      else if(element.getAttribute("pass") == "true")   //pass it if it only belongs somewhere specific
        element.parentNode.removeChild(element);
      else                                              //otherwise attach it to the body
        document.body.appendChild(element);
  }
  
  
)

var comm = new Comm();
    
if (window.addEventListener) //Mozilla, etc.
    window.addEventListener("load",function(){comm.init();},false);
else if (window.attachEvent) //IE
    window.attachEvent("onload",function(){comm.init();});