# IMS Infrastructure API Documentation

The Infrastructure Management Solution (IMS) exposes a read-only RESTful API that provides meta-level IT and governance data for a Swedish municipality. 

All endpoints return data in `snake_case` JSON format.

## Base URL
`http://localhost:3000`

---

## 1. Get All Applications
**Endpoint:** `GET /api/applications`

**Description:** Returns a high-level list of all application systems, including their associated business services and 30-day aggregate metrics.

**Response Structure:**
```json
[
  {
    "id": 1,
    "name": "Case360",
    "short_code": "CASE360",
    "lifecycle_status": "active",
    "criticality": 3,
    "owner_unit": "IT Shared Services",
    "sourcing_model": "saas",
    "vendor_name": "Microsoft",
    "business_services": [
      {
        "name": "Elderly home care",
        "category": "elderly_care"
      }
    ],
    "last_30d": {
      "avg_api_calls_per_day": 4500,
      "avg_avg_response_ms": 120,
      "avg_availability_pct": 99.8
    }
  }
]
```

---

## 2. Get Application Details
**Endpoint:** `GET /api/applications/:id`

**Description:** Returns a detailed view of a single application system, including its linked interfaces, integrations, historical incidents, and 90-day usage metrics time-series.

**Parameters:**
- `id` (path): The numeric ID of the application.

**Response Structure:**
```json
{
  "id": 1,
  "name": "Case360",
  "short_code": "CASE360",
  "description": "Description of Case360",
  "lifecycle_status": "active",
  "criticality": 3,
  "owner_unit_id": 5,
  "business_value_score": 9,
  "risk_score": 8,
  "technology_stack": ".NET Core on-prem",
  "data_sensitivity": "high",
  "is_key_platform": 1,
  "business_services": [
    {
      "id": 1,
      "name": "Elderly home care",
      "category": "elderly_care",
      "lifecycle_stage": "elderly_care",
      "owner_unit_id": 2,
      "public_value_dimension": "access",
      "primary_flag": 1
    }
  ],
  "interfaces": [
    {
      "id": 1,
      "application_id": 1,
      "name": "API_In_1",
      "type": "REST",
      "direction": "inbound",
      "data_domain": "citizen_data",
      "availability_slo": 99.5,
      "sensitivity": "medium",
      "last_30d_usage": {
        "total_requests": 150000,
        "total_errors": 45
      }
    }
  ],
  "integrations": [
    {
      "id": 1,
      "transfer_method": "api_call",
      "frequency": "real_time",
      "status": "active",
      "source_app_name": "Case360",
      "target_app_name": "Eneo AI Platform"
    }
  ],
  "last_90d_usage_metrics": [
    {
      "date": "2025-12-10",
      "active_users": 412,
      "api_calls": 5600,
      "avg_response_ms": 110,
      "error_rate": 0.05
    }
  ],
  "incidents": [
    {
      "id": 4,
      "application_id": 1,
      "severity": 2,
      "start_time": "2026-01-15T08:00:00.000Z",
      "end_time": "2026-01-15T09:30:00.000Z",
      "cause_category": "infra_failure",
      "description": "Database latency spike",
      "user_impact_estimate": 450
    }
  ]
}
```

---

## 3. Get Integrations
**Endpoint:** `GET /api/integrations`

**Description:** Returns all active integrations (transfers of data between interfaces of two distinct applications) with aggregated daily request volumes.

**Response Structure:**
```json
[
  {
    "id": 1,
    "transfer_method": "api_call",
    "frequency": "real_time",
    "status": "active",
    "source_app_name": "Case360",
    "target_app_name": "Eneo AI Platform",
    "last_30d": {
      "avg_daily_requests": 1250,
      "avg_daily_errors_5xx": 2
    }
  }
]
```

---

## 4. Get Risk Matrix
**Endpoint:** `GET /api/risk-matrix`

**Description:** Provides an aggregate risk assessment mapping for all applications, evaluating incidents and end-of-life technical dependencies.

**Response Structure:**
```json
[
  {
    "id": 1,
    "name": "Case360",
    "criticality": 3,
    "risk_score": 8,
    "lifecycle_status": "active",
    "number_of_incidents_last_365d": 4,
    "number_of_dependent_business_services": 2,
    "has_end_of_life_tech": false
  }
]
```

---

## 5. Get Sourcing Information
**Endpoint:** `GET /api/sourcing`

**Description:** Lists application sourcing models, vendor information, and contracts to analyze external dependencies.

**Response Structure:**
```json
[
  {
    "id": 1,
    "name": "Case360",
    "vendor_name": "Tietoevry",
    "sourcing_model": "outsourced",
    "contract_end": "2026-12-31",
    "annual_cost_eur": 150000.00,
    "supports_encapsulation": 1
  }
]
```

---

## 6. Get Metrics Time-Series
**Endpoint:** `GET /api/metrics/application/:id`

**Description:** Returns daily time-series metrics data for a specific application. Can be filtered by dates using query parameters.

**Parameters:**
- `id` (path): The numeric ID of the application.
- `from` (query, optional): The start date constraint (`YYYY-MM-DD`).
- `to` (query, optional): The end date constraint (`YYYY-MM-DD`).

**Response Structure:**
```json
[
  {
    "date": "2026-03-01",
    "active_users": 512,
    "api_calls": 9200,
    "avg_response_ms": 95,
    "error_rate": 0.0,
    "availability_pct": 100.0
  }
]
```
