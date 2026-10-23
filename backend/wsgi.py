"""WSGI entry point for hosts that cannot run ASGI servers (PythonAnywhere's free plan).

FastAPI is an ASGI app, so it is wrapped with a2wsgi. A WSGI server never sends the ASGI
"startup" event, so the database is created here instead of in the app's lifespan.

PythonAnywhere: point the web app's WSGI configuration file at this module, for example
    import sys
    sys.path.insert(0, "/home/<username>/ponte/backend")
    from wsgi import application
"""

import os

from a2wsgi import ASGIMiddleware

from app import db
from app.config import get_settings
from app.main import app

# Relative paths (the default DATABASE_PATH) should resolve next to this file, whatever the server's cwd is.
os.chdir(os.path.dirname(os.path.abspath(__file__)))

db.init_db(get_settings().database_path)

application = ASGIMiddleware(app)
