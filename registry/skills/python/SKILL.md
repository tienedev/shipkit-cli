---
name: python
description: Python development patterns including FastAPI, type hints, async programming, and modern tooling. Use when building Python applications or APIs.
---

# Python Development

Modern Python patterns with type hints and async support.

## Project Structure

```
project/
├── src/
│   └── myapp/
│       ├── __init__.py
│       ├── main.py
│       ├── api/
│       │   ├── __init__.py
│       │   └── routes.py
│       ├── models/
│       │   └── __init__.py
│       ├── services/
│       │   └── __init__.py
│       └── utils/
│           └── __init__.py
├── tests/
├── pyproject.toml
├── requirements.txt
└── README.md
```

## FastAPI Basics

```python
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    description: str | None = None

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/items/{item_id}")
async def get_item(item_id: int):
    return {"item_id": item_id}

@app.post("/items")
async def create_item(item: Item):
    return item

@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item):
    return {"item_id": item_id, **item.model_dump()}
```

## Type Hints

```python
from typing import Optional, List, Dict, Union
from collections.abc import Sequence

# Basic types
def greet(name: str) -> str:
    return f"Hello, {name}"

# Optional and Union
def process(value: int | None = None) -> str:
    return str(value) if value else "No value"

# Collections
def sum_list(numbers: list[int]) -> int:
    return sum(numbers)

# TypedDict for structured dicts
from typing import TypedDict

class User(TypedDict):
    id: int
    name: str
    email: str
```

## Async Patterns

```python
import asyncio
from typing import Any

async def fetch_data(url: str) -> dict[str, Any]:
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.json()

# Run multiple coroutines
async def fetch_all(urls: list[str]) -> list[dict]:
    tasks = [fetch_data(url) for url in urls]
    return await asyncio.gather(*tasks)

# Context manager
async def main():
    async with some_resource() as resource:
        await resource.do_something()
```

## Dependency Injection (FastAPI)

```python
from fastapi import Depends
from sqlalchemy.orm import Session

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    if not user:
        raise HTTPException(status_code=401)
    return user

@app.get("/users/me")
async def read_users_me(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return current_user
```

## Pydantic Models

```python
from pydantic import BaseModel, Field, EmailStr, validator
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    name: str = Field(..., min_length=1, max_length=100)

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    name: str
    created_at: datetime

    class Config:
        from_attributes = True  # For ORM models
```

## Testing

```python
import pytest
from fastapi.testclient import TestClient
from myapp.main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

@pytest.fixture
def sample_item():
    return {"name": "Test", "price": 10.0}

def test_create_item(sample_item):
    response = client.post("/items", json=sample_item)
    assert response.status_code == 200
```

## Tooling

```bash
# Virtual environment
python -m venv venv
source venv/bin/activate  # Unix
venv\Scripts\activate     # Windows

# Dependencies
pip install -r requirements.txt
pip freeze > requirements.txt

# Linting & Formatting
ruff check .
ruff format .

# Type checking
mypy src/

# Testing
pytest -v
pytest --cov=src
```

## Best Practices

1. **Use type hints** - Better IDE support and documentation
2. **Prefer async** - For I/O-bound operations
3. **Validate input** - Use Pydantic models
4. **Write tests** - Aim for good coverage
5. **Use virtual environments** - Isolate dependencies
6. **Follow PEP 8** - Use ruff or black for formatting
