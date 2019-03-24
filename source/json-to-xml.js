const jsonToXML = (recipes) => {
  const doc = new Document();
  doc.appendChild(doc.createElement('recipes'));

  recipes
    .map((r) => {
      const node = doc.createElement('recipe');
      node.innerHTML = r.xml;

      node.setAttribute('id', r.id);
      node.setAttribute('category_id', r.category_id);
      node.setAttribute('name', r.name);
      node.setAttribute('slug', r.slug);
      node.setAttribute('creation_date', r.creation_date);
      node.setAttribute('modification_date', r.modification_date);
      node.setAttribute('servings', r.servings);
      node.setAttribute('preparation_time', r.preparation_time);
      node.setAttribute('language', r.language);

      return node;
    })
    .forEach((n) => doc.documentElement.appendChild(n));

  return doc;
};
