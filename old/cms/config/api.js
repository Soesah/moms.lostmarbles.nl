
//override load function
function loadXML(uri)
{
  if (top.cms)  
    top.cms.editor = Editor;
  if(uri.indexOf("http://") != -1)
    uri = top.cms.id;
  return HTTPTools.getXML("load-xml.php?id="+uri);
}

IO.setLoadXMLFunction(loadXML);


function saveFunction (xmlURI, xmlDocument)
{
  var url = HTTPTools.postXML("save-xml.php", xmlDocument);
	
	if(url != "" && url.toLowerCase().indexOf("error") == -1)
	{
		return true;
	}
	else if(url.toLowerCase().indexOf("error") != -1)
	  alert(url);
	  
	return false;
}

IO.setSaveXMLFunction(saveFunction);

Editor.setUILanguage("nl");

var removedEmptyRemark = false; //track that pressing enter normally also removes the remark, and then bubbles to fire nodesplit again, reinserting the remark

function doLoad(evt)
{
  var doc = Editor.getActiveDocument();   
  doc.addEventListener("XopusBeforeNodeSplit", beforeNodeSplit);  
  doc.addEventListener("XopusAfterNodeSplit", afterNodeSplit);  
  
  doc.addEventListener("XopusBeforeChildInserted", childInserted);  
  doc.addEventListener("DOMSubtreeModified", subtreeModified);
}

Editor.addEventListener("load", doLoad);

function setCursor(node)
{
  window.setTimeout(  
    function() {
      if(node.getParentNode())
      {
        node = node.selectSingleNode(".//text()") || node;

        var range = node.getOwnerDocument().createRange();

        range.selectNodeContents(node);
        range.collapse(true);

        Editor.Selection.setRange(range); 
      }
    });
}

function beforeNodeSplit(evt)
{
  var node = evt.target;

  //if trying to split a name, check for amount and split off to remark
  if(node.getLocalName() == "ingredient" && node.selectSingleNode("amount") && node.selectSingleNode("name") && node.selectSingleNode("remark") == null)
  {
    var doc = node.getOwnerDocument();
    var remark = doc.createElement("remark");
    node.appendChild(remark);
    node.makeValid();
    evt.preventDefault();
    setCursor(remark);
  }
}


function afterNodeSplit(evt)
{
  var origin = evt.target; //origin
  var target = evt.newNode; 
  var doc = origin.getOwnerDocument(); 
  
  //as xopus splits an ingredient, it might leave an empty remark behind, due to beforeNodeSplit
  //here's is where we clean it up, since we can't see the difference between the split that occurs when the ingredient is split without or with a remark.
  if(origin.getNodeName() == "ingredient" && origin.selectSingleNode("remark[text() = '']"))
  {
    origin.removeChild(origin.selectSingleNode("remark"));
   
    var name = doc.createElement("name");
    target.appendChild(name);
    target.makeValid();
    setCursor(name);
  }
}


function childInserted(evt)
{
  var node = evt.childNode;
  if(node.getNodeName() == "note")
  {
    //node.setAttribute("top",120);
    //node.setAttribute("left",120);
  }
  if(node.getNodeName() == "author")
  {
    node.setTextContent(Editor.Canvas.getActiveCanvas().getViewParam("name"));
  }
  if(node.getNodeName() == "notes")
    throw new Editor.RevertingException;
}

function subtreeModified(evt) //prevent changes to notes, adding notes, etc.
{
  var node = evt.target;
  if(node.selectSingleNode("ancestor-or-self::notes"))
    throw new Editor.RevertingException;
}

function switchNameAndAmount(node)
{
  var amount = node.selectSingleNode("amount");
  var name = node.selectSingleNode("name");
  
  var amountstr = amount.getTextContent();
  var namestr = name.getTextContent();

  name.setTextContent(amountstr);
  amount.setTextContent(namestr);
}

