# Database Schema (High level)

## profile
- id (UUID - PK)
- email (UNIQUE - NOT NULL)
- name (String(4~20) NULLABLE)
- username (String(4~20) - UNIQUE - NOT NULL)
- balance (Decimal(10, 2) - DEFAULT 0.00)
- created_at (Instant)
- updated_at (Instant)

## authentication
- id (UUID - PK)
- profile (UUID - FK to profile.id)
- email (UNIQUE - NOT NULL)
- password (String - UNIQUE - NOT NULL)
- ip (String NULLABLE)
- created_at (Instant)
- updated_at (Instant)

## account
- id (UUID - PK)
- profile (UUID - FK to profile.id)
- pin (String(4~8) - NOT NULL)
- created_at (Instant)
- updated_at (Instant)

## transaction
- id (UUID - PK)
- debit_id (UUID - FK to profile.id)
- credit_id (UUID - FK to profile.id)
- amount (Decimal(10, 2))
- status (NOT NULL - 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'REJECTED')
- reason (String NULLABLE)
- nickname (String NULLABLE)
- notes (String NULLABLE)
- requested_at (Instant)
- completed_at (Instant)