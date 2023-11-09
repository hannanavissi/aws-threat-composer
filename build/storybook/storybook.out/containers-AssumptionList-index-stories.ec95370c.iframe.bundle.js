"use strict";(self.webpackChunkthreat_composer=self.webpackChunkthreat_composer||[]).push([[2322],{"./src/containers/AssumptionList/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var react=__webpack_require__("../../node_modules/react/index.js"),components_button=__webpack_require__("../../node_modules/@cloudscape-design/components/button/index.js"),container=__webpack_require__("../../node_modules/@cloudscape-design/components/container/index.js"),grid=__webpack_require__("../../node_modules/@cloudscape-design/components/grid/index.js"),header=__webpack_require__("../../node_modules/@cloudscape-design/components/header/index.js"),space_between=__webpack_require__("../../node_modules/@cloudscape-design/components/space-between/index.js"),text_filter=__webpack_require__("../../node_modules/@cloudscape-design/components/text-filter/index.js"),contexts=__webpack_require__("./src/contexts/index.ts"),context=__webpack_require__("./src/contexts/AssumptionsContext/context.ts"),entityTag=__webpack_require__("./src/utils/entityTag/index.tsx"),LinkedEntityFilter=__webpack_require__("./src/components/generic/LinkedEntityFilter/index.tsx"),TagSelector=__webpack_require__("./src/components/generic/TagSelector/index.tsx"),column_layout=__webpack_require__("../../node_modules/@cloudscape-design/components/column-layout/index.js"),text_content=__webpack_require__("../../node_modules/@cloudscape-design/components/text-content/index.js"),customTypes=__webpack_require__("./src/customTypes/index.ts"),useEditMetadata=__webpack_require__("./src/hooks/useEditMetadata/index.ts"),CopyToClipboard=__webpack_require__("./src/components/generic/CopyToClipboard/index.tsx"),EntityMetadataEditor=__webpack_require__("./src/components/generic/EntityMetadataEditor/index.tsx"),GenericCard=__webpack_require__("./src/components/generic/GenericCard/index.tsx"),Textarea=__webpack_require__("./src/components/generic/Textarea/index.tsx"),AssumptionLinksContext_context=__webpack_require__("./src/contexts/AssumptionLinksContext/context.ts"),MitigationsContext_context=__webpack_require__("./src/contexts/MitigationsContext/context.ts"),MitigationLinkView=__webpack_require__("./src/components/mitigations/MitigationLinkView/index.tsx"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const AssumptionThreatLinkComponent=({assumptionId})=>{const{mitigationList,saveMitigation}=(0,MitigationsContext_context.I)(),[assumptionLinks,setAssumptionLinks]=(0,react.useState)([]),{getAssumptionEntityLinks}=(0,AssumptionLinksContext_context._)();(0,react.useEffect)((()=>{const _assumptionLinks=getAssumptionEntityLinks(assumptionId,"Mitigation");setAssumptionLinks(_assumptionLinks||[])}),[getAssumptionEntityLinks,assumptionId]);const{addAssumptionLink,removeAssumptionLink}=(0,AssumptionLinksContext_context._)(),handleAddMitigationLink=(0,react.useCallback)((mitigationIdOrNewMitigation=>{if(mitigationList.find((m=>m.id===mitigationIdOrNewMitigation)))addAssumptionLink({linkedId:mitigationIdOrNewMitigation,assumptionId,type:"Mitigation"});else{const newMitigation=saveMitigation({numericId:-1,content:mitigationIdOrNewMitigation,id:"new"});addAssumptionLink({type:"Mitigation",linkedId:newMitigation.id,assumptionId})}}),[assumptionId,mitigationList,addAssumptionLink,saveMitigation]);return(0,jsx_runtime.jsx)(MitigationLinkView.Z,{mitigationList,linkedMitigationIds:assumptionLinks.map((ml=>ml.linkedId)),onAddMitigationLink:handleAddMitigationLink,onRemoveMitigationLink:mitigationId=>removeAssumptionLink(assumptionId,mitigationId)})};AssumptionThreatLinkComponent.displayName="AssumptionThreatLinkComponent";const assumptions_AssumptionMitigationLink=AssumptionThreatLinkComponent;try{AssumptionMitigationLink.displayName="AssumptionMitigationLink",AssumptionMitigationLink.__docgenInfo={description:"",displayName:"AssumptionMitigationLink",props:{assumptionId:{defaultValue:null,description:"",name:"assumptionId",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/assumptions/AssumptionMitigationLink/index.tsx#AssumptionMitigationLink"]={docgenInfo:AssumptionMitigationLink.__docgenInfo,name:"AssumptionMitigationLink",path:"src/components/assumptions/AssumptionMitigationLink/index.tsx#AssumptionMitigationLink"})}catch(__react_docgen_typescript_loader_error){}var ThreatsContext_context=__webpack_require__("./src/contexts/ThreatsContext/context.ts"),ThreatLinkView=__webpack_require__("./src/components/threats/ThreatLinkView/index.tsx");const AssumptionThreatLink_AssumptionThreatLinkComponent=({assumptionId})=>{const{statementList}=(0,ThreatsContext_context.a)(),[assumptionLinks,setAssumptionLinks]=(0,react.useState)([]),{getAssumptionEntityLinks}=(0,AssumptionLinksContext_context._)();(0,react.useEffect)((()=>{const _assumptionLinks=getAssumptionEntityLinks(assumptionId,"Threat");setAssumptionLinks(_assumptionLinks||[])}),[getAssumptionEntityLinks,assumptionId]);const{addAssumptionLink,removeAssumptionLink}=(0,AssumptionLinksContext_context._)();return(0,jsx_runtime.jsx)(ThreatLinkView.Z,{threatList:statementList,linkedThreatIds:assumptionLinks.map((ml=>ml.linkedId)),onAddThreatLink:threatId=>addAssumptionLink({linkedId:threatId,assumptionId,type:"Threat"}),onRemoveThreatLink:threatId=>removeAssumptionLink(assumptionId,threatId)})};AssumptionThreatLink_AssumptionThreatLinkComponent.displayName="AssumptionThreatLinkComponent";const assumptions_AssumptionThreatLink=AssumptionThreatLink_AssumptionThreatLinkComponent;try{AssumptionThreatLink.displayName="AssumptionThreatLink",AssumptionThreatLink.__docgenInfo={description:"",displayName:"AssumptionThreatLink",props:{assumptionId:{defaultValue:null,description:"",name:"assumptionId",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/assumptions/AssumptionThreatLink/index.tsx#AssumptionThreatLink"]={docgenInfo:AssumptionThreatLink.__docgenInfo,name:"AssumptionThreatLink",path:"src/components/assumptions/AssumptionThreatLink/index.tsx#AssumptionThreatLink"})}catch(__react_docgen_typescript_loader_error){}const AssumptionCard=({assumption,onCopy,onRemove,onEdit,onAddTagToAssumption,onRemoveTagFromAssumption})=>{const[editingMode,setEditingMode]=(0,react.useState)(!1),[editingValue,setEditingValue]=(0,react.useState)(assumption.content),handleSave=(0,react.useCallback)((()=>{const updated={...assumption,content:editingValue};onEdit?.(updated),setEditingMode(!1)}),[editingValue,assumption,onEdit]),handleCancel=(0,react.useCallback)((()=>{setEditingValue(assumption.content),setEditingMode(!1)}),[assumption]),handleMetadataEdit=(0,useEditMetadata.Z)(onEdit);return(0,jsx_runtime.jsx)(GenericCard.Z,{header:`Assumption ${assumption.numericId}`,entityId:assumption.id,tags:assumption.tags,onCopy:()=>onCopy?.(assumption.id),onRemove:()=>onRemove?.(assumption.id),onEdit:()=>setEditingMode(!0),onAddTagToEntity:(_entityId,tag)=>onAddTagToAssumption?.(assumption,tag),onRemoveTagFromEntity:(_entityId,tag)=>onRemoveTagFromAssumption?.(assumption,tag),children:(0,jsx_runtime.jsxs)(space_between.Z,{direction:"vertical",size:"s",children:[(0,jsx_runtime.jsxs)(column_layout.Z,{columns:2,children:[editingMode?(0,jsx_runtime.jsxs)(space_between.Z,{direction:"vertical",size:"s",children:[(0,jsx_runtime.jsx)(Textarea.Z,{value:editingValue,onChange:({detail})=>setEditingValue(detail.value),validateData:customTypes.AssumptionSchema.shape.content.safeParse,singleLine:!0}),(0,jsx_runtime.jsxs)(space_between.Z,{direction:"horizontal",size:"s",children:[(0,jsx_runtime.jsx)(components_button.Z,{onClick:handleCancel,children:"Cancel"}),(0,jsx_runtime.jsx)(components_button.Z,{variant:"primary",onClick:handleSave,children:"Save"})]})]}):(0,jsx_runtime.jsx)(text_content.Z,{children:(0,jsx_runtime.jsx)(CopyToClipboard.Z,{children:assumption.content||""})}),(0,jsx_runtime.jsxs)(space_between.Z,{direction:"vertical",size:"s",children:[(0,jsx_runtime.jsx)(assumptions_AssumptionThreatLink,{assumptionId:assumption.id}),(0,jsx_runtime.jsx)(assumptions_AssumptionMitigationLink,{assumptionId:assumption.id})]})]}),(0,jsx_runtime.jsx)(EntityMetadataEditor.Z,{variant:"default",entity:assumption,onEditEntity:handleMetadataEdit})]})})};AssumptionCard.displayName="AssumptionCard";const assumptions_AssumptionCard=AssumptionCard;try{AssumptionCard.displayName="AssumptionCard",AssumptionCard.__docgenInfo={description:"",displayName:"AssumptionCard",props:{assumption:{defaultValue:null,description:"",name:"assumption",required:!0,type:{name:"{ id: string; numericId: number; content: string; tags?: string[] | undefined; displayOrder?: number | undefined; metadata?: { value: (string | string[]) & (string | string[] | undefined); key: string; }[] | undefined; valid?: boolean | undefined; }"}},onCopy:{defaultValue:null,description:"",name:"onCopy",required:!1,type:{name:"((id: string) => void)"}},onRemove:{defaultValue:null,description:"",name:"onRemove",required:!1,type:{name:"((id: string) => void)"}},onEdit:{defaultValue:null,description:"",name:"onEdit",required:!1,type:{name:"((assumption: { id: string; numericId: number; content: string; tags?: string[]; displayOrder?: number; metadata?: { value: (string | string[]) & (string | string[] | undefined); key: string; }[] | undefined; valid?: boolean | undefined; }) => void) | undefined"}},onAddTagToAssumption:{defaultValue:null,description:"",name:"onAddTagToAssumption",required:!1,type:{name:"((assumption: { id: string; numericId: number; content: string; tags?: string[]; displayOrder?: number; metadata?: { value: (string | string[]) & (string | string[] | undefined); key: string; }[] | undefined; valid?: boolean | undefined; }, tag: string) => void) | undefined"}},onRemoveTagFromAssumption:{defaultValue:null,description:"",name:"onRemoveTagFromAssumption",required:!1,type:{name:"((assumption: { id: string; numericId: number; content: string; tags?: string[]; displayOrder?: number; metadata?: { value: (string | string[]) & (string | string[] | undefined); key: string; }[] | undefined; valid?: boolean | undefined; }, tag: string) => void) | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/assumptions/AssumptionCard/index.tsx#AssumptionCard"]={docgenInfo:AssumptionCard.__docgenInfo,name:"AssumptionCard",path:"src/components/assumptions/AssumptionCard/index.tsx#AssumptionCard"})}catch(__react_docgen_typescript_loader_error){}var GenericEntityCreationCard=__webpack_require__("./src/components/generic/GenericEntityCreationCard/index.tsx");const AssumptionCreationCard=({onSave})=>{const[editingEntity,setEditingEntity]=(0,react.useState)(GenericEntityCreationCard.N),[linkedMitigationIds,setLinkedMitigationIds]=(0,react.useState)([]),[linkedThreatIds,setLinkedThreatIds]=(0,react.useState)([]),{mitigationList,saveMitigation}=(0,MitigationsContext_context.I)(),{statementList}=(0,ThreatsContext_context.a)(),handleSave=(0,react.useCallback)((()=>{onSave?.(editingEntity,linkedMitigationIds,linkedThreatIds),setEditingEntity(GenericEntityCreationCard.N),setLinkedMitigationIds([]),setLinkedThreatIds([])}),[editingEntity,linkedMitigationIds,linkedThreatIds]),handleReset=(0,react.useCallback)((()=>{setEditingEntity(GenericEntityCreationCard.N),setLinkedMitigationIds([]),setLinkedThreatIds([])}),[]),handleAddMitigationLink=(0,react.useCallback)((mitigationIdOrNewMitigation=>{if(mitigationList.find((m=>m.id===mitigationIdOrNewMitigation)))setLinkedMitigationIds((prev=>[...prev,mitigationIdOrNewMitigation]));else{const newMitigation=saveMitigation({numericId:-1,content:mitigationIdOrNewMitigation,id:"new"});setLinkedMitigationIds((prev=>[...prev,newMitigation.id]))}}),[mitigationList,saveMitigation]);return(0,jsx_runtime.jsx)(GenericEntityCreationCard.Z,{editingEntity,setEditingEntity,header:"Add new assumption",onSave:handleSave,onReset:handleReset,customEditors:(0,jsx_runtime.jsxs)(space_between.Z,{direction:"vertical",size:"s",children:[(0,jsx_runtime.jsx)(ThreatLinkView.Z,{linkedThreatIds,threatList:statementList,onAddThreatLink:id=>setLinkedThreatIds((prev=>[...prev,id])),onRemoveThreatLink:id=>setLinkedThreatIds((prev=>prev.filter((p=>p!==id))))}),(0,jsx_runtime.jsx)(MitigationLinkView.Z,{linkedMitigationIds,mitigationList,onAddMitigationLink:handleAddMitigationLink,onRemoveMitigationLink:id=>setLinkedMitigationIds((prev=>prev.filter((p=>p!==id))))})]})})};AssumptionCreationCard.displayName="AssumptionCreationCard";const assumptions_AssumptionCreationCard=AssumptionCreationCard;try{AssumptionCreationCard.displayName="AssumptionCreationCard",AssumptionCreationCard.__docgenInfo={description:"",displayName:"AssumptionCreationCard",props:{onSave:{defaultValue:null,description:"",name:"onSave",required:!1,type:{name:"((entity: { id: string; numericId: number; content: string; tags?: string[]; displayOrder?: number; metadata?: { value: (string | string[]) & (string | string[] | undefined); key: string; }[] | undefined; valid?: boolean | undefined; }, linkedMitigationIds: string[], linkedThreatIds: string[]..."}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/assumptions/AssumptionCreationCard/index.tsx#AssumptionCreationCard"]={docgenInfo:AssumptionCreationCard.__docgenInfo,name:"AssumptionCreationCard",path:"src/components/assumptions/AssumptionCreationCard/index.tsx#AssumptionCreationCard"})}catch(__react_docgen_typescript_loader_error){}const AssumptionList=()=>{const{assumptionList,removeAssumption,saveAssumption}=(0,context.H)(),{assumptionLinkList,addAssumptionLinks,removeAssumptionLinksByAssumptionId}=(0,contexts._m)(),[filteringText,setFilteringText]=(0,react.useState)(""),[selectedTags,setSelectedTags]=(0,react.useState)([]),[selectedLinkedThreatsFilter,setSelectedLinkedThreatsFilter]=(0,react.useState)(LinkedEntityFilter.QN),[selectedLinkedMitigationFilter,setSelectedLinkedMitigationFilter]=(0,react.useState)(LinkedEntityFilter.QN),handleAddTagToEntity=(0,react.useCallback)(((assumption,tag)=>{const updated=(0,entityTag.E)(assumption,tag);saveAssumption(updated)}),[]),handleRemoveTagFromEntity=(0,react.useCallback)(((assumption,tag)=>{const updated=(0,entityTag.M)(assumption,tag);saveAssumption(updated)}),[]),handleRemove=(0,react.useCallback)((async assumptionId=>{removeAssumption(assumptionId),await removeAssumptionLinksByAssumptionId(assumptionId)}),[removeAssumption,removeAssumptionLinksByAssumptionId]),filteredList=(0,react.useMemo)((()=>{let output=assumptionList;return filteringText&&(output=output.filter((st=>st.content&&st.content.toLowerCase().indexOf(filteringText.toLowerCase())>=0))),selectedTags&&selectedTags.length>0&&(output=output.filter((st=>st.tags?.some((t=>selectedTags.includes(t)))))),selectedLinkedThreatsFilter!==LinkedEntityFilter.QN&&(output=output.filter((st=>assumptionLinkList.some((al=>al.assumptionId===st.id&&"Threat"===al.type))?selectedLinkedThreatsFilter===LinkedEntityFilter.X2:selectedLinkedThreatsFilter===LinkedEntityFilter.Nu))),selectedLinkedMitigationFilter!==LinkedEntityFilter.QN&&(output=output.filter((st=>assumptionLinkList.some((al=>al.assumptionId===st.id&&"Mitigation"===al.type))?selectedLinkedMitigationFilter===LinkedEntityFilter.X2:selectedLinkedMitigationFilter===LinkedEntityFilter.Nu))),output=output.sort(((op1,op2)=>(op2.displayOrder||Number.MAX_VALUE)-(op1.displayOrder||Number.MAX_VALUE))),output}),[filteringText,assumptionList,selectedTags,assumptionLinkList,selectedLinkedMitigationFilter,selectedLinkedThreatsFilter]),hasNoFilter=(0,react.useMemo)((()=>""===filteringText&&selectedLinkedMitigationFilter===LinkedEntityFilter.QN&&selectedLinkedThreatsFilter===LinkedEntityFilter.QN&&0===selectedTags.length),[filteringText,selectedTags,selectedLinkedThreatsFilter,selectedLinkedThreatsFilter]),allTags=(0,react.useMemo)((()=>assumptionList.reduce(((all,cur)=>[...all,...cur.tags?.filter((ia=>!all.includes(ia)))||[]]),[])),[assumptionList]),handleClearFilter=(0,react.useCallback)((()=>{setFilteringText(""),setSelectedTags([]),setSelectedLinkedMitigationFilter(LinkedEntityFilter.QN),setSelectedLinkedThreatsFilter(LinkedEntityFilter.QN)}),[]),handleSaveNew=(0,react.useCallback)(((assumption,linkedMitigationIds,linkedThreatIds)=>{const updated=saveAssumption(assumption),assumptionLinks=[];linkedMitigationIds.forEach((id=>{assumptionLinks.push({linkedId:id,assumptionId:updated.id,type:"Mitigation"})})),linkedThreatIds.forEach((id=>{assumptionLinks.push({linkedId:id,assumptionId:updated.id,type:"Threat"})})),addAssumptionLinks(assumptionLinks)}),[saveAssumption,addAssumptionLinks]);return(0,jsx_runtime.jsx)("div",{children:(0,jsx_runtime.jsxs)(space_between.Z,{direction:"vertical",size:"s",children:[(0,jsx_runtime.jsx)(container.Z,{header:(0,jsx_runtime.jsx)(header.Z,{counter:`(${filteredList.length})`,children:"Assumption List"}),children:(0,jsx_runtime.jsxs)(space_between.Z,{direction:"vertical",size:"s",children:[(0,jsx_runtime.jsx)(text_filter.Z,{filteringText,filteringPlaceholder:"Find assumptions",filteringAriaLabel:"Filter assumptions",onChange:({detail})=>setFilteringText(detail.filteringText)}),(0,jsx_runtime.jsxs)(grid.Z,{gridDefinition:[{colspan:{default:12,xs:3}},{colspan:{default:12,xs:4}},{colspan:{default:12,xs:4}},{colspan:{default:1}}],children:[(0,jsx_runtime.jsx)(TagSelector.Z,{allTags,selectedTags,setSelectedTags}),(0,jsx_runtime.jsx)(LinkedEntityFilter.ZP,{label:"Linked threats",entityDisplayName:"threats",selected:selectedLinkedThreatsFilter,setSelected:setSelectedLinkedThreatsFilter}),(0,jsx_runtime.jsx)(LinkedEntityFilter.ZP,{label:"Linked mitigations",entityDisplayName:"mitigations",selected:selectedLinkedMitigationFilter,setSelected:setSelectedLinkedMitigationFilter}),(0,jsx_runtime.jsx)(components_button.Z,{onClick:handleClearFilter,variant:"icon",iconSvg:(0,jsx_runtime.jsx)("svg",{focusable:"false","aria-hidden":"true",viewBox:"0 0 24 24",tabIndex:-1,children:(0,jsx_runtime.jsx)("path",{d:"M19.79 5.61C20.3 4.95 19.83 4 19 4H6.83l7.97 7.97 4.99-6.36zM2.81 2.81 1.39 4.22 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.17l5.78 5.78 1.41-1.41L2.81 2.81z"})}),ariaLabel:"Clear filters",disabled:hasNoFilter})]})]})}),filteredList?.map((entity=>(0,jsx_runtime.jsx)(assumptions_AssumptionCard,{assumption:entity,onRemove:handleRemove,onEdit:saveAssumption,onAddTagToAssumption:handleAddTagToEntity,onRemoveTagFromAssumption:handleRemoveTagFromEntity},entity.id))),(0,jsx_runtime.jsx)(assumptions_AssumptionCreationCard,{onSave:handleSaveNew})]})})};AssumptionList.displayName="AssumptionList";const assumptions_AssumptionList=AssumptionList;try{AssumptionList.displayName="AssumptionList",AssumptionList.__docgenInfo={description:"",displayName:"AssumptionList",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/assumptions/AssumptionList/index.tsx#AssumptionList"]={docgenInfo:AssumptionList.__docgenInfo,name:"AssumptionList",path:"src/components/assumptions/AssumptionList/index.tsx#AssumptionList"})}catch(__react_docgen_typescript_loader_error){}var WorkspaceContextAggregator=__webpack_require__("./src/contexts/WorkspaceContextAggregator/index.tsx");const AssumptionList_AssumptionList=({workspaceId})=>(0,jsx_runtime.jsx)(WorkspaceContextAggregator.Z,{workspaceId:workspaceId||null,composerMode:"Full",requiredGlobalSetupContext:!0,children:(0,jsx_runtime.jsx)(assumptions_AssumptionList,{})});AssumptionList_AssumptionList.displayName="AssumptionList";const containers_AssumptionList=AssumptionList_AssumptionList;try{AssumptionList_AssumptionList.displayName="AssumptionList",AssumptionList_AssumptionList.__docgenInfo={description:"",displayName:"AssumptionList",props:{workspaceId:{defaultValue:null,description:"",name:"workspaceId",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/containers/AssumptionList/index.tsx#AssumptionList"]={docgenInfo:AssumptionList_AssumptionList.__docgenInfo,name:"AssumptionList",path:"src/containers/AssumptionList/index.tsx#AssumptionList"})}catch(__react_docgen_typescript_loader_error){}const index_stories={title:"fullMode/AssumptionList",component:containers_AssumptionList},Default={};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/generic/EntityMetadataEditor/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _cloudscape_design_components_expandable_section__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@cloudscape-design/components/expandable-section/index.js"),_cloudscape_design_components_grid__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@cloudscape-design/components/grid/index.js"),_styles_expandablePanelHeader__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styles/expandablePanelHeader.ts"),_CommentsEdit__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/generic/CommentsEdit/index.tsx"),_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js");const MetadataEditor=({variant,entity,onEditEntity,defaultExpanded})=>(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(_cloudscape_design_components_expandable_section__WEBPACK_IMPORTED_MODULE_3__.Z,{headerText:(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)("span",{css:_styles_expandablePanelHeader__WEBPACK_IMPORTED_MODULE_0__.Z,children:"Metadata"}),headingTagOverride:"h3",variant,defaultExpanded,children:(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(_cloudscape_design_components_grid__WEBPACK_IMPORTED_MODULE_4__.Z,{gridDefinition:[{colspan:{default:12,xs:12}}],children:(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(_CommentsEdit__WEBPACK_IMPORTED_MODULE_1__.Z,{entity,onEditEntity})})});MetadataEditor.displayName="MetadataEditor";const __WEBPACK_DEFAULT_EXPORT__=MetadataEditor;try{EntityMetadataEditor.displayName="EntityMetadataEditor",EntityMetadataEditor.__docgenInfo={description:"",displayName:"EntityMetadataEditor",props:{variant:{defaultValue:null,description:"",name:"variant",required:!0,type:{name:"enum",value:[{value:"undefined"},{value:'"default"'},{value:'"footer"'},{value:'"container"'},{value:'"navigation"'},{value:'"stacked"'}]}},entity:{defaultValue:null,description:"",name:"entity",required:!0,type:{name:"{ id: string; numericId: number; displayOrder?: number | undefined; metadata?: { value: (string | string[]) & (string | string[] | undefined); key: string; }[] | undefined; tags?: string[] | undefined; }"}},onEditEntity:{defaultValue:null,description:"",name:"onEditEntity",required:!0,type:{name:"(entity: T, key: string, value: string | string[] | undefined) => void"}},defaultExpanded:{defaultValue:null,description:"",name:"defaultExpanded",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/generic/EntityMetadataEditor/index.tsx#EntityMetadataEditor"]={docgenInfo:EntityMetadataEditor.__docgenInfo,name:"EntityMetadataEditor",path:"src/components/generic/EntityMetadataEditor/index.tsx#EntityMetadataEditor"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/generic/GenericEntityCreationCard/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{N:()=>DEFAULT_ENTITY,Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _cloudscape_design_components_button__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("../../node_modules/@cloudscape-design/components/button/index.js"),_cloudscape_design_components_column_layout__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("../../node_modules/@cloudscape-design/components/column-layout/index.js"),_cloudscape_design_components_space_between__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("../../node_modules/@cloudscape-design/components/space-between/index.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_configs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/configs/index.ts"),_hooks_useEditMetadata__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/hooks/useEditMetadata/index.ts"),_utils_entityTag__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/utils/entityTag/index.tsx"),_generic_Textarea__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/generic/Textarea/index.tsx"),_EntityMetadataEditor__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/generic/EntityMetadataEditor/index.tsx"),_GenericCard__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/components/generic/GenericCard/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const DEFAULT_ENTITY={id:_configs__WEBPACK_IMPORTED_MODULE_1__.bU,numericId:-1,content:""},GenericEntityCreationCard=({editingEntity,setEditingEntity,header,onSave,onReset,customEditors,validateData})=>{const handleAddTagToEntity=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((tag=>{const updated=(0,_utils_entityTag__WEBPACK_IMPORTED_MODULE_7__.E)(editingEntity,tag);setEditingEntity(updated)}),[editingEntity]),handleRemoveTagFromEntity=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((tag=>{const updated=(0,_utils_entityTag__WEBPACK_IMPORTED_MODULE_7__.M)(editingEntity,tag);setEditingEntity(updated)}),[editingEntity]),handleEditMetadata=(0,_hooks_useEditMetadata__WEBPACK_IMPORTED_MODULE_2__.Z)(setEditingEntity);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_GenericCard__WEBPACK_IMPORTED_MODULE_5__.Z,{header,tags:editingEntity?.tags,entityId:_configs__WEBPACK_IMPORTED_MODULE_1__.bU,onAddTagToEntity:(_entityId,tag)=>handleAddTagToEntity?.(tag),onRemoveTagFromEntity:(_entityId,tag)=>handleRemoveTagFromEntity?.(tag),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_cloudscape_design_components_space_between__WEBPACK_IMPORTED_MODULE_8__.Z,{direction:"vertical",size:"s",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_cloudscape_design_components_space_between__WEBPACK_IMPORTED_MODULE_8__.Z,{direction:"horizontal",size:"s",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_cloudscape_design_components_button__WEBPACK_IMPORTED_MODULE_9__.Z,{onClick:onReset,children:"Reset"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_cloudscape_design_components_button__WEBPACK_IMPORTED_MODULE_9__.Z,{variant:"primary",disabled:!editingEntity.content,onClick:onSave,children:"Save"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_cloudscape_design_components_column_layout__WEBPACK_IMPORTED_MODULE_10__.Z,{columns:customEditors?2:1,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_generic_Textarea__WEBPACK_IMPORTED_MODULE_3__.Z,{value:editingEntity.content,onChange:({detail})=>setEditingEntity({...editingEntity,content:detail.value}),validateData,singleLine:!0}),customEditors]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_EntityMetadataEditor__WEBPACK_IMPORTED_MODULE_4__.Z,{variant:"default",entity:editingEntity,onEditEntity:handleEditMetadata,defaultExpanded:!0})]})})};GenericEntityCreationCard.displayName="GenericEntityCreationCard";const __WEBPACK_DEFAULT_EXPORT__=GenericEntityCreationCard;try{GenericEntityCreationCard.displayName="GenericEntityCreationCard",GenericEntityCreationCard.__docgenInfo={description:"",displayName:"GenericEntityCreationCard",props:{editingEntity:{defaultValue:null,description:"",name:"editingEntity",required:!0,type:{name:"{ id: string; numericId: number; content: string; tags?: string[] | undefined; displayOrder?: number | undefined; metadata?: { value: (string | string[]) & (string | string[] | undefined); key: string; }[] | undefined; }"}},setEditingEntity:{defaultValue:null,description:"",name:"setEditingEntity",required:!0,type:{name:"Dispatch<SetStateAction<{ id: string; numericId: number; content: string; tags?: string[] | undefined; displayOrder?: number | undefined; metadata?: { value: (string | string[]) & (string | string[] | undefined); key: string; }[] | undefined; }>>"}},header:{defaultValue:null,description:"",name:"header",required:!0,type:{name:"string"}},onSave:{defaultValue:null,description:"",name:"onSave",required:!1,type:{name:"(() => void)"}},onReset:{defaultValue:null,description:"",name:"onReset",required:!1,type:{name:"(() => void)"}},customEditors:{defaultValue:null,description:"",name:"customEditors",required:!1,type:{name:"ReactNode"}},validateData:{defaultValue:null,description:"",name:"validateData",required:!1,type:{name:"((newValue: string) => SafeParseReturnType<string, string>) | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/generic/GenericEntityCreationCard/index.tsx#GenericEntityCreationCard"]={docgenInfo:GenericEntityCreationCard.__docgenInfo,name:"GenericEntityCreationCard",path:"src/components/generic/GenericEntityCreationCard/index.tsx#GenericEntityCreationCard"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/mitigations/MitigationLinkView/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _cloudscape_design_components_autosuggest__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@cloudscape-design/components/autosuggest/index.js"),_cloudscape_design_components_expandable_section__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@cloudscape-design/components/expandable-section/index.js"),_cloudscape_design_components_token_group__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@cloudscape-design/components/token-group/index.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const MitigationLinkComponent=({variant,linkedMitigationIds,mitigationList,onAddMitigationLink,onRemoveMitigationLink})=>{const[searchValue,setSearchValue]=react__WEBPACK_IMPORTED_MODULE_0__.useState(""),linkedMitigations=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>mitigationList.filter((al=>linkedMitigationIds.includes(al.id)))),[linkedMitigationIds,mitigationList]),filteredMitigations=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>{const mitigations=mitigationList.filter((x=>!linkedMitigationIds.includes(x.id)));return searchValue?mitigations.filter((x=>x.content.toLowerCase().indexOf(searchValue.toLowerCase())>=0)):mitigations}),[searchValue,mitigationList,linkedMitigationIds]);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_cloudscape_design_components_expandable_section__WEBPACK_IMPORTED_MODULE_2__.Z,{variant,headingTagOverride:"container"===variant?"h3":void 0,headerText:`Linked mitigations (${linkedMitigations.length})`,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_cloudscape_design_components_autosuggest__WEBPACK_IMPORTED_MODULE_3__.Z,{onChange:({detail})=>setSearchValue(detail.value),value:searchValue,options:filteredMitigations.map((x=>({value:x.id,label:x.content}))),onSelect:({detail})=>{onAddMitigationLink(detail.value),setSearchValue("")},filteringType:"manual",enteredTextLabel:value=>`Add new mitigation: "${value}"`,placeholder:"Search mitigation",empty:"No matches found"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{display:"flex"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_cloudscape_design_components_token_group__WEBPACK_IMPORTED_MODULE_4__.Z,{items:linkedMitigations.map((x=>({label:x.content,dismissLabel:`Unlink mitigation ${x.numericId}`}))),onDismiss:({detail:{itemIndex}})=>{onRemoveMitigationLink(linkedMitigations[itemIndex].id)}})})]})};MitigationLinkComponent.displayName="MitigationLinkComponent";const __WEBPACK_DEFAULT_EXPORT__=MitigationLinkComponent;try{MitigationLinkView.displayName="MitigationLinkView",MitigationLinkView.__docgenInfo={description:"",displayName:"MitigationLinkView",props:{variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"default"'},{value:'"footer"'},{value:'"container"'},{value:'"navigation"'},{value:'"stacked"'}]}},linkedMitigationIds:{defaultValue:null,description:"",name:"linkedMitigationIds",required:!0,type:{name:"string[]"}},mitigationList:{defaultValue:null,description:"",name:"mitigationList",required:!0,type:{name:"{ id: string; numericId: number; content: string; tags?: string[] | undefined; displayOrder?: number | undefined; metadata?: { value: (string | string[]) & (string | string[] | undefined); key: string; }[] | undefined; }[]"}},onAddMitigationLink:{defaultValue:null,description:"",name:"onAddMitigationLink",required:!0,type:{name:"(mitigationId: string) => void"}},onRemoveMitigationLink:{defaultValue:null,description:"",name:"onRemoveMitigationLink",required:!0,type:{name:"(mitigationId: string) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/mitigations/MitigationLinkView/index.tsx#MitigationLinkView"]={docgenInfo:MitigationLinkView.__docgenInfo,name:"MitigationLinkView",path:"src/components/mitigations/MitigationLinkView/index.tsx#MitigationLinkView"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/threats/ThreatLinkView/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _cloudscape_design_components_autosuggest__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@cloudscape-design/components/autosuggest/index.js"),_cloudscape_design_components_expandable_section__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@cloudscape-design/components/expandable-section/index.js"),_cloudscape_design_components_token_group__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@cloudscape-design/components/token-group/index.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const ThreatLinkComponent=({linkedThreatIds,threatList,onAddThreatLink,onRemoveThreatLink})=>{const[searchValue,setSearchValue]=react__WEBPACK_IMPORTED_MODULE_0__.useState(""),linkedThreats=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>threatList.filter((al=>linkedThreatIds.includes(al.id)))),[linkedThreatIds,threatList]),filteredThreats=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>{const threats=threatList.filter((x=>!linkedThreatIds.includes(x.id)));return searchValue?threats.filter((x=>x.statement&&x.statement.toLowerCase().indexOf(searchValue.toLowerCase())>=0)):threats}),[searchValue,threatList,linkedThreatIds]);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_cloudscape_design_components_expandable_section__WEBPACK_IMPORTED_MODULE_2__.Z,{headerText:`Linked threats (${linkedThreats.length})`,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_cloudscape_design_components_autosuggest__WEBPACK_IMPORTED_MODULE_3__.Z,{onChange:({detail})=>setSearchValue(detail.value),value:searchValue,options:filteredThreats.map((x=>({value:x.id,label:x.statement}))),onSelect:({detail})=>{onAddThreatLink(detail.value),setSearchValue("")},filteringType:"manual",enteredTextLabel:value=>`Use: "${value}"`,placeholder:"Search threat",empty:"No matches found"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{display:"flex"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_cloudscape_design_components_token_group__WEBPACK_IMPORTED_MODULE_4__.Z,{items:linkedThreats.map((x=>({label:x.statement,dismissLabel:`Unlink threat ${x.numericId}`}))),onDismiss:({detail:{itemIndex}})=>{onRemoveThreatLink(linkedThreats[itemIndex].id)}})})]})};ThreatLinkComponent.displayName="ThreatLinkComponent";const __WEBPACK_DEFAULT_EXPORT__=ThreatLinkComponent;try{ThreatLinkView.displayName="ThreatLinkView",ThreatLinkView.__docgenInfo={description:"",displayName:"ThreatLinkView",props:{linkedThreatIds:{defaultValue:null,description:"",name:"linkedThreatIds",required:!0,type:{name:"string[]"}},threatList:{defaultValue:null,description:"",name:"threatList",required:!0,type:{name:"{ id: string; numericId: number; tags?: string[] | undefined; displayOrder?: number | undefined; metadata?: { value: (string | string[]) & (string | string[] | undefined); key: string; }[] | undefined; ... 8 more ...; displayedStatement?: (string | { ...; })[] | undefined; }[]"}},onAddThreatLink:{defaultValue:null,description:"",name:"onAddThreatLink",required:!0,type:{name:"(threatId: string) => void"}},onRemoveThreatLink:{defaultValue:null,description:"",name:"onRemoveThreatLink",required:!0,type:{name:"(threatId: string) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/threats/ThreatLinkView/index.tsx#ThreatLinkView"]={docgenInfo:ThreatLinkView.__docgenInfo,name:"ThreatLinkView",path:"src/components/threats/ThreatLinkView/index.tsx#ThreatLinkView"})}catch(__react_docgen_typescript_loader_error){}}}]);