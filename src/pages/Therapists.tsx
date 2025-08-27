import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Star, Clock, DollarSign, Users, Search, Filter } from 'lucide-react';

interface Therapist {
  id: number;
  name: string;
  title: string;
  specializations: string[];
  rating: number;
  experience: string;
  location: string;
  price: string;
  availability: string;
  image: string;
  languages: string[];
  about: string;
  totalSessions: number;
}

const therapists: Therapist[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Clinical Psychologist",
    specializations: ["Anxiety", "Depression", "Trauma"],
    rating: 4.9,
    experience: "8 years",
    location: "New York, NY",
    price: "$120/session",
    availability: "Available Today",
    image: "/placeholder.svg",
    languages: ["English", "Spanish"],
    about: "Specialized in cognitive behavioral therapy with extensive experience in treating anxiety disorders.",
    totalSessions: 2500
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    title: "Licensed Therapist",
    specializations: ["Relationships", "Family Therapy", "LGBTQ+"],
    rating: 4.8,
    experience: "12 years",
    location: "Los Angeles, CA",
    price: "$150/session",
    availability: "Next available: Tomorrow",
    image: "/placeholder.svg",
    languages: ["English", "Mandarin"],
    about: "Compassionate approach to family dynamics and relationship counseling with multicultural sensitivity.",
    totalSessions: 3200
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    title: "Licensed Clinical Social Worker",
    specializations: ["Addiction", "Recovery", "Mental Health"],
    rating: 4.7,
    experience: "6 years",
    location: "Chicago, IL",
    price: "$110/session",
    availability: "Available Today",
    image: "/placeholder.svg",
    languages: ["English", "Spanish"],
    about: "Evidence-based treatment for substance abuse and dual diagnosis with a focus on holistic recovery.",
    totalSessions: 1800
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    title: "Psychiatrist",
    specializations: ["Bipolar Disorder", "Schizophrenia", "Medication Management"],
    rating: 4.9,
    experience: "15 years",
    location: "Boston, MA",
    price: "$200/session",
    availability: "Next available: Next Week",
    image: "/placeholder.svg",
    languages: ["English"],
    about: "Board-certified psychiatrist specializing in complex mental health conditions and medication optimization.",
    totalSessions: 4000
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    title: "Child Psychologist",
    specializations: ["Child Therapy", "ADHD", "Autism Spectrum"],
    rating: 4.8,
    experience: "10 years",
    location: "Seattle, WA",
    price: "$130/session",
    availability: "Available Today",
    image: "/placeholder.svg",
    languages: ["English"],
    about: "Specialized in developmental psychology with play therapy and behavioral intervention expertise.",
    totalSessions: 2200
  },
  {
    id: 6,
    name: "Dr. Ahmed Hassan",
    title: "Licensed Professional Counselor",
    specializations: ["Cultural Identity", "Immigration", "Stress Management"],
    rating: 4.6,
    experience: "7 years",
    location: "Houston, TX",
    price: "$100/session",
    availability: "Next available: Tomorrow",
    image: "/placeholder.svg",
    languages: ["English", "Arabic"],
    about: "Culturally competent therapy for diverse populations with focus on identity and adaptation challenges.",
    totalSessions: 1500
  }
];

const Therapists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const filteredTherapists = therapists.filter(therapist => {
    return (
      therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.specializations.some(spec => 
        spec.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ) &&
    (selectedSpecialization === "" || 
     therapist.specializations.includes(selectedSpecialization)) &&
    (selectedLocation === "" || 
     therapist.location.includes(selectedLocation)) &&
    (priceRange === "" || 
     (priceRange === "low" && parseInt(therapist.price.replace(/\D/g, '')) <= 120) ||
     (priceRange === "medium" && parseInt(therapist.price.replace(/\D/g, '')) > 120 && parseInt(therapist.price.replace(/\D/g, '')) <= 150) ||
     (priceRange === "high" && parseInt(therapist.price.replace(/\D/g, '')) > 150));
  });

  const allSpecializations = Array.from(
    new Set(therapists.flatMap(t => t.specializations))
  );

  const allLocations = Array.from(
    new Set(therapists.map(t => t.location.split(',')[1]?.trim() || t.location))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Find Your Therapist</h1>
              <p className="text-muted-foreground">Connect with licensed mental health professionals</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger>
                  <SelectValue placeholder="Specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Specializations</SelectItem>
                  {allSpecializations.map(spec => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  {allLocations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Prices</SelectItem>
                  <SelectItem value="low">Under $120</SelectItem>
                  <SelectItem value="medium">$120 - $150</SelectItem>
                  <SelectItem value="high">Over $150</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSpecialization("");
                  setSelectedLocation("");
                  setPriceRange("");
                }}
                className="w-full"
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Results */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredTherapists.length} of {therapists.length} therapists
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTherapists.map((therapist) => (
            <Card key={therapist.id} className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20">
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                    {therapist.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{therapist.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-2">{therapist.title}</p>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">{therapist.rating}</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{therapist.experience}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {therapist.specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {therapist.about}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {therapist.location}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-2" />
                    {therapist.price}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {therapist.availability}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    {therapist.totalSessions.toLocaleString()} sessions completed
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Book Session
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTherapists.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No therapists found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedSpecialization("");
                setSelectedLocation("");
                setPriceRange("");
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Therapists;