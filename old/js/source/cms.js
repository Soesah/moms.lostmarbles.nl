function ContentManagementSystem()
{
  var id = null;
  var editor = null;
}

ContentManagementSystem.addMethods(
  function init()
  {
    this.checkUrl();
  },
  
  function checkUrl()
  {
    if(this.id != document.location.hash.substring(1))
      this.setUrl();
  },
  
  function setHash(id)
  {
    document.location.hash = id;
    this.checkUrl();
    this.id = id;
  },
  
  function setUrl()
  {
    this.id = document.location.hash.substring(1);
    if(this.editor) 
      this.loadDocument();
  },
  
  function exitEditor()
  {
    document.location.href = "../index.php";
    return false;
  },

  function exitEditorToRecipe()
  {
    document.location.href = "../recipe.php?id="+cms.id;
    return false;
  },
  
  function loadDocument()
  {
    this.editor.getActiveCanvas().loadDocument(this.id);
  },
  
  function showCMS()
  {
    document.body.className = 'cms';
    return false;
  },
  
  function showEditor()
  {
    document.body.className = 'edit';
    return false;
  }
);

var cms = new ContentManagementSystem();


function addStyleOverride()
{
  var sheet = top.document.createElement("style");
  sheet.setAttribute("rel", "stylesheet");
  sheet.setAttribute("type", "text/css");
  sheet.setAttribute("src", "../../css/xopus-override.css");
  top.document.head.appendChild(sheet);
}