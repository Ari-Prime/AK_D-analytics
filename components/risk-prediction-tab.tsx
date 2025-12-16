"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, Loader2, Search, Users } from "lucide-react"

const API_BASE = "https://student-performance-api-7xmi.onrender.com"

interface ClusterData {
  clusters: {
    Risk_Level_0: number
    Risk_Level_1: number
    Risk_Level_2: number
    Risk_Level_3: number
  }
  cluster_data: any[]
}

interface RiskPrediction {
  StudentID: number
  GPA: number
  StudyTimeWeekly: number
  Absences: number
  RiskProbability: number
  AtRisk: boolean
}

export default function RiskPredictionTab() {
  const [clusterData, setClusterData] = useState<ClusterData | null>(null)
  const [predictions, setPredictions] = useState<RiskPrediction[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [predictLoading, setPredictLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchClusterData()
  }, [])

  const fetchClusterData = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await fetch(`${API_BASE}/api/clustering`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch cluster data: ${res.status}`)
      }

      const data = await res.json()
      setClusterData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyze = async () => {
    try {
      setPredictLoading(true)
      setError(null)

      const res = await fetch(`${API_BASE}/api/risk-prediction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      if (!res.ok) {
        throw new Error(`Failed to analyze students: ${res.status}`)
      }

      const data = await res.json()
      setPredictions(data.all_students || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setPredictLoading(false)
    }
  }

  const filteredPredictions = useMemo(() => {
    if (!predictions || !searchQuery) return predictions

    const query = searchQuery.toLowerCase()
    return predictions.filter(
      (p) =>
        p.StudentID.toString().includes(query) || (p.AtRisk ? "At Risk" : "Not At Risk").toLowerCase().includes(query),
    )
  }, [predictions, searchQuery])

  const getRiskColor = (atRisk: boolean) => {
    return atRisk
      ? "bg-red-500/10 text-red-500 border-red-500/20"
      : "bg-green-500/10 text-green-500 border-green-500/20"
  }

  const totalStudents = clusterData ? Object.values(clusterData.clusters).reduce((sum, count) => sum + count, 0) : 0

  const clusterCards = [
    { level: "Risk_Level_0", label: "Minimal Risk", color: "border-blue-500/50 bg-blue-500/5" },
    { level: "Risk_Level_1", label: "Low Risk", color: "border-green-500/50 bg-green-500/5" },
    { level: "Risk_Level_2", label: "Medium Risk", color: "border-orange-500/50 bg-orange-500/5" },
    { level: "Risk_Level_3", label: "High Risk", color: "border-red-500/50 bg-red-500/5" },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Cluster Distribution Section */}
      <div className="space-y-3 sm:space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Cluster Distribution</h2>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm">Student grouping by risk level</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : clusterData ? (
          <div className="grid gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
            {clusterCards.map((card, idx) => {
              const count = clusterData.clusters[card.level as keyof typeof clusterData.clusters] || 0
              const percentage = totalStudents > 0 ? ((count / totalStudents) * 100).toFixed(1) : "0.0"
              return (
                <Card key={idx} className={`border-2 ${card.color}`}>
                  <CardHeader className="pb-2 sm:pb-3">
                    <CardTitle className="text-xs sm:text-sm font-medium">{card.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl sm:text-3xl font-bold">{count.toLocaleString()}</div>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">{percentage}% of students</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : error ? (
          <Card className="border-destructive">
            <CardContent className="py-10">
              <p className="text-center text-destructive text-sm">Error: {error}</p>
            </CardContent>
          </Card>
        ) : null}
      </div>

      {/* Risk Prediction Section */}
      <div className="space-y-3 sm:space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Risk Prediction</h2>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm">Analyze all students for risk assessment</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg md:text-xl">Analyze Students</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Run risk assessment on all students</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleAnalyze}
              disabled={predictLoading}
              size="lg"
              className="w-full xs:w-auto text-sm sm:text-base"
            >
              {predictLoading ? (
                <>
                  <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Analyze All Students
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {predictions && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                Risk Assessment Results
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {(predictions?.length ?? 0).toLocaleString()} students analyzed
              </CardDescription>
              <div className="pt-3 sm:pt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by Student ID or Risk Level..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 sm:pl-10 text-sm sm:text-base"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto max-h-[400px] sm:max-h-[500px] md:max-h-[600px] overflow-y-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-card z-10">
                    <TableRow>
                      <TableHead className="font-semibold text-xs sm:text-sm whitespace-nowrap">Student ID</TableHead>
                      <TableHead className="font-semibold text-xs sm:text-sm whitespace-nowrap">GPA</TableHead>
                      <TableHead className="font-semibold text-xs sm:text-sm whitespace-nowrap">
                        Study Time (h)
                      </TableHead>
                      <TableHead className="font-semibold text-xs sm:text-sm whitespace-nowrap">Absences</TableHead>
                      <TableHead className="font-semibold text-xs sm:text-sm whitespace-nowrap">
                        Risk Probability
                      </TableHead>
                      <TableHead className="font-semibold text-xs sm:text-sm whitespace-nowrap">Risk Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPredictions && filteredPredictions.length > 0 ? (
                      filteredPredictions.map((pred, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-mono text-xs sm:text-sm">{pred.StudentID ?? "N/A"}</TableCell>
                          <TableCell className="text-xs sm:text-sm">{(pred.GPA ?? 0).toFixed(2)}</TableCell>
                          <TableCell className="text-xs sm:text-sm">{(pred.StudyTimeWeekly ?? 0).toFixed(1)}</TableCell>
                          <TableCell className="text-xs sm:text-sm">{pred.Absences ?? 0}</TableCell>
                          <TableCell className="text-xs sm:text-sm">
                            {(pred.RiskProbability ?? 0).toFixed(1)}%
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getRiskColor(pred.AtRisk)} text-[10px] sm:text-xs`}>
                              {pred.AtRisk ? "At Risk" : "Not At Risk"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-10 text-sm">
                          No results found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
