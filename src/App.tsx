import { useCallback, useRef } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  ReactFlowProvider,
} from "reactflow";
import type { Connection, ReactFlowInstance, Node } from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "./components/Sidebar";
import TriggerNode from "./components/nodes/TriggerNode";
import ActionNode from "./components/nodes/ActionNode";
import ConditionNode from "./components/nodes/ConditionNode";
import HttpNode from "./components/nodes/HttpNode";
import CodeNode from "./components/nodes/CodeNode";

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
  http: HttpNode,
  code: CodeNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "trigger",
    position: { x: 250, y: 50 },
    data: { label: "Webhook" },
  },
  {
    id: "2",
    type: "action",
    position: { x: 250, y: 200 },
    data: { label: "Process Data" },
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2", animated: true }];

let id = 3;
const getId = () => `node_${id++}`;

function Flow() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      const label = event.dataTransfer.getData("application/reactflow-label");

      if (!type || !reactFlowInstance.current || !reactFlowWrapper.current) {
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.current.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: label || type },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onInit = useCallback((instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;
  }, []);

  return (
    <div className="flex h-screen w-screen bg-gray-800">
      <Sidebar />
      <div className="flex-1" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={onInit}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-800"
        >
          <Background color="#374151" gap={20} />
          <Controls className="bg-gray-700 border-gray-600" />
          <MiniMap
            nodeColor={(node) => {
              switch (node.type) {
                case "trigger":
                  return "#22c55e";
                case "action":
                  return "#3b82f6";
                case "condition":
                  return "#eab308";
                case "http":
                  return "#a855f7";
                case "code":
                  return "#374151";
                default:
                  return "#6b7280";
              }
            }}
            className="bg-gray-900 border-gray-700"
          />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
