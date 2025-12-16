"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, UserCheck, Clock, CalendarX, GraduationCap, Loader2 } from "lucide-react"

const API_BASE = "https://student-performance-api-7xmi.onrender.com"

interface DashboardStats {
  total_students: number
  students_with_tutors: number
  average_study_time: number
  average_absences: number
  average_gpa: number
  gender_distribution: { [key: string]: number }
  grade_distribution: { [key: string]: number }
  extracurricular_participation: { [key: string]: number }
}

interface DatasetInfo {
  total_students: number
  columns: string[]
  data_types: { [key: string]: string }
  sample_data: { [key: string]: any }[]
}

export default function OverviewTab() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [datasetInfo, setDatasetInfo] = useState<DatasetInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [statsRes, datasetRes] = await Promise.all([
          fetch(`${API_BASE}/api/dashboard-stats`),
          fetch(`${API_BASE}/api/dataset-info`),
        ])

        if (!statsRes.ok || !datasetRes.ok) {
          throw new Error("Failed to fetch data")
        }

        const statsData = await statsRes.json()
        const datasetData = await datasetRes.json()

        setStats(statsData)
        setDatasetInfo(datasetData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-10">
          <p className="text-center text-destructive">Error: {error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!stats || !datasetInfo) return null

  const statCards = [
    {
      title: "Total Students",
      value: stats.total_students?.toLocaleString() ?? "0",
      icon: Users,
      description: "Students in database",
    },
    {
      title: "Students with Tutors",
      value: stats.students_with_tutors?.toLocaleString() ?? "0",
      icon: UserCheck,
      description: "Receiving tutoring support",
    },
    {
      title: "Average Study Time",
      value: `${(stats.average_study_time ?? 0).toFixed(1)}h`,
      icon: Clock,
      description: "Hours per week",
    },
    {
      title: "Average Absences",
      value: (stats.average_absences ?? 0).toFixed(1),
      icon: CalendarX,
      description: "Days per semester",
    },
    {
      title: "Average GPA",
      value: (stats.average_gpa ?? 0).toFixed(2),
      icon: GraduationCap,
      description: "Overall performance",
    },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon
          return (
            <Card key={idx} className="hover:border-primary/50 transition-colors">
              <CardHeader className="pb-2 sm:pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-foreground">{card.value}</div>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">{card.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Column Information Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg md:text-xl">Column Information</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Database schema and data types</CardDescription>
        </CardHeader>
        <CardContent>
          {datasetInfo.columns && datasetInfo.columns.length > 0 ? (
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-xs sm:text-sm">Column Name</TableHead>
                    <TableHead className="font-semibold text-xs sm:text-sm">Data Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {datasetInfo.columns.map((colName, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-mono text-xs sm:text-sm">{colName}</TableCell>
                      <TableCell className="text-muted-foreground text-xs sm:text-sm">
                        {datasetInfo.data_types[colName]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-4 text-sm">No column information available</p>
          )}
        </CardContent>
      </Card>

      {/* Sample Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg md:text-xl">Sample Data</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Preview of student records</CardDescription>
        </CardHeader>
        <CardContent>
          {datasetInfo.sample_data && datasetInfo.sample_data.length > 0 && datasetInfo.columns ? (
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {datasetInfo.columns.map((colName, idx) => (
                      <TableHead key={idx} className="font-semibold whitespace-nowrap text-xs sm:text-sm">
                        {colName}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {datasetInfo.sample_data.map((row, idx) => (
                    <TableRow key={idx}>
                      {datasetInfo.columns.map((colName, colIdx) => (
                        <TableCell key={colIdx} className="whitespace-nowrap text-xs sm:text-sm">
                          {row[colName] !== null && row[colName] !== undefined
                            ? typeof row[colName] === "number"
                              ? row[colName].toLocaleString()
                              : String(row[colName])
                            : "N/A"}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-4 text-sm">No sample data available</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
