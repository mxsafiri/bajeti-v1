# Bajeti Implementation Plan: Vertical Slice + Incremental Expansion

## Phase 1: Project Setup & Foundation (Week 1)

### 1.1 Project Initialization
- [x] Initialize Wasp project: `wasp new bajeti-v1`
- [x] Configure project structure
- [x] Set up Shadcn UI with Tailwind CSS
- [x] Create GitHub repository and initial commit

**Key Files:**
- `main.wasp`: Core application configuration
- `tailwind.config.js`: UI styling configuration
- `tsconfig.json`: TypeScript configuration

### 1.2 Database Schema Design
- [x] Design core data models in Prisma
- [x] Create initial schema with User, Transaction, Category entities
- [x] Set up database migrations

**Key Files:**
- `main.wasp`: Entity definitions
- `src/utils/supabase.ts`: Supabase client setup
- `src/utils/dbSetup.ts`: Database initialization
- `src/types/supabase.ts`: Database type definitions
- `migrations/`: Database migration files

### 1.3 Authentication Setup
- [ ] Configure Wasp's built-in authentication
- [ ] Create login/signup pages with Shadcn UI components
- [ ] Implement protected routes

**Key Files:**
- `main.wasp`: Auth configuration
- `src/pages/auth/login.tsx`: Login page
- `src/pages/auth/signup.tsx`: Signup page

## Phase 2: Expense Tracking Vertical Slice (Week 2)

### 2.1 Transaction Management
- [ ] Create Transaction model with relations to User and Category
- [ ] Implement transaction CRUD operations
- [ ] Build transaction list and detail views

**Key Files:**
- `src/features/transactions/`: Transaction components and logic
- `src/features/transactions/TransactionForm.tsx`: Form for adding/editing transactions
- `src/features/transactions/TransactionList.tsx`: List view of transactions

### 2.2 Category Management
- [ ] Implement predefined expense categories
- [ ] Create category management UI
- [ ] Add category filtering for transactions

**Key Files:**
- `src/features/categories/`: Category components and logic
- `src/features/categories/CategorySelector.tsx`: UI for selecting categories

### 2.3 Dashboard - Basic Version
- [ ] Create simple dashboard with recent transactions
- [ ] Implement transaction summary statistics
- [ ] Add mobile-responsive layout

**Key Files:**
- `src/pages/dashboard.tsx`: Main dashboard page
- `src/features/dashboard/TransactionSummary.tsx`: Summary component

## Phase 3: Income Tracking Vertical Slice (Week 3)

### 3.1 Income Recording
- [ ] Extend Transaction model to differentiate income vs. expense
- [ ] Create dedicated income entry form
- [ ] Implement income source categorization

**Key Files:**
- `src/features/income/IncomeForm.tsx`: Form for adding income
- `src/features/income/IncomeList.tsx`: List of income entries

### 3.2 Income Analysis
- [ ] Create income summary view
- [ ] Implement income vs. expense comparison
- [ ] Add income trend visualization

**Key Files:**
- `src/features/dashboard/IncomeSummary.tsx`: Income summary component
- `src/features/dashboard/IncomeVsExpense.tsx`: Comparison chart

### 3.3 Dashboard Enhancement
- [ ] Integrate income data into dashboard
- [ ] Improve dashboard layout and UX
- [ ] Add quick actions for common tasks

**Key Files:**
- `src/pages/dashboard.tsx`: Updated dashboard
- `src/features/dashboard/QuickActions.tsx`: Common action buttons

## Phase 4: Budgeting Vertical Slice (Week 4)

### 4.1 Budget Creation
- [ ] Create Budget and BudgetCategory models
- [ ] Implement monthly budget creation
- [ ] Build budget allocation by category

**Key Files:**
- `src/features/budgets/BudgetForm.tsx`: Budget creation form
- `src/features/budgets/CategoryAllocation.tsx`: Category budget allocation

### 4.2 Budget Tracking
- [ ] Implement budget vs. actual comparison
- [ ] Create budget progress visualization
- [ ] Add category-specific budget tracking

**Key Files:**
- `src/features/budgets/BudgetTracker.tsx`: Budget tracking component
- `src/features/budgets/CategoryProgress.tsx`: Category budget progress

### 4.3 Dashboard Integration
- [ ] Add budget summary to dashboard
- [ ] Implement budget alerts for overspending
- [ ] Create budget recommendations

**Key Files:**
- `src/features/dashboard/BudgetSummary.tsx`: Budget summary component
- `src/features/dashboard/BudgetAlerts.tsx`: Overspending alerts

## Phase 5: Mobile Optimization & Polish (Week 5)

### 5.1 Mobile Experience Enhancement
- [ ] Optimize all views for mobile devices
- [ ] Implement touch-friendly interactions
- [ ] Create mobile navigation pattern

**Key Files:**
- `src/components/layout/MobileNav.tsx`: Mobile navigation
- `src/styles/mobile.css`: Mobile-specific styles

### 5.2 Performance Optimization
- [ ] Implement data caching strategies
- [ ] Optimize component rendering
- [ ] Add loading states and skeletons

**Key Files:**
- `src/utils/cache.ts`: Caching utilities
- `src/components/ui/Skeleton.tsx`: Loading skeleton components

### 5.3 Final Testing & Bug Fixes
- [ ] Conduct comprehensive testing
- [ ] Fix identified issues
- [ ] Optimize for Tanzanian network conditions

**Key Files:**
- `tests/`: Test files
- `src/utils/errorHandling.ts`: Error handling utilities

## Phase 6: Deployment & Launch (Week 6)

### 6.1 Deployment Setup
- [ ] Configure production environment
- [ ] Set up CI/CD pipeline
- [ ] Implement database backup strategy

**Key Files:**
- `.github/workflows/`: CI/CD configuration
- `config/production.ts`: Production configuration

### 6.2 Documentation
- [ ] Create user documentation
- [ ] Write developer documentation
- [ ] Document API endpoints

**Key Files:**
- `docs/`: Documentation files
- `README.md`: Project overview

### 6.3 Launch Preparation
- [ ] Conduct final QA testing
- [ ] Prepare launch materials
- [ ] Set up analytics and monitoring

**Key Files:**
- `src/utils/analytics.ts`: Analytics integration
- `src/utils/monitoring.ts`: Application monitoring

## Implementation Guidelines

1. **Development Flow**:
   - Complete each task within a phase before moving to the next
   - Create feature branches for each vertical slice
   - Conduct code reviews before merging

2. **Testing Strategy**:
   - Write unit tests for critical business logic
   - Implement integration tests for each vertical slice
   - Conduct regular usability testing with target users

3. **LLM-Assisted Coding Approach**:
   - Use LLM for initial component scaffolding
   - Leverage LLM for complex logic implementation
   - Use LLM for documentation generation

4. **Quality Assurance**:
   - Implement TypeScript for type safety
   - Use ESLint and Prettier for code quality
   - Follow accessibility best practices