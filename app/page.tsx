import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, Lightbulb, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Ak_D Analytics
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              Advanced Student Performance Analytics & Risk Assessment
            </p>
          </div>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Harness the power of machine learning to identify at-risk students, analyze performance patterns, and
            deliver personalized interventions. Our comprehensive platform provides actionable insights to improve
            educational outcomes.
          </p>

          <div className="pt-4">
            <Link href="/portal">
              <Button size="lg" className="text-lg px-8 py-6 group">
                Access Dashboard Portal
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto mt-24 grid md:grid-cols-3 gap-6">
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Classification Model</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Advanced machine learning algorithms assess risk levels and identify students who may need additional
                support
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Clustering Analysis</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Groups students by performance patterns across four risk levels, from minimal to high risk
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Recommendation System</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Personalized interventions and actionable insights based on individual student data and risk assessment
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ak_D Analytics. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
