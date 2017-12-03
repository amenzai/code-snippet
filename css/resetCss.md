css reset 

## 来自网易
```css
html,
body,
h1,
h2,
h3,
h4,
h5,
h6,
div,
dl,
dt,
dd,
ul,
ol,
li,
p,
blockquote,
pre,
hr,
figure,
table,
caption,
th,
td,
form,
fieldset,
legend,
input,
button,
textarea,
menu {
  margin: 0;
  padding: 0;
}

header,
footer,
section,
article,
aside,
nav,
hgroup,
address,
figure,
figcaption,
menu,
details {
  display: block;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

caption,
th {
  text-align: left;
  font-weight: normal;
}

html,
body,
fieldset,
img,
iframe,
abbr {
  border: 0;
}

i,
cite,
em,
var,
address,
dfn {
  font-style: normal;
}

[hidefocus],
summary {
  outline: 0;
}

li {
  list-style: none;
}

h1,
h2,
h3,
h4,
h5,
h6,
small {
  font-size: 100%;
}

sup,
sub {
  font-size: 83%;
}

pre,
code,
kbd,
samp {
  font-family: inherit;
}

q:before,
q:after {
  content: none;
}

textarea {
  overflow: auto;
  resize: none;
}

label,
summary {
  cursor: default;
}

a,
button {
  cursor: pointer;
}

h1,
h2,
h3,
h4,
h5,
h6,
em,
strong,
b {
  font-weight: normal;
}

del,
ins,
u,
s,
a,
a:hover {
  text-decoration: none;
}

body,
textarea,
input,
button,
select,
keygen,
legend {
  font: 12px/1.14 arial, simsun;
  color: #333;
  outline: 0;
}

body {
  background: #fff;
}

a,
a:hover {
  color: #333;
}
```

## 淘宝
```css
body,dl,dd,ul,ol,h1,h2,h3,h4,h5,h6,pre,form,input,textarea,p,hr,thead,tbody,tfoot,th,td{margin:0;padding:0;}
ul,ol{list-style:none;}
a{text-decoration:none;}
html{-ms-text-size-adjust:none;-webkit-text-size-adjust:none;text-size-adjust:none;}
body{line-height:1.5; font-size:14px;}
body,button,input,select,textarea{font-family:'helvetica neue',tahoma,'hiragino sans gb',stheiti,'wenquanyi micro hei',\5FAE\8F6F\96C5\9ED1,\5B8B\4F53,sans-serif;}
b,strong{font-weight:bold;}
i,em{font-style:normal;}
table{border-collapse:collapse;border-spacing:0;}
table th,table td{border:1px solid #ddd;padding:5px;}
table th{font-weight:inherit;border-bottom-width:2px;border-bottom-color:#ccc;}
img{border:0 none;width:auto\9;max-width:100%;vertical-align:top; height:auto;}
button,input,select,textarea{font-family:inherit;font-size:100%;margin:0;vertical-align:baseline;}
button,html input[type="button"],input[type="reset"],input[type="submit"]{-webkit-appearance:button;cursor:pointer;}
button[disabled],input[disabled]{cursor:default;}
input[type="checkbox"],input[type="radio"]{box-sizing:border-box;padding:0;}
input[type="search"]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
input[type="search"]::-webkit-search-decoration{-webkit-appearance:none;}
input:focus{outline:none;}
select[size],select[multiple],select[size][multiple]{border:1px solid #AAA;padding:0;}
article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,summary{display:block;}
audio,canvas,video,progress{display:inline-block;}
body{background:#fff;}
input::-webkit-input-speech-button {display: none}
button,input,textarea{
-webkit-tap-highlight-color: rgba(0,0,0,0);
}
```

## 我的
```css 
html {
  font-family: sans-serif;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}
body,
div,
span,
h1,
h2,
h3,
h4,
h5,
h6,
p,
a,
dl,
dt,
dd,
ul,
li,
blockquote,
form,
tbody,
tfoot,
thead,
article,
aside,
dialog,
figure,
footer,
header,
hgroup,
nav,
section {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
}
article,
aside,
details,
figcaption,
figure,
dialog,
footer,
header,
hgroup,
main,
menu,
nav,
summary,
section {
  display: block;
}
html {
  font-size: 10px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
img {
  border: 0;
  vertical-align: bottom;
}
ul {
  list-style: none;
}
a:active,
a:hover {
  outline: 0;
}
a {
  color: #333;
  text-decoration: none;
  background: transparent;
  -webkit-text-decoration-skip: objects;
}
a:focus {
  outline: thin dotted;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}
::-webkit-input-placeholder {
  color: #999;
}
:-moz-placeholder {
  color: #999;
}
::-moz-placeholder {
  color: #999;
}
:-ms-input-placeholder {
  color: #ccc;
}
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
button::-moz-focus-inner,
input::-moz-focus-inner {
  padding: 0;
  border: 0;
}
textarea {
  overflow: auto;
  resize: vertical;
}
input:focus,
textarea:focus,
button:focus,
select:focus {
  outline: none;
}
input::-ms-clear {
  display: none;
}
audio,
canvas,
progress,
video {
  display: inline-block;
  vertical-align: baseline;
}
audio:not([controls]) {
  display: none;
  height: 0;
}
[hidden],
template {
  display: none;
}
abbr[title] {
  border-bottom: 1px dotted;
}
b,
strong {
  font-weight: bold;
}
mark {
  color: #000;
  background: #ff0;
}
small {
  font-size: 80%;
}
sub,
sup {
  position: relative;
  font-size: 75%;
  line-height: 0;
  vertical-align: baseline;
}
sup {
  top: -0.5em;
}
sub {
  bottom: -0.25em;
}
svg:not(:root) {
  overflow: hidden;
}
figure {
  margin: 1em 40px;
}
hr {
  height: 0;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}
pre {
  overflow: auto;
}
code,
kbd,
pre,
samp {
  font-family: monospace, monospace;
  font-size: 1em;
}
button,
input,
optgroup,
select,
textarea {
  margin: 0;
  font: inherit;
}
button {
  overflow: visible;
}
button,
select {
  text-transform: none;
}
button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
  -webkit-appearance: button;
  cursor: pointer;
}
button[disabled],
html input[disabled] {
  cursor: default;
}
button::-moz-focus-inner,
input::-moz-focus-inner {
  padding: 0;
  border: 0;
}
input {
  line-height: normal;
}
input[type="checkbox"],
input[type="radio"] {
  box-sizing: border-box;
  padding: 0;
}
input[type="number"]::-webkit-inner-spin-btn,
input[type="number"]::-webkit-outer-spin-btn {
  height: auto;
}
input[type="search"] {
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  -webkit-appearance: textfield;
}
input[type="search"]::-webkit-search-cancel-btn,
input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}
fieldset {
  padding: .35em .625em .75em;
  margin: 0 2px;
  border: 1px solid #c0c0c0;
}
legend {
  padding: 0;
  border: 0;
}
optgroup {
  font-weight: bold;
}
table {
  border-spacing: 0;
  border-collapse: collapse;
}
td,
th {
  padding: 0;
}
```