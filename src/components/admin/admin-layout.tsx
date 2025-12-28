import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PerformanceMetricsTab from './performance-metrics-tab';
import ChatLogsTab from './chat-logs-tab';
import KnowledgeBaseTab from './knowledge-base-tab';

export default function AdminLayout() {
  return (
    <Tabs defaultValue="performance" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
        <TabsTrigger value="logs">Chat Logs</TabsTrigger>
        <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
      </TabsList>
      <TabsContent value="performance">
        <PerformanceMetricsTab />
      </TabsContent>
      <TabsContent value="logs">
        <ChatLogsTab />
      </TabsContent>
      <TabsContent value="knowledge">
        <KnowledgeBaseTab />
      </TabsContent>
    </Tabs>
  );
}
