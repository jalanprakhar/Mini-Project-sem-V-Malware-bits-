import 'reactflow/dist/style.css';
import React, { useCallback, useState } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  MarkerType,
  ReactFlowProvider, 
  useReactFlow 
} from 'reactflow';

import defaultNodes from './nodes.js';
import defaultEdges from './edges.js';

import './button.css';

const edgeOptions = {
    animated: true,
    style: {
      stroke: 'white',
    },
  };
  
  const connectionLineStyle = { stroke: 'white' };
  
  let nodeId = 0;

  function Flow() {
    const reactFlowInstance = useReactFlow();
    const onClick = useCallback(() => {
      const id = `${++nodeId}`;
      const newNode = {
        id,
        position: {
          x: Math.random() * 500,
          y: Math.random() * 500,
        },
        data: {
          label: `Node ${id}`,
        },
      };
      reactFlowInstance.addNodes(newNode);
    }, []);
    const initialEdges = [
      {
        id: 'frontend-backend',
        source: 'frontend',
        target: 'backend',
        label: 'sending the selected model and hyper parameters',
        className: 'normal-edge',
        labelShowBg:false,
        labelStyle:{fill:'grey'}
      },
      {
        id: 'backend-ids',
        source: 'backend',
        target: 'ids',
        label: 'sending parameters to the IDS script',
        className: 'normal-edge',
        labelShowBg:false,
        labelStyle:{fill:'grey'}
      },
      {
        id: 'ids-frontend',
        source: 'ids',
        target: 'frontend',
        label: 'Confusion matrix, testing accuracy and training accuracy',
        className: 'normal-edge',
        labelShowBg:false,
        labelStyle:{fill:'grey'}
      },
    ];
    
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    return (
      <>
        <ReactFlow
          defaultNodes={defaultNodes}
          // defaultEdges={defaultEdges}
          onEdgesChange={onEdgesChange}
          edges={edges}
          defaultEdgeOptions={edgeOptions}
          fitView
          style={{
            backgroundColor: '#D3D2E5',
          }}
          connectionLineStyle={connectionLineStyle}
        />
        {/* <button onClick={onClick} className="btn-add">
          add node
        </button> */}
      </>
    );
  }
  export default function () {
    return (
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    );
  }
  