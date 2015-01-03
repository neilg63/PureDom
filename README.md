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
	var mn = PureDom.nav(links).setId("main-nav").appendTo(header);
</pre>


<p>Add a main section:</p>
<pre>
	var main = PureDom.main().setId("main").appendToBody();
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
