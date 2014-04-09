//# HTML5 Features
//## New Doctype
//Browsers that do not undertand this doctype, such as IE6 will simply render the contained markup in standards mode.
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    
<!DOCTYPE html>

//## Semantic `Header` and `Footer`
//No longer have to use divs with ids, which by nature are non-semantic. Now, with HTML5, we have access to the <header> and <footer> elements. The mark-up above can now be replaced with:
<header>
    ...
</header>
 
<footer>
    ...
</footer>

<articles /> ... <section />

//## Custom Data Attribute
//As long as we preface our custom attribute with "data," we can officially use this method.
//Especially useful for attaching important data to a DOM element for javascript usage. 
<div id="myDiv" data-custom-attr="My Value"> Bla Bla </div>

var theDiv = document.getElementById('myDiv');
var attr = theDiv.getAttribute('data-custom-attr'); 

//## Local Storage
//Useful for creating apps that can save state locally. Thanks to local storage (not officially HTML5, but grouped in for convenience's sake), we can make advanced browsers "remember" what we type, even after the browser is closed or is refreshed.
//<br/>Internet Explorer 8, Safari 4, and Firefox 3.5.
if(window.localStorage)

//##Video and Audio Support
//No longer do we have to rely upon third party plugins in order to render video and play audio. HTML5 now offers the `<audio>` and `<video>` element
//## Placeholders
//Before, we had to utilize a bit of JavaScript to create placeholders for textboxes. Sure, you can initially set the value attribute how you see fit, but, as soon as the user deletes that text and clicks away, 
//the input will be left blank again. The placeholder attribute remedies this.
<input name="email" type="email" placeholder="Placeholder text goes here" />

//## Content Editable
//The new browsers have a nifty new attribute that can be applied to elements, called contenteditable. As the name implies, this allows the user to edit any of the text contained within the element, including its children. <br/>
//There are a variety of uses for something like this, including an app as simple as a to-do list, which also takes advantage of local storage.
<!DOCTYPE html>
 
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>untitled</title>
</head>
<body>
    <h2> To-Do List </h2>
     <ul contenteditable="true">
        <li> Break mechanical cab driver. </li>
        <li> Drive to abandoned factory
        <li> Watch video of self </li>
     </ul>
</body>
</html>
//## Figure Element
//Currenlty there is no easy or semantic way to associate the caption, wrapped in a paragraph tag, with the image element itself.
//The `figure` element combined with the `figcaption` element can now semantically associate captions with their image counterparts.
<figure>
    <img src="path/to/image" alt="About image" />
    <figcaption>
        <p>This is an image of something interesting. </p>
    </figcaption>
</figure>

//##No More `Types` for Scripts and Links
//This is no longer necessary. It's implied that both of these tags refer to stylesheets and scripts, respectively. As such, we can remove the type attribute all together.
<link rel="stylesheet" href="path/to/stylesheet.css" />
<script src="path/to/script.js"></script>