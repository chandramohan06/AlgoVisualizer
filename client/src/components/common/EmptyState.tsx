import React from 'react';
import { cn } from '@utils/index';
import { FileQuestion, Inbox, Search, BookOpen } from 'lucide-react';

type EmptyVariant = 'default' | 'search' | 'data' | 'learning';

interface EmptyStateProps {
  variant?: EmptyVariant;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const variantIcons: Record<EmptyVariant, React.ReactNode> = {
  default: <Inbox className="w-12 h-12 text-gray-500" />,
  search: <Search className="w-12 h-12 text-gray-500" />,
  data: <FileQuestion className="w-12 h-12 text-gray-500" />,
  learning: <BookOpen className="w-12 h-12 text-gray-500" />,
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  variant = 'default',
  title,
  description,
  action,
  className,
  icon,
}) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center py-12 px-6 text-center',
      className,
    )}
  >
    <div className="w-20 h-20 rounded-full bg-dark-700/50 flex items-center justify-center mb-4">
      {icon || variantIcons[variant]}
    </div>
    <h3 className="text-lg font-semibold text-gray-300 mb-2">{title}</h3>
    {description && <p className="text-sm text-gray-500 max-w-sm mb-4">{description}</p>}
    {action}
  </div>
);
