// src/components/ui/preview-selector.tsx
import React from 'react';

interface PreviewSelectorProps {
  selectedNetwork: string;
  onNetworkChange: (network: string) => void;
}

const PreviewSelector = ({ selectedNetwork, onNetworkChange }: PreviewSelectorProps) => {
  return (
    <div className="absolute top-4 left-4 z-10">
      <select
        value={selectedNetwork}
        onChange={(e) => onNetworkChange(e.target.value)}
        className="block w-32 bg-white border border-gray-200 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="linkedin">LinkedIn</option>
        <option value="twitter">Twitter</option>
        <option value="facebook">Facebook</option>
        <option value="instagram">Instagram</option>
      </select>
    </div>
  );
};

export default PreviewSelector;