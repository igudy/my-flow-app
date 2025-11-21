import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";

export default function CodeNode({ data }: NodeProps) {
  return (
    <div className="px-4 py-3 shadow-lg rounded-lg bg-gray-700 border-2 border-gray-800 min-w-[150px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-gray-400 border-2 border-gray-600"
      />
      <div className="flex items-center gap-2">
        <span className="text-lg">💻</span>
        <div>
          <div className="text-xs text-gray-300 font-medium">Code</div>
          <div className="text-sm font-bold text-white">{data.label}</div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-gray-400 border-2 border-gray-600"
      />
    </div>
  );
}
