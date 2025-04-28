# Bajeti

A simple, intuitive personal finance and budgeting app tailored for Tanzanians.

## Overview

Bajeti is a full-stack web application that helps users track income, manage expenses, and view financial summaries. Built with the Wasp framework and Shadcn UI, it offers a modern, responsive interface with enterprise-grade functionality.

## Features

- **Income Tracking**: Record and categorize income from various sources
- **Expense Management**: Track daily expenses with customizable categories
- **Budget Planning**: Create monthly budgets and track spending against them
- **Financial Dashboard**: Visualize financial data with intuitive charts and summaries
- **Responsive Design**: Optimized for both desktop and mobile use

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Wasp framework (Node.js)
- **Database**: PostgreSQL
- **Authentication**: Built-in Wasp authentication
- **State Management**: React Query for server state, React Context for UI state

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- Wasp CLI
- PostgreSQL

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mxsafiri/bajeti-v1.git
   cd bajeti-v1
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   wasp start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
bajeti-v1/
├── main.wasp              # Wasp configuration file
├── schema.prisma          # Database schema
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/            # Shadcn UI components
│   │   └── layout/        # Layout components
│   ├── features/          # Feature-based modules
│   │   ├── transactions/  # Transaction-related components
│   │   ├── categories/    # Category management
│   │   ├── budgets/       # Budget planning
│   │   └── dashboard/     # Dashboard components
│   ├── pages/             # Page components
│   │   └── auth/          # Authentication pages
│   ├── actions/           # Wasp actions (mutations)
│   ├── queries/           # Wasp queries
│   ├── utils/             # Utility functions
│   └── styles/            # Global styles
└── public/                # Static assets
```

## Development Approach

Bajeti follows a vertical slice architecture, focusing on building complete features end-to-end. This approach allows for:

- Faster delivery of user value
- Better separation of concerns
- Easier maintenance and testing
- Incremental feature development

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Wasp](https://wasp-lang.dev/)
- UI components from [Shadcn UI](https://ui.shadcn.com/)
