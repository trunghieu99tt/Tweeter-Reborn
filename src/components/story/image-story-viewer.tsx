import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import React, { useEffect } from 'react';
import styled from 'styled-components';

type Props = {
  data: Record<string, any>;
};

const ImageStoryViewer = ({ data }: Props) => {
  const { editor, onReady } = useFabricJSEditor();

  useEffect(() => {
    if (data && editor) {
      const canvasWidth = editor?.canvas.getWidth();
      const canvasHeight = editor?.canvas.getHeight();

      editor?.canvas.loadFromJSON(data, () => {
        // change url of image object
        const obj = editor?.canvas.getObjects();
        obj?.forEach((o: any) => {
          if (o.type === 'image') {
            o.scaleToHeight((canvasWidth || 100) * 0.8);
            o.scaleToHeight((canvasHeight || 100) * 0.8);
            editor?.canvas.centerObject(o);
          }
        });
        editor?.canvas.requestRenderAll();
        editor?.canvas.renderAll();
        editor?.canvas.calcOffset();
      });
    }
  }, [editor, data]);

  return (
    <StyledRoot visible={!!data}>
      <StyledFabricJSCanvas onReady={onReady} />
    </StyledRoot>
  );
};

export default ImageStoryViewer;

const StyledRoot = styled.div<{
  visible: boolean;
}>`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  width: 100%;
  height: 100%;
`;

const StyledFabricJSCanvas = styled(FabricJSCanvas)`
  width: 100%;
  height: 100%;
  border: 1px solid;
`;
