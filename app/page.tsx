import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, Lightbulb, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent leading-tight">
              Ak_D Analytics
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium px-4">
              Advanced Student Performance Analytics & Risk Assessment
            </p>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Harness the power of machine learning to identify at-risk students, analyze performance patterns, and
            deliver personalized interventions. Our comprehensive platform provides actionable insights to improve
            educational outcomes.
          </p>

          <div className="pt-2 sm:pt-4">
            <Link href="/portal">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 group w-full xs:w-auto">
                Access Dashboard Portal
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto mt-16 sm:mt-20 md:mt-24 grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
            <CardHeader>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Classification Model</CardTitle>
              <CardDescription className="text-sm sm:text-base leading-relaxed">
                Advanced machine learning algorithms assess risk levels and identify students who may need additional
                support
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
            <CardHeader>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Clustering Analysis</CardTitle>
              <CardDescription className="text-sm sm:text-base leading-relaxed">
                Groups students by performance patterns across four risk levels, from minimal to high risk
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 sm:col-span-2 md:col-span-1">
            <CardHeader>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Recommendation System</CardTitle>
              <CardDescription className="text-sm sm:text-base leading-relaxed">
                Personalized interventions and actionable insights based on individual student data and risk assessment
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-12 sm:mt-16 md:mt-20">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <p className="text-center text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ak_D Analytics. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
