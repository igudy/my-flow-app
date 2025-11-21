const nodeTypes = [
  {
    type: "trigger",
    label: "Trigger",
    icon: "⚡",
    color: "bg-green-500",
    description: "Start your workflow",
  },
  {
    type: "action",
    label: "Action",
    icon: "⚙️",
    color: "bg-blue-500",
    description: "Perform an action",
  },
  {
    type: "condition",
    label: "Condition",
    icon: "🔀",
    color: "bg-yellow-500",
    description: "Branch logic",
  },
  {
    type: "http",
    label: "HTTP Request",
    icon: "🌐",
    color: "bg-purple-500",
    description: "Make API calls",
  },
  {
    type: "code",
    label: "Code",
    icon: "💻",
    color: "bg-gray-700",
    description: "Run custom code",
  },
];

export default function Sidebar() {
  const onDragStart = (
    event: React.DragEvent,
    nodeType: string,
    label: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("application/reactflow-label", label);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-700 p-4 overflow-y-auto">
      <h2 className="text-lg font-bold text-white mb-4">Node Types</h2>
      <p className="text-xs text-gray-400 mb-4">
        Drag nodes to the canvas to build your workflow
      </p>
      <div className="space-y-3">
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            draggable
            onDragStart={(e) => onDragStart(e, node.type, node.label)}
            className={`${node.color} p-3 rounded-lg cursor-grab active:cursor-grabbing hover:opacity-90 transition-opacity shadow-md`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{node.icon}</span>
              <div>
                <div className="text-sm font-bold text-white">{node.label}</div>
                <div className="text-xs text-white/70">{node.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
