import { Link } from '@inertiajs/react'
import AuthLayout from '#auth/ui/components/auth_layout'
import { Button } from '#common/ui/components/button'
import { Label } from '#common/ui/components/label'
import { Input } from '#common/ui/components/input'
import * as React from 'react'

interface ForgotPasswordProps {}

const ForgotPassword: React.FunctionComponent<ForgotPasswordProps> = () => {
  return (
    <AuthLayout
      title="Forgot Your Password?"
      description=<>
        You will receive an <strong>email with instructions</strong>, if your account has a{' '}
        <em>backup email</em>.
      </>
    >
      <div className="grid gap-2">
        <Label htmlFor="username">Email Address</Label>
        <div className="flex w-full max-w-sm items-center">
          <Input
            className="!rounded-r-none lowercase"
            id="username"
            type="text"
            placeholder="john.doe"
            required
          />
          <span className="flex h-10 rounded-r-md border-l-0 border border-input bg-background px-3 py-2 text-sm ring-offset-background text-muted-foreground">
            @panache.so
          </span>
        </div>

        <Button type="submit" className="w-full">
          Send Reset Link
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/auth/sign_up" className="underline hover:opacity-75 transition">
          Sign up
        </Link>
      </div>
    </AuthLayout>
  )
}

export default ForgotPassword
