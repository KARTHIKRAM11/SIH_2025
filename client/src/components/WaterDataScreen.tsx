import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WaterQualityForm from "./WaterQualityForm"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { Droplets, Activity, Thermometer, TrendingUp, TrendingDown, Plus } from "lucide-react"

interface WaterDataScreenProps {
  villageName: string
  onSubmit: (data: any) => void
  onSaveOffline?: (data: any) => void
  isLoading?: boolean
  hasWritePermissions: boolean
}

// Mock historical data for 7 days
const generateMockData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const dates = []
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    dates.push({
      day: days[date.getDay()],
      date: date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }),
      ph: Math.round((6.8 + Math.random() * 1.4) * 10) / 10, // 6.8-8.2
      turbidity: Math.round((0.5 + Math.random() * 2) * 10) / 10, // 0.5-2.5
      temperature: Math.round((18 + Math.random() * 8) * 10) / 10, // 18-26°C
    })
  }
  return dates
}

const getStatusColor = (value: number, type: 'ph' | 'turbidity' | 'temperature') => {
  switch (type) {
    case 'ph':
      if (value >= 6.5 && value <= 8.5) return "#10B981" // green
      if (value >= 6.0 && value <= 9.0) return "#F59E0B" // orange
      return "#EF4444" // red
    case 'turbidity':
      if (value <= 1) return "#10B981"
      if (value <= 4) return "#F59E0B"
      return "#EF4444"
    case 'temperature':
      if (value >= 15 && value <= 25) return "#10B981"
      if (value >= 10 && value <= 30) return "#F59E0B"
      return "#EF4444"
    default:
      return "#6B7280"
  }
}

const getTrendDirection = (data: any[], key: string) => {
  if (data.length < 2) return 'neutral'
  const recent = data.slice(-3).map(d => d[key])
  const older = data.slice(0, 3).map(d => d[key])
  
  const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length
  const olderAvg = older.reduce((a, b) => a + b, 0) / older.length
  
  if (recentAvg > olderAvg * 1.05) return 'up'
  if (recentAvg < olderAvg * 0.95) return 'down'
  return 'neutral'
}

export default function WaterDataScreen({ 
  villageName, 
  onSubmit, 
  onSaveOffline, 
  isLoading, 
  hasWritePermissions 
}: WaterDataScreenProps) {
  const [activeTab, setActiveTab] = useState("charts")
  const [showForm, setShowForm] = useState(false)
  
  const chartData = useMemo(() => generateMockData(), [])
  
  const trends = {
    ph: getTrendDirection(chartData, 'ph'),
    turbidity: getTrendDirection(chartData, 'turbidity'),
    temperature: getTrendDirection(chartData, 'temperature')
  }

  const currentValues = {
    ph: chartData[chartData.length - 1]?.ph || 0,
    turbidity: chartData[chartData.length - 1]?.turbidity || 0,
    temperature: chartData[chartData.length - 1]?.temperature || 0
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey === 'ph' ? 'pH' : entry.dataKey === 'turbidity' ? 'Turbidity' : 'Temperature'}: ${entry.value}${entry.dataKey === 'temperature' ? '°C' : entry.dataKey === 'turbidity' ? ' NTU' : ''}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  if (showForm) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Record Water Quality</h2>
          <Button 
            variant="outline" 
            onClick={() => setShowForm(false)}
            data-testid="button-back-to-charts"
          >
            Back to Charts
          </Button>
        </div>
        <WaterQualityForm
          villageName={villageName}
          onSubmit={(data) => {
            onSubmit(data)
            setShowForm(false)
          }}
          onSaveOffline={onSaveOffline}
          isLoading={isLoading}
          isReadOnly={!hasWritePermissions}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Water Quality Monitoring</h2>
          <p className="text-muted-foreground">7-day trends for {villageName}</p>
        </div>
        {hasWritePermissions && (
          <Button 
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2"
            data-testid="button-add-reading"
          >
            <Plus className="w-4 h-4" />
            <span>Add Reading</span>
          </Button>
        )}
      </div>

      {/* Current Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">pH Level</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold" style={{ color: getStatusColor(currentValues.ph, 'ph') }}>
                  {currentValues.ph}
                </div>
                <p className="text-xs text-muted-foreground">Normal: 6.5-8.5</p>
              </div>
              <div className="flex items-center">
                {trends.ph === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                {trends.ph === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                {trends.ph === 'neutral' && <div className="w-4 h-1 bg-gray-400 rounded" />}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Turbidity</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold" style={{ color: getStatusColor(currentValues.turbidity, 'turbidity') }}>
                  {currentValues.turbidity} <span className="text-sm">NTU</span>
                </div>
                <p className="text-xs text-muted-foreground">Safe: ≤1 NTU</p>
              </div>
              <div className="flex items-center">
                {trends.turbidity === 'up' && <TrendingUp className="w-4 h-4 text-red-500" />}
                {trends.turbidity === 'down' && <TrendingDown className="w-4 h-4 text-green-500" />}
                {trends.turbidity === 'neutral' && <div className="w-4 h-1 bg-gray-400 rounded" />}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold" style={{ color: getStatusColor(currentValues.temperature, 'temperature') }}>
                  {currentValues.temperature}°C
                </div>
                <p className="text-xs text-muted-foreground">Normal: 15-25°C</p>
              </div>
              <div className="flex items-center">
                {trends.temperature === 'up' && <TrendingUp className="w-4 h-4 text-orange-500" />}
                {trends.temperature === 'down' && <TrendingDown className="w-4 h-4 text-blue-500" />}
                {trends.temperature === 'neutral' && <div className="w-4 h-1 bg-gray-400 rounded" />}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="charts" data-testid="tab-charts">All Trends</TabsTrigger>
          <TabsTrigger value="ph" data-testid="tab-ph">pH Levels</TabsTrigger>
          <TabsTrigger value="combined" data-testid="tab-combined">Combined View</TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-4">
          {/* Individual Charts */}
          <div className="grid grid-cols-1 gap-6">
            {/* pH Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>pH Levels - 7 Day Trend</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="day" 
                        className="text-muted-foreground"
                      />
                      <YAxis 
                        domain={[5.5, 9.5]}
                        className="text-muted-foreground"
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <ReferenceLine y={6.5} stroke="#10B981" strokeDasharray="5 5" />
                      <ReferenceLine y={8.5} stroke="#10B981" strokeDasharray="5 5" />
                      <Line 
                        type="monotone" 
                        dataKey="ph" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Turbidity Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Droplets className="w-5 h-5" />
                  <span>Turbidity Levels - 7 Day Trend</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="day" 
                        className="text-muted-foreground"
                      />
                      <YAxis 
                        domain={[0, 5]}
                        className="text-muted-foreground"
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <ReferenceLine y={1} stroke="#10B981" strokeDasharray="5 5" />
                      <ReferenceLine y={4} stroke="#F59E0B" strokeDasharray="5 5" />
                      <Line 
                        type="monotone" 
                        dataKey="turbidity" 
                        stroke="#06B6D4" 
                        strokeWidth={3}
                        dot={{ fill: '#06B6D4', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Temperature Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Thermometer className="w-5 h-5" />
                  <span>Temperature - 7 Day Trend</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="day" 
                        className="text-muted-foreground"
                      />
                      <YAxis 
                        domain={[10, 35]}
                        className="text-muted-foreground"
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <ReferenceLine y={15} stroke="#10B981" strokeDasharray="5 5" />
                      <ReferenceLine y={25} stroke="#10B981" strokeDasharray="5 5" />
                      <Line 
                        type="monotone" 
                        dataKey="temperature" 
                        stroke="#EF4444" 
                        strokeWidth={3}
                        dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ph">
          <Card>
            <CardHeader>
              <CardTitle>pH Analysis - Detailed View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-muted-foreground" />
                    <YAxis domain={[5.5, 9.5]} className="text-muted-foreground" />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={6.5} stroke="#10B981" strokeDasharray="5 5" label="Safe Min" />
                    <ReferenceLine y={8.5} stroke="#10B981" strokeDasharray="5 5" label="Safe Max" />
                    <Line 
                      type="monotone" 
                      dataKey="ph" 
                      stroke="#3B82F6" 
                      strokeWidth={4}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="combined">
          <Card>
            <CardHeader>
              <CardTitle>Combined Water Quality Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="day" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="ph" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      name="pH"
                      dot={{ fill: '#3B82F6', r: 3 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="turbidity" 
                      stroke="#06B6D4" 
                      strokeWidth={3}
                      name="Turbidity"
                      dot={{ fill: '#06B6D4', r: 3 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="temperature" 
                      stroke="#EF4444" 
                      strokeWidth={3}
                      name="Temperature"
                      dot={{ fill: '#EF4444', r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}