import React from 'react';
import EditorTemplate from 'components/editor/EditorTemplate/EditorTemplate.js';
import EditorHeader from 'components/editor/EditorHeader/EditorHeader.js';
import EditorPaneContainer from 'containers/editor/EditorPaneContainer';
import PreviewPaneContainer from 'containers/editor/PreviewPaneContainer';


const EditorPage = () => {
  return (
    <EditorTemplate
      header={<EditorHeader/>}
      editor={<EditorPaneContainer/>}
      preview={<PreviewPaneContainer/>}
    />
  );
};

export default EditorPage;