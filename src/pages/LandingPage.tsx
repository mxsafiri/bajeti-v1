import React from 'react';
import { Link } from '@wasp/router';
import { useAuth } from '@wasp/auth/useAuth';
import { Button } from '../components/ui/button';

export function LandingPage() {
  const { data: user, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        
        {/* Navigation */}
        <div className="mx-auto max-w-7xl">
          <nav className="flex items-center justify-between py-6" aria-label="Global">
            <div className="flex lg:flex-1">
              <Link to="/" className="-m-1.5 p-1.5 text-2xl font-bold text-primary">
                Bajeti
              </Link>
            </div>
            <div className="flex gap-x-4 lg:gap-x-6">
              {!isLoading && (
                user ? (
                  <Link to="/dashboard">
                    <Button variant="outline">Dashboard</Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="outline">Sign in</Button>
                    </Link>
                    <Link to="/signup">
                      <Button>Sign up</Button>
                    </Link>
                  </>
                )
              )}
            </div>
          </nav>
        </div>
        
        {/* Hero Content */}
        <div className="mx-auto max-w-7xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Manage Your Finances with Ease
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Bajeti is a simple, intuitive personal finance and budgeting app tailored for Tanzanians.
              Track your income, manage expenses, and achieve your financial goals.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {!isLoading && !user && (
                <Link to="/signup">
                  <Button size="lg" className="rounded-md px-8">
                    Get started
                  </Button>
                </Link>
              )}
              {!isLoading && user && (
                <Link to="/dashboard">
                  <Button size="lg" className="rounded-md px-8">
                    Go to dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Manage Your Money</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to take control of your finances
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Bajeti provides all the tools you need to track your spending, plan your budget, and achieve your financial goals.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Track Your Expenses
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  Easily record and categorize your daily expenses to understand where your money is going.
                </dd>
              </div>
              
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                    </svg>
                  </div>
                  Create Budgets
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  Set monthly budgets for different categories and track your spending against them.
                </dd>
              </div>
              
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                    </svg>
                  </div>
                  Visualize Your Finances
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  See clear visualizations of your spending patterns and financial progress over time.
                </dd>
              </div>
              
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  Secure & Private
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  Your financial data is securely stored and never shared with third parties.
                </dd>
              </div>
            </dl>
          </div>
        </div>
        
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-secondary opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-card">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-muted-foreground">
              &copy; {new Date().getFullYear()} Bajeti. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
