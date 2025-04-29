import React, { useState } from 'react';
import { Link } from '@wasp/router';
import signup from '@wasp/auth/signup';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useForm } from 'react-hook-form';

type SignupFormData = {
  username: string;
  password: string;
  passwordConfirmation: string;
};

export function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupFormData>();
  const password = watch('password');
  
  const onSubmit = async (data: SignupFormData) => {
    try {
      setError(null);
      setIsLoading(true);
      
      // Remove passwordConfirmation before sending to the server
      const { passwordConfirmation, ...signupData } = data;
      
      await signup(signupData);
      // Successful signup will automatically redirect to the onAuthSuccessRedirectTo page
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary">Bajeti</h1>
          <h2 className="mt-2 text-xl text-muted-foreground">Personal Finance for Tanzanians</h2>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your details to create your account
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-white bg-destructive rounded-md">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  autoComplete="username"
                  {...register('username', { 
                    required: 'Username is required',
                    minLength: {
                      value: 3,
                      message: 'Username must be at least 3 characters'
                    }
                  })}
                  className={errors.username ? 'border-destructive' : ''}
                  disabled={isLoading}
                />
                {errors.username && (
                  <p className="text-sm text-destructive">{errors.username.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    }
                  })}
                  className={errors.password ? 'border-destructive' : ''}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="passwordConfirmation" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Confirm Password
                </label>
                <Input
                  id="passwordConfirmation"
                  type="password"
                  autoComplete="new-password"
                  {...register('passwordConfirmation', { 
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                  className={errors.passwordConfirmation ? 'border-destructive' : ''}
                  disabled={isLoading}
                />
                {errors.passwordConfirmation && (
                  <p className="text-sm text-destructive">{errors.passwordConfirmation.message}</p>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
              
              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
