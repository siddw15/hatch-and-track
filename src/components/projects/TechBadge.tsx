
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface TechBadgeProps {
  name: string;
  onRemove?: () => void;
}

const TechBadge: React.FC<TechBadgeProps> = ({ name, onRemove }) => {
  const techColors: Record<string, string> = {
    'React': 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
    'Next.js': 'bg-black/50 text-gray-300 hover:bg-black/60',
    'TypeScript': 'bg-blue-600/20 text-blue-300 hover:bg-blue-600/30',
    'JavaScript': 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30',
    'Node.js': 'bg-green-500/20 text-green-300 hover:bg-green-500/30',
    'Express': 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30',
    'MongoDB': 'bg-green-600/20 text-green-300 hover:bg-green-600/30',
    'PostgreSQL': 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
    'Supabase': 'bg-green-500/20 text-green-300 hover:bg-green-500/30',
    'Firebase': 'bg-yellow-600/20 text-yellow-300 hover:bg-yellow-600/30',
    'Tailwind CSS': 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30',
    'Redux': 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30',
    'GraphQL': 'bg-pink-500/20 text-pink-300 hover:bg-pink-500/30',
    'Vue': 'bg-green-500/20 text-green-300 hover:bg-green-500/30',
    'Angular': 'bg-red-500/20 text-red-300 hover:bg-red-500/30',
    'Svelte': 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30',
    'Rust': 'bg-orange-600/20 text-orange-300 hover:bg-orange-600/30',
    'Go': 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
    'Python': 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
    'PHP': 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30',
    'Ruby': 'bg-red-500/20 text-red-300 hover:bg-red-500/30',
    'Docker': 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
    'Kubernetes': 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
    'AWS': 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30',
    'GCP': 'bg-red-500/20 text-red-300 hover:bg-red-500/30',
    'Azure': 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
    'Three.js': 'bg-black/50 text-gray-300 hover:bg-black/60',
    'GSAP': 'bg-green-500/20 text-green-300 hover:bg-green-500/30',
    'Framer Motion': 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30',
    'Chart.js': 'bg-pink-500/20 text-pink-300 hover:bg-pink-500/30',
    'React Native': 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
    'Expo': 'bg-black/50 text-gray-300 hover:bg-black/60',
    'Vercel': 'bg-black/50 text-gray-300 hover:bg-black/60',
    'Netlify': 'bg-teal-500/20 text-teal-300 hover:bg-teal-500/30',
    'OpenAI API': 'bg-teal-500/20 text-teal-300 hover:bg-teal-500/30',
  };

  const color = techColors[name] || 'bg-secondary text-secondary-foreground hover:bg-secondary/80';

  return (
    <Badge className={`${color} ${onRemove ? 'pr-2' : 'px-3'} py-1 cursor-default`} variant="secondary">
      {name}
      {onRemove && (
        <button 
          onClick={onRemove} 
          className="ml-1 rounded-full hover:bg-muted/20 p-0.5"
          aria-label={`Remove ${name}`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Badge>
  );
};

export default TechBadge;
