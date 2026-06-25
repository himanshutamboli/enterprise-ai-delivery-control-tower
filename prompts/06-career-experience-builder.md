# Career Experience Explorer Builder Prompt

## Role

You are a Senior Frontend Architect and Product Designer.

You are building an interactive career portfolio experience.

Read:

* PROJECT_MEMORY.md
* Existing repository structure

---

# Objective

Create a Career Experience Explorer.

The goal:

A hiring manager should click any company and understand:

* What problem was being solved
* My role
* Technical scope
* Architecture
* Delivery approach
* Metrics achieved
* Business impact

This should feel like an enterprise case study platform.

---

# Design Goal

Create UI inspired by:

* LinkedIn experience
* Product case studies
* Engineering dashboards
* Executive reporting

Avoid:

* Resume-style pages
* Plain text lists
* Static cards

---

# Experience Data Model

Create reusable JSON-driven experience pages.

Each company entry should support:

{
company,
role,
duration,
industry,
summary,

challenge,

business_problem,

solution,

architecture,

responsibilities,

technologies,

delivery_model,

metrics,

achievements,

lessons_learned
}

---

# Companies To Include

## LeewayHertz

Theme:

AI Platform Delivery

Highlight:

* Multi-agent systems
* Agent observability
* Flow Builder
* LLMOps
* AI governance

---

## NCS Global

Theme:

Cloud Data Platform Modernization

Highlight:

* 300+ TB migration
* AWS
* Azure
* DataOps
* ServiceNow
* Vendor governance

---

## Profusion Systems

Theme:

Enterprise SaaS Delivery

Highlight:

* Loan management platform
* SaaS migrations
* Agile transformation
* Sprint velocity improvement

---

## Mapsted

Theme:

AI Engineering and R&D Delivery

Highlight:

* ML products
* AWS/Azure
* Agile transformation
* KPI tracking

---

## Soda In Mind

Theme:

Software Delivery and Automation

Highlight:

* Agile delivery
* ITIL
* Automation
* Operational efficiency

---

## WNS

Theme:

Operations Automation

Highlight:

* Linux automation
* AWS monitoring
* Security improvement

---

# Components To Build

Create:

## Experience Timeline

Shows:

Company
Role
Duration

---

## Experience Detail Page

Sections:

1. Overview

2. Business Problem

3. Solution

4. Architecture Diagram

5. My Role

6. Technology Stack

7. Metrics Dashboard

8. Key Achievements

---

# Visual Elements

Add:

* Timeline
* KPI cards
* Architecture diagrams
* Technology badges
* Impact charts

---

# Technical Requirements

Use:

* Next.js
* TypeScript
* Tailwind
* Reusable components

Data must come from JSON.

Do not hardcode pages.

---

# Output

After implementation provide:

1. Files created
2. Files changed
3. Architecture explanation
4. Testing completed
5. Suggestions

Do not modify unrelated parts.
