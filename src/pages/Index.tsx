import React, { useState, useMemo } from 'react';
import { Check, Plus, Info, ShoppingCart, Mail, Save, MessageSquarePlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

interface Feature {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'bug-fix' | 'feature' | 'enhancement';
  category: string;
  popular?: boolean;
  recommended?: boolean;
}

const features: Feature[] = [
  {
    id: '1',
    title: 'Mobile Friendly Design & Onboarding Process',
    description: 'Optimize the entire onboarding experience for mobile devices with responsive design.',
    price: 0,
    type: 'enhancement',
    category: 'UI/UX'
  },
  {
    id: '3',
    title: 'Google My Business Integration',
    description: 'Allow users to import business details directly from their Google My Business profile.',
    price: 200,
    type: 'feature',
    category: 'Integrations',
    popular: true
  },
  {
    id: '2',
    title: 'Fix Website Input Field Domain Validation',
    description: 'Ensure website input fields properly accept and validate domain formats.',
    price: 0,
    type: 'bug-fix',
    category: 'Core Functionality'
  },
  {
    id: '4',
    title: 'AI Business Description Generator',
    description: 'Generate compelling business descriptions using AI based on minimal user input.',
    price: 50,
    type: 'feature',
    category: 'AI Tools',
    recommended: true
  },
  {
    id: '5',
    title: 'Business FAQ Copy-Paste Feature',
    description: 'Enable users to easily insert pre-written FAQ content into their business profiles.',
    price: 0,
    type: 'feature',
    category: 'Content Management'
  },
  {
    id: '16',
    title: 'Call Transfer to Me',
    description: 'Allow business owners to specify immediate call transfers when specific scenarios occur during AI calls.',
    price: 100,
    type: 'feature',
    category: 'Call Management'
  },
  {
    id: '6',
    title: 'Fix Back Button Data Persistence',
    description: 'Prevent loss of previously entered data when users navigate back.',
    price: 0,
    type: 'bug-fix',
    category: 'Core Functionality'
  },
  {
    id: '17',
    title: 'SMS Notifications for Call Events',
    description: 'Configure SMS alerts to notify business owners when specific call events or scenarios occur.',
    price: 200,
    type: 'feature',
    category: 'Notifications'
  },
  {
    id: '7',
    title: 'Agent Actions Configuration Section',
    description: 'Add interface for users to define what actions their AI agent should perform.',
    price: 0,
    type: 'feature',
    category: 'Agent Configuration'
  },
  {
    id: '12',
    title: 'Admin Dashboard',
    description: 'Comprehensive admin panel to manage users, businesses, phone numbers, and agents.',
    price: 400,
    type: 'feature',
    category: 'Administration',
    popular: true
  },
  {
    id: '8',
    title: 'Phone Number Format Enhancement',
    description: 'Display phone numbers in proper format (XXX) XXX-XXXX in review pages.',
    price: 0,
    type: 'enhancement',
    category: 'UI/UX'
  },
  {
    id: '18',
    title: 'Know Your Customer',
    description: 'AI remembers caller details from previous calls and personalizes greetings and interactions based on call history.',
    price: 500,
    type: 'feature',
    category: 'AI Tools',
    popular: true
  },
  {
    id: '9',
    title: 'Office Hours Display Fix',
    description: 'Improve how business hours are shown and formatted on business pages.',
    price: 0,
    type: 'bug-fix',
    category: 'Core Functionality'
  },
  {
    id: '15',
    title: 'Subscription & Billing System',
    description: 'Complete subscription management with billing and call limit enforcement based on plans.',
    price: 600,
    type: 'feature',
    category: 'Billing',
    recommended: true
  },
  {
    id: '10',
    title: 'Editable Onboarding Settings',
    description: 'Make all onboarding inputs (voice, business info, agent settings) editable post-setup.',
    price: 0,
    type: 'enhancement',
    category: 'User Management'
  },
  {
    id: '11',
    title: 'Enhanced Agent Call Flow',
    description: 'Improve agent conversation flow and fix abrupt call terminations during message taking.',
    price: 0,
    type: 'enhancement',
    category: 'Agent Performance'
  },
  {
    id: '13',
    title: 'Dashboard Design Enhancement',
    description: 'Improve overall dashboard design and user experience with modern UI patterns.',
    price: 0,
    type: 'enhancement',
    category: 'UI/UX'
  },
  {
    id: '14',
    title: 'Error Messaging System',
    description: 'Implement comprehensive error messages for failed operations and system issues.',
    price: 0,
    type: 'feature',
    category: 'User Experience'
  }
];

const Index = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());
  const [featureComments, setFeatureComments] = useState<Record<string, string>>({});
  const [showCommentInput, setShowCommentInput] = useState<Record<string, boolean>>({});
  const [customRequirements, setCustomRequirements] = useState('');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['all', ...Array.from(new Set(features.map(f => f.category)))];

  const filteredFeatures = useMemo(() => {
    if (filterCategory === 'all') return features;
    return features.filter(f => f.category === filterCategory);
  }, [filterCategory]);

  const selectedFeaturesData = useMemo(() => {
    return features.filter(f => selectedFeatures.has(f.id));
  }, [selectedFeatures]);

  const totalCost = useMemo(() => {
    return selectedFeaturesData.reduce((sum, feature) => sum + feature.price, 0);
  }, [selectedFeaturesData]);

  const toggleFeature = (featureId: string) => {
    const newSelected = new Set(selectedFeatures);
    if (newSelected.has(featureId)) {
      newSelected.delete(featureId);
    } else {
      newSelected.add(featureId);
    }
    setSelectedFeatures(newSelected);
  };

  const getTypeColor = (type: Feature['type']) => {
    switch (type) {
      case 'bug-fix':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'feature':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'enhancement':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const toggleCommentInput = (featureId: string) => {
    setShowCommentInput(prev => ({
      ...prev,
      [featureId]: !prev[featureId]
    }));
  };

  const updateFeatureComment = (featureId: string, comment: string) => {
    setFeatureComments(prev => ({
      ...prev,
      [featureId]: comment
    }));
  };

  const handleSaveEstimate = () => {
    if (!contactInfo.email) {
      toast({
        title: "Email Required",
        description: "Please provide your email to save the estimate.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Estimate Saved!",
      description: "Your feature selection has been saved and will be sent to your email.",
    });
  };

  const sendToWebhook = async (data: any) => {
    const webhookUrl = "https://ayra.app.n8n.cloud/webhook/f0b379d5-af88-41bb-9b58-e3381bcaeb42";
    
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Data sent to webhook successfully");
        return true;
      } else {
        console.error("Failed to send data to webhook:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Error sending data to webhook:", error);
      return false;
    }
  };

  const handleConfirmSelection = async () => {
    if (selectedFeatures.size === 0) {
      toast({
        title: "No Features Selected",
        description: "Please select at least one feature to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Prepare the data package
    const packageData = {
      timestamp: new Date().toISOString(),
      projectInfo: {
        name: contactInfo.name || "Not provided",
        email: contactInfo.email || "Not provided", 
        projectName: contactInfo.company || "Not provided"
      },
      selectedFeatures: selectedFeaturesData.map(feature => ({
        id: feature.id,
        title: feature.title,
        description: feature.description,
        price: feature.price,
        type: feature.type,
        category: feature.category,
        comment: featureComments[feature.id] || null,
        popular: feature.popular || false,
        recommended: feature.recommended || false
      })),
      nonSelectedFeatures: features
        .filter(feature => !selectedFeatures.has(feature.id))
        .map(feature => ({
          id: feature.id,
          title: feature.title,
          description: feature.description,
          price: feature.price,
          type: feature.type,
          category: feature.category,
          popular: feature.popular || false,
          recommended: feature.recommended || false
        })),
      commentsAndNotes: customRequirements || null,
      summary: {
        totalSelectedFeatures: selectedFeaturesData.length,
        totalCost: totalCost,
        featuresBreakdown: {
          freeFeatures: selectedFeaturesData.filter(f => f.price === 0).length,
          paidFeatures: selectedFeaturesData.filter(f => f.price > 0).length,
          bugFixes: selectedFeaturesData.filter(f => f.type === 'bug-fix').length,
          features: selectedFeaturesData.filter(f => f.type === 'feature').length,
          enhancements: selectedFeaturesData.filter(f => f.type === 'enhancement').length
        }
      }
    };

    console.log("Sending package data:", packageData);

    const success = await sendToWebhook(packageData);

    if (success) {
      toast({
        title: "Selection Confirmed!",
        description: "Your requirements have been packaged and sent successfully",
      });
    } else {
      toast({
        title: "Submission Failed",
        description: "There was an error sending your selection. Please try again.",
        variant: "destructive"
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Helpfull AI Features Log
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Easy to Navigate Interactive Form to track MVP V2 Features and Fixes.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={filterCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterCategory(category)}
                    className="capitalize"
                  >
                    {category === 'all' ? 'All Features' : category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {filteredFeatures.map((feature) => (
                <Card 
                  key={feature.id}
                  className={`relative transition-all duration-200 hover:shadow-lg ${
                    selectedFeatures.has(feature.id) 
                      ? 'ring-2 ring-blue-500 shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1" onClick={() => toggleFeature(feature.id)} style={{ cursor: 'pointer' }}>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`text-xs ${getTypeColor(feature.type)}`}>
                            {feature.type.replace('-', ' ')}
                          </Badge>
                          {feature.popular && (
                            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                              Popular
                            </Badge>
                          )}
                          {feature.recommended && (
                            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                              Recommended
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg leading-tight">
                          {feature.title}
                        </CardTitle>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {feature.price === 0 ? 'FREE' : `$${feature.price}`}
                          </div>
                          {feature.price > 0 && (
                            <div className="text-xs text-gray-500">one-time</div>
                          )}
                        </div>
                        <div 
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                            selectedFeatures.has(feature.id)
                              ? 'bg-blue-500 border-blue-500 text-white'
                              : 'border-gray-300'
                          }`}
                          onClick={() => toggleFeature(feature.id)}
                        >
                          {selectedFeatures.has(feature.id) && <Check className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-gray-600 mb-3">
                      {feature.description}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {feature.category}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCommentInput(feature.id)}
                        className="text-blue-600 hover:text-blue-700 p-1 h-auto"
                      >
                        <MessageSquarePlus className="w-4 h-4 mr-1" />
                        Add Comment
                      </Button>
                    </div>
                    {showCommentInput[feature.id] && (
                      <div className="mt-3">
                        <Textarea
                          placeholder="Add specific notes or customization requests for this feature..."
                          value={featureComments[feature.id] || ''}
                          onChange={(e) => updateFeatureComment(feature.id, e.target.value)}
                          rows={3}
                          className="text-sm"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Comments and Notes Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Comments and Notes to Consider
                </CardTitle>
                <CardDescription>
                  Describe any additional features or customizations you need that aren't listed above.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe your custom requirements, integrations, or specific business needs..."
                  value={customRequirements}
                  onChange={(e) => setCustomRequirements(e.target.value)}
                  rows={4}
                  className="w-full"
                />
              </CardContent>
            </Card>

            {/* Package the Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Package the Requirements</CardTitle>
                <CardDescription>
                  Provide your details to receive the estimate and get contacted by our team.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="company">Project Name</Label>
                  <Input
                    id="company"
                    value={contactInfo.company}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Your project name"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Your Selection
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedFeaturesData.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No features selected yet.
                    <br />
                    Click on features to add them.
                  </p>
                ) : (
                  <>
                    <div className="space-y-3 mb-6">
                      {selectedFeaturesData.map(feature => (
                        <div key={feature.id} className="space-y-2">
                          <div className="flex justify-between items-start text-sm">
                            <div className="flex-1 pr-2">
                              <div className="font-medium">{feature.title}</div>
                              <Badge className={`text-xs mt-1 ${getTypeColor(feature.type)}`}>
                                {feature.type.replace('-', ' ')}
                              </Badge>
                            </div>
                            <div className="font-bold text-blue-600">
                              {feature.price === 0 ? 'FREE' : `$${feature.price}`}
                            </div>
                          </div>
                          {featureComments[feature.id] && (
                            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                              <strong>Note:</strong> {featureComments[feature.id]}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Selected Features:</span>
                        <span>{selectedFeaturesData.length}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Cost:</span>
                        <span className="text-blue-600">${totalCost}</span>
                      </div>
                      {totalCost > 0 && (
                        <p className="text-xs text-gray-500">One-time setup cost</p>
                      )}
                    </div>

                    <div className="space-y-3 mt-6">
                      <Button 
                        onClick={handleSaveEstimate}
                        variant="outline" 
                        className="w-full"
                        disabled={!contactInfo.email}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Estimate
                      </Button>
                      
                      <Button 
                        onClick={handleConfirmSelection}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isSubmitting}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        {isSubmitting ? 'Sending...' : 'Confirm Selection'}
                      </Button>
                    </div>

                    {customRequirements && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs font-medium text-blue-800 mb-1">Comments and Notes:</p>
                        <p className="text-xs text-blue-700">
                          {customRequirements.substring(0, 100)}
                          {customRequirements.length > 100 && '...'}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
