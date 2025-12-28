'use client';

import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { mockPerformanceData } from '@/lib/mock-data';

export default function PerformanceMetricsTab() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Response Accuracy (%)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[250px] w-full">
            <LineChart data={mockPerformanceData.responseAccuracy} margin={{ left: -20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[80, 100]} />
              <Tooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="accuracy" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average Response Time (s)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[250px] w-full">
            <LineChart data={mockPerformanceData.responseTime} margin={{ left: -20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 2]}/>
              <Tooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="time" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }}/>
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Satisfaction</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[250px] w-full">
            <BarChart data={mockPerformanceData.userSatisfaction} margin={{ left: -20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" label={{ value: 'Rating (1-5)', position: 'insideBottom', offset: -5 }} />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Query Resolution</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <ChartContainer config={{}} className="h-[250px] w-full">
            <PieChart>
              <Tooltip content={<ChartTooltipContent />} />
              <Pie data={mockPerformanceData.resolvedQueries} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
