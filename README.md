# CiviLens 🏛️

### Making Government Information Simple, Transparent, and Accessible

CiviLens is a citizen-centric intelligent RTI guidance platform designed to simplify the Right to Information (RTI) journey for citizens.

Instead of functioning as another RTI filing portal, CiviLens provides guidance **before, during, and after** submitting an RTI — helping citizens identify the appropriate authority, understand transparency information, draft RTI applications, track response deadlines, and understand the appeal process.

---

## 🎯 Problem

The Right to Information Act, 2005 empowers Indian citizens to request information from government authorities. However, navigating the RTI process can be difficult, particularly for first-time users.

Common challenges include:

* Difficulty identifying the correct government department
* Selecting the appropriate Public Information Officer (PIO)
* Difficulty drafting clear RTI applications
* Limited awareness of departmental responsiveness
* Difficulty tracking the statutory response deadline
* Confusion about the appeal process when an RTI is rejected or unanswered

CiviLens addresses this **guidance gap** by bringing these capabilities together in a single citizen-focused platform.

---

## 💡 Our Solution

CiviLens acts as a decision-support platform for the RTI journey.

### The CiviLens workflow

**Citizen Query → Intent Understanding → Issue Classification → Department / PIO Matching → Transparency Insights → RTI Draft → Deadline Tracking → Appeal Guidance**

The platform is designed to help citizens understand:

* **WHERE** to ask → Department / PIO
* **WHAT** to ask → RTI Draft
* **WHEN** to follow up → Response Deadline
* **WHAT NEXT** → Appeal Process

---

## ✨ Key Features

### 1. 🔍 Smart Department Discovery

Users describe their information requirement in natural language.

CiviLens analyzes the query and recommends the most relevant government department and, where available, the appropriate PIO.

Recommendations are presented with confidence information rather than blindly making a fixed decision.

---

### 2. 📊 Transparency Analytics

CiviLens provides transparency insights based on publicly available RTI information.

These insights can include:

* Average response time
* Percentage of RTIs answered within the legal time limit
* Denial rate
* Historical response trends

This helps citizens understand the historical responsiveness of departments.

---

### 3. ✍️ RTI Draft Assistant

CiviLens assists citizens in preparing structured RTI applications.

The system helps transform a citizen's requirement into a clearer and more structured RTI request.

---

### 4. ⏱️ Deadline Tracker

After an RTI is submitted, users can record the filing date.

CiviLens tracks the expected statutory 30-day response period and helps users remain aware of important deadlines.

---

### 5. ⚖️ Appeal Guidance

If an RTI is rejected or remains unanswered, CiviLens provides guidance about the First Appeal process, relevant timelines, and the next procedural steps.

---

### 6. 🧠 Confidence-Based Recommendations

Instead of silently selecting one authority, CiviLens provides ranked recommendations with confidence information to help citizens make informed decisions.

---

## 🏗️ System Workflow

```text
                  Citizen Query
                       │
                       ▼
              Natural Language Input
                       │
                       ▼
               Intent Understanding
                       │
                       ▼
               Issue Classification
                       │
                       ▼
             Department / PIO Matching
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
   Transparency Analytics    Confidence Score
             │                   │
             └─────────┬─────────┘
                       ▼
                 RTI Drafting
                       │
                       ▼
                Deadline Tracking
                       │
                       ▼
                 Appeal Guidance
```

---

## 🛠️ Technology Stack

### Frontend

* React
* Vite
* Tailwind CSS

### Backend

* Python
* FastAPI

### AI / NLP

* Local LLM / NLP
* Intent classification
* Natural-language understanding

### Data & Analytics

* RTI datasets
* Python / Pandas
* Database for application and tracking information

### Integration

* REST APIs
* Git / GitHub

---

## 📂 Project Structure

The repository contains the CiviLens application and its supporting project files.

```text
CiviLens/
├── src/
├── public/
├── package.json
├── ...
└── README.md
```

> The exact structure may vary depending on the current implementation of the prototype.

---

## 🚀 Running the Project

### Prerequisites

Make sure you have the required development environment for the project installed.

### Clone the repository

```bash
git clone https://github.com/Haasini-07/CiviLens.git
cd CiviLens
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The exact setup may depend on the current backend configuration of the project.

---

## 🎥 Demo

### YouTube Demo

https://youtu.be/p2ZYZaUlq00

The demo showcases the CiviLens concept and prototype.

---

## 🌐 Working Prototype

**Live Demo:**
https://resilient-beignet-b8d63f.netlify.app/


---

## 🌍 Impact

CiviLens aims to make the RTI process easier and more accessible for citizens, particularly first-time users.

### Citizen Impact

* Easier navigation
* Fewer incorrect submissions
* Better RTI drafting
* Improved deadline awareness
* Clearer appeal guidance
* Greater confidence in using RTI

### System Impact

* Improved transparency
* Greater accessibility to government information
* Better-informed citizen participation
* Support for accountability and civic engagement

---

## 🔮 Future Scope

The platform can be expanded through:

* Coverage of additional government departments
* Geographic expansion
* Additional transparency datasets
* More advanced NLP capabilities
* Expanded RTI workflow support
* Additional citizen-focused guidance features

---

## 📚 References & Data Sources

The project references publicly available information and resources related to the RTI ecosystem, including:

* RTI Act, 2005
* Central Information Commission
* RTI Online Portal
* Department of Personnel & Training
* India.gov.in
* CIC Annual Reports
* RTI statistics
* Government RTI records
* Public Authority data

---

## 👥 Team

**Team:** CodeExcel
**College:** SRMIST, Ramapuram
**Team Leader:** Krishnaa A R
**Team Member:** Haasini P G


---

## 🔗 Project Links

| Resource                 | Link                                   |
| ------------------------ | -------------------------------------- |
| 💻 GitHub                | https://github.com/Haasini-07/CiviLens |
| ▶️ YouTube Demo          | https://youtu.be/p2ZYZaUlq00           |
| 🌐 Working Demo          | https://resilient-beignet-b8d63f.netlify.app/                    |
| 📄 Project Documentation | https://docs.google.com/document/d/1jXw4MioB_V9bBTsVlOsXZo_Fu3jxs990/edit?usp=drive_link&ouid=115562652207063704125&rtpof=true&sd=true                |

---

## 🏆 Brainwave 2026

CiviLens is developed as a project for **Brainwave 2026**, with the goal of making government information and the RTI process simpler, more transparent, and more accessible to citizens.

> **From knowing your right → to knowing how to use it.**
