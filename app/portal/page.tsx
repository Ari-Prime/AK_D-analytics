"use client"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Lightbulb, AlertTriangle, Home } from "lucide-react"
import OverviewTab from "@/components/overview-tab"
import RecommendationsTab from "@/components/recommendations-tab"
import RiskPredictionTab from "@/components/risk-prediction-tab"

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Ak_D Analytics
            </h1>
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 h-auto p-1.5 bg-muted/50">
            <TabsTrigger
              value="overview"
              className="gap-2 py-3 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all hover:bg-background/50"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="gap-2 py-3 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all hover:bg-background/50"
            >
              <Lightbulb className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Recommendations</span>
            </TabsTrigger>
            <TabsTrigger
              value="risk"
              className="gap-2 py-3 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all hover:bg-background/50"
            >
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Risk Prediction</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="recommendations">
            <RecommendationsTab />
          </TabsContent>

          <TabsContent value="risk">
            <RiskPredictionTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
