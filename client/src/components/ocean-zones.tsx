import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface OceanZone {
  id: number;
  name: string;
  depth: string;
  characteristics: string;
  temperature: string;
  pressure: string;
  lightLevel: string;
  commonSpecies: string[];
}

export default function OceanZones() {
  const [selectedZone, setSelectedZone] = useState<string>('epipelagic');

  const { data: zones = [], isLoading } = useQuery<OceanZone[]>({
    queryKey: ["/api/zones"],
  });

  const zoneColors = {
    'epipelagic': 'border-yellow-400 bg-yellow-50',
    'mesopelagic': 'border-blue-400 bg-blue-50',
    'bathypelagic': 'border-indigo-600 bg-indigo-50',
    'abyssopelagic': 'border-purple-600 bg-purple-50',
    'hadalpelagic': 'border-gray-800 bg-gray-50'
  };

  const getZoneKey = (zoneName: string): keyof typeof zoneColors => {
    const key = zoneName.toLowerCase().split(' ')[0] as keyof typeof zoneColors;
    return key in zoneColors ? key : 'epipelagic';
  };

  const selectedZoneData = zones.find(zone => 
    getZoneKey(zone.name) === selectedZone
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-l-4 border-gray-300 pl-6 py-4 bg-gray-50 rounded-r-lg animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </div>
          ))}
        </div>
        <div className="w-full h-96 bg-gray-300 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Zone Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {zones.map((zone) => {
          const zoneKey = getZoneKey(zone.name);
          const colorClass = zoneColors[zoneKey];
          const isSelected = selectedZone === zoneKey;
          
          return (
            <div 
              key={zone.id}
              className={`border-l-4 pl-6 py-6 rounded-r-lg cursor-pointer transition ${colorClass} ${
                isSelected ? 'ring-2 ring-blue-200 shadow-lg' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedZone(zoneKey)}
            >
              <h4 className="font-semibold text-lg text-gray-900 mb-2">{zone.name}</h4>
              <p className="text-gray-600 mb-3">{zone.depth}</p>
              <p className="text-sm text-gray-500 mb-3">{zone.lightLevel}</p>
              <div className="text-sm text-gray-500">
                <strong>Marine life:</strong> {zone.commonSpecies.slice(0, 3).join(', ')}
                {zone.commonSpecies.length > 3 && '...'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Zone Details */}
      {selectedZoneData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-6 border">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{selectedZoneData.name}</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Depth:</span>
                <span className="text-gray-600">{selectedZoneData.depth}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Temperature:</span>
                <span className="text-gray-600">{selectedZoneData.temperature}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Pressure:</span>
                <span className="text-gray-600">{selectedZoneData.pressure}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Light Level:</span>
                <span className="text-gray-600">{selectedZoneData.lightLevel}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Characteristics</h4>
            <p className="text-gray-600 mb-4">{selectedZoneData.characteristics}</p>
            
            <h4 className="font-semibold text-gray-900 mb-3">Common Species</h4>
            <div className="flex flex-wrap gap-2">
              {selectedZoneData.commonSpecies.map((species, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {species}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
