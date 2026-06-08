# Drivleaf (Temporary Name)

> **Slogan:** O controle de gastos inteligente para motoristas de aplicativo. / The intelligent expense control application designed for ride-share drivers.

---

### 🚧 Engineering Roadmap / Planejamento Técnico
This project is currently under active development. Below is the technical checklist and architecture roadmap toward the MVP launch:

| Status | 🇺🇸 Technical Milestone | 🇧🇷 Marco Técnico |
| :---: | :--- | :--- |
| ✅ | **Project Initialization**<br>Bootstrap minimal Node.js environment via `npm init`. | **Inicialização do Projeto**<br>Setup inicial do ambiente Node.js via `npm init`. |
| ✅ | **UI/UX Prototyping**<br>Dashboard wireframing and layout definition. | **Prototipagem UI/UX**<br>Definição de wireframes e layout do dashboard. |
| 🔲 | **Core Routing & Views**<br>Scaffold auth, dashboard metrics, and forms. | **Roteamento e Telas Core**<br>Estruturação de login/cadastro, métricas e inputs. |
| 🔲 | **Local Data Architecture**<br>Schema modeling with Prisma and SQLite. | **Arquitetura de Dados Local**<br>Modelagem de schema com Prisma e SQLite. |
| 🔲 | **Production Infrastructure**<br>Provisioning cloud relational database. | **Infraestrutura de Produção**<br>Provisionamento de banco de dados em nuvem. |
| 🔲 | **Responsive Client Development**<br>Mobile-first UI tailored for urban drivers. | **Client Responsivo**<br>Interface Mobile-first dedicada para o motorista. |
| 🔲 | **Gateway Payment Billing**<br>Stripe API integration and webhooks. | **Integração com Gateway**<br>Acoplamento da API do Stripe e webhooks. |
| 🔲 | **CI/CD & Deployment**<br>Automated production deployment pipeline. | **Pipeline de CI/CD**<br>Orquestração de deploy automatizado em produção. |

---

<details>
  <summary>🇺🇸 <b>English Version (Click to expand)</b></summary>

  ## About the Project
  An open-source financial ecosystem built to solve the real-world problem of ride-share drivers: understanding their true net income. The software monitors fuel efficiency, vehicle depreciation, and platforms costs to protect the driver's profit.

  ## Key Tech Stack
  * Node.js
  * TypeScript
  * Stripe API
  * Prisma ORM
  
</details>

<details>
  <summary>🇧🇷 <b>Versão em Português (Clique para expandir)</b></summary>

  ## Sobre o Projeto
  Um ecossistema financeiro open-source construído para resolver a dor real dos motoristas de aplicativo: entender o lucro líquido real. O software monitora eficiência de combustível, depreciação do veículo e taxas de plataformas para blindar o lucro de quem roda no dia a dia.

  ## Tecnologias Principais
  * Node.js
  * TypeScript
  * Stripe API
  * Prisma ORM

</details>

## 🗄️ Database Schema (ERD)

This section describes the relational database architecture used in the project. The system utilizes `UUID` types for primary keys to ensure global uniqueness and support scalable data synchronization. Numerical fields involving financial and distance metrics utilize fixed precision (`DECIMAL`).

### 📌 Key Rules and Constraints
* **`PK` (Primary Key):** Unique and mandatory identifier for the row.
* **`FK` (Foreign Key):** Establishes a relationship pointing to the PK of another table.
* **`NOT NULL`:** Mandatory field (does not accept null values).
* **`NULLABLE`:** Optional field (accepts null values).

---

### 1. Table: `users`
> **Description:** Centralizes driver profiles and dictates internationalization rules (currency, distance, and fuel metrics) for the entire user ecosystem.

| Field | Type | Constraints |
| :--- | :--- | :--- |
| `id` | `UUID` | `PK`, `DEFAULT: gen_random_uuid()` |
| `first_name` | `VARCHAR(50)` | `NOT NULL` |
| `last_name` | `VARCHAR(50)` | `NOT NULL` |
| `email` | `VARCHAR(255)` | `NOT NULL`, `UNIQUE` |
| `password_hash` | `VARCHAR(255)` | `NOT NULL` |
| `currency` | `VARCHAR(3)` | `NOT NULL` |
| `distance_unit` | `VARCHAR(2)` | `NOT NULL` |
| `fuel_unit` | `VARCHAR(6)` | `NOT NULL` |
| `is_driver` | `BOOLEAN` | `NOT NULL`, `DEFAULT: false` |
| `is_rider` | `BOOLEAN` | `NOT NULL`, `DEFAULT: false` |
| `created_at` | `TIMESTAMP WITH TIME ZONE`| `DEFAULT: NOW()` |

---

### 2. Table: `vehicles`
> **Description:** Stores cars or motorcycles registered by the user. Records the baseline initial odometer to start the platform's automation engine.

| Field | Type | Constraints |
| :--- | :--- | :--- |
| `id` | `UUID` | `PK` |
| `user_id` | `UUID` | `FK -> users.id` (ON DELETE CASCADE) |
| `make` | `VARCHAR(50)` | `NOT NULL` |
| `model` | `VARCHAR(50)` | `NOT NULL` |
| `official_efficiency`| `DECIMAL(5,2)` | `NOT NULL` |
| `real_efficiency` | `DECIMAL(5,2)` | `NOT NULL` |
| `initial_odometer` | `DECIMAL(10,2)` | `NOT NULL` |
| `is_active` | `BOOLEAN` | `NOT NULL`, `DEFAULT: true` |
| `created_at` | `TIMESTAMP WITH TIME ZONE`| `DEFAULT: NOW()` |

---

### 3. Table: `platforms`
> **Description:** Global catalog of available gig economy platforms. Supports custom user-created records via the "Other" option.

| Field | Type | Constraints |
| :--- | :--- | :--- |
| `id` | `UUID` | `PK` |
| `name` | `VARCHAR(100)` | `NOT NULL` |
| `vehicle_type` | `VARCHAR(10)` | `NOT NULL` |
| `is_custom` | `BOOLEAN` | `NOT NULL`, `DEFAULT: false` |
| `user_id` | `UUID` | `FK -> users.id`, `NULLABLE` |

---

### 4. Table: `user_platforms`
> **Description:** Pivot table (Many-to-Many) that manages which specific applications the driver has activated in their active operating profile.

| Field | Type | Constraints |
| :--- | :--- | :--- |
| `user_id` | `UUID` | `FK -> users.id`, `PK COMPOSITE` |
| `platform_id` | `UUID` | `FK -> platforms.id`, `PK COMPOSITE` |
| `is_active` | `BOOLEAN` | `NOT NULL`, `DEFAULT: true` |

---

### 5. Table: `shift_logs`
> **Description:** Records consolidated operational data for a completed shift. Receives only the final odometer reading and automates dead mileage calculation.

| Field | Type | Constraints |
| :--- | :--- | :--- |
| `id` | `UUID` | `PK` |
| `user_id` | `UUID` | `FK -> users.id` |
| `vehicle_id` | `UUID` | `FK -> vehicles.id` |
| `shift_date` | `DATE` | `NOT NULL` |
| `end_odometer` | `DECIMAL(10,2)` | `NOT NULL` |
| `passenger_km` | `DECIMAL(10,2)` | `NOT NULL` |
| `distance_traveled` | `DECIMAL(10,2)` | `NOT NULL` |
| `intensity` | `VARCHAR(10)` | `NOT NULL` |
| `safety` | `VARCHAR(10)` | `NOT NULL` |
| `notes` | `TEXT` | `NULLABLE` |
| `created_at` | `TIMESTAMP WITH TIME ZONE`| `DEFAULT: NOW()` |

---

### 6. Table: `shift_earnings`
> **Description:** Stores the exact breakdown of gross revenue per platform channel for each completed shift.

| Field | Type | Constraints |
| :--- | :--- | :--- |
| `id` | `UUID` | `PK` |
| `shift_log_id` | `UUID` | `FK -> shift_logs.id` (ON DELETE CASCADE) |
| `platform_id` | `UUID` | `FK -> platforms.id` |
| `gross_earning` | `DECIMAL(10,2)` | `NOT NULL` |

---

### 7. Table: `expense_categories`
> **Description:** Domain lookup table for cost categorization, securing technical consistency across data records.

| Field | Type | Constraints |
| :--- | :--- | :--- |
| `id` | `UUID` | `PK` |
| `name` | `VARCHAR(50)` | `NOT NULL` |
| `slug` | `VARCHAR(50)` | `NOT NULL`, `UNIQUE` |
| `description` | `VARCHAR(255)` | `NULLABLE` |

---

### 8. Table: `expenses`
> **Description:** Unified ledger for financial outlays. Variable expenses link directly to `shift_logs`. Fixed/periodic costs (Rent, Financing, Insurance) maintain a null shift reference.

| Field | Type | Constraints |
| :--- | :--- | :--- |
| `id` | `UUID` | `PK` |
| `user_id` | `UUID` | `FK -> users.id` |
| `category_id` | `UUID` | `FK -> expense_categories.id` |
| `shift_log_id` | `UUID` | `FK -> shift_logs.id`, `NULLABLE` |
| `vehicle_id` | `UUID` | `FK -> vehicles.id`, `NULLABLE` |
| `amount` | `DECIMAL(10,2)` | `NOT NULL` |
| `expense_date` | `DATE` | `NOT NULL` |
| `volume_purchased` | `DECIMAL(6,2)` | `NULLABLE` |
| `notes` | `TEXT` | `NULLABLE` |
| `created_at` | `TIMESTAMP WITH TIME ZONE`| `DEFAULT: NOW()` |