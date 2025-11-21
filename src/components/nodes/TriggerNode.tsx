import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";

export default function TriggerNode({ data }: NodeProps) {
  return (
    <div className="px-4 py-3 shadow-lg rounded-lg bg-green-500 border-2 border-green-600 min-w-[150px]">
      <div className="flex items-center gap-2">
        <span className="text-lg">⚡</span>
        <div>
          <div className="text-xs text-green-100 font-medium">Trigger</div>
          <div className="text-sm font-bold text-white">{data.label}</div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-green-300 border-2 border-green-600"
      />
    </div>
  );
}
