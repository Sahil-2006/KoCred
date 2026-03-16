# KoCred

KoCred is a decentralized, secure certificate management system designed specifically for academic institutions like **SRM Institute of Science and Technology**. Its primary mission is to solve the problem of verifying extracurricular and academic certificates through a trust layer that bridges the gap between students, faculty, and external verifiers.

## ✨ Features

### 🎓 Student Module
- **Smart Upload** — Upload photo of physical certificates (JPG/PNG). AI verifies details automatically with offline support.
- **E-Certificate** — Paste a URL to auto-crawl and verify external certifications.
- **Certificate Bundles** — Group certificates into collections for simplified submission and organization.
- **Activity Credit Meter** — Visual progress bar showing points earned vs. points needed for graduation, with level tracking.
- **Digital ID Card** — Verifiable student identity with QR code generation.
- **Recent Certificates** — Table view of all certificates with status tracking (Verified with tamper-proof blue tick, Pending).
- **Certificate Actions** — Download PDF and view certificate details.
- **Resume Generator** — Tab for auto-generating professional CVs from verified achievements (coming soon).

### 👩‍🏫 Faculty Module
- **Verification Dashboard** — Review and approve/reject student certificate submissions.
- **Bulk Approve** — Select multiple certificates and approve them all in a single click.
- **Individual Actions** — One-tap approve or reject with per-certificate controls.
- **Image Preview** — View uploaded certificate images directly from the dashboard.
- **Filtering** — Filter pending requests to manage verification workflow efficiently.

### 🏛️ Admin / Placement Cell
- **"God Mode" Search** — Filter students by specific combinations (e.g., "3rd Year" + "Java" + "Hackathon Winner").
- **Smart Filter Tags** — Quick filters: >800 Points, Clean Record, Hackathon Winner, Final Year.
- **Analytics Dashboard** — Cards showing Total Students, Placement Eligible, Top Performer, and Certificates Today.
- **Eligible Candidates List** — View profiles of placement-eligible students with point scores.
- **Export to CSV** — Download verified candidate lists for recruiters instantly.

### 🔐 Authentication & Security
- **Multi-Role Auth** — Role-based sign up and sign in (Student, Faculty, Admin) via Supabase Auth.
- **Role-Based Routing** — Automatic redirect to the correct dashboard after authentication.
- **APAAR/ABC ID Integration** — Unique student identifier with masked display (e.g., `•••• •••• 9012`).
- **Row Level Security** — PostgreSQL RLS policies ensure strict data access control.
- **Tamper-Proof "Blue Tick"** — Every approved certificate gets a cryptographic verification indicator.
- **Password Strength Indicator** — Real-time password strength meter during signup.
- **Inline Error Messages** — User-friendly error/success notifications (no alert popups).

### 📊 Statistics & Analytics
- **Monthly Trends** — Visual bar chart of uploads vs. verified certificates over time.
- **Category Breakdown** — Distribution across Workshops, Hackathons, Sports, Social Work, Seminars.
- **Summary Cards** — Total certificates, verified count, pending count, active students.
- **Recent Activity Feed** — Live feed of verification actions across the platform.
- **Time Range Filters** — Toggle between 1 month, 3 months, and 6 months views.

### 🎨 UI & Navigation
- **Responsive Sidebar** — Fixed navigation with role-aware menu items and user profile display.
- **Landing Page** — Hero section with role selection portal cards.
- **Profile Settings** — View account information, academic details, and sign out.
- **Modern Design** — Clean UI built with Tailwind CSS, Geist fonts, and Lucide icons.

## 🚀 Core Functionality & Workflow

KoCred operates on a two-stage verification process to ensure scalability and administrative ease:

1.  **Student-Led Uploads**: 
    *   Students upload their own certificates to the platform.
    *   To ensure the verification stamp doesn't obscure important information, students can specify the exact `(X, Y)` coordinates for where the KoCred verification QR code should be placed on the document.

2.  **Faculty-Led Validation**: 
    *   Once uploaded, metrics enter a "Pending" state.
    *   Faculty members (authenticated via specific permissions) review the document and facilitate the approval process to move it to a "Verified" state.

3.  **Verification Portal**: 
    *   Anyone scanning the generated QR code is redirected to the verification portal, which serves as a public proof-of-authenticity page.

## 🛠 Technical Architecture

KoCred is built with a modern, lean stack designed for high performance and security:

*   **Frontend**: Built with **Next.js 16** (App Router), utilizing React 19 and a clean, professional UI with **Tailwind CSS 4**.
*   **Backend & Database**: Powered by **Supabase** (PostgreSQL). It utilizes **Row Level Security (RLS)** to ensure strict data access control—students manage their own files, while faculty have broader verification access.
*   **Authentication**: Multi-role authentication (Student, Faculty, Admin) managed via Supabase Auth.
*   **Icons**: **Lucide React** for consistent, accessible iconography.
*   **Type Safety**: Full **TypeScript** with strict mode enabled.
*   **Processing**: Capability for dynamic QR code stamping on certificates.
*   **Deployment**: Optimized for deployment via **Vercel**.

## 🔒 Privacy & Security Features

A core pillar of KoCred is its "Privacy-First" approach to student data:

*   **APAAR/ABC ID Integration**: The system uses the APAAR ID (Automated Permanent Academic Account Registry) as a unique identifier.
*   **Zero-Leak Hashing**: Critical identifiers like the APAAR ID are processed securely to prevent raw data exposure.
*   **Masked Display**: Public verification pages only show the student's name and a masked version of their ID (e.g., `•••• •••• 9012`) to prevent data scraping while maintaining verifiable proof.

## 👥 User Roles

The system implements a three-tier hierarchy:

| Role | Responsibility |
| :--- | :--- |
| **Admin** | Oversight, analytics, and system management. |
| **Faculty** | Authenticating uploaded certificates and managing student approvals. |
| **Student** | Uploading documents, positioning QR codes, and managing their digital "Vault". |

## 📦 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Sahil-2006/KoCred.git
    cd KoCred
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env.local` file with your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

5.  **Lint the code**:
    ```bash
    npm run lint
    ```

6.  **Build for production**:
    ```bash
    npm run build
    ```
