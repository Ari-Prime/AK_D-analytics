"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Loader2, User, AlertCircle, AlertTriangle, CheckCircle } from "lucide-react"

const API_BASE = "https://student-performance-api-7xmi.onrender.com"

interface Recommendation {
  category: string
  issue: string
  recommendation: string
}

interface StudentRecommendation {
  StudentID: string
  risk_factors: string[]
  recommendations: Recommendation[]
  next_steps: string[]
}

export default function RecommendationsTab() {
  const [studentId, setStudentId] = useState("")
  const [data, setData] = useState<StudentRecommendation | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  const handleSearch = async () => {
    if (!studentId) return

    try {
      setLoading(true)
      setError(null)
      setNotFound(false)
      setData(null)

      const url = `${API_BASE}/api/recommendations/${studentId}`

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      if (res.status === 404) {
        setNotFound(true)
        return
      }

      if (!res.ok) {
        throw new Error(`Failed to fetch recommendations: ${res.status}`)
      }

      const result = await res.json()
      setData(result)
    } catch (err) {
      console.error("[v0] Error fetching recommendations:", err)
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 max-w-full sm:max-w-4xl mx-auto">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg md:text-xl">Student Recommendations</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Enter a student ID to view personalized recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col xs:flex-row gap-2">
            <Input
              type="number"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 text-sm sm:text-base"
            />
            <Button
              onClick={handleSearch}
              disabled={loading || !studentId.trim()}
              className="text-sm sm:text-base w-full xs:w-auto"
            >
              {loading ? (
                <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
              ) : (
                <>
                  <Search className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Error State */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="py-10">
            <div className="flex flex-col items-center gap-2 text-center">
              <AlertCircle className="h-10 w-10 text-destructive" />
              <p className="text-destructive font-medium">Error: {error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Not Found State */}
      {notFound && (
        <Card className="border-orange-500/50">
          <CardContent className="py-10">
            <div className="flex flex-col items-center gap-2 text-center">
              <AlertCircle className="h-10 w-10 text-orange-500" />
              <p className="text-orange-500 font-medium">Student ID not found in database</p>
              <p className="text-sm text-muted-foreground">Please check the ID and try again</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {data && (
        <div className="space-y-4 sm:space-y-6">
          {/* Student Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
                Student ID: {data.StudentID}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.risk_factors && data.risk_factors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-orange-500">
                    <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />
                    <p className="font-semibold text-sm sm:text-base">Identified Risk Factors</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {data.risk_factors.map((factor, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-xs"
                      >
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {data.recommendations && data.recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg md:text-xl">Personalized Recommendations</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Suggested interventions based on student data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {data.recommendations.map((rec, idx) => (
                    <div key={idx} className="border rounded-lg p-3 sm:p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
                          {rec.category}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground">Issue:</p>
                        <p className="text-xs sm:text-sm">{rec.issue}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground">Recommendation:</p>
                        <p className="text-xs sm:text-sm font-semibold">{rec.recommendation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {data.next_steps && data.next_steps.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  Next Steps
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">Action items to support this student</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 sm:space-y-3">
                  {data.next_steps.map((step, idx) => (
                    <li key={idx} className="flex gap-2 sm:gap-3">
                      <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs sm:text-sm font-semibold mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-foreground leading-relaxed flex-1 text-xs sm:text-sm">{step}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
