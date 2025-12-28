import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockChatLogs } from '@/lib/mock-data';
import { format } from 'date-fns';

export default function ChatLogsTab() {
  const getSatisfactionBadge = (rating: number) => {
    if (rating >= 4) return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Good</Badge>;
    if (rating === 3) return <Badge variant="secondary">Average</Badge>;
    return <Badge variant="destructive">Poor</Badge>;
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Chat Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Query</TableHead>
              <TableHead>Response</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead className="text-right">Satisfaction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockChatLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.user}</TableCell>
                <TableCell className="max-w-xs truncate">{log.query}</TableCell>
                <TableCell className="max-w-xs truncate">{log.response}</TableCell>
                <TableCell>{format(new Date(log.timestamp), 'PPpp')}</TableCell>
                <TableCell className="text-right">{getSatisfactionBadge(log.satisfaction)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
