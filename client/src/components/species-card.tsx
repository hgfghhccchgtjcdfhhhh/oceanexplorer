import { ArrowRight } from "lucide-react";

interface MarineSpecies {
  id: number;
  commonName: string;
  scientificName: string;
  description: string;
  habitat: string;
  oceanZone: string;
  conservationStatus: string;
  diet: string;
  averageSize: string;
  lifespan: string;
  threats: string[];
  imageUrl: string;
  funFacts: string[];
}

interface SpeciesCardProps {
  species: MarineSpecies;
}

export default function SpeciesCard({ species }: SpeciesCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'least concern':
        return 'text-green-700 bg-green-100';
      case 'vulnerable':
        return 'text-yellow-700 bg-yellow-100';
      case 'endangered':
        return 'text-red-700 bg-red-100';
      case 'critically endangered':
        return 'text-red-800 bg-red-200';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
      <img 
        src={species.imageUrl || "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"} 
        alt={species.commonName} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-6">
        <h4 className="text-xl font-semibold text-gray-900 mb-2">
          {species.commonName}
        </h4>
        <p className="text-sm text-gray-500 mb-2 italic">{species.scientificName}</p>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{species.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Habitat:</span>
            <span className="text-ocean-teal font-medium">{species.habitat}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Size:</span>
            <span className="text-gray-700">{species.averageSize}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Status:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(species.conservationStatus)}`}>
              {species.conservationStatus}
            </span>
          </div>
        </div>

        {species.funFacts && species.funFacts.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">Fun Fact:</p>
            <p className="text-sm text-gray-600 italic">"{species.funFacts[0]}"</p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-sm bg-ocean-aqua text-ocean-deep px-3 py-1 rounded-full">
            {species.oceanZone}
          </span>
          <button className="text-ocean-teal hover:text-ocean-deep font-medium text-sm flex items-center">
            Learn More <ArrowRight className="ml-1 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
