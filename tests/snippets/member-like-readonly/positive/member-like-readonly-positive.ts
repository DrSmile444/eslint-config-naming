interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_DEBUG_MODE: boolean;
}

class ReadonlyExample {
  public readonly apiKey: string;
  public readonly user_id: string;
  public readonly maxRetries = 3;
}
