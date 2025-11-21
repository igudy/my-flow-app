import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";

export default function ConditionNode({ data }: NodeProps) {
  return (
    <div className="px-4 py-3 shadow-lg rounded-lg bg-yellow-500 border-2 border-yellow-600 min-w-[150px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-yellow-300 border-2 border-yellow-600"
      />
      <div className="flex items-center gap-2">
        <span className="text-lg">🔀</span>
        <div>
          <div className="text-xs text-yellow-100 font-medium">Condition</div>
          <div className="text-sm font-bold text-white">{data.label}</div>
        </div>
      </div>
      <div className="flex justify-between mt-2 text-xs text-yellow-100">
        <span>True</span>
        <span>False</span>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="true"
        style={{ left: "25%" }}
        className="w-3 h-3 !bg-green-400 border-2 border-green-600"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="false"
        style={{ left: "75%" }}
        className="w-3 h-3 !bg-red-400 border-2 border-red-600"
      />
    </div>
  );
}
