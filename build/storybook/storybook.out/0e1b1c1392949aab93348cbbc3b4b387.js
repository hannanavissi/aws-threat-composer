ace.define("ace/snippets",["require","exports","module","ace/lib/dom","ace/lib/oop","ace/lib/event_emitter","ace/lib/lang","ace/range","ace/range_list","ace/keyboard/hash_handler","ace/tokenizer","ace/clipboard","ace/editor"],(function(require,exports,module){"use strict";var dom=require("./lib/dom"),oop=require("./lib/oop"),EventEmitter=require("./lib/event_emitter").EventEmitter,lang=require("./lib/lang"),Range=require("./range").Range,RangeList=require("./range_list").RangeList,HashHandler=require("./keyboard/hash_handler").HashHandler,Tokenizer=require("./tokenizer").Tokenizer,clipboard=require("./clipboard"),VARIABLES={CURRENT_WORD:function(editor){return editor.session.getTextRange(editor.session.getWordRange())},SELECTION:function(editor,name,indentation){var text=editor.session.getTextRange();return indentation?text.replace(/\n\r?([ \t]*\S)/g,"\n"+indentation+"$1"):text},CURRENT_LINE:function(editor){return editor.session.getLine(editor.getCursorPosition().row)},PREV_LINE:function(editor){return editor.session.getLine(editor.getCursorPosition().row-1)},LINE_INDEX:function(editor){return editor.getCursorPosition().row},LINE_NUMBER:function(editor){return editor.getCursorPosition().row+1},SOFT_TABS:function(editor){return editor.session.getUseSoftTabs()?"YES":"NO"},TAB_SIZE:function(editor){return editor.session.getTabSize()},CLIPBOARD:function(editor){return clipboard.getText&&clipboard.getText()},FILENAME:function(editor){return/[^/\\]*$/.exec(this.FILEPATH(editor))[0]},FILENAME_BASE:function(editor){return/[^/\\]*$/.exec(this.FILEPATH(editor))[0].replace(/\.[^.]*$/,"")},DIRECTORY:function(editor){return this.FILEPATH(editor).replace(/[^/\\]*$/,"")},FILEPATH:function(editor){return"/not implemented.txt"},WORKSPACE_NAME:function(){return"Unknown"},FULLNAME:function(){return"Unknown"},BLOCK_COMMENT_START:function(editor){var mode=editor.session.$mode||{};return mode.blockComment&&mode.blockComment.start||""},BLOCK_COMMENT_END:function(editor){var mode=editor.session.$mode||{};return mode.blockComment&&mode.blockComment.end||""},LINE_COMMENT:function(editor){return(editor.session.$mode||{}).lineCommentStart||""},CURRENT_YEAR:date.bind(null,{year:"numeric"}),CURRENT_YEAR_SHORT:date.bind(null,{year:"2-digit"}),CURRENT_MONTH:date.bind(null,{month:"numeric"}),CURRENT_MONTH_NAME:date.bind(null,{month:"long"}),CURRENT_MONTH_NAME_SHORT:date.bind(null,{month:"short"}),CURRENT_DATE:date.bind(null,{day:"2-digit"}),CURRENT_DAY_NAME:date.bind(null,{weekday:"long"}),CURRENT_DAY_NAME_SHORT:date.bind(null,{weekday:"short"}),CURRENT_HOUR:date.bind(null,{hour:"2-digit",hour12:!1}),CURRENT_MINUTE:date.bind(null,{minute:"2-digit"}),CURRENT_SECOND:date.bind(null,{second:"2-digit"})};function date(dateFormat){var str=(new Date).toLocaleString("en-us",dateFormat);return 1==str.length?"0"+str:str}VARIABLES.SELECTED_TEXT=VARIABLES.SELECTION;var SnippetManager=function(){function SnippetManager(){this.snippetMap={},this.snippetNameMap={},this.variables=VARIABLES}return SnippetManager.prototype.getTokenizer=function(){return SnippetManager.$tokenizer||this.createTokenizer()},SnippetManager.prototype.createTokenizer=function(){function TabstopToken(str){return str=str.substr(1),/^\d+$/.test(str)?[{tabstopId:parseInt(str,10)}]:[{text:str}]}function escape(ch){return"(?:[^\\\\"+ch+"]|\\\\.)"}var formatMatcher={regex:"/("+escape("/")+"+)/",onMatch:function(val,state,stack){var ts=stack[0];return ts.fmtString=!0,ts.guard=val.slice(1,-1),ts.flag="",""},next:"formatString"};return SnippetManager.$tokenizer=new Tokenizer({start:[{regex:/\\./,onMatch:function(val,state,stack){var ch=val[1];return("}"==ch&&stack.length||-1!="`$\\".indexOf(ch))&&(val=ch),[val]}},{regex:/}/,onMatch:function(val,state,stack){return[stack.length?stack.shift():val]}},{regex:/\$(?:\d+|\w+)/,onMatch:TabstopToken},{regex:/\$\{[\dA-Z_a-z]+/,onMatch:function(str,state,stack){var t=TabstopToken(str.substr(1));return stack.unshift(t[0]),t},next:"snippetVar"},{regex:/\n/,token:"newline",merge:!1}],snippetVar:[{regex:"\\|"+escape("\\|")+"*\\|",onMatch:function(val,state,stack){var choices=val.slice(1,-1).replace(/\\[,|\\]|,/g,(function(operator){return 2==operator.length?operator[1]:"\0"})).split("\0").map((function(value){return{value}}));return stack[0].choices=choices,[choices[0]]},next:"start"},formatMatcher,{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"start"}],formatString:[{regex:/:/,onMatch:function(val,state,stack){return stack.length&&stack[0].expectElse?(stack[0].expectElse=!1,stack[0].ifEnd={elseEnd:stack[0]},[stack[0].ifEnd]):":"}},{regex:/\\./,onMatch:function(val,state,stack){var ch=val[1];return"}"==ch&&stack.length||-1!="`$\\".indexOf(ch)?val=ch:"n"==ch?val="\n":"t"==ch?val="\t":-1!="ulULE".indexOf(ch)&&(val={changeCase:ch,local:ch>"a"}),[val]}},{regex:"/\\w*}",onMatch:function(val,state,stack){var next=stack.shift();return next&&(next.flag=val.slice(1,-1)),this.next=next&&next.tabstopId?"start":"",[next||val]},next:"start"},{regex:/\$(?:\d+|\w+)/,onMatch:function(val,state,stack){return[{text:val.slice(1)}]}},{regex:/\${\w+/,onMatch:function(val,state,stack){var token={text:val.slice(2)};return stack.unshift(token),[token]},next:"formatStringVar"},{regex:/\n/,token:"newline",merge:!1},{regex:/}/,onMatch:function(val,state,stack){var next=stack.shift();return this.next=next&&next.tabstopId?"start":"",[next||val]},next:"start"}],formatStringVar:[{regex:/:\/\w+}/,onMatch:function(val,state,stack){return stack[0].formatFunction=val.slice(2,-1),[stack.shift()]},next:"formatString"},formatMatcher,{regex:/:[\?\-+]?/,onMatch:function(val,state,stack){"+"==val[1]&&(stack[0].ifEnd=stack[0]),"?"==val[1]&&(stack[0].expectElse=!0)},next:"formatString"},{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"formatString"}]}),SnippetManager.$tokenizer},SnippetManager.prototype.tokenizeTmSnippet=function(str,startState){return this.getTokenizer().getLineTokens(str,startState).tokens.map((function(x){return x.value||x}))},SnippetManager.prototype.getVariableValue=function(editor,name,indentation){if(/^\d+$/.test(name))return(this.variables.__||{})[name]||"";if(/^[A-Z]\d+$/.test(name))return(this.variables[name[0]+"__"]||{})[name.substr(1)]||"";if(name=name.replace(/^TM_/,""),!this.variables.hasOwnProperty(name))return"";var value=this.variables[name];return"function"==typeof value&&(value=this.variables[name](editor,name,indentation)),null==value?"":value},SnippetManager.prototype.tmStrFormat=function(str,ch,editor){if(!ch.fmt)return str;var flag=ch.flag||"",re=ch.guard;re=new RegExp(re,flag.replace(/[^gim]/g,""));var fmtTokens="string"==typeof ch.fmt?this.tokenizeTmSnippet(ch.fmt,"formatString"):ch.fmt,_self=this,formatted=str.replace(re,(function(){var oldArgs=_self.variables.__;_self.variables.__=[].slice.call(arguments);for(var fmtParts=_self.resolveVariables(fmtTokens,editor),gChangeCase="E",i=0;i<fmtParts.length;i++){var ch=fmtParts[i];if("object"==typeof ch)if(fmtParts[i]="",ch.changeCase&&ch.local){var next=fmtParts[i+1];next&&"string"==typeof next&&("u"==ch.changeCase?fmtParts[i]=next[0].toUpperCase():fmtParts[i]=next[0].toLowerCase(),fmtParts[i+1]=next.substr(1))}else ch.changeCase&&(gChangeCase=ch.changeCase);else"U"==gChangeCase?fmtParts[i]=ch.toUpperCase():"L"==gChangeCase&&(fmtParts[i]=ch.toLowerCase())}return _self.variables.__=oldArgs,fmtParts.join("")}));return formatted},SnippetManager.prototype.tmFormatFunction=function(str,ch,editor){return"upcase"==ch.formatFunction?str.toUpperCase():"downcase"==ch.formatFunction?str.toLowerCase():str},SnippetManager.prototype.resolveVariables=function(snippet,editor){for(var result=[],indentation="",afterNewLine=!0,i=0;i<snippet.length;i++){var ch=snippet[i];if("string"!=typeof ch){if(ch){if(afterNewLine=!1,ch.fmtString){var j=snippet.indexOf(ch,i+1);-1==j&&(j=snippet.length),ch.fmt=snippet.slice(i+1,j),i=j}if(ch.text){var value=this.getVariableValue(editor,ch.text,indentation)+"";ch.fmtString&&(value=this.tmStrFormat(value,ch,editor)),ch.formatFunction&&(value=this.tmFormatFunction(value,ch,editor)),value&&!ch.ifEnd?(result.push(value),gotoNext(ch)):!value&&ch.ifEnd&&gotoNext(ch.ifEnd)}else ch.elseEnd?gotoNext(ch.elseEnd):(null!=ch.tabstopId||null!=ch.changeCase)&&result.push(ch)}}else result.push(ch),"\n"==ch?(afterNewLine=!0,indentation=""):afterNewLine&&(indentation=/^\t*/.exec(ch)[0],afterNewLine=/\S/.test(ch))}function gotoNext(ch){var i1=snippet.indexOf(ch,i+1);-1!=i1&&(i=i1)}return result},SnippetManager.prototype.getDisplayTextForSnippet=function(editor,snippetText){return processSnippetText.call(this,editor,snippetText).text},SnippetManager.prototype.insertSnippetForSelection=function(editor,snippetText,options){void 0===options&&(options={});var processedSnippet=processSnippetText.call(this,editor,snippetText,options),range=editor.getSelectionRange();options.range&&0===options.range.compareRange(range)&&(range=options.range);var end=editor.session.replace(range,processedSnippet.text),tabstopManager=new TabstopManager(editor),selectionId=editor.inVirtualSelectionMode&&editor.selection.index;tabstopManager.addTabstops(processedSnippet.tabstops,range.start,end,selectionId)},SnippetManager.prototype.insertSnippet=function(editor,snippetText,options){void 0===options&&(options={});var self=this;if(!options.range||options.range instanceof Range||(options.range=Range.fromPoints(options.range.start,options.range.end)),editor.inVirtualSelectionMode)return self.insertSnippetForSelection(editor,snippetText,options);editor.forEachSelection((function(){self.insertSnippetForSelection(editor,snippetText,options)}),null,{keepOrder:!0}),editor.tabstopManager&&editor.tabstopManager.tabNext()},SnippetManager.prototype.$getScope=function(editor){var scope=editor.session.$mode.$id||"";if("html"===(scope=scope.split("/").pop())||"php"===scope){"php"!==scope||editor.session.$mode.inlinePhp||(scope="html");var c=editor.getCursorPosition(),state=editor.session.getState(c.row);"object"==typeof state&&(state=state[0]),state.substring&&("js-"==state.substring(0,3)?scope="javascript":"css-"==state.substring(0,4)?scope="css":"php-"==state.substring(0,4)&&(scope="php"))}return scope},SnippetManager.prototype.getActiveScopes=function(editor){var scope=this.$getScope(editor),scopes=[scope],snippetMap=this.snippetMap;return snippetMap[scope]&&snippetMap[scope].includeScopes&&scopes.push.apply(scopes,snippetMap[scope].includeScopes),scopes.push("_"),scopes},SnippetManager.prototype.expandWithTab=function(editor,options){var self=this,result=editor.forEachSelection((function(){return self.expandSnippetForSelection(editor,options)}),null,{keepOrder:!0});return result&&editor.tabstopManager&&editor.tabstopManager.tabNext(),result},SnippetManager.prototype.expandSnippetForSelection=function(editor,options){var snippet,cursor=editor.getCursorPosition(),line=editor.session.getLine(cursor.row),before=line.substring(0,cursor.column),after=line.substr(cursor.column),snippetMap=this.snippetMap;return this.getActiveScopes(editor).some((function(scope){var snippets=snippetMap[scope];return snippets&&(snippet=this.findMatchingSnippet(snippets,before,after)),!!snippet}),this),!!snippet&&(options&&options.dryRun||(editor.session.doc.removeInLine(cursor.row,cursor.column-snippet.replaceBefore.length,cursor.column+snippet.replaceAfter.length),this.variables.M__=snippet.matchBefore,this.variables.T__=snippet.matchAfter,this.insertSnippetForSelection(editor,snippet.content),this.variables.M__=this.variables.T__=null),!0)},SnippetManager.prototype.findMatchingSnippet=function(snippetList,before,after){for(var i=snippetList.length;i--;){var s=snippetList[i];if((!s.startRe||s.startRe.test(before))&&((!s.endRe||s.endRe.test(after))&&(s.startRe||s.endRe)))return s.matchBefore=s.startRe?s.startRe.exec(before):[""],s.matchAfter=s.endRe?s.endRe.exec(after):[""],s.replaceBefore=s.triggerRe?s.triggerRe.exec(before)[0]:"",s.replaceAfter=s.endTriggerRe?s.endTriggerRe.exec(after)[0]:"",s}},SnippetManager.prototype.register=function(snippets,scope){var snippetMap=this.snippetMap,snippetNameMap=this.snippetNameMap,self=this;function wrapRegexp(src){return src&&!/^\^?\(.*\)\$?$|^\\b$/.test(src)&&(src="(?:"+src+")"),src||""}function guardedRegexp(re,guard,opening){return re=wrapRegexp(re),guard=wrapRegexp(guard),opening?(re=guard+re)&&"$"!=re[re.length-1]&&(re+="$"):(re+=guard)&&"^"!=re[0]&&(re="^"+re),new RegExp(re)}function addSnippet(s){s.scope||(s.scope=scope||"_"),scope=s.scope,snippetMap[scope]||(snippetMap[scope]=[],snippetNameMap[scope]={});var map=snippetNameMap[scope];if(s.name){var old=map[s.name];old&&self.unregister(old),map[s.name]=s}snippetMap[scope].push(s),s.prefix&&(s.tabTrigger=s.prefix),!s.content&&s.body&&(s.content=Array.isArray(s.body)?s.body.join("\n"):s.body),s.tabTrigger&&!s.trigger&&(!s.guard&&/^\w/.test(s.tabTrigger)&&(s.guard="\\b"),s.trigger=lang.escapeRegExp(s.tabTrigger)),(s.trigger||s.guard||s.endTrigger||s.endGuard)&&(s.startRe=guardedRegexp(s.trigger,s.guard,!0),s.triggerRe=new RegExp(s.trigger),s.endRe=guardedRegexp(s.endTrigger,s.endGuard,!0),s.endTriggerRe=new RegExp(s.endTrigger))}snippets||(snippets=[]),Array.isArray(snippets)?snippets.forEach(addSnippet):Object.keys(snippets).forEach((function(key){addSnippet(snippets[key])})),this._signal("registerSnippets",{scope})},SnippetManager.prototype.unregister=function(snippets,scope){var snippetMap=this.snippetMap,snippetNameMap=this.snippetNameMap;function removeSnippet(s){var nameMap=snippetNameMap[s.scope||scope];if(nameMap&&nameMap[s.name]){delete nameMap[s.name];var map=snippetMap[s.scope||scope],i=map&&map.indexOf(s);i>=0&&map.splice(i,1)}}snippets.content?removeSnippet(snippets):Array.isArray(snippets)&&snippets.forEach(removeSnippet)},SnippetManager.prototype.parseSnippetFile=function(str){str=str.replace(/\r/g,"");for(var m,list=[],snippet={},re=/^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm;m=re.exec(str);){if(m[1])try{snippet=JSON.parse(m[1]),list.push(snippet)}catch(e){}if(m[4])snippet.content=m[4].replace(/^\t/gm,""),list.push(snippet),snippet={};else{var key=m[2],val=m[3];if("regex"==key){var guardRe=/\/((?:[^\/\\]|\\.)*)|$/g;snippet.guard=guardRe.exec(val)[1],snippet.trigger=guardRe.exec(val)[1],snippet.endTrigger=guardRe.exec(val)[1],snippet.endGuard=guardRe.exec(val)[1]}else"snippet"==key?(snippet.tabTrigger=val.match(/^\S*/)[0],snippet.name||(snippet.name=val)):key&&(snippet[key]=val)}}return list},SnippetManager.prototype.getSnippetByName=function(name,editor){var snippet,snippetMap=this.snippetNameMap;return this.getActiveScopes(editor).some((function(scope){var snippets=snippetMap[scope];return snippets&&(snippet=snippets[name]),!!snippet}),this),snippet},SnippetManager}();oop.implement(SnippetManager.prototype,EventEmitter);var processSnippetText=function(editor,snippetText,options){void 0===options&&(options={});var cursor=editor.getCursorPosition(),line=editor.session.getLine(cursor.row),tabString=editor.session.getTabString(),indentString=line.match(/^\s*/)[0];cursor.column<indentString.length&&(indentString=indentString.slice(0,cursor.column)),snippetText=snippetText.replace(/\r/g,"");var tokens=this.tokenizeTmSnippet(snippetText);tokens=(tokens=this.resolveVariables(tokens,editor)).map((function(x){return"\n"!=x||options.excludeExtraIndent?"string"==typeof x?x.replace(/\t/g,tabString):x:x+indentString}));var tabstops=[];tokens.forEach((function(p,i){if("object"==typeof p){var id=p.tabstopId,ts=tabstops[id];if(ts||((ts=tabstops[id]=[]).index=id,ts.value="",ts.parents={}),-1===ts.indexOf(p)){p.choices&&!ts.choices&&(ts.choices=p.choices),ts.push(p);var i1=tokens.indexOf(p,i+1);if(-1!==i1){var value=tokens.slice(i+1,i1);value.some((function(t){return"object"==typeof t}))&&!ts.value?ts.value=value:!value.length||ts.value&&"string"==typeof ts.value||(ts.value=value.join(""))}}}})),tabstops.forEach((function(ts){ts.length=0}));var expanding={};function copyValue(val){for(var copy=[],i=0;i<val.length;i++){var p=val[i];if("object"==typeof p){if(expanding[p.tabstopId])continue;p=copy[val.lastIndexOf(p,i-1)]||{tabstopId:p.tabstopId}}copy[i]=p}return copy}for(var i=0;i<tokens.length;i++){var p=tokens[i];if("object"==typeof p){var id=p.tabstopId,ts=tabstops[id],i1=tokens.indexOf(p,i+1);if(expanding[id])expanding[id]===p&&(delete expanding[id],Object.keys(expanding).forEach((function(parentId){ts.parents[parentId]=!0})));else{expanding[id]=p;var value=ts.value;"string"!=typeof value?value=copyValue(value):p.fmt&&(value=this.tmStrFormat(value,p,editor)),tokens.splice.apply(tokens,[i+1,Math.max(0,i1-i)].concat(value,p)),-1===ts.indexOf(p)&&ts.push(p)}}}var row=0,column=0,text="";return tokens.forEach((function(t){if("string"==typeof t){var lines=t.split("\n");lines.length>1?(column=lines[lines.length-1].length,row+=lines.length-1):column+=t.length,text+=t}else t&&(t.start?t.end={row,column}:t.start={row,column})})),{text,tabstops,tokens}},TabstopManager=function(){function TabstopManager(editor){if(this.index=0,this.ranges=[],this.tabstops=[],editor.tabstopManager)return editor.tabstopManager;editor.tabstopManager=this,this.$onChange=this.onChange.bind(this),this.$onChangeSelection=lang.delayedCall(this.onChangeSelection.bind(this)).schedule,this.$onChangeSession=this.onChangeSession.bind(this),this.$onAfterExec=this.onAfterExec.bind(this),this.attach(editor)}return TabstopManager.prototype.attach=function(editor){this.$openTabstops=null,this.selectedTabstop=null,this.editor=editor,this.session=editor.session,this.editor.on("change",this.$onChange),this.editor.on("changeSelection",this.$onChangeSelection),this.editor.on("changeSession",this.$onChangeSession),this.editor.commands.on("afterExec",this.$onAfterExec),this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)},TabstopManager.prototype.detach=function(){this.tabstops.forEach(this.removeTabstopMarkers,this),this.ranges.length=0,this.tabstops.length=0,this.selectedTabstop=null,this.editor.off("change",this.$onChange),this.editor.off("changeSelection",this.$onChangeSelection),this.editor.off("changeSession",this.$onChangeSession),this.editor.commands.off("afterExec",this.$onAfterExec),this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.tabstopManager=null,this.session=null,this.editor=null},TabstopManager.prototype.onChange=function(delta){for(var isRemove="r"==delta.action[0],selectedTabstop=this.selectedTabstop||{},parents=selectedTabstop.parents||{},tabstops=this.tabstops.slice(),i=0;i<tabstops.length;i++){var ts=tabstops[i],active=ts==selectedTabstop||parents[ts.index];if(ts.rangeList.$bias=active?0:1,"remove"==delta.action&&ts!==selectedTabstop){var parentActive=ts.parents&&ts.parents[selectedTabstop.index],startIndex=ts.rangeList.pointIndex(delta.start,parentActive);startIndex=startIndex<0?-startIndex-1:startIndex+1;var endIndex=ts.rangeList.pointIndex(delta.end,parentActive);endIndex=endIndex<0?-endIndex-1:endIndex-1;for(var toRemove=ts.rangeList.ranges.slice(startIndex,endIndex),j=0;j<toRemove.length;j++)this.removeRange(toRemove[j])}ts.rangeList.$onChange(delta)}var session=this.session;this.$inChange||!isRemove||1!=session.getLength()||session.getValue()||this.detach()},TabstopManager.prototype.updateLinkedFields=function(){var ts=this.selectedTabstop;if(ts&&ts.hasLinkedRanges&&ts.firstNonLinked){this.$inChange=!0;for(var session=this.session,text=session.getTextRange(ts.firstNonLinked),i=0;i<ts.length;i++){var range=ts[i];if(range.linked){var original=range.original,fmt=exports.snippetManager.tmStrFormat(text,original,this.editor);session.replace(range,fmt)}}this.$inChange=!1}},TabstopManager.prototype.onAfterExec=function(e){e.command&&!e.command.readOnly&&this.updateLinkedFields()},TabstopManager.prototype.onChangeSelection=function(){if(this.editor){for(var lead=this.editor.selection.lead,anchor=this.editor.selection.anchor,isEmpty=this.editor.selection.isEmpty(),i=0;i<this.ranges.length;i++)if(!this.ranges[i].linked){var containsLead=this.ranges[i].contains(lead.row,lead.column),containsAnchor=isEmpty||this.ranges[i].contains(anchor.row,anchor.column);if(containsLead&&containsAnchor)return}this.detach()}},TabstopManager.prototype.onChangeSession=function(){this.detach()},TabstopManager.prototype.tabNext=function(dir){var max=this.tabstops.length,index=this.index+(dir||1);(index=Math.min(Math.max(index,1),max))==max&&(index=0),this.selectTabstop(index),0===index&&this.detach()},TabstopManager.prototype.selectTabstop=function(index){this.$openTabstops=null;var ts=this.tabstops[this.index];if(ts&&this.addTabstopMarkers(ts),this.index=index,(ts=this.tabstops[this.index])&&ts.length){this.selectedTabstop=ts;var range=ts.firstNonLinked||ts;if(ts.choices&&(range.cursor=range.start),this.editor.inVirtualSelectionMode)this.editor.selection.fromOrientedRange(range);else{var sel=this.editor.multiSelect;sel.toSingleRange(range);for(var i=0;i<ts.length;i++)ts.hasLinkedRanges&&ts[i].linked||sel.addRange(ts[i].clone(),!0)}this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler),this.selectedTabstop&&this.selectedTabstop.choices&&this.editor.execCommand("startAutocomplete",{matches:this.selectedTabstop.choices})}},TabstopManager.prototype.addTabstops=function(tabstops,start,end){var useLink=this.useLink||!this.editor.getOption("enableMultiselect");if(this.$openTabstops||(this.$openTabstops=[]),!tabstops[0]){var p=Range.fromPoints(end,end);moveRelative(p.start,start),moveRelative(p.end,start),tabstops[0]=[p],tabstops[0].index=0}var arg=[this.index+1,0],ranges=this.ranges;tabstops.forEach((function(ts,index){for(var dest=this.$openTabstops[index]||ts,i=0;i<ts.length;i++){var p=ts[i],range=Range.fromPoints(p.start,p.end||p.start);movePoint(range.start,start),movePoint(range.end,start),range.original=p,range.tabstop=dest,ranges.push(range),dest!=ts?dest.unshift(range):dest[i]=range,p.fmtString||dest.firstNonLinked&&useLink?(range.linked=!0,dest.hasLinkedRanges=!0):dest.firstNonLinked||(dest.firstNonLinked=range)}dest.firstNonLinked||(dest.hasLinkedRanges=!1),dest===ts&&(arg.push(dest),this.$openTabstops[index]=dest),this.addTabstopMarkers(dest),dest.rangeList=dest.rangeList||new RangeList,dest.rangeList.$bias=0,dest.rangeList.addList(dest)}),this),arg.length>2&&(this.tabstops.length&&arg.push(arg.splice(2,1)[0]),this.tabstops.splice.apply(this.tabstops,arg))},TabstopManager.prototype.addTabstopMarkers=function(ts){var session=this.session;ts.forEach((function(range){range.markerId||(range.markerId=session.addMarker(range,"ace_snippet-marker","text"))}))},TabstopManager.prototype.removeTabstopMarkers=function(ts){var session=this.session;ts.forEach((function(range){session.removeMarker(range.markerId),range.markerId=null}))},TabstopManager.prototype.removeRange=function(range){var i=range.tabstop.indexOf(range);-1!=i&&range.tabstop.splice(i,1),-1!=(i=this.ranges.indexOf(range))&&this.ranges.splice(i,1),-1!=(i=range.tabstop.rangeList.ranges.indexOf(range))&&range.tabstop.splice(i,1),this.session.removeMarker(range.markerId),range.tabstop.length||(-1!=(i=this.tabstops.indexOf(range.tabstop))&&this.tabstops.splice(i,1),this.tabstops.length||this.detach())},TabstopManager}();TabstopManager.prototype.keyboardHandler=new HashHandler,TabstopManager.prototype.keyboardHandler.bindKeys({Tab:function(editor){exports.snippetManager&&exports.snippetManager.expandWithTab(editor)||(editor.tabstopManager.tabNext(1),editor.renderer.scrollCursorIntoView())},"Shift-Tab":function(editor){editor.tabstopManager.tabNext(-1),editor.renderer.scrollCursorIntoView()},Esc:function(editor){editor.tabstopManager.detach()}});var movePoint=function(point,diff){0==point.row&&(point.column+=diff.column),point.row+=diff.row},moveRelative=function(point,start){point.row==start.row&&(point.column-=start.column),point.row-=start.row};dom.importCssString("\n.ace_snippet-marker {\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    background: rgba(194, 193, 208, 0.09);\n    border: 1px dotted rgba(211, 208, 235, 0.62);\n    position: absolute;\n}","snippets.css",!1),exports.snippetManager=new SnippetManager;var Editor=require("./editor").Editor;(function(){this.insertSnippet=function(content,options){return exports.snippetManager.insertSnippet(this,content,options)},this.expandSnippet=function(options){return exports.snippetManager.expandWithTab(this,options)}}).call(Editor.prototype)})),ace.define("ace/ext/emmet",["require","exports","module","ace/keyboard/hash_handler","ace/editor","ace/snippets","ace/range","ace/config","resources","resources","tabStops","resources","utils","actions"],(function(require,exports,module){"use strict";var emmet,emmetPath,HashHandler=require("../keyboard/hash_handler").HashHandler,Editor=require("../editor").Editor,snippetManager=require("../snippets").snippetManager,Range=require("../range").Range,config=require("../config"),AceEmmetEditor=function(){function AceEmmetEditor(){}return AceEmmetEditor.prototype.setupContext=function(editor){this.ace=editor,this.indentation=editor.session.getTabString(),emmet||(emmet=window.emmet),(emmet.resources||emmet.require("resources")).setVariable("indentation",this.indentation),this.$syntax=null,this.$syntax=this.getSyntax()},AceEmmetEditor.prototype.getSelectionRange=function(){var range=this.ace.getSelectionRange(),doc=this.ace.session.doc;return{start:doc.positionToIndex(range.start),end:doc.positionToIndex(range.end)}},AceEmmetEditor.prototype.createSelection=function(start,end){var doc=this.ace.session.doc;this.ace.selection.setRange({start:doc.indexToPosition(start),end:doc.indexToPosition(end)})},AceEmmetEditor.prototype.getCurrentLineRange=function(){var ace=this.ace,row=ace.getCursorPosition().row,lineLength=ace.session.getLine(row).length,index=ace.session.doc.positionToIndex({row,column:0});return{start:index,end:index+lineLength}},AceEmmetEditor.prototype.getCaretPos=function(){var pos=this.ace.getCursorPosition();return this.ace.session.doc.positionToIndex(pos)},AceEmmetEditor.prototype.setCaretPos=function(index){var pos=this.ace.session.doc.indexToPosition(index);this.ace.selection.moveToPosition(pos)},AceEmmetEditor.prototype.getCurrentLine=function(){var row=this.ace.getCursorPosition().row;return this.ace.session.getLine(row)},AceEmmetEditor.prototype.replaceContent=function(value,start,end,noIndent){null==end&&(end=null==start?this.getContent().length:start),null==start&&(start=0);var editor=this.ace,doc=editor.session.doc,range=Range.fromPoints(doc.indexToPosition(start),doc.indexToPosition(end));editor.session.remove(range),range.end=range.start,value=this.$updateTabstops(value),snippetManager.insertSnippet(editor,value)},AceEmmetEditor.prototype.getContent=function(){return this.ace.getValue()},AceEmmetEditor.prototype.getSyntax=function(){if(this.$syntax)return this.$syntax;var syntax=this.ace.session.$modeId.split("/").pop();if("html"==syntax||"php"==syntax){var cursor=this.ace.getCursorPosition(),state=this.ace.session.getState(cursor.row);"string"!=typeof state&&(state=state[0]),state&&((state=state.split("-")).length>1?syntax=state[0]:"php"==syntax&&(syntax="html"))}return syntax},AceEmmetEditor.prototype.getProfileName=function(){var resources=emmet.resources||emmet.require("resources");switch(this.getSyntax()){case"css":return"css";case"xml":case"xsl":return"xml";case"html":var profile=resources.getVariable("profile");return profile||(profile=-1!=this.ace.session.getLines(0,2).join("").search(/<!DOCTYPE[^>]+XHTML/i)?"xhtml":"html"),profile;default:var mode=this.ace.session.$mode;return mode.emmetConfig&&mode.emmetConfig.profile||"xhtml"}},AceEmmetEditor.prototype.prompt=function(title){return prompt(title)},AceEmmetEditor.prototype.getSelection=function(){return this.ace.session.getTextRange()},AceEmmetEditor.prototype.getFilePath=function(){return""},AceEmmetEditor.prototype.$updateTabstops=function(value){var zeroBase=0,lastZero=null,ts=emmet.tabStops||emmet.require("tabStops"),settings=(emmet.resources||emmet.require("resources")).getVocabulary("user"),tabstopOptions={tabstop:function(data){var group=parseInt(data.group,10),isZero=0===group;isZero?group=++zeroBase:group+=1e3;var placeholder=data.placeholder;placeholder&&(placeholder=ts.processText(placeholder,tabstopOptions));var result="${"+group+(placeholder?":"+placeholder:"")+"}";return isZero&&(lastZero=[data.start,result]),result},escape:function(ch){return"$"==ch?"\\$":"\\"==ch?"\\\\":ch}};if(value=ts.processText(value,tabstopOptions),settings.variables.insert_final_tabstop&&!/\$\{0\}$/.test(value))value+="${0}";else if(lastZero){value=(emmet.utils?emmet.utils.common:emmet.require("utils")).replaceSubstring(value,"${0}",lastZero[0],lastZero[1])}return value},AceEmmetEditor}(),keymap={expand_abbreviation:{mac:"ctrl+alt+e",win:"alt+e"},match_pair_outward:{mac:"ctrl+d",win:"ctrl+,"},match_pair_inward:{mac:"ctrl+j",win:"ctrl+shift+0"},matching_pair:{mac:"ctrl+alt+j",win:"alt+j"},next_edit_point:"alt+right",prev_edit_point:"alt+left",toggle_comment:{mac:"command+/",win:"ctrl+/"},split_join_tag:{mac:"shift+command+'",win:"shift+ctrl+`"},remove_tag:{mac:"command+'",win:"shift+ctrl+;"},evaluate_math_expression:{mac:"shift+command+y",win:"shift+ctrl+y"},increment_number_by_1:"ctrl+up",decrement_number_by_1:"ctrl+down",increment_number_by_01:"alt+up",decrement_number_by_01:"alt+down",increment_number_by_10:{mac:"alt+command+up",win:"shift+alt+up"},decrement_number_by_10:{mac:"alt+command+down",win:"shift+alt+down"},select_next_item:{mac:"shift+command+.",win:"shift+ctrl+."},select_previous_item:{mac:"shift+command+,",win:"shift+ctrl+,"},reflect_css_value:{mac:"shift+command+r",win:"shift+ctrl+r"},encode_decode_data_url:{mac:"shift+ctrl+d",win:"ctrl+'"},expand_abbreviation_with_tab:"Tab",wrap_with_abbreviation:{mac:"shift+ctrl+a",win:"shift+ctrl+a"}},editorProxy=new AceEmmetEditor;for(var command in exports.commands=new HashHandler,exports.runEmmetCommand=function runEmmetCommand(editor){if("expand_abbreviation_with_tab"==this.action){if(!editor.selection.isEmpty())return!1;var pos=editor.selection.lead,token=editor.session.getTokenAt(pos.row,pos.column);if(token&&/\btag\b/.test(token.type))return!1}try{editorProxy.setupContext(editor);var actions=emmet.actions||emmet.require("actions");if("wrap_with_abbreviation"==this.action)return setTimeout((function(){actions.run("wrap_with_abbreviation",editorProxy)}),0);var result=actions.run(this.action,editorProxy)}catch(e){if(!emmet){var loading=exports.load(runEmmetCommand.bind(this,editor));return"expand_abbreviation_with_tab"!=this.action&&loading}editor._signal("changeStatus","string"==typeof e?e:e.message),config.warn(e),result=!1}return result},keymap)exports.commands.addCommand({name:"emmet:"+command,action:command,bindKey:keymap[command],exec:exports.runEmmetCommand,multiSelectAction:"forEach"});exports.updateCommands=function(editor,enabled){enabled?editor.keyBinding.addKeyboardHandler(exports.commands):editor.keyBinding.removeKeyboardHandler(exports.commands)},exports.isSupportedMode=function(mode){if(!mode)return!1;if(mode.emmetConfig)return!0;var id=mode.$id||mode;return/css|less|scss|sass|stylus|html|php|twig|ejs|handlebars/.test(id)},exports.isAvailable=function(editor,command){if(/(evaluate_math_expression|expand_abbreviation)$/.test(command))return!0;var mode=editor.session.$mode,isSupported=exports.isSupportedMode(mode);if(isSupported&&mode.$modes)try{editorProxy.setupContext(editor),/js|php/.test(editorProxy.getSyntax())&&(isSupported=!1)}catch(e){}return isSupported};var onChangeMode=function(e,target){var editor=target;if(editor){var enabled=exports.isSupportedMode(editor.session.$mode);!1===e.enableEmmet&&(enabled=!1),enabled&&exports.load(),exports.updateCommands(editor,enabled)}};exports.load=function(cb){return"string"!=typeof emmetPath?(config.warn("script for emmet-core is not loaded"),!1):(config.loadModule(emmetPath,(function(){emmetPath=null,cb&&cb()})),!0)},exports.AceEmmetEditor=AceEmmetEditor,config.defineOptions(Editor.prototype,"editor",{enableEmmet:{set:function(val){this[val?"on":"removeListener"]("changeMode",onChangeMode),onChangeMode({enableEmmet:!!val},this)},value:!0}}),exports.setCore=function(e){"string"==typeof e?emmetPath=e:emmet=e}})),ace.require(["ace/ext/emmet"],(function(m){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=m)}));