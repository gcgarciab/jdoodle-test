export interface ScriptResponse {
  output: string;
  statusCode: number;
  memory: string;
  cpuTime: string;
  compilationStatus: string | null;
  projectKey: string | null;
}
