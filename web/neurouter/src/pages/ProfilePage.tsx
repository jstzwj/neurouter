"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { CalendarDays, MapPin, Users, Star, ExternalLink, Plus, UserPlus, Mail } from "lucide-react"
import ActivityCalendar from "../components/profile/ActivityCalendar"
import AppCard from "../components/profile/AppCard"
import TeamCard from "../components/profile/TeamCard"
import FollowerCard from "../components/profile/FollowerCard"
import { generateMockActivityData } from "../utils/mockData"

interface UserProfile {
  id: string
  name: string
  username: string
  avatar?: string
  bio: string
  location?: string
  website?: string
  email?: string
  joinedDate: string
  isFollowing: boolean
  stats: {
    followers: number
    following: number
    apps: number
    stars: number
    apiCalls: number
  }
}

interface App {
  id: string
  name: string
  description: string
  isPrivate: boolean
  stars: number
  forks: number
  lastUpdated: string
  language?: string
}

interface Team {
  id: string
  name: string
  avatar?: string
  role: string
  memberCount: number
}

interface Follower {
  id: string
  name: string
  username: string
  avatar?: string
  bio: string
  isFollowing: boolean
}

export default function ProfilePage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("overview")
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [apps, setApps] = useState<App[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [followers, setFollowers] = useState<Follower[]>([])
  const [following, setFollowing] = useState<Follower[]>([])
  const [activityData, setActivityData] = useState<{ date: string; count: number }[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, we would fetch the user profile from an API
    // For demo purposes, we'll use mock data
    const fetchUserProfile = async () => {
      setIsLoading(true)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock user profile data
      const mockUserProfile: UserProfile = {
        id: "1",
        name: "Alex Johnson",
        username: "alexj",
        avatar: "/diverse-group.png",
        bio: "AI Engineer and LLM enthusiast. Building tools for the future of AI.",
        location: "San Francisco, CA",
        website: "https://alexj.dev",
        email: "alex@example.com",
        joinedDate: "2023-01-15",
        isFollowing: false,
        stats: {
          followers: 128,
          following: 87,
          apps: 15,
          stars: 342,
          apiCalls: 15782,
        },
      }

      // Mock apps data
      const mockApps: App[] = [
        {
          id: "1",
          name: "ai-chat-assistant",
          description: "A customizable chat assistant powered by multiple LLMs with advanced context handling",
          isPrivate: false,
          stars: 124,
          forks: 32,
          lastUpdated: "2024-05-01",
          language: "TypeScript",
        },
        {
          id: "2",
          name: "document-analyzer",
          description: "Extract insights from documents using LLMs and vector embeddings",
          isPrivate: false,
          stars: 87,
          forks: 15,
          lastUpdated: "2024-04-22",
          language: "Python",
        },
        {
          id: "3",
          name: "llm-router",
          description: "Intelligent routing between different LLM providers based on cost and performance",
          isPrivate: false,
          stars: 56,
          forks: 8,
          lastUpdated: "2024-04-15",
          language: "TypeScript",
        },
        {
          id: "4",
          name: "personal-assistant",
          description: "Private app for personal productivity and task management",
          isPrivate: true,
          stars: 0,
          forks: 0,
          lastUpdated: "2024-05-10",
          language: "JavaScript",
        },
        {
          id: "5",
          name: "code-reviewer",
          description: "AI-powered code review assistant that provides feedback on pull requests",
          isPrivate: false,
          stars: 75,
          forks: 12,
          lastUpdated: "2024-03-28",
          language: "TypeScript",
        },
      ]

      // Mock teams data
      const mockTeams: Team[] = [
        {
          id: "1",
          name: "AI Research Team",
          avatar: "/abstract-ai-network.png",
          role: "Member",
          memberCount: 8,
        },
        {
          id: "2",
          name: "NeuRouter Core",
          avatar: "/abstract-geometric-nr.png",
          role: "Contributor",
          memberCount: 12,
        },
        {
          id: "3",
          name: "Documentation",
          avatar: "/placeholder.svg?key=ow0a5",
          role: "Maintainer",
          memberCount: 5,
        },
      ]

      // Mock followers data
      const mockFollowers: Follower[] = [
        {
          id: "1",
          name: "Sarah Chen",
          username: "sarahc",
          avatar: "/diverse-woman-portrait.png",
          bio: "ML Engineer | Working on LLM applications",
          isFollowing: true,
        },
        {
          id: "2",
          name: "Michael Rodriguez",
          username: "mrodriguez",
          avatar: "/thoughtful-man.png",
          bio: "Full-stack developer with focus on AI integration",
          isFollowing: false,
        },
        {
          id: "3",
          name: "Priya Sharma",
          username: "priyasharma",
          avatar: "/diverse-woman-portrait.png",
          bio: "AI Researcher | PhD Candidate",
          isFollowing: true,
        },
        {
          id: "4",
          name: "David Kim",
          username: "dkim",
          avatar: "/diverse-group-friends.png",
          bio: "Building the future of AI tools",
          isFollowing: false,
        },
      ]

      // Mock following data
      const mockFollowing: Follower[] = [
        {
          id: "1",
          name: "Sarah Chen",
          username: "sarahc",
          avatar: "/diverse-woman-portrait.png",
          bio: "ML Engineer | Working on LLM applications",
          isFollowing: true,
        },
        {
          id: "5",
          name: "Emma Wilson",
          username: "ewilson",
          avatar: "/diverse-group-women.png",
          bio: "AI Ethics Researcher",
          isFollowing: true,
        },
        {
          id: "6",
          name: "James Taylor",
          username: "jtaylor",
          avatar: "/diverse-group-friends.png",
          bio: "LLM Specialist | Working on RAG applications",
          isFollowing: true,
        },
      ]

      // Generate mock activity data
      const mockActivityData = generateMockActivityData(365, 25)

      setUserProfile(mockUserProfile)
      setApps(mockApps)
      setTeams(mockTeams)
      setFollowers(mockFollowers)
      setFollowing(mockFollowing)
      setActivityData(mockActivityData)
      setIsLoading(false)
    }

    fetchUserProfile()
  }, [])

  const handleFollowUser = () => {
    if (!userProfile) return

    setUserProfile({
      ...userProfile,
      isFollowing: !userProfile.isFollowing,
      stats: {
        ...userProfile.stats,
        followers: userProfile.isFollowing ? userProfile.stats.followers - 1 : userProfile.stats.followers + 1,
      },
    })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">User not found</h1>
          <p className="mb-6">The user profile you are looking for does not exist or has been removed.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left sidebar */}
        <div className="w-full md:w-1/4">
          <div className="sticky top-20">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-64 w-64 mb-4">
                {userProfile.avatar ? (
                  <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
                ) : (
                  <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                )}
              </Avatar>
              <h1 className="text-2xl font-bold">{userProfile.name}</h1>
              <h2 className="text-xl text-muted-foreground mb-2">@{userProfile.username}</h2>
              <p className="mb-4">{userProfile.bio}</p>

              <div className="flex gap-2 w-full">
                <Button
                  className="flex-1"
                  variant={userProfile.isFollowing ? "outline" : "default"}
                  onClick={handleFollowUser}
                >
                  {userProfile.isFollowing ? (
                    <>Following</>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Follow
                    </>
                  )}
                </Button>
                <Button variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {userProfile.location && (
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{userProfile.location}</span>
                </div>
              )}

              {userProfile.email && (
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{userProfile.email}</span>
                </div>
              )}

              {userProfile.website && (
                <div className="flex items-center text-sm">
                  <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a
                    href={userProfile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {userProfile.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}

              <div className="flex items-center text-sm">
                <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>
                  Joined{" "}
                  {new Date(userProfile.joinedDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Teams</h3>
              <div className="space-y-3">
                {teams.map((team) => (
                  <TeamCard key={team.id} team={team} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex gap-6">
              <div className="flex items-center gap-1">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">{userProfile.stats.followers}</span>
                <span className="text-muted-foreground">followers</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">{userProfile.stats.following}</span>
                <span className="text-muted-foreground">following</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">{userProfile.stats.stars}</span>
              </div>
            </div>

            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New App
            </Button>
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="apps">
                Apps <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">{apps.length}</span>
              </TabsTrigger>
              <TabsTrigger value="followers">
                Followers <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">{followers.length}</span>
              </TabsTrigger>
              <TabsTrigger value="following">
                Following <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">{following.length}</span>
              </TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Call Activity</CardTitle>
                  <CardDescription>Your API call activity over the past year</CardDescription>
                </CardHeader>
                <CardContent>
                  <ActivityCalendar data={activityData} />
                  <div className="flex justify-end mt-2 text-sm text-muted-foreground">
                    <span>{userProfile.stats.apiCalls.toLocaleString()} API calls in the last year</span>
                  </div>
                </CardContent>
              </Card>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Popular Apps</h2>
                  <Button variant="link" onClick={() => setActiveTab("apps")}>
                    View all
                  </Button>
                </div>
                <div className="space-y-4">
                  {apps.slice(0, 3).map((app) => (
                    <AppCard key={app.id} app={app} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="apps" className="space-y-4 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">All Apps</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{apps.length} apps</span>
                </div>
              </div>
              <div className="space-y-4">
                {apps.map((app) => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="followers" className="space-y-4 mt-6">
              <h2 className="text-xl font-semibold mb-4">Followers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {followers.map((follower) => (
                  <FollowerCard key={follower.id} user={follower} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="following" className="space-y-4 mt-6">
              <h2 className="text-xl font-semibold mb-4">Following</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {following.map((user) => (
                  <FollowerCard key={user.id} user={user} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Call Activity</CardTitle>
                  <CardDescription>Your API call activity over the past year</CardDescription>
                </CardHeader>
                <CardContent>
                  <ActivityCalendar data={activityData} />
                  <div className="flex justify-end mt-2 text-sm text-muted-foreground">
                    <span>{userProfile.stats.apiCalls.toLocaleString()} API calls in the last year</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
