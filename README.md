PureDom
=======
<h2>Purpose</h2>
<p>PureDom is a highly efficient HTML builder and DOM transformer, optimized for the latest browser engines, but targeted mainly for use with Node JS and MVC frameworks as an alternative to HTML templates. It is designed to translate model data into semantic HTML.</p>
<p>PureDom is not concerned with legacy browser compatibility or special effects and as such does not compete with more established and extensive libraries such as jQuery, Dojo or Prototype or frameworks such as Mootools, though you may recognise some of the convenience methods common to jQuery.</p>

  <h3>Please view a live <a href="http://multifaceted.info/demos/puredom/puredom-tester.html" target="_blank">Demo</a> where can try out the new HTML Builder framework yourself.</h3>

<p>Add a header:</p>
<pre>
	// Create header element, set its id and append it to the body
	var header = PureDom.header().setId("top-header").toBody();
	// Append h1 element to the new header region
	var h1 = PureDom.h1("Page Title").addClass("main-title").to(header);
</pre>

<p>Add main menu:</p>
<pre>
	var links = [
		{href:"/news",text:"News"},
		{href:"/blog",text:"Blog"},
		{href:"/calendar",text:"Calendar"},
		{href:"/archives",text:"Archives"}
	];
	var mn = PureDom.nav(links).setId("main-nav").to(header);
</pre>


<p>Add a main section:</p>
<pre>
	// Add a "main" element, set its id and append it to the body.
	var main = PureDom.main().setId("main").toBody();
</pre>

<p>Add a content region and an aside to the main section:</p>
<pre>
	var content = PureDom.section().setId("main-content").to(main);
	var sidebarFirst = PureDom.aside().setId("sidebar-first").to(main);
</pre>

<p>Build a form:</p>
<pre>
	// Add a form and append it to the main content region
	var form = PureDom.form("form-name").setId("form-id").to(content);

</pre>
<p>Build a select dropdown widget</p>
<pre>
	var opts = {
		"_": "None",
		"br": "Brazil",
		"cn": "China",
		"id": "Indonesia",
		"in": "India",
		"jp": "Japan",
		"mx": "Mexico",
		"ng": "Nigeria",
		"ru": "Russia",
		"us": "United States"
	};
	var countryCodes = PureDom.select("country",opts,{id:"county-code"},"in");
	form.append(countryCodes);
</pre>


<h2> HTML Builder Methods</h2>
<dl>
	<dt>PureDom.element(tagName,attrs,text)</dt>
	<dd>This creates a new DOM element with the specified tag name, attributes, text or other HTML Elements. Attributes are passed as simple JSON. If the last element is a string it will be added as text node and if it's another HTML Element, this will become its first child.</dd>
	
	<dt>.h1(text,attrs), .h2(text,attrs), .p(text,attrs), .blockquote(text,attrs)</dt>
	<dd>Creates simple HTML elements and lets you add text as the first parameter.</dd>
	
	<dt>.list(items,attrs)</dt>
	<dd>Lets you build an unordered list (ul) with each item as a new list item (li) tag. The first parameter must be an array of either simple text strings, in which case no parameters are added, or JSON objects, in which case the "text" attribute serves as the text and other attributes are treated as attributes of each li tag.</dd>
	
	<dt>.table(header,rows,attrs,opts)</dt>
	<dd>Builds table from a array of header cells and two-dimensional array of rows. If you need a footer too, then add a simple object with header and footer key names containing arrays. Row cells may simple strings of Cell objects in which text maps to the cell content and .attrs maps to its attributes. You can you use the .get(index1,index2...) method to access individual cells by adding each nested index in successive parameters. Opts include odd/even rows, automatic class names based on header cell names.</dd>
	
</dl>

<h2> HTMLElement Extensions</h2>
<dl>
	<dt>append(HTMLElement|Text)</dt>
	<dd>This is both an alias for native JS appendchild(node) and a quick means to add text as a new child text node. It always adds it to the end.</dd>
	
	<dt>prepend(HTMLElement|Text)</dt>
	<dd>As above, but inserts the new content to the beginning.</dd>
	
	<dt>before(HTMLElement)</dt>
	<dd>Inserts an HTML element before the referenced HTML Element.</dd>
	
	<dt>after(HTMLElement)</dt>
	<dd>Inserts an HTML element before the referenced HTML Element.</dd>
	
	<dt>to(path|HTMLElement,mode)</dt>
	<dd>Appends the current item to the element referenced by the first parameter, either by reference or by adding a valid CSS path. If mode is set to "pre" or "top", it will be prepended.<pre>
		var mainContent = PureDom.section().setId("main-content");
		PureDom.list(["Tomatoes","Lettuce","Carrots"]).addClass("salad-items").to(mainContent);
		PureDom.list(["Bread","Margarine","Jam"]).addClass("breakfast-items").to("#main-content","top");
	</pre></dd>
	
	<dt>toBody(mode)</dt>
	<dd>Appends the current item to the main body. If mode is set to "pre" or "top", it will be prepended.<pre>
		var mainContent = PureDom.section().setId("main-content").toBody();
		var topNav = PureDom.header().setId("top-nav").toBody("top");
	</pre></dd>
	
	<dt>attr(Object attrs), attr(String property, String val), attr(String property)</dt>
	<dd>Lets you set or access html element attributes. If the first parameter is a JSON object, then the key/value map will be translated into HTML attribute properties and values. If the first and second parameters are strings, the second will set the value of the attribute specified in the first parameter. To get an attribute, just add a string as a first parameter. If the property is not set, the getter method will return an empty string.<pre>
		// translates to title=Descriptive long title" class="info" id="technical-info"
		myElement.attr({title:"Descriptive long title","class": "info", "id": "technical-info"});
		myElement.attr("title","A very and verbose long title"); // sets title attribute only
		myElement.attr("title"); // sets title attribute only
	</pre></dd>
	
</dl>

<h2> String Extensions</h2>
<dl>
	<dt>trim()</dt>
	<dd>Trims referenced text, very useful when processing forms.
	<pre>
		var inputText = " empowered markets ";
		inputText = inputText.trim(); // " empowered markets";
	</pre>
	</dd>
	
	<dt>startsWith(string|RegExp), endsWidth(string|RegExp), contains(string|RegExp)</dt>
	<dd>Like the equivalents in Java and C#:
		<pre>
			if (inputText.startsWith("proto") ) {
				// suggest prototype
			}
			
			if (inputText.endsWith(/(x|ch?ris)mass?/) ) {
				// say happy Christmas
			}
			
		</pre>
	</dd>
	
	<dt>sanitize(String separator)</dt>
	<dd>Replaces all non-alphanumeric characters with separator character (e.g. "-") and removes any trailing or leading non-alphanumeric characters.</dd>
	
	<dt>first(separator), last(separator)</dd>
	<dd>Returns first or last segment of string before first instance of separator or whole string if no separator exists.
		<pre>
			var localPath = 'news/sport/football';
			var section = localPath.first("/"); // news
			var subSection = localPath.last("/"); // football
		</pre>
	</dd>
	
	<dt>head(string), tail(string)</dd>
	<dd>Returns the remainder of the string after the first specified separator (tail) or before the last specified separator.
		<pre>
			var longPath = 'news/europe/portugal/2015/article-title';
			var head = longPath.head('/'); // => 'news/europe/portugal/2015';
			var tail = longPath.tail('/'); // => 'europe/portugal/2015/article-title';	
		</pre>
	</dd>
	
</dl>