import { storage } from "../storage";
import type { InsertMarineSpecies, InsertOceanZone, InsertConservationTip, InsertResearchPaper } from "@shared/schema";

// Real marine species data for seeding the database
const realMarineSpeciesData: InsertMarineSpecies[] = [
  {
    commonName: "Clownfish",
    scientificName: "Amphiprioninae",
    description: "Small, brightly colored fish known for their symbiotic relationship with sea anemones.",
    habitat: "Coral Reefs",
    oceanZone: "Epipelagic",
    conservationStatus: "Least Concern",
    diet: "Omnivore - algae, plankton, small crustaceans",
    averageSize: "7-12 cm",
    lifespan: "6-10 years",
    threats: ["Ocean acidification", "Coral bleaching", "Aquarium trade"],
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
    funFacts: ["All clownfish are born male", "They are immune to anemone stings", "Made famous by Finding Nemo"]
  },
  {
    commonName: "Blue Whale",
    scientificName: "Balaenoptera musculus",
    description: "The largest animal ever known to exist on Earth.",
    habitat: "Open Ocean",
    oceanZone: "Epipelagic",
    conservationStatus: "Endangered",
    diet: "Filter feeder - krill, small schooling fish",
    averageSize: "24-30 meters",
    lifespan: "80-90 years",
    threats: ["Ship strikes", "Entanglement", "Noise pollution", "Climate change"],
    imageUrl: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c",
    funFacts: ["Heart weighs as much as a small car", "Can consume 4 tons of krill daily", "Tongue weighs like an elephant"]
  },
  {
    commonName: "Great White Shark",
    scientificName: "Carcharodon carcharias",
    description: "Apex predator with powerful jaws and incredible sensory abilities.",
    habitat: "Open Ocean, Coastal Waters",
    oceanZone: "Epipelagic",
    conservationStatus: "Vulnerable",
    diet: "Carnivore - seals, fish, rays, other sharks",
    averageSize: "4-6 meters",
    lifespan: "70+ years",
    threats: ["Overfishing", "Bycatch", "Habitat loss", "Climate change"],
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    funFacts: ["Can detect blood from 25 gallons away", "400+ million years old species", "Can breach completely out of water"]
  },
  {
    commonName: "Green Sea Turtle",
    scientificName: "Chelonia mydas",
    description: "Large marine reptile that navigates using Earth's magnetic field.",
    habitat: "Coastal Waters, Seagrass Beds",
    oceanZone: "Epipelagic",
    conservationStatus: "Endangered",
    diet: "Herbivore - seagrass, algae, marine plants",
    averageSize: "1-1.5 meters",
    lifespan: "80+ years",
    threats: ["Plastic pollution", "Coastal development", "Climate change", "Illegal harvesting"],
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
    funFacts: ["Can hold breath for 5 hours", "Return to birth beach to nest", "Sand temperature determines gender"]
  },
  {
    commonName: "Manta Ray",
    scientificName: "Mobula birostris",
    description: "Gentle giants with wingspans up to 29 feet and largest brain of any fish.",
    habitat: "Open ocean, coral reefs",
    oceanZone: "Epipelagic",
    conservationStatus: "Vulnerable",
    diet: "Filter feeder - plankton, small fish",
    averageSize: "4-7 meters wingspan",
    lifespan: "40+ years",
    threats: ["Overfishing", "Boat strikes", "Pollution", "Climate change"],
    imageUrl: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c",
    funFacts: ["Can recognize themselves in mirrors", "Unique spot patterns for ID", "Perform acrobatic leaps"]
  },
  {
    commonName: "Whale Shark",
    scientificName: "Rhincodon typus",
    description: "Largest fish in the ocean, growing up to 40 feet long.",
    habitat: "Open ocean, warm waters",
    oceanZone: "Epipelagic",
    conservationStatus: "Endangered",
    diet: "Filter feeder - plankton, small fish, fish eggs",
    averageSize: "10-12 meters",
    lifespan: "70-100 years",
    threats: ["Ship strikes", "Fishing nets", "Pollution", "Climate change"],
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
    funFacts: ["Unique spot patterns like fingerprints", "Can dive to 6,000 feet", "Filter 6,000 liters per hour"]
  },
  {
    commonName: "Common Octopus",
    scientificName: "Octopus vulgaris",
    description: "Highly intelligent cephalopod with remarkable problem-solving abilities.",
    habitat: "Rocky Reefs, Coral Reefs",
    oceanZone: "Epipelagic",
    conservationStatus: "Least Concern",
    diet: "Carnivore - crabs, fish, mollusks",
    averageSize: "30-90 cm",
    lifespan: "1-2 years",
    threats: ["Overfishing", "Habitat destruction", "Pollution"],
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
    funFacts: ["Have three hearts and blue blood", "Can solve complex puzzles", "Each arm has own neural network"]
  },
  {
    commonName: "Seahorse",
    scientificName: "Hippocampus",
    description: "Unique fish where males carry and give birth to young.",
    habitat: "Seagrass beds, coral reefs",
    oceanZone: "Epipelagic",
    conservationStatus: "Vulnerable",
    diet: "Carnivore - small crustaceans, plankton",
    averageSize: "2-30 cm",
    lifespan: "1-5 years",
    threats: ["Habitat loss", "Traditional medicine trade", "Pollution"],
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
    funFacts: ["Eyes move independently", "Males give birth to babies", "Change color in 0.3 seconds"]
  },
  {
    commonName: "Hammerhead Shark",
    scientificName: "Sphyrnidae",
    description: "Distinctive shark with flattened head extensions for enhanced senses.",
    habitat: "Tropical and warm temperate waters",
    oceanZone: "Epipelagic",
    conservationStatus: "Critically Endangered",
    diet: "Carnivore - fish, rays, other sharks",
    averageSize: "3-6 meters",
    lifespan: "20-30 years",
    threats: ["Overfishing", "Finning", "Habitat loss", "Bycatch"],
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
    funFacts: ["360-degree vision", "Detect electrical fields", "Form large schools during migration"]
  },
  {
    commonName: "Sea Otter",
    scientificName: "Enhydra lutris",
    description: "Marine mammal known for using tools and floating on backs.",
    habitat: "Kelp forests, coastal waters",
    oceanZone: "Epipelagic",
    conservationStatus: "Endangered",
    diet: "Carnivore - sea urchins, mollusks, crustaceans",
    averageSize: "1-1.5 meters",
    lifespan: "15-20 years",
    threats: ["Oil spills", "Pollution", "Climate change", "Predation"],
    imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7",
    funFacts: ["Densest fur in animal kingdom", "Use rocks as tools", "Hold hands while sleeping"]
  },
  {
    commonName: "Queen Angelfish",
    scientificName: "Holacanthus ciliaris",
    description: "Spectacular reef fish with intricate patterns and vibrant colors.",
    habitat: "Coral Reefs",
    oceanZone: "Epipelagic",
    conservationStatus: "Least Concern",
    diet: "Omnivore - sponges, algae, small invertebrates",
    averageSize: "30-45 cm",
    lifespan: "15-20 years",
    threats: ["Reef destruction", "Aquarium trade", "Pollution"],
    imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7",
    funFacts: ["Change colors to communicate", "Essential for reef health", "Unique patterns like fingerprints"]
  },
  {
    commonName: "Moon Jellyfish",
    scientificName: "Aurelia aurita",
    description: "Ancient marine organism surviving for over 500 million years.",
    habitat: "Open Waters, Coastal Areas",
    oceanZone: "Epipelagic",
    conservationStatus: "Least Concern",
    diet: "Carnivore - plankton, small fish, eggs",
    averageSize: "25-40 cm diameter",
    lifespan: "12-18 months",
    threats: ["Water pollution", "Climate change", "Overfishing of predators"],
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
    funFacts: ["95% water", "Existed before dinosaurs", "Can reproduce sexually and asexually"]
  }
];

// Ocean zones data
const realOceanZonesData: InsertOceanZone[] = [
  {
    name: "Epipelagic Zone (Sunlight Zone)",
    depth: "0-200 meters",
    characteristics: "Well-lit surface waters where photosynthesis occurs",
    temperature: "12-30°C",
    pressure: "1-20 atmospheres",
    lightLevel: "Bright sunlight to dim twilight",
    commonSpecies: ["Clownfish", "Tuna", "Dolphins", "Sea Turtles", "Sharks"]
  },
  {
    name: "Mesopelagic Zone (Twilight Zone)",
    depth: "200-1000 meters",
    characteristics: "Dim light zone with bioluminescent creatures",
    temperature: "5-12°C",
    pressure: "20-100 atmospheres",
    lightLevel: "Twilight to darkness",
    commonSpecies: ["Lanternfish", "Vampire Squid", "Hatchetfish", "Bristlemouth"]
  },
  {
    name: "Bathypelagic Zone (Midnight Zone)",
    depth: "1000-4000 meters",
    characteristics: "Complete darkness with bioluminescent predators",
    temperature: "2-5°C",
    pressure: "100-400 atmospheres",
    lightLevel: "Complete darkness",
    commonSpecies: ["Anglerfish", "Giant Squid", "Gulper Eel", "Vampire Squid"]
  }
];

// Conservation tips data
const realConservationTipsData: InsertConservationTip[] = [
  {
    title: "Reduce Plastic Use",
    description: "Use reusable bags, bottles, and containers to prevent ocean plastic pollution",
    category: "Pollution Prevention",
    impact: "High",
    difficulty: "Easy"
  },
  {
    title: "Choose Sustainable Seafood",
    description: "Support fisheries that use sustainable practices and avoid overfished species",
    category: "Sustainable Consumption",
    impact: "High",
    difficulty: "Medium"
  },
  {
    title: "Support Marine Protected Areas",
    description: "Advocate for and support the creation of marine sanctuaries and protected zones",
    category: "Habitat Protection",
    impact: "Very High",
    difficulty: "Medium"
  }
];

// Research papers data
const realResearchPapersData: InsertResearchPaper[] = [
  {
    title: "New Deep-Sea Species Discovered in Mariana Trench",
    summary: "Scientists have identified three new species of amphipods living at depths exceeding 10,000 meters, expanding our understanding of life in Earth's deepest places.",
    source: "Nature Ocean Science",
    publishDate: new Date("2024-01-15"),
    url: "https://example.com/research1",
    tags: ["Deep Sea", "New Species", "Mariana Trench", "Amphipods"]
  },
  {
    title: "Revolutionary Coral Restoration Breakthrough",
    summary: "Marine biologists develop innovative techniques using heat-resistant coral varieties, achieving unprecedented 65% recovery rates in damaged reef ecosystems.",
    source: "Marine Biology International",
    publishDate: new Date("2024-01-12"),
    url: "https://example.com/research2",
    tags: ["Coral Restoration", "Climate Adaptation", "Reef Recovery", "Innovation"]
  },
  {
    title: "Whale Migration Routes Altered by Climate Change",
    summary: "Comprehensive 15-year tracking study reveals dramatic shifts in humpback whale migration patterns as ocean temperatures continue to rise globally.",
    source: "Oceanographic Research Quarterly",
    publishDate: new Date("2024-01-10"),
    url: "https://example.com/research3",
    tags: ["Whale Migration", "Climate Impact", "Marine Mammals", "Ocean Warming"]
  },
  {
    title: "Bioluminescent Plankton Discovery in Arctic Waters",
    summary: "Scientists document previously unknown species of bioluminescent plankton thriving in Arctic waters, providing new insights into polar marine ecosystems.",
    source: "Arctic Marine Research",
    publishDate: new Date("2024-01-08"),
    url: "https://example.com/research4",
    tags: ["Bioluminescence", "Arctic Ocean", "Plankton", "Marine Biodiversity"]
  },
  {
    title: "Microplastics Impact on Deep-Sea Food Chains",
    summary: "Groundbreaking research reveals how microplastics are infiltrating deep-sea food webs, affecting organisms at depths previously thought to be pristine.",
    source: "Environmental Marine Science",
    publishDate: new Date("2024-01-05"),
    url: "https://example.com/research5",
    tags: ["Microplastics", "Deep Sea", "Food Chain", "Ocean Pollution"]
  }
];

export async function seedMarineData(): Promise<void> {
  try {
    console.log("Seeding marine species data...");
    // Check if data already exists to prevent duplicates
    const existingSpecies = await storage.getAllMarineSpecies();
    if (existingSpecies.length === 0) {
      for (const species of realMarineSpeciesData) {
        await storage.createMarineSpecies(species);
      }
    }

    console.log("Seeding ocean zones data...");
    const existingZones = await storage.getAllOceanZones();
    if (existingZones.length === 0) {
      for (const zone of realOceanZonesData) {
        await storage.createOceanZone(zone);
      }
    }

    console.log("Seeding conservation tips data...");
    const existingTips = await storage.getAllConservationTips();
    if (existingTips.length === 0) {
      for (const tip of realConservationTipsData) {
        await storage.createConservationTip(tip);
      }
    }

    console.log("Seeding research papers data...");
    const existingPapers = await storage.getAllResearchPapers();
    if (existingPapers.length === 0) {
      for (const paper of realResearchPapersData) {
        await storage.createResearchPaper(paper);
      }
    }

    console.log("Marine data seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding marine data:", error);
    throw error;
  }
}

export { realMarineSpeciesData, realOceanZonesData, realConservationTipsData, realResearchPapersData };