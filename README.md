PureDom
=======
<h2>Purpose</h2>
<p>PureDom is a highly efficient HTML builder and DOM transformer, optimized for the latest browser engines, but targeted mainly for use with Node JS and MVC frameworks as an alternative to HTML templates. It is designed to translate model data into semantic HTML.</p>
<p>PureDom is not concerned with legacy browser compatibility or special effects and as such does not compete with more established and extensive libraries such as jQuery, Dojo or Prototype or frameworks such as Mootools, though you may recognise some of the convenience methods common to jQuery.</p>

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
	
	<dt>after(HTMLElement)</dt>
	<dd>Inserts an HTML element before the referenced HTML Element.</dd>
	
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
		var mainContent = PureDom.section().setId("main-content");
		PureDom.list(["Tomatoes","Lettuce","Carrots"]).addClass("salad-items").to(mainContent);
		PureDom.list(["Bread","Margarine","Jam"]).addClass("breakfast-items").to("#main-content");
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
	
	<dt>contains(string)</dd>
	<dd>Contains the string.</dd>
	
</dl>