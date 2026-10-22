import threading
import time
from collections import deque


class RateLimiter:
    """In-memory sliding-window limiter, one window per key (client IP).

    Good enough for a single-process deployment. Use a shared store (Redis)
    if the API is ever run as several processes.
    """

    MAX_KEYS = 10_000

    def __init__(self, max_hits: int, window_seconds: int):
        self.max_hits = max_hits
        self.window = window_seconds
        self._hits: dict[str, deque[float]] = {}
        self._lock = threading.Lock()

    def allow(self, key: str) -> bool:
        now = time.monotonic()
        with self._lock:
            if len(self._hits) > self.MAX_KEYS:
                self._hits = {k: q for k, q in self._hits.items() if q and now - q[-1] < self.window}
            q = self._hits.setdefault(key, deque())
            while q and now - q[0] >= self.window:
                q.popleft()
            if len(q) >= self.max_hits:
                return False
            q.append(now)
            return True
