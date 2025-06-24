import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SpeciesCard from "@/components/species-card";
import OceanZones from "@/components/ocean-zones";
import OceanRobot from "@/components/ocean-robot";
import { Search, Waves, Fish, Globe, Microscope, Heart } from "lucide-react";

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

interface ResearchPaper {
  id: number;
  title: string;
  summary: string;
  source: string;
  publishDate: string;
  url: string;
  tags: string[];
}

interface ConservationTip {
  id: number;
  title: string;
  description: string;
  category: string;
  impact: string;
  difficulty: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: species = [], isLoading: speciesLoading } = useQuery<MarineSpecies[]>({
    queryKey: ["/api/species"],
  });

  const { data: research = [], isLoading: researchLoading } = useQuery<ResearchPaper[]>({
    queryKey: ["/api/research"],
  });

  const { data: conservationTips = [], isLoading: tipsLoading } = useQuery<ConservationTip[]>({
    queryKey: ["/api/conservation"],
  });

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const filteredSpecies = species.filter(s => 
    s.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.habitat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show variety in featured species - shuffle and take first 6
  const featuredSpecies = filteredSpecies
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Waves className="text-ocean-teal text-2xl" />
                <h1 className="text-2xl font-bold text-ocean-deep">OceanExplorer</h1>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => smoothScrollTo('hero')} className="text-gray-700 hover:text-ocean-teal font-medium transition cursor-pointer">Explore</button>
              <button onClick={() => smoothScrollTo('species')} className="text-gray-700 hover:text-ocean-teal font-medium transition cursor-pointer">Species</button>
              <button onClick={() => smoothScrollTo('zones')} className="text-gray-700 hover:text-ocean-teal font-medium transition cursor-pointer">Ocean Zones</button>
              <button onClick={() => smoothScrollTo('conservation')} className="text-gray-700 hover:text-ocean-teal font-medium transition cursor-pointer">Conservation</button>
              <button onClick={() => smoothScrollTo('research')} className="text-gray-700 hover:text-ocean-teal font-medium transition cursor-pointer">Research</button>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search marine life..." 
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-teal focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative h-96 bg-gradient-to-r from-ocean-deep to-ocean-teal flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" 
             style={{
               backgroundImage: "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=800')"
             }}></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h2 className="text-5xl font-bold mb-6">Discover the Mysteries of Our Oceans</h2>
          <p className="text-xl mb-8 opacity-90">Explore marine life, learn about ocean ecosystems, and contribute to conservation efforts with scientifically accurate research and AI-powered insights.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => smoothScrollTo('species')}
              className="bg-coral hover:bg-red-500 text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105 cursor-pointer"
            >
              Start Exploring
            </button>
            <button 
              onClick={() => smoothScrollTo('research')}
              className="border-2 border-white text-white hover:bg-white hover:text-ocean-deep px-8 py-3 rounded-lg font-semibold transition cursor-pointer"
            >
              Research Database
            </button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-ocean-teal mb-2">35,000+</div>
              <div className="text-gray-600">Marine Species</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-ocean-teal mb-2">71%</div>
              <div className="text-gray-600">Earth's Surface</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-ocean-teal mb-2">5</div>
              <div className="text-gray-600">Ocean Zones</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-ocean-teal mb-2">10,000+</div>
              <div className="text-gray-600">Research Papers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Species */}
      <section id="species" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Marine Life</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover fascinating species from the depths of our oceans, each with unique adaptations and behaviors.</p>
          </div>

          {speciesLoading ? (
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
              {featuredSpecies.map((species) => (
                <SpeciesCard key={species.id} species={species} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <button 
              onClick={() => smoothScrollTo('hero')}
              className="bg-ocean-teal hover:bg-ocean-deep text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Back to Top <Fish className="inline ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Ocean Zones */}
      <section id="zones" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ocean Zones & Ecosystems</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore the different layers of our oceans, each with unique conditions and marine life adaptations.</p>
          </div>
          <OceanZones />
        </div>
      </section>

      {/* Research Hub */}
      <section id="research" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Marine Research Hub</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Access the latest oceanographic research, scientific discoveries, and conservation efforts powered by AI analysis.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center space-x-3 mb-6">
                  <Microscope className="text-2xl text-ocean-teal" />
                  <h4 className="text-xl font-semibold text-gray-900">Latest Discoveries</h4>
                </div>
                
                {researchLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="border-l-4 border-gray-300 pl-4 py-2 animate-pulse">
                        <div className="h-5 bg-gray-300 rounded mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {research.slice(0, 3).map((paper, index) => (
                      <div key={paper.id} className={`border-l-4 ${index === 0 ? 'border-ocean-teal' : index === 1 ? 'border-coral' : 'border-green-500'} pl-4 py-2`}>
                        <h5 className="font-medium text-gray-900">{paper.title}</h5>
                        <p className="text-sm text-gray-600 mt-1">{paper.summary}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>{new Date(paper.publishDate).toLocaleDateString()}</span>
                          <span>{paper.source}</span>
                          <button className="text-ocean-teal hover:underline">Read Full Study</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button className="mt-6 text-ocean-teal hover:text-ocean-deep font-medium">
                  View All Research →
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Search className="text-xl text-ocean-teal" />
                  <h4 className="text-lg font-semibold text-gray-900">Research Tools</h4>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                    <div className="font-medium text-gray-900">Species Identifier</div>
                    <div className="text-sm text-gray-600">AI-powered marine life identification</div>
                  </button>
                  
                  <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                    <div className="font-medium text-gray-900">Habitat Mapper</div>
                    <div className="text-sm text-gray-600">Interactive ecosystem mapping</div>
                  </button>
                  
                  <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                    <div className="font-medium text-gray-900">Conservation Tracker</div>
                    <div className="text-sm text-gray-600">Monitor protection efforts globally</div>
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-ocean-teal to-ocean-deep text-white rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <h4 className="text-lg font-semibold">OceanRobot Research</h4>
                </div>
                <p className="text-sm opacity-90 mb-4">Get comprehensive research analysis and insights from our AI marine biology expert.</p>
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                  Start Research Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conservation */}
      <section id="conservation" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Marine Conservation</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Learn how you can help protect our oceans and contribute to marine conservation efforts worldwide.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Ocean conservation efforts" 
                className="w-full h-64 object-cover rounded-xl shadow-lg mb-6"
              />
              
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-gray-900">Current Conservation Challenges</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-gray-900">Ocean Pollution</div>
                      <div className="text-sm text-gray-600">8 million tons of plastic enter oceans annually</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-gray-900">Climate Change</div>
                      <div className="text-sm text-gray-600">Ocean acidification and rising temperatures</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-gray-900">Overfishing</div>
                      <div className="text-sm text-gray-600">90% of large fish populations depleted</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-gray-900">Habitat Destruction</div>
                      <div className="text-sm text-gray-600">Coral reefs declining at unprecedented rates</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-gray-900">How You Can Help</h4>
              
              {tipsLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-200 animate-pulse">
                      <div className="h-5 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {conservationTips.slice(0, 4).map((tip, index) => (
                    <div key={tip.id} className={`p-4 rounded-lg border ${
                      index === 0 ? 'bg-green-50 border-green-200' :
                      index === 1 ? 'bg-blue-50 border-blue-200' :
                      index === 2 ? 'bg-purple-50 border-purple-200' :
                      'bg-teal-50 border-teal-200'
                    }`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <Heart className={`w-4 h-4 ${
                          index === 0 ? 'text-green-600' :
                          index === 1 ? 'text-blue-600' :
                          index === 2 ? 'text-purple-600' :
                          'text-teal-600'
                        }`} />
                        <h5 className={`font-medium ${
                          index === 0 ? 'text-green-900' :
                          index === 1 ? 'text-blue-900' :
                          index === 2 ? 'text-purple-900' :
                          'text-teal-900'
                        }`}>{tip.title}</h5>
                      </div>
                      <p className={`text-sm ${
                        index === 0 ? 'text-green-700' :
                        index === 1 ? 'text-blue-700' :
                        index === 2 ? 'text-purple-700' :
                        'text-teal-700'
                      }`}>{tip.description}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-gradient-to-r from-ocean-deep to-ocean-teal text-white p-6 rounded-xl">
                <h5 className="font-semibold text-lg mb-2">Make a Difference Today</h5>
                <p className="text-sm opacity-90 mb-4">Join thousands of ocean advocates working to protect marine ecosystems for future generations.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                    Join Conservation Network
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                    Support Marine Protection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Waves className="text-ocean-teal text-xl" />
                <h4 className="text-lg font-bold">OceanExplorer</h4>
              </div>
              <p className="text-gray-300 text-sm">Advancing marine education and conservation through scientific research and AI-powered insights.</p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Explore</h5>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => smoothScrollTo('species')} className="text-gray-300 hover:text-white transition cursor-pointer">Marine Species</button></li>
                <li><button onClick={() => smoothScrollTo('zones')} className="text-gray-300 hover:text-white transition cursor-pointer">Ocean Zones</button></li>
                <li><button onClick={() => smoothScrollTo('research')} className="text-gray-300 hover:text-white transition cursor-pointer">Research Hub</button></li>
                <li><button onClick={() => smoothScrollTo('conservation')} className="text-gray-300 hover:text-white transition cursor-pointer">Conservation</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Resources</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white transition">Educator Tools</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">API Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">Research Papers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">Data Downloads</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Connect</h5>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-300 hover:text-white transition">
                  <Globe className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  <Fish className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  <Microscope className="w-5 h-5" />
                </a>
              </div>
              <p className="text-gray-400 text-xs">Follow us for the latest marine discoveries and conservation updates.</p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2024 OceanExplorer. Advancing marine science education and conservation worldwide.</p>
          </div>
        </div>
      </footer>

      {/* OceanRobot AI Assistant */}
      <OceanRobot />
    </div>
  );
}
