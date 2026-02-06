# KoCred

KoCred is a decentralized, secure certificate management system designed specifically for academic institutions like **SRM Institute of Science and Technology**. Its primary mission is to solve the problem of verifying extracurricular and academic certificates through a trust layer that bridges the gap between students, faculty, and external verifiers.

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

*   **Frontend**: Built with **Next.js**, utilizing React Server Components and a clean, professional UI with Tailwind CSS.
*   **Backend & Database**: Powered by **Supabase** (PostgreSQL). It utilizes **Row Level Security (RLS)** to ensure strict data access control—students manage their own files, while faculty have broader verification access.
*   **Authentication**: Multi-role authentication (Student, Faculty, Admin) managed via Supabase Auth.
*   **Processing**: Capability for dynamic QR code stamping on certificates.
*   **Deployment**: Optimized for deployment via **Vercel**.

## 🔒 Privacy & Security Features

A core pillar of KoCred is its "Privacy-First" approach to student data:

*   **APAAR/ABC ID Integration**: The system uses the APAAR ID (Automated Permanent Academic Account Registry) as a unique identifier.
*   **Zero-Leak Hashing**: Critical identifiers like the APAAR ID are processed securely to prevent raw data exposure.
*   **Masked Display**: Public verification pages only show the student's name and a masked version of their ID (e.g., `XXXX-XXXX-9012`) to prevent data scraping while maintaining verifiable proof.

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
