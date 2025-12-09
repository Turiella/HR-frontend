import React, { useState } from 'react';

interface SearchPreset {
  name: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  minExperience: number;
  jobDescription: string;
  icon: string;
}

import { searchPresets } from '../constants/presets';

interface SearchPresetsProps {
  onApplyPreset: (preset: SearchPreset) => void;
}

export const SearchPresets: React.FC<SearchPresetsProps> = ({ onApplyPreset }) => {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  return (
    <div className="mb-6">
      <h3 className="glass-title flex items-center text-sm">
        <span className="mr-2">🚀</span>
        Búsquedas Rápidas (Presets)
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {searchPresets.map((preset) => (
          <div
            key={preset.name}
            className={`
              glass-item cursor-pointer transition-all duration-200 group
              ${selectedPreset === preset.name ? 'ring-2 ring-indigo-400' : ''}
            `}
            onClick={() => {
              setSelectedPreset(preset.name);
              onApplyPreset(preset);
            }}
          >
            <div className="flex items-center mb-1">
              <span className="text-base mr-2 group-hover:scale-110 transition-transform">{preset.icon}</span>
              <span className="font-semibold text-white text-xs">{preset.name}</span>
            </div>
            <p className="glass-text text-gray-300 mb-2">{preset.description}</p>
            <div className="space-y-1">
              <div className="flex flex-wrap">
                {preset.requiredSkills.slice(0, 3).map(skill => (
                  <span 
                    key={skill} 
                    className="inline-block text-2xs bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded font-medium mr-1 mb-1"
                  >
                    {skill}
                  </span>
                ))}
                {preset.requiredSkills.length > 3 && (
                  <span className="text-2xs text-gray-400 px-1">+{preset.requiredSkills.length - 3}</span>
                )}
              </div>
              <div className="flex items-center text-2xs text-gray-400">
                <span className="mr-0.5">⏱️</span>
                <span>{preset.minExperience}+ años</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>
      {isVisible && (
        <div 
          className={`absolute z-50 ${positionClasses[position]} w-96 p-4 bg-gray-900/98 backdrop-blur-md text-white text-sm rounded-xl shadow-2xl border border-gray-700`}
          style={{
            width: '384px',
            backgroundColor: 'rgba(96, 165, 250, 0.98)',
            backdropFilter: 'blur(12px)',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25)',
            border: '1px solid rgb(59, 130, 246)'
          }}
        >
          <div className="relative">
            <div className="font-medium text-gray-800 leading-relaxed">{content}</div>
            <div 
              className={`
                absolute w-3 h-3 bg-blue-400/98 border-l border-b border-blue-500 transform rotate-45
                ${position === 'top' ? 'bottom-full -mb-1.5' : ''}
                ${position === 'bottom' ? 'top-full -mt-1.5' : ''}
                ${position === 'left' ? 'right-full -mr-1.5' : ''}
                ${position === 'right' ? 'left-full -ml-1.5' : ''}
              `}
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: 'rgba(96, 165, 250, 0.98)',
                borderLeft: '1px solid rgb(59, 130, 246)',
                borderBottom: '1px solid rgb(59, 130, 246)'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface FieldHelpProps {
  field: string;
  example?: string;
  tip?: string;
}

export const FieldHelp: React.FC<FieldHelpProps> = ({ field, example, tip }) => {
  const helpContent = (
    <div className="space-y-2">
      <p className="font-semibold text-gray-800">{field}</p>
      {example && (
        <p className="text-sm">
          <span className="text-blue-700 font-medium">Ejemplo:</span> {example}
        </p>
      )}
      {tip && (
        <p className="text-sm text-gray-700">{tip}</p>
      )}
    </div>
  );

  return (
    <Tooltip content={helpContent} position="top">
      <span className="ml-1 text-gray-400 cursor-help hover:text-gray-300 text-[10px] leading-none">?</span>
    </Tooltip>
  );
};
