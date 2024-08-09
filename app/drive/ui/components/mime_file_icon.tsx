import React from 'react';
import {
  FileIcon,
  FileTextIcon,
  FileImageIcon,
  FileVideoIcon,
  FileAudioIcon,
  FileCodeIcon,
  FileArchiveIcon,
  FileSpreadsheetIcon,
} from 'lucide-react';

interface IconProps {
  className?: string;
}

function getFileIcon(mimeType: string): React.FC<IconProps> {
    const mimePrefix = mimeType.split('/')[0];
    const mimeFullType = mimeType.toLowerCase();
  
    switch (true) {
      case mimeFullType === 'text/plain':
        return FileTextIcon;
      case mimeFullType === 'text/html':
      case mimeFullType === 'text/css':
      case mimeFullType === 'text/javascript':
        return FileCodeIcon;
      case mimePrefix === 'image':
        return FileImageIcon;
      case mimePrefix === 'audio':
        return FileAudioIcon;
      case mimePrefix === 'video':
        return FileVideoIcon;
      case mimeFullType === 'application/pdf':
        return FileIcon;
      case mimeFullType === 'application/zip':
      case mimeFullType === 'application/x-rar-compressed':
        return FileArchiveIcon;
      case mimeFullType === 'application/vnd.ms-excel':
      case mimeFullType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return FileSpreadsheetIcon;
      case mimeFullType === 'application/vnd.ms-powerpoint':
      case mimeFullType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        return FileTextIcon;
      default:
        return FileIcon;
    }
  }
  
  interface FileIconProps {
    mimeType: string;
    className?: string;
  }
  
  export const MimeFileIcon: React.FC<FileIconProps> = ({ mimeType, className }) => {
    const Icon = getFileIcon(mimeType);
    return <Icon className={className} />;
  };