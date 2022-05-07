import { useCallback, useRef } from "react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";

// export default ForceGraph3D;

export default function ForceGraph({ ...rest }) {
  const fgRef = useRef<ForceGraphMethods>();

  const handleClick = useCallback(
    (node: any) => {
      const distance = 40;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
      if (fgRef.current) {
        console.log(fgRef.current);
        fgRef.current.cameraPosition(
          {
            x: node.x * distRatio,
            y: node.y * distRatio,
            z: node.z * distRatio,
          },
          node,
          3000
        );
      }
    },
    [fgRef]
  );
  return <ForceGraph3D ref={fgRef} onNodeClick={handleClick} {...rest} />;
}

// useRef는 ForceGraph3D에서만 동작, dynamic import 이후에 조작해도 동작하지 않으므로, 미리 선언.
// 나머지 인자들은 rest에 넣어서 받음
