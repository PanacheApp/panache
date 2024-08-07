import AuthLayout from '#auth/ui/components/auth_layout'
import { Link, useForm } from '@inertiajs/react'
import { Button } from '#common/ui/components/button'
import { Label } from '#common/ui/components/label'
import { Input } from '#common/ui/components/input'
import * as React from 'react'
import { LoaderIcon } from 'lucide-react'
import useErrors from '#common/ui/hooks/use_errors'
import useTranslate from '#common/ui/hooks/use_translate'

interface SignInProps {}

const SignIn: React.FunctionComponent<SignInProps> = () => {
  const t = useTranslate()
  const errors = useErrors()

  const form = useForm({
    localPart: '',
    password: '',
  })

  const fillDevelopmentValues = () => {
    form.setData({
      localPart: 'paul.valery',
      password: 'password123',
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.post('/auth/sign_in')
  }

  return (
    <AuthLayout title={t('auth.sign_in_title')} description={t('auth.sign_in_description')}>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="localPart">{t('auth.email_address')}</Label>
          <div className="flex w-full max-w-sm items-center">
            <Input
              id="localPart"
              type="text"
              placeholder={t('auth.email_placeholder')}
              required
              className="!rounded-r-none lowercase"
              value={form.data.localPart}
              onChange={(e) => form.setData('localPart', e.target.value)}
            />
            <span className="flex h-10 rounded-r-md border-l-0 border border-input bg-background px-3 py-2 text-sm ring-offset-background text-muted-foreground">
              @panache.so
            </span>
          </div>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <Link
              href="/auth/forgot_password"
              className="text-muted-foreground ml-auto inline-block text-sm hover:opacity-75 transition underline"
            >
              {t('auth.forgot_password')}
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••••"
            required
            value={form.data.password}
            onChange={(e) => form.setData('password', e.target.value)}
          />
        </div>

        {errors?.auth && <p className="text-sm text-red-600">{errors?.auth}</p>}

        <Button type="submit" className="w-full" disabled={form.processing}>
          {form.processing && <LoaderIcon className="w-4 h-4" />}
          <span>{t('auth.sign_in')}</span>
        </Button>

        {process.env.NODE_ENV === 'development' && (
          <Button
            type="button"
            variant="outline"
            className="w-full mt-2"
            onClick={fillDevelopmentValues}
          >
            {t('auth.fill_development_values')}
          </Button>
        )}
      </form>
      <div className="mt-4 text-center text-sm">
        {t('auth.dont_have_account')}{' '}
        <Link
          href="/auth/sign_up"
          className="text-muted-foreground underline hover:opacity-75 transition"
        >
          {t('auth.sign_up')}
        </Link>
      </div>
    </AuthLayout>
  )
}

export default SignIn
