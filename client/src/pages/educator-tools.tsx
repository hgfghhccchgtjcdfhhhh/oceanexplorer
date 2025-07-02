import { ArrowLeft, BookOpen, Download, Users, Microscope, FileText, Target } from 'lucide-react';
import { Link } from 'wouter';

export default function EducatorTools() {
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
          
          <h1 className="text-4xl font-bold mb-4">Educator Tools</h1>
          <p className="text-xl text-white/90">
            Resources and tools for teaching marine science and ocean conservation
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Lesson Plans */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Lesson Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen className="w-6 h-6 text-ocean-teal" />
                <h3 className="text-lg font-semibold text-gray-900">Ocean Zones Explorer</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Interactive lesson plan covering the five ocean zones and their unique characteristics.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Ages 8-12 • 45 minutes</span>
                <button className="text-ocean-teal hover:text-ocean-deep font-medium text-sm">
                  <Download className="w-4 h-4 inline mr-1" />
                  Download
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Microscope className="w-6 h-6 text-ocean-teal" />
                <h3 className="text-lg font-semibold text-gray-900">Marine Species Classification</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Hands-on activity for learning taxonomic classification using marine species examples.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Ages 10-16 • 60 minutes</span>
                <button className="text-ocean-teal hover:text-ocean-deep font-medium text-sm">
                  <Download className="w-4 h-4 inline mr-1" />
                  Download
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-6 h-6 text-ocean-teal" />
                <h3 className="text-lg font-semibold text-gray-900">Conservation Action Plan</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Project-based learning focused on developing marine conservation strategies.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Ages 12-18 • 90 minutes</span>
                <button className="text-ocean-teal hover:text-ocean-deep font-medium text-sm">
                  <Download className="w-4 h-4 inline mr-1" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Activities */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ocean Depth Simulation</h3>
              <p className="text-gray-600 mb-4">
                Virtual dive experience showing pressure, temperature, and light changes with depth.
              </p>
              <Link href="/">
                <button className="bg-ocean-teal hover:bg-ocean-deep text-white px-4 py-2 rounded-lg text-sm transition">
                  Try Ocean Zones Explorer
                </button>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Species Identifier</h3>
              <p className="text-gray-600 mb-4">
                Use our AI assistant to identify marine species and learn about their habitats.
              </p>
              <Link href="/">
                <button className="bg-ocean-teal hover:bg-ocean-deep text-white px-4 py-2 rounded-lg text-sm transition">
                  Chat with OceanRobot
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Curriculum Standards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Curriculum Alignment</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Next Generation Science Standards (NGSS)</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 5-ESS2-1: Earth's major systems interact</li>
                  <li>• MS-ESS3-3: Human impacts on environment</li>
                  <li>• HS-LS2-7: Ecosystem dynamics and resilience</li>
                  <li>• HS-ESS3-3: Human impacts on biodiversity</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Common Core Standards</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• CCSS.ELA-LITERACY.RST.6-8.7</li>
                  <li>• CCSS.MATH.CONTENT.5.NBT.A.2</li>
                  <li>• CCSS.ELA-LITERACY.WHST.9-10.1</li>
                  <li>• CCSS.MATH.CONTENT.HSA.CED.A.3</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Ocean Literacy Principles</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Principle 1: Earth has one big ocean</li>
                  <li>• Principle 5: Ocean supports life</li>
                  <li>• Principle 6: Ocean and humans connected</li>
                  <li>• Principle 7: Ocean largely unexplored</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Assessment Tools */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Assessment & Evaluation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="w-6 h-6 text-ocean-teal" />
                <h3 className="text-lg font-semibold text-gray-900">Knowledge Check Quizzes</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Pre-built assessments covering marine ecosystems, species identification, and conservation concepts.
              </p>
              <button className="text-ocean-teal hover:text-ocean-deep font-medium text-sm">
                <Download className="w-4 h-4 inline mr-1" />
                Download Assessment Pack
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6 text-ocean-teal" />
                <h3 className="text-lg font-semibold text-gray-900">Project Rubrics</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Scoring guides for marine science projects, research presentations, and conservation proposals.
              </p>
              <button className="text-ocean-teal hover:text-ocean-deep font-medium text-sm">
                <Download className="w-4 h-4 inline mr-1" />
                Download Rubrics
              </button>
            </div>
          </div>
        </div>

        {/* Professional Development */}
        <div className="bg-gradient-to-r from-ocean-deep to-ocean-teal text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Professional Development</h2>
          <p className="text-white/90 mb-6">
            Join our community of educators and researchers working to advance marine science education.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Upcoming Workshops</h4>
              <ul className="text-sm text-white/80 space-y-1">
                <li>• Teaching Ocean Acidification (March 15, 2024)</li>
                <li>• Using AI in Marine Education (April 10, 2024)</li>
                <li>• Plastic Pollution Activities (May 5, 2024)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Resources</h4>
              <ul className="text-sm text-white/80 space-y-1">
                <li>• Monthly newsletter with new activities</li>
                <li>• Access to expert marine biologists</li>
                <li>• Classroom visit coordination</li>
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition">
              Join Educator Network
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}