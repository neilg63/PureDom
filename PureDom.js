/* PureDom v0.0.1 | Author: Neil Gardner, 2015 | License: MIT/GPL */

/*
Extend native JS String object for easier text processing
*/

String.prototype.ltrim = function() {
	return this.replace(/^\s+/,'');
}

String.prototype.rtrim = function() {
	return this.replace(/\s+$/,'');
}
	
String.prototype.trim = function() {
	return this.ltrim().rtrim();
}


String.prototype.startsWith = function(str) {
	return this.indexOf(str) == 0;
}

String.prototype.endsWith = function(str) {
	return this.indexOf(str) == this.length - str.length;
}

String.prototype.contains = function(str) {
	return this.indexOf(str) >= 0;
}

String.prototype.first = function(separator) {
	return this.split(separator).shift();
}

String.prototype.last = function(separator) {
	return this.split(separator).pop();
}

String.prototype.tailHead = function(separator,mode) {
	var parts = this.split(separator), rest = '';
	if (mode == 'tail') {
		parts.shift();
	} else {
		parts.pop();
	}
	if (parts.length>0) {
		rest = parts.join(separator);
	}
	return rest;
}

String.prototype.tail = function(separator) {
	return this.tailHead('tail');
}

String.prototype.head = function(separator) {
	return this.tailHead('head');
}

String.prototype.segment = function(index,separator) {
	var parts = this.split(separator),segment = '';
	if (parts.length > index) {
		segment = parts[index]
	}
	return segment;
}

String.prototype.sanitize = function(separator) {
	return this.replace(/[^0-9a-z]+/gi,separator).replace(/[^0-9a-z]+$/i,'');
}

String.prototype.numberStrings = function() {
	return this.replace(/[^0-9.-]+/g,' ').trim().split(' ');
}

String.prototype.toNumberString = function() {
	return this.numberStrings().shift();
}


String.prototype.toInt = function() {
	var n = this.toNumberString();
	if ( !isNaN(n) ) {
		return parseInt(n);
	}
	return 0;
}

String.prototype.toFloat = function() {
	var n = this.toNumberString();
	if (!isNaN(n)) {
		return parseFloat(n);
	}
	return 0;
}
/*
Language-sensitive text utils library
*/
TextUtils = {
	filterSmallWords: function(word) {
		switch (word.toLowerCase()) {
			case 'to':
			case 'the':
			case 'that':
			case 'those':	
			case 'this':	
			case 'these':	
			case 'in':
			case 'on':
			case 'upon':
			case 'over':
			case 'above':	
			case 'among':	
			case 'between':		
			case 'about':	
			case 'at':
			case 'of':
			case 'in':
			case 'for':	
			case 'and':
			case 'a':
			case 'an':
			case 'from':
			case 'with':
			case 'against':
				return false;
			default:
				return true;
		}
	}
}


/*
Capitalize irrespective of word or apply filter
*/
String.prototype.capitalize = function(smart) {
	var parts = this.split(/\b/), text = '',
		num = parts.length,word,wordLen = 0, cast = true;
	smart = smart? true : false;
	if (num > 0) {
		for (k in parts) {
			word = parts[k];
			wordLen = word.length;
			if (wordLen>0) {
				cast = (k > 0 && smart)? TextUtils.filterSmallWords(word) : true;
				if (cast) {
					text += word.substring(0,1).toUpperCase();
					if (word.length > 1) {
						text += word.substring(1,wordLen);
					}
				} else {
					text += word;
				}
			}
		}
	}
	return text;
}

String.prototype.titleCase = function(smart) {
	return this.capitalize(true);
}

/*
Simply Word object
*/
var Word = function(str) {
	this.letters = str.split('');
}

Word.prototype.length = function() {
	return this.letters.length;
}

Word.prototype.get = function(index) {
	var letter = '';
	if (index < this.letters.length) {
		letter = this.letters[index];
	}
	return letter;
}

Word.prototype.size = function() {
	return this.letters.length;
}

Word.prototype.append = function(str) {
	if (str) {
		var letters = str.split('');
		for (l in letters) {
			this.letters.push(letters[l]);
		}
	}
	return this;
}

Word.prototype.toString = function() {
	return this.letters.join('');
}

/*
Extend native HTMLElement with additional methods
for easier DOM manipulation
*/
HTMLElement.prototype._pend = function(node,type) {
	if (typeof node == 'string') {
		node = document.createTextNode(node);
	}
	if (type == 'pre' && this.childNodes.length>0) {
		this.insertBefore(node,this.childNodes[0]);
	} else {
		this.appendChild(node);
	}
	return this;
}

/*
Alias for appendChild, but alsp lets you directly append text and TextNode
*/
HTMLElement.prototype.append = function(node) {
	return this._pend(node);
}

/*
Alias for prependChild, but alsp lets you directly prepend text and TextNode
*/
HTMLElement.prototype.prepend = function(node) {
	return this._pend(node, 'pre');
}

/*
Append?prepend HTMLElement to another valid HTMLElement or CSS path
*/
HTMLElement.prototype._pendTo = function(mode,path) {
	var el;
	if (path instanceof HTMLElement) {
		el = path;
	} else if (typeof path == 'string') {
		el = document.querySelector(path);
	}
	if (el instanceof HTMLElement) {
		if (mode == 'pre') {
			el.prepend(this);
		} else {
			el.append(this);
		}
	}
	return this;
}

/*
Append HTMLElement to another valid HTMLElement or CSS path
*/
HTMLElement.prototype.appendTo = function(path) {
	return this._pendTo('ap',path);
}

/*
Prepend HTMLElement to another valid HTMLElement or CSS path
*/
HTMLElement.prototype.prependTo = function(path) {
	return this._pendTo('pre',path);
}

/*
Append to document body
*/
HTMLElement.prototype.appendToBody = function() {
	document.body.append(this);
	return this;
}

/*
Prepend to document body
*/
HTMLElement.prototype.prependToBody = function() {
	document.body.prepend(this);
	return this;
}

/*
Set or get attributes as key/value pair in parameters 1 and 2,
or as JS object
To get single attribute, just add its key name in first parameter
*/
HTMLElement.prototype.attr = function(attrs,val) {
	if (typeof attrs == 'object') {
		for (var k in attrs) {
			this.setAttribute(k, attrs[k]);
		}
	} else if (typeof attrs == 'string') {
		if (typeof val == 'string') {
			this.setAttribute(attrs, val);
		} else if (!val) {
			return this.getAttribute(attrs);
		}
	}
	return this;
}

/*
Get id, returns empty string if not available
*/
HTMLElement.prototype.getId = function(val) {
	var id = this.attr('id');
	if (!id) {
		id = '';
	}
	return id;
}

/*
Set id, return self
*/
HTMLElement.prototype.setId = function(val) {
	if (typeof val == 'string') {
		this.attr('id',val);
	}	
	return this;
}

/*
Add a class name, return self
*/
HTMLElement.prototype.addClass = function(strClass) {
	if (typeof strClass == 'string') {
		this.classList.add(strClass);
	}
	return this;
}

/*
Remove a class name, return self
*/
HTMLElement.prototype.removeClass = function(strClass) {
	if (typeof strClass == 'string') {
		this.classList.remove(strClass);
	}
	return this;
}

/*
Remove an attribute, return self
*/
HTMLElement.prototype.removeAttr = function(attr) {
	this.removeAttribute(attr);
	return this;
}

/*
Insert node before referenced element
*/
HTMLElement.prototype.before = function(node) {
	return this.parentNode.insertBefore(node, this);
}

/*
Insert node after referenced element
*/
HTMLElement.prototype.after = function(node) {
	if (this.parentNode.lastChild == this) {
		return this.parentNode.append(node);
	} else {
		return this.parentNode.insertBefore(node, this.nextSibling);
	}
}

/*
Fetch tagName in lower case form
*/
HTMLElement.prototype.tag = function() {
	return this.tagName.toLowerCase();
}

HTMLElement.prototype.val = function() {
	var result = '';
	switch (this.tag()) {
		case 'input':
			return this.getAttribute('value');
		case 'select':
			return this.querySelector("option:selected");
		default:
			return this.textContent;
	}
}

HTMLElement.prototype.find = function(path) {
	return this.querySelectorAll(path);
}

HTMLElement.prototype.first = function(path) {
	return this.querySelector(path);
}

HTMLElement.prototype.textStrings = function(path) {
	var cn=this.childNodes, items = [];
	if (cn.length>0) {
		for (k in cn) {
			if (cn[k] instanceof Text) {
				items.push(cn[k].textContent.replace(/\t/,' '));
			} else if (cn[k] instanceof HTMLElement) {
				items.push( cn[k].textStrings().join('\t') );
			}
		}
	}
	return items;
}

HTMLElement.prototype.text = function(path) {
	return this.textStrings().join('\t');
}

HTMLElement.prototype.wrap = function(tagName,attrs) {
	var copy = this.cloneNode(true), el = document.createElement(tagName).append(copy).attr(attrs);
	this.parentNode.replaceChild(el,this);
	return this;
}

HTMLElement.prototype.enclose = function(tagName,attrs) {
	var el = document.createElement(tagName).attr(attrs), n;
	if (this.childNodes.length > 0) {
		for (k in this.childNodes) {
			n = this.childNodes[k];
			if (n.constructor == Text || n.constructor == HTMLElement) {
				el.append(n);
			}
		}
	}
	this.append(el);
	return this;
}

HTMLElement.prototype.match = function(rgx) {
	var m = this.text().match(rgx);
	if (!m) {
		m = {length:0};
	}
	return m;
}

HTMLElement.prototype.hasMatch = function(rgx) {
	var m = this.match(rgx);
	return m.length > 0;
}

Text.prototype.replace = function(rgx,repl) {
	if (typeof repl != 'string') {
		repl = '';
	}
	this.textContent = this.textContent.replace(rgx,repl);
	return this;
}

HTMLElement.prototype.replaceIn = function(rgx,repl) {
	for (var k in this.childNodes) {
		var n = this.childNodes[k]
		if (n.constructor == Text) {
			n.replace(rgx,repl)
		} else if (n instanceof HTMLElement) {
			n.replaceIn(rgx,repl);
		}
	}
}

HTMLElement.prototype.replace = function(rgx,repl) {
	return this.replaceIn(rgx,repl);
}

NodeList.prototype.get = function(index) {
	if (index >= this.length) {
		index = this.length - 1;
	} else if (index < 0) {
		index = 0;
	}
	if (this.length > 0) {
		return this.item(index);
	}
	return document.createTextNode('');
}

NodeList.prototype.first = function(index) {
	return this.get(0);
}

NodeList.prototype.last = function(index) {
	return this.get(this.length-1);
}

NodeList.prototype.text = function() {
	var self=this, items = [];
	if (self.length>0) {
		for (k in self) {
			if (self[k] instanceof HTMLElement ) {
				items.push(self[k].text());
			}
		}
	}
	return items.join('\t');
}


NodeList.prototype.attr = function(attrs) {
	var self = this;
	if (this.length > 0) {
		for (k in self) {
			if (self[k] instanceof HTMLElement) {
				self[k].attr(attrs);
			}
		}
	}
	return this;
}

NodeList.prototype.addClass = function(className) {
	var self = this;
	if (this.length > 0) {
		for (k in self) {
			if (self[k] instanceof HTMLElement) {
				self[k].addClass(className);
			}
		}
	}
	return this;
}

NodeList.prototype.removeClass = function(className) {
	var self = this;
	if (this.length > 0) {
		for (k in self) {
			if (self[k] instanceof HTMLElement) {
				self[k].removeClass(className);
			}
		}
	}
	return this;
}

HTMLElement.prototype.hasClass = function(className) {
	var cn = this.classList.length,i=0;
	if (cn > 0) {
		for (;i< cn;i++) {
			if (this.classList[i] == className) {
				return true;
			}
		}
	}
	return false;
}

HTMLElement.prototype.hasAnyOfClasses = function(){
	for (var i= 0, il=arguments.length; i<il; i++){
		if (this.hasClass(arguments[i])) return true;
	}
	return false;
}

HTMLElement.prototype._matchClasses = function(rgx,fragment) {
	var self = this, i =0, n, nc = 0;
	if (self.childNodes.length > 0) {
		for (k in self.childNodes) {
			n = self.childNodes[k];
			if (n instanceof HTMLElement) {
				nc = n.classList.length;
				if (nc>0) {
					for (i=0;i<nc;i++) {
						if (rgx.test(n.classList[i])) {
							fragment.appendChild(n);
						}
					}
				}
				if (n.childNodes.length>0) {
					n._matchClasses(rgx,fragment);
				}
			}
		}
	}
}

HTMLElement.prototype.matchClass = function(rgx,params) {
	if (typeof rgx == 'string') {
		rgx = new RegExp(rgx,'i');
	}
	var fragment = document.createDocumentFragment();
	if (rgx instanceof RegExp) {
		this._matchClasses(rgx,fragment);
	}
	return fragment.childNodes;
}

HTMLElement.prototype._containsClass = function(mode,str,caseSensitive) {
	var rgx;
	if (typeof str == 'string') {
		var params = (caseSensitive !== true)? 'i' : null;
		switch (mode) {
			case 'start':
				str = '^' + str;
				break;
			case 'end':
				str += '$';
				break;
		}
		rgx = new RegExp(str,params);
	}
	return this.matchClass(rgx);
}

HTMLElement.prototype.hasClassStartingWith = function(str,caseSensitive) {
	return this._containsClass('start',str,caseSensitive);
}

HTMLElement.prototype.hasClassEndingWith = function(str,caseSensitive) {
	return this._containsClass('end',str,caseSensitive);
}

HTMLElement.prototype.hasClassContaining = function(str,caseSensitive) {
	return this._containsClass('contain',str,caseSensitive);
}

HTMLElement.prototype.showInTextNodes = function(str) {
	for (var k in this.childNodes) {
		var n = this.childNodes[k]
		if (n.constructor == Text) {
			n.split(str)
		} else if (n instanceof HTMLElement) {
			n.showInTextNodes(str);
		}
	}
}

Text.prototype.split = function(str) {
	var ps = this.textContent.split(str);
	if (ps.length == 2) {
		this.textContent = ps[0];
		this.parentNode.append(document.createElement("em").append(str).addClass("match-string"));
		this.parentNode.append(ps[1]);
	}
}

NodeList.prototype.match = function(rgx,className) {
	var self = this, i = 0,m, k;
	if (!className) {
		className = 'matched';
	}
	if (this.length > 0) {
		for (k in self) {
			if (self[k] instanceof HTMLElement) {
				m = self[k].match(rgx)
				if (m.length>0) {
					self[k].addClass(className).attr({'match-index':i.toString(),'match-string': m[0]});
					self[k].showInTextNodes(m[0]);
					i++;
				}
			}
		}
	}
	return this;
}

NodeList.prototype.replace = function(rgx,repl) {
	var self = this, i = 0,k;
	if (this.length > 0) {
		for (k in self) {
			if (self[k] instanceof HTMLElement) {
				self[k].replace(rgx, repl);
			}
		}
	}
	return this;
}

/*
* Helper library for implementation of extensions for specific HTML Element types
*/
PureHTML = {
	
	insert: function(self,index,text,attrs) {
		var cn = self.childNodes, c, el;
		if (index >= cn.length) {
			index = cn.length-1;
		} else if (index < 0) {
			index = 0;
		}
		c = cn[index];
		el = document.createElement('li').attr(attrs).append(text);
		return c.after(el);
	},
	
	push: function(self,text,attrs) {
		var el = document.createElement('li').attr(attrs).append(text);
		return self.append(el);
	},
	
	unshift: function(self,text,attrs) {
		var el = document.createElement('li').attr(attrs).append(text);
		return self.prepend(el);
	},

};

HTMLUListElement.prototype.unshift = function(text,attrs) {
	return PureHTML.unshift(this,text,attrs);
}

HTMLOListElement.prototype.unshift = function(text,attrs) {
	return PureHTML.unshift(this,text,attrs);
}

HTMLOListElement.prototype.insert = function(index,text,attrs) {
	return PureHTML.insert(this, index,text,attrs);
}

HTMLUListElement.prototype.insert = function(index,text,attrs) {
	return PureHTML.insert(this, index,text,attrs);
}

HTMLUListElement.prototype.push = function(text,attrs) {
	return PureHTML.push(this,text,attrs);
}

HTMLOListElement.prototype.push = function(text,attrs) {
	return PureHTML.push(this,text,attrs);
}

var PureDom = {
	
	_addOpts: function(opts,settings) {
		if (typeof opts == 'object') {
			for (k in opts) {
				if (settings.hasOwnProperty(k)) {
						settings[k] = opts[k];
				}
			}
		}
		return settings;
	},
	
	element:function(tagName,attrs,text) {
		var el = document.createElement(tagName).attr(attrs), tn;
		if (typeof text == 'string') {
			tn = document.createTextNode(text);
		} else {
			tn = text;
		}
		if (tn instanceof Node) {
			el.appendChild(tn);
		}
		return el;
	},
	
	h1: function(text,attrs) {
		return this.element('h1',attrs,text)
	},
	
	h2: function(text,attrs) {
		return this.element('h2',attrs,text)
	},
	
	h3: function(text,attrs) {
		return this.element('h3',attrs,text)
	},
	
	h4: function(text,attrs) {
		return this.element('h4',attrs,text)
	},
	
	h5: function(text,attrs) {
		return this.element('h5',attrs,text)
	},
	
	h6: function(text,attrs) {
		return this.element('h6',attrs,text)
	},
	
	p: function(text,attrs) {
		return this.element('p',attrs,text)
	},
	
	blockquote: function(text,attrs) {
		return this.element('blockquote',attrs,text)
	},
	
	ul: function(attrs) {
		return this.element('ul',attrs);
	},
	
	ol: function(attrs) {
		return this.element('ol',attrs);
	},
	
	li: function(text,attrs) {
		return this.element('li',attrs,text)
	},
	
	div: function(attrs,text) {
		return this.element('div',attrs,text)
	},
	
	span: function(text,attrs) {
		return this.element('span',attrs);
	},
	
	main: function(attrs) {
		return this.element('main',attrs);
	},
	
	article: function(attrs) {
		return this.element('article',attrs);
	},
	
	section: function(attrs) {
		return this.element('section',attrs);
	},
	
	aside: function(attrs) {
		return this.element('aside',attrs);
	},
	
	header: function(attrs) {
		return this.element('header',attrs);
	},
	
	footer: function(attrs) {
		return this.element('footer',attrs);
	},
	
	a: function(text,href,attrs) {
		if (typeof href == 'string') {
			attrs.href = href;
		} else if (typeof href == 'object') {
			attrs = href;
		}
		return this.element('a',attrs,text);
	},
	
	anchor: function(idName, attrs, text) {
		if (typeof idName == 'string') {
			attrs.id = idName;
		}
		return this.element('a',attrs,text);
	},
	
	_list: function(type,items,attrs) {
		var i=0, l;
		if (type == 'ol') {
			l = this.ol(attrs);
		} else {
			l = this.ul(attrs);
		}
		if (items.constructor === Array) {
			for (; i< items.length; i++) {
				l.append(this.li(items[i]));
			}
		}
		return l;
	},
	
	list: function(items,attrs) {
		return this._list('ul', items, attrs);
	},
	
	menu: function(items,attrs) {
		var i=0, href, links = [], ats={};
		if (items.constructor === Array) {
			for (; i< items.length; i++) {
				ats={};
				if (items[i].attrs) {
					ats = items[i].attrs;
				}
				links.push(this.a(items[i].text, items[i].href, ats));
			}
		}
		return this._list('ul',links, attrs);
	},
	
	nav: function(items,attrs,listAttrs) {
		return this.element('nav',attrs).append(this.menu(items, listAttrs));
	},
	
	numList: function(items,attrs) {
		return this._list('ol', items, attrs).attr('type','1');
	},
	
	_addDItem: function(tagName, item) {
		var ats = {}, text = '';
		if (typeof item == 'string') {
			text = item;
		} else if (typeof item == 'object' && item.hasOwnProperty('text') ) {
			text = item.text;
			if (item.attrs) {
				atrs = item.attrs;
			}
		}
		return this.element(tagName, ats, text);
	},
	
	dl: function(items,attrs) {
		var el = this.element('dl', attrs), i = 0;
		if (items.constructor === Array) {
			for (; i< items.length; i++) {
				if (typeof items[i] == 'object') {
					if (items[i].hasOwnProperty('dt') ) {
						el.append( this._addDItem('dt',items[i].dt) );
					}
					if (items[i].hasOwnProperty('dd') ) {
						el.append( this._addDItem('dd',items[i].dd) );
					}
				}
			}
		}
		return el;
	},
	
	tcell: function(type,text,attrs) {
		switch (type) {
			case 'th': case 'h':
				type = 'th';
				break;
			default:
				type = 'td';
				break;
		}
		return this.element(type,attrs,text.toString());
	},
	
	_trs: function(tagName,rows,attrs,firstHead) {
		var t = this.element(tagName,attrs),i=0,subTagName = 'td', itemAttrs={},ats={},cell;
		if (rows.constructor === Array) {
			if (rows && rows.length) {
				for (; i< rows.length; i++) {
					if (typeof rows[i] == 'object') {
						subTagName = rows[i].type;
						cell = rows[i].text;
						if (rows[i].attrs) {
							ats = rows[i].attrs;
						}
					} else {
						cell = rows[i];
						switch (tagName) {
							case 'thead':
								subTagName = 'th';
								break;
							default:
								subTagName = (i==0 && firstHead===true)? 'th' : 'td';
								break;
						}
					}
					t.append(this.tcell(subTagName,cell,ats));
				}
			}
		}
		return t;
	},
	
	thead: function(items,attrs) {
		return this._trs('thead', items,attrs);
	},
	
	tr: function(items,attrs,firstHead) {
		return this._trs('tr', items,attrs,firstHead);
	},
	
	tbody: function(rows,attrs,opts) {
		opts = this._addOpts(opts,{firstHead:false,oddEven:false});
		var tb = this.element('tbody',attrs),i=0,r;
		if (rows && rows.length) {
			for (; i< rows.length; i++) {
				if (rows[i].constructor === Array) {
					r = this.tr(rows[i],{},opts.firstHead);
					if (opts.oddEven) {
						r.addClass(i%2==0? 'odd' : 'even');
					}
					tb.append(r);
				}
			}
		}
		return tb;
	},
	
	table: function(header, rows,attrs,opts) {
		opts = this._addOpts(opts,{firstHead:false,oddEven:false});
		var ta = this.element('table',attrs);
		if (header.constructor === Array) {
			ta.append(this.thead(header));
		}
		if (rows.constructor === Array) {
			ta.append(this.tbody(rows,{},opts));
		}
		return ta;
	},
	
	input: function(type,name,val,attrs) {
		if (typeof attrs != 'object') {
			attrs = {};
		}
		if (typeof type == 'string') {
			attrs.type = type;
		}
		if (typeof name == 'string') {
			attrs.name = name;
		}
		if (val) {
			attrs.value = val;
		}
		return this.element('input', attrs);
	},
	
	textfield: function(name,val,attrs) {
		return this.input("text",name,val,attrs);
	},

	checkbox: function(name,val,attrs) {
		return this.input("checkbox",name,val,attrs);
	},
	
	label: function(text,forId,attrs) {
		if (typeof attrs != 'object') {
			attrs = {};
		}
		attrs.for = forId;
		return this.element("label",attrs,text);
	},
	
	legend: function(text,attrs) {
		return this.element("legend",attrs,text);
	},
	
	checkboxLabel: function(contTag,name,val,text,attrs) {
		if (typeof contTag != 'string') {
			contTag = 'div';
		}
		if (typeof attrs != 'object') {
			attrs = {};
		}
		attrs.name = name;
		if (attrs.hasOwnProperty('id') == false) {
			attrs.id = attrs.name.sanitize('-');
		}
		var forId = attrs.id, outerAttrs = {};
		el = document.createElement(contTag).addClass(attrs.id + '-option');
		el.append(this.checkbox(name,val,attrs));
		el.append(this.label(text,forId));
		return el;
	},
	
	checkboxes: function(name,options,attrs,selVal,outerWrapper,innerWrapper) {
		if (typeof outerWrapper != 'string') {
			outerWrapper = 'div';
		}
		if (typeof innerWrapper != 'string') {
			innerWrapper = 'div';
		}
		var el = this.element(outerWrapper,attrs),opt,cName;
		if (typeof options == 'object' || options.constructor === Array) {
			for (k in options) {
				optText = '';
				if (typeof k == 'string' && typeof options[k] == 'string') {
					optVal = k;
					optText = options[k];
				} else if (typeof options[k] == 'object' && options[k].hasOwnProperty('val') ) {
					optVal = options[k].val;
					if (options[k].hasOwnProperty('text')) {
						optText = options[k].text;
					}
				}
				if (typeof optText == 'string' && optText.length>0) {
					cName = name + '['+optVal+']';
					opt = this.checkboxLabel(innerWrapper, cName, optVal,optText, optVal == selVal );
					el.append(opt);
				}
			}
		}
		return el;
	},
	
	checkboxesControl: function(name,label,options,attrs,selVal,outerWrapper,innerWrapper) {
		if (!outerWrapper) {
			outerWrapper = 'fieldset';
		}
		if (!innerWrapper) {
			innerWrapper = 'div';
		}
		var el = this.checkboxes(name,options,attrs,selVal,outerWrapper,innerWrapper);
		el.prepend(this.legend(label));
		return el;
	},
	
	radio: function(name,val,attrs) {
		return this.input("radio",name,val,attrs);
	},
	
	hidden: function(name,val,attrs) {
		return this.input("hidden",name,val,attrs);
	},
	
	textarea: function(name,val,attrs) {
		if (typeof attrs != 'object') {
			attrs = {};
		}
		if (typeof name == 'string') {
			attrs.name = name;
		}
		return this.element("textarea",attrs,val);
	},
	
	option: function(val,text,selected,attrs) {
		if (typeof attrs != 'object') {
			attrs = {};
		}
		if (selected === true || selected == "selected") {
			attrs.selected = 'selected';
		}
		if (typeof val != 'string') {
			val = '';
		}
		attrs.value = val;
		return this.element("option",attrs,text);
	},
	
	select: function(name,options,attrs,selVal) {
		if (typeof attrs != 'object') {
			attrs = {};
		}
		if (typeof name == 'string') {
			attrs.name = name;
		}
		var el = this.element("select",attrs),i=0,opt, optVal, optText;
		if (typeof options == 'object' || options.constructor === Array) {
			for (k in options) {
				optText = '';
				if (typeof k == 'string' && typeof options[k] == 'string') {
					optVal = k;
					optText = options[k];
				} else if (typeof options[k] == 'object' && options[k].hasOwnProperty('val') ) {
					optVal = options[k].val;
					if (options[k].hasOwnProperty('text')) {
						optText = options[k].text;
					}
				}
				if (typeof optText == 'string' && optText.length>0) {
					opt = this.option(optVal,optText, optVal == selVal );
					el.append(opt);
				}
			}
		}
		return el;
	},
	
	submit: function(name,text,attrs) {
		if (typeof attrs != 'object') {
			attrs = {};
		}
		return this.input('submit',name,text,attrs);
	},
	
	form: function(name,method,attrs) {
		if (typeof attrs != 'object') {
			attrs = {};
		}
		if (typeof name == 'string') {
			attrs.name = name;
		}
		switch (method) {
			case 'get':
				attrs.method = 'get';
				break;
			default:
				attrs.method = 'post';
				break;
		} 
		return this.element('form',attrs)
	},
	
	button: function(name,text,attrs) {
		if (typeof attrs != 'object') {
			attrs = {};
		}
		if (typeof name == 'string') {
			attrs.name = name;
		}
		return this.element('button',attrs,text);
	},
	
	addSheet: function(path,media) {
		attrs = {
			rel: 'stylesheet',
			media: media,
			href: path
		};
		document.head.append(this.element('link',attrs));
	},
	
	addMeta: function(name,val,property,attrs) {
		if (typeof attrs != 'object') {
			attrs = {};
		}
		attrs.name = name;
		if (typeof val == 'string') {
			attrs.content = val;
		}
		if (typeof property == 'string') {
			attrs.property = property;
		}
		var els = document.getElementsByName(name), el;
		if (els.length>0) {
			el = els.first();
		} else {
			el = this.element('meta',attrs)
			document.head.append(el);
		}
		return el;
	},
	
	setTitle: function(title) {
		document.title = title;
		return document;
	},
	
}