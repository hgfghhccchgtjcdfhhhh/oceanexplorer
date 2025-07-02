import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import SpeciesCard from '../components/species-card';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';

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

export default function AllSpecies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [zoneFilter, setZoneFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const { data: species = [], isLoading } = useQuery({
    queryKey: ['species'],
    queryFn: async () => {
      const response = await fetch('/api/species');
      if (!response.ok) throw new Error('Failed to fetch species');
      return response.json();
    }
  });

  const filteredSpecies = species.filter((s: MarineSpecies) => {
    const matchesSearch = s.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesZone = !zoneFilter || s.oceanZone === zoneFilter;
    const matchesStatus = !statusFilter || s.conservationStatus === statusFilter;
    
    return matchesSearch && matchesZone && matchesStatus;
  });

  const uniqueZones = Array.from(new Set(species.map((s: MarineSpecies) => s.oceanZone))).filter(Boolean) as string[];
  const uniqueStatuses = Array.from(new Set(species.map((s: MarineSpecies) => s.conservationStatus))).filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-ocean-deep to-ocean-teal text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <button className="flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </Link>
          
          <h1 className="text-4xl font-bold mb-4">All Marine Species</h1>
          <p className="text-xl text-white/90">
            Explore our complete database of {species.length} documented marine species
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search species..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-ocean-teal focus:border-transparent"
              />
            </div>
            
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-ocean-teal focus:border-transparent"
            >
              <option value="">All Ocean Zones</option>
              {uniqueZones.map((zone) => (
                <option key={zone} value={zone}>{zone}</option>
              ))}
            </select>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-ocean-teal focus:border-transparent"
            >
              <option value="">All Conservation Status</option>
              {uniqueStatuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-300">
            Showing {filteredSpecies.length} of {species.length} species
          </p>
        </div>

        {/* Species Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSpecies.map((species: MarineSpecies) => (
              <SpeciesCard key={species.id} species={species} />
            ))}
          </div>
        )}

        {filteredSpecies.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No species found</h3>
            <p className="text-gray-300">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}