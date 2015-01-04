PureDom
=======
<h2>Purpose</h2>
<p>PureDom is a highly efficient HTML builder and DOM transformer, optimized for the latest browser engines, but targeted mainly for use with Node JS and MVC frameworks as an alternative to HTML templates. It is designed to translate model data into semantic HTML.</p>
<p>PureDom is not concerned with legacy browser compatibility or special effects and as such does not compete with more established and extensive libraries such as jQuery, Dojo or Prototype or frameworks such as Mootools, though you may recognise some of the convenience methods common to jQuery.</p>

<p>Add a header:</p>
<pre>
	var header = PureDom.header().setId("top-header").appendToBody();
	var h1 = PureDom.h1("Page Title").addClass("main-title").appendTo(header);
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
	var main = PureDom.main().setId("main").toBody();
</pre>

<p>Add a content region and an aside to the main section:</p>
<pre>
	var content = PureDom.section().setId("main-content").appendTo(main);
	var sidebarFirst = PureDom.aside().setId("sidebar-first").appendTo(main);
</pre>

<p>Build a form:</p>
<pre>
	var form = PureDom.element("form-name").setId("form-id");
	content.append(form);
</pre>
<p>Build a select dropdown widget</p>
<pre>
	var opts = {
		_: "None",
		br: "Brazil",
		cn: "China",
		id: "Indonesia",
		in: "India",
		jp: "Japan",
		mx: "Mexico",
		ng: "Nigeria",
		ru: "Russia",
		us: "United States",
	}
	var countryCodes = PureDom.select("country",opts,{id:"county-code"},"in");
	form.append(countryCodes);
</pre>

<h2> HTMLElement Extensions<h2>
<dl>
	<dt>append(HTMLElement|Text)</dt>
	<dd>This is both an alias for native JS appendchild(node) and a quick means to add text as a new child text node. It always adds it to the end.</dd>
	
	<dt>prepend(HTMLElement|Text)</dt>
	<dd>As above, but inserts the new content to the beginning.</dd>
	
	<dt>before(HTMLElement)</dt>
	<dd>Inserts an HTML element before the referenced HTML Element.</dd>
	
	<dt>after(HTMLElement)</dt>
	<dd>Inserts an HTML element before the referenced HTML Element.</dd>
	
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
	
	<dt>startsWith(string)</dt>
	<dd>Like the equivalent in Java 
		<pre>
			if (inputText.startsWith("proto") ) {
				// suggest prototype
			}
		</pre>
	</dd>
	
	<dt>endsWidth(text)</dt>
	<dd>Converse</dd>
	
	<dt>contains(string>
	<dd>Contains the string.</dd>
	
	<dt>contains(string>
	<dd>Contains the string.</dd>
	
</dl>