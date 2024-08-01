import { Link } from '@inertiajs/react'
import AuthLayout from '#auth/ui/components/auth_layout'
import { Button } from '#common/ui/components/button'
import { Label } from '#common/ui/components/label'
import { Input } from '#common/ui/components/input'
import * as React from 'react'
import useTranslate from '#common/ui/hooks/use_translate'

interface ForgotPasswordProps {}

const ForgotPassword: React.FunctionComponent<ForgotPasswordProps> = () => {
  const t = useTranslate()

  return (
    <AuthLayout
      title={t('auth.forgot_password_title')}
      description={
        <div dangerouslySetInnerHTML={{ __html: t('auth.forgot_password_description') }} />
      }
    >
      <div className="grid gap-2">
        <Label htmlFor="username">{t('auth.email_address')}</Label>
        <div className="flex w-full max-w-sm items-center">
          <Input
            className="!rounded-r-none lowercase"
            id="username"
            type="text"
            placeholder={t('auth.email_placeholder')}
            required
          />
          <span className="flex h-10 rounded-r-md border-l-0 border border-input bg-background px-3 py-2 text-sm ring-offset-background text-muted-foreground">
            @panache.so
          </span>
        </div>

        <Button type="submit" className="w-full">
          {t('auth.send_reset_link')}
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        {t('auth.dont_have_account')}{' '}
        <Link href="/auth/sign_up" className="underline hover:opacity-75 transition">
          {t('auth.sign_up')}
        </Link>
      </div>
    </AuthLayout>
  )
}

export default ForgotPassword
