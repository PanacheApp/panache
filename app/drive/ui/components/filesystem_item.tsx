import { ChevronRightIcon, FileIcon, FolderIcon } from 'lucide-react';
import { useState } from 'react';

type Node = {
  name: string;
  nodes?: Node[];
};

export function FilesystemItem({ node }: { node: Node }) {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <li key={node.name}>
      <span className="flex items-center gap-1.5 py-1 line-clamp-1">
        {node.nodes && node.nodes.length > 0 && (
          <button onClick={() => setIsOpen(!isOpen)} className="p-1 -m-1">
            <ChevronRightIcon
              className={`size-4 text-gray-500 ${isOpen ? 'rotate-90' : ''}`}
            />
          </button>
        )}

        {node.nodes ? (
          <FolderIcon
            className={`size-5 text-gray-600 shrink-0 ${
              node.nodes.length === 0 ? 'ml-[22px]' : ''
            }`}
          />
        ) : (
          <FileIcon className="ml-[22px] size-5 text-gray-900 shrink-0" />
        )}
        {node.name}
      </span>

      {isOpen && (
        <ul className="pl-6">
          {node.nodes?.map((node) => (
            <FilesystemItem node={node} key={node.name} />
          ))}
        </ul>
      )}
    </li>
  );
}
