# Booth
## Introduction
Booth is a simple library for creating slide objects that can work off the screen.

* [Demo](https://ndex30.github.io/projects/booth/)

## Markup
### Assign class to content area to be shifted
```html
<div id="content-wrap" class="booth-content">
  <h1>Main Content</h1>
</div>
```
### Create slide area element
```HTML
<div id="left-menu-wrap" class="booth-menu booth-menu-left">
  <nav class="menu">
    <ul>
      <li class="nav-link"><a href="#">Menu Item</a></li>
    </ul>
  </nav>
  <button id="left-close-button" class="booth-close-button">Close Menu</button>
</div>
```
### Create action element
```HTML
<button id="left-menu-button" class="menu-button booth-menu-button" data-booth-options="{location: left,contentid: content-wrap, closebtnid: left-close-button, menuwrapid: left-menu-wrap}">LEFT</button>
```
