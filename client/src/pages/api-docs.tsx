import { ArrowLeft, Code, Database, Globe, Key, FileText } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';

export default function ApiDocs() {
  const [activeTab, setActiveTab] = useState('overview');

  const baseUrl = window.location.origin;

  const endpoints = [
    {
      method: 'GET',
      path: '/api/species',
      description: 'Get all marine species',
      response: 'Array of marine species objects'
    },
    {
      method: 'GET',
      path: '/api/species/:id',
      description: 'Get a specific marine species by ID',
      response: 'Single marine species object'
    },
    {
      method: 'GET',
      path: '/api/research',
      description: 'Get all research papers',
      response: 'Array of research paper objects'
    },
    {
      method: 'GET',
      path: '/api/zones',
      description: 'Get all ocean zones',
      response: 'Array of ocean zone objects'
    },
    {
      method: 'GET',
      path: '/api/conservation',
      description: 'Get conservation tips',
      response: 'Array of conservation tip objects'
    },
    {
      method: 'POST',
      path: '/api/chat',
      description: 'Chat with OceanRobot AI assistant',
      response: 'AI response with marine research insights'
    }
  ];

  const sampleData = {
    species: {
      "id": 1,
      "commonName": "Blue Whale",
      "scientificName": "Balaenoptera musculus",
      "description": "The largest animal ever known to exist on Earth.",
      "habitat": "Open Ocean",
      "oceanZone": "Epipelagic",
      "conservationStatus": "Endangered",
      "diet": "Filter feeder - krill, small schooling fish",
      "averageSize": "24-30 meters",
      "lifespan": "80-90 years",
      "threats": ["Ship strikes", "Entanglement", "Noise pollution"],
      "imageUrl": "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c",
      "funFacts": ["Heart weighs as much as a small car", "Can consume 4 tons of krill daily"]
    },
    research: {
      "id": 1,
      "title": "New Deep-Sea Species Discovery in Mariana Trench",
      "summary": "Scientists have discovered three new species of amphipods in the deepest parts of the ocean.",
      "source": "Marine Biology Journal",
      "publishDate": "2024-01-15",
      "url": "https://example.com/research/mariana-discovery",
      "tags": ["Deep Sea", "Species Discovery", "Mariana Trench"]
    }
  };

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
          
          <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
          <p className="text-xl text-white/90">
            Access marine research data programmatically through our RESTful API
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-gray-800 rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: Globe },
                { id: 'endpoints', label: 'Endpoints', icon: Code },
                { id: 'examples', label: 'Examples', icon: FileText },
                { id: 'authentication', label: 'Authentication', icon: Key }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition ${
                    activeTab === tab.id
                      ? 'border-ocean-teal text-ocean-teal'
                      : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Getting Started</h3>
                  <p className="text-gray-300 mb-4">
                    The OceanExplorer API provides access to comprehensive marine research data including species information, 
                    research papers, ocean zones, and conservation data. All endpoints return JSON data and follow RESTful conventions.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Base URL</h4>
                  <code className="text-sm bg-gray-200 px-2 py-1 rounded">{baseUrl}/api</code>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Rate Limiting</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• 1000 requests per hour for anonymous users</li>
                    <li>• No authentication required for public endpoints</li>
                    <li>• Responses are cached for optimal performance</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Response Format</h4>
                  <p className="text-gray-700 mb-2">All API responses follow this format:</p>
                  <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "data": [...], // Array or object containing the requested data
  "status": "success",
  "timestamp": "2024-01-01T00:00:00Z"
}`}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'endpoints' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Endpoints</h3>
                
                <div className="space-y-4">
                  {endpoints.map((endpoint, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          endpoint.method === 'GET' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {endpoint.method}
                        </span>
                        <code className="text-sm font-mono text-gray-800">{endpoint.path}</code>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{endpoint.description}</p>
                      <p className="text-xs text-gray-500">Returns: {endpoint.response}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'examples' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Code Examples</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Fetch All Species (JavaScript)</h4>
                    <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`fetch('${baseUrl}/api/species')
  .then(response => response.json())
  .then(data => {
    console.log('Marine species:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Sample Species Response</h4>
                    <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                      {JSON.stringify(sampleData.species, null, 2)}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Fetch Research Papers (Python)</h4>
                    <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`import requests

response = requests.get('${baseUrl}/api/research')
if response.status_code == 200:
    papers = response.json()
    for paper in papers:
        print(f"Title: {paper['title']}")
        print(f"Source: {paper['source']}")
else:
    print(f"Error: {response.status_code}")`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Sample Research Response</h4>
                    <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                      {JSON.stringify(sampleData.research, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'authentication' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentication</h3>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-green-600" />
                    <h4 className="font-medium text-green-800">Public Access</h4>
                  </div>
                  <p className="text-green-700 mt-2">
                    All current API endpoints are publicly accessible and do not require authentication. 
                    This allows researchers, educators, and developers to easily access marine data for their projects.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Future Authentication Plans</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• API keys for higher rate limits</li>
                    <li>• User accounts for personalized data access</li>
                    <li>• Premium endpoints for advanced research features</li>
                    <li>• OAuth integration for third-party applications</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Contact for Advanced Access</h4>
                  <p className="text-blue-700 text-sm">
                    If you need higher rate limits or custom endpoints for research purposes, 
                    please contact our team to discuss your requirements.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Try It Out Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Try It Out</h3>
          <p className="text-gray-600 mb-4">
            Test our API endpoints directly from your browser:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href={`${baseUrl}/api/species`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <span className="font-medium">View All Species</span>
              <Code className="w-4 h-4 text-gray-400" />
            </a>
            <a 
              href={`${baseUrl}/api/research`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <span className="font-medium">View Research Papers</span>
              <Code className="w-4 h-4 text-gray-400" />
            </a>
            <a 
              href={`${baseUrl}/api/zones`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <span className="font-medium">View Ocean Zones</span>
              <Code className="w-4 h-4 text-gray-400" />
            </a>
            <a 
              href={`${baseUrl}/api/conservation`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <span className="font-medium">View Conservation Tips</span>
              <Code className="w-4 h-4 text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}