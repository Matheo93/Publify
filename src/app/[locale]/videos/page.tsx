'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Play, 
  Clock, 
  ThumbsUp, 
  MessageCircle, 
  Share2,
  Edit,
  MoreVertical,
  ChevronRight,
  Search,
  Grid,
  List,
  ArrowUpRight,
  Calendar,
  Users,
  Globe,
} from 'lucide-react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import Navigation from '@/components/navigation';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const analyticsData = [
  { date: '2024-01', views: 1200, likes: 450, shares: 120, engagement: 32 },
  { date: '2024-02', views: 1800, likes: 670, shares: 230, engagement: 45 },
  { date: '2024-03', views: 2200, likes: 890, shares: 310, engagement: 51 },
];

const sampleVideos = [
  {
    id: 1,
    platform: 'tiktok',
    thumbnail: '/api/placeholder/320/180',
    title: "10 Pro Tips for Better Productivity",
    views: 15400,
    likes: 2300,
    shares: 450,
    comments: 230,
    duration: "3:45",
    createdAt: "2024-02-01",
    trend: "up",
    trendPercentage: 23,
    category: "Education",
    status: "published",
    hashtags: ["productivity", "tips", "learning"]
  },
  {
    id: 2,
    platform: 'youtube',
    thumbnail: '/api/placeholder/320/180',
    title: "5 Minutes Morning Routine",
    views: 8900,
    likes: 1200,
    shares: 280,
    comments: 145,
    duration: "5:12",
    createdAt: "2024-02-15",
    trend: "up",
    trendPercentage: 15,
    category: "Lifestyle",
    status: "scheduled",
    scheduledFor: "2024-03-20T09:00:00",
    hashtags: ["morning", "routine", "lifestyle"]
  },
];

interface GeographicData {
  country: string;
  viewers: number;
  percentage: number;
}

const geographicData: GeographicData[] = [
  { country: "France", viewers: 45000, percentage: 35 },
  { country: "États-Unis", viewers: 32000, percentage: 25 },
  { country: "Canada", viewers: 25000, percentage: 20 },
  { country: "Belgique", viewers: 15000, percentage: 12 },
  { country: "Suisse", viewers: 10000, percentage: 8 },
];

export default function VideoAnalyticsDashboard() {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('views');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Education', 'Lifestyle', 'Tech', 'Entertainment'];
  
  const filteredVideos = sampleVideos.filter(video => {
    if (selectedPlatform !== 'all' && video.platform !== selectedPlatform) return false;
    if (selectedCategory !== 'all' && video.category !== selectedCategory) return false;
    if (searchQuery && !video.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section avec recherche améliorée */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mes Vidéos</h1>
                <p className="mt-1 text-gray-500">Gérez et analysez vos contenus vidéos Raph le best </p>
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Rechercher une vidéo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <ArrowUpRight className="w-4 h-4" />
                  Importer une vidéo
                </button>
              </div>
            </div>

            {/* Filtres améliorés */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
              <div className="flex gap-4">
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  <option value="all">Toutes les plateformes</option>
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                  <option value="instagram">Instagram</option>
                </select>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'Toutes les catégories' : category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-50'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-50'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Analytics Overview Cards avec design amélioré */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { title: "Total des vues", value: "124.8K", icon: Play, change: "+12.3%", trend: "up" },
              { title: "Temps de visionnage", value: "3.2K heures", icon: Clock, change: "+8.1%", trend: "up" },
              { title: "Taux d'engagement", value: "4.8%", icon: ThumbsUp, change: "+2.4%", trend: "up" },
              { title: "Nouveaux abonnés", value: "1.2K", icon: TrendingUp, change: "+15.6%", trend: "up" }
            ].map((stat, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                    {stat.change}
                    <TrendingUp className="w-4 h-4 ml-1" />
                  </span>
                </div>
                <h3 className="text-2xl font-bold mt-4 text-gray-900">{stat.value}</h3>
                <p className="text-sm text-gray-500">{stat.title}</p>
              </Card>
            ))}
          </div>

          {/* Main Content Grid avec nouvelle mise en page */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste des vidéos avec nouveau design */}
            <div className="lg:col-span-2 space-y-6">
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {filteredVideos.map((video) => (
                  <Card key={video.id} className="p-4 hover:shadow-md transition-all">
                    <div className={`flex ${viewMode === 'grid' ? 'flex-col' : 'gap-4'}`}>
                      <div className="relative flex-shrink-0">
                        <div className={`relative ${viewMode === 'grid' ? 'aspect-video w-full' : 'w-40 h-24'}`}>
                          <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                          <span className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-1 rounded">
                            {video.duration}
                          </span>
                          {video.status === 'scheduled' && (
                            <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Programmé
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h3 className="font-medium text-gray-900 line-clamp-2">{video.title}</h3>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Play className="w-4 h-4" />
                                {video.views.toLocaleString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <ThumbsUp className="w-4 h-4" />
                                {video.likes.toLocaleString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                {video.comments.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {video.hashtags.map((tag, index) => (
                                <span 
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Edit className="w-4 h-4 text-gray-500" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Share2 className="w-4 h-4 text-gray-500" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            video.trend === 'up' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {video.trend === 'up' ? '↑' : '↓'} {video.trendPercentage}%
                          </span>
                          <span className="text-sm text-gray-500">
                            depuis 7 jours
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Section Analytics améliorée */}
            <div className="space-y-6">
              {/* Carte de Performance */}
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900">Performance</h3>
                    <p className="text-sm text-gray-500">Évolution des métriques clés</p>
                  </div>
                  <select 
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                    className="p-2 border rounded-lg text-sm"
                  >
                    <option value="7d">7 jours</option>
                    <option value="30d">30 jours</option>
                    <option value="90d">90 jours</option>
                  </select>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData}>
                      <defs>
                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false}
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        style={{ fontSize: '12px' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          background: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey={selectedMetric}
                        stroke="#2563eb"
                        strokeWidth={2}
                        fill="url(#colorViews)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-2 mt-4">
                  {['views', 'likes', 'shares', 'engagement'].map((metric) => (
                    <button
                      key={metric}
                      onClick={() => setSelectedMetric(metric)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedMetric === metric
                          ? 'bg-blue-100 text-blue-600 font-medium'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {metric.charAt(0).toUpperCase() + metric.slice(1)}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Carte des meilleures performances */}
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      Meilleures performances
                    </h3>
                    <p className="text-sm text-gray-500">Top videos du moment</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {filteredVideos.slice(0, 3).map((video, index) => (
                    <div 
                      key={index}
                      className="group flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="relative w-20 h-20">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                          {video.title}
                        </h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="flex items-center gap-1 text-sm text-gray-500">
                            <Play className="w-4 h-4" />
                            {video.views.toLocaleString()}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            video.trend === 'up'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {video.trend === 'up' ? '↑' : '↓'} {video.trendPercentage}%
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Carte d'analyse géographique */}
              <Card className="p-6">
                <div className="space-y-1 mb-6">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    Répartition géographique
                  </h3>
                  <p className="text-sm text-gray-500">Top pays par nombre de vues</p>
                </div>
                <div className="space-y-4">
                  {geographicData.map((data, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{data.country}</span>
                        <span className="font-medium text-gray-900">
                          {data.viewers.toLocaleString()} vues
                        </span>
                      </div>
                      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                          style={{ width: `${data.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Carte d'analyse démographique */}
              <Card className="p-6">
                <div className="space-y-1 mb-6">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Démographie
                  </h3>
                  <p className="text-sm text-gray-500">Répartition par âge</p>
                </div>
                <div className="space-y-4">
                  {[
                    { age: "18-24 ans", percentage: 45 },
                    { age: "25-34 ans", percentage: 35 },
                    { age: "35-44 ans", percentage: 20 }
                  ].map((ageGroup, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{ageGroup.age}</span>
                        <span className="font-medium text-gray-900">
                          {ageGroup.percentage}%
                        </span>
                      </div>
                      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                          style={{ width: `${ageGroup.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}