import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import { ArrowLeft, Search, Calendar, ExternalLink, Tag } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';

interface ResearchPaper {
  id: number;
  title: string;
  summary: string;
  source: string;
  publishDate: string;
  url: string;
  tags: string[];
}

export default function AllResearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  const { data: papers = [], isLoading } = useQuery({
    queryKey: ['research'],
    queryFn: async () => {
      const response = await fetch('/api/research');
      if (!response.ok) throw new Error('Failed to fetch research');
      return response.json();
    }
  });

  const filteredPapers = papers.filter((paper: ResearchPaper) => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !tagFilter || paper.tags.includes(tagFilter);
    
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(papers.flatMap((paper: ResearchPaper) => paper.tags))).filter(Boolean) as string[];

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
          
          <h1 className="text-4xl font-bold mb-4">Marine Research Papers</h1>
          <p className="text-xl text-white/90">
            Latest discoveries and research in marine science - {papers.length} papers available
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search research papers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-ocean-teal focus:border-transparent"
              />
            </div>
            
            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-ocean-teal focus:border-transparent"
            >
              <option value="">All Research Areas</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-300">
            Showing {filteredPapers.length} of {papers.length} research papers
          </p>
        </div>

        {/* Papers List */}
        {isLoading ? (
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-6 bg-gray-300 rounded mb-3 w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-4 w-5/6"></div>
                <div className="flex space-x-4">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPapers.map((paper: ResearchPaper) => (
              <div key={paper.id} className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{paper.title}</h3>
                  <a 
                    href={paper.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-ocean-teal hover:text-ocean-deep transition"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                
                <p className="text-gray-300 mb-4">{paper.summary}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(paper.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <span className="font-medium">{paper.source}</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {paper.tags.map(tag => (
                    <span 
                      key={tag}
                      className="inline-flex items-center px-2 py-1 bg-ocean-teal/10 text-ocean-deep text-xs font-medium rounded-full"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredPapers.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No research papers found</h3>
            <p className="text-gray-300">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}