ace.define("ace/ext/spellcheck",["require","exports","module","ace/lib/event","ace/editor","ace/config"],(function(require,exports,module){"use strict";var event=require("../lib/event");exports.contextMenuHandler=function(e){var host=e.target,text=host.textInput.getElement();if(host.selection.isEmpty()){var c=host.getCursorPosition(),r=host.session.getWordRange(c.row,c.column),w=host.session.getTextRange(r);if(host.session.tokenRe.lastIndex=0,host.session.tokenRe.test(w)){var value=w+" ";text.value=value,text.setSelectionRange(w.length,w.length+1),text.setSelectionRange(0,0),text.setSelectionRange(0,w.length);var afterKeydown=!1;event.addListener(text,"keydown",(function onKeydown(){event.removeListener(text,"keydown",onKeydown),afterKeydown=!0})),host.textInput.setInputHandler((function(newVal){if(newVal==value)return"";if(0===newVal.lastIndexOf(value,0))return newVal.slice(value.length);if(newVal.substr(text.selectionEnd)==value)return newVal.slice(0,-value.length);if(""==newVal.slice(-2)){var val=newVal.slice(0,-2);if(" "==val.slice(-1))return afterKeydown?val.substring(0,text.selectionEnd):(val=val.slice(0,-1),host.session.replace(r,val),"")}return newVal}))}}};var Editor=require("../editor").Editor;require("../config").defineOptions(Editor.prototype,"editor",{spellcheck:{set:function(val){this.textInput.getElement().spellcheck=!!val,val?this.on("nativecontextmenu",exports.contextMenuHandler):this.removeListener("nativecontextmenu",exports.contextMenuHandler)},value:!0}})})),ace.require(["ace/ext/spellcheck"],(function(m){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=m)}));