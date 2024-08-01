import AuthLayout from '#auth/ui/components/auth_layout'
import { Button } from '#common/ui/components/button'
import { Input } from '#common/ui/components/input'
import { Label } from '#common/ui/components/label'
import { Popover, PopoverContent, PopoverTrigger } from '#common/ui/components/popover'
import { Link, useForm } from '@inertiajs/react'
import * as React from 'react'
import { Info, LoaderIcon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '#common/ui/components/select'
import useErrors from '#common/ui/hooks/use_errors'
import useTranslate from '#common/ui/hooks/use_translate'

interface SignUpProps {}

const SignUp: React.FunctionComponent<SignUpProps> = () => {
  const t = useTranslate()
  const errors = useErrors()
  const form = useForm({
    gender: 'male',
    firstName: '',
    lastName: '',
    localPart: '',
    backupEmail: '',
    password: '',
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.post('/auth/sign_up')
  }

  return (
    <AuthLayout title={t('auth.sign_up_title')} description={t('auth.sign_up_description')}>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="flex space-x-2">
          <div className="grid gap-2">
            <Label htmlFor="firstName" className="opacity-0">
              {t('auth.gender')}
            </Label>
            <Select
              value={form.data.gender}
              onValueChange={(value) => form.setData('gender', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t('auth.gender')}</SelectLabel>
                  <SelectItem value="male">{t('auth.mr')}</SelectItem>
                  <SelectItem value="female">{t('auth.mrs')}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="firstName">{t('auth.first_name')}</Label>
            <Input
              id="firstName"
              type="text"
              placeholder={t('auth.first_name_placeholder')}
              required
              value={form.data.firstName}
              onChange={(e) => form.setData('firstName', e.target.value)}
            />
            {errors?.firstName && <p className="text-sm text-red-600">{errors?.firstName}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">{t('auth.last_name')}</Label>
            <Input
              id="lastName"
              type="text"
              placeholder={t('auth.last_name_placeholder')}
              required
              value={form.data.lastName}
              onChange={(e) => form.setData('lastName', e.target.value)}
            />
            {errors?.lastName && <p className="text-sm text-red-600">{errors?.lastName}</p>}
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="localPart">{t('auth.email_address')}</Label>
          <div className="flex w-full max-w-sm items-center">
            <Input
              className="!rounded-r-none lowercase"
              id="localPart"
              type="text"
              placeholder={t('auth.email_placeholder')}
              required
              value={form.data.localPart}
              onChange={(e) => form.setData('localPart', e.target.value)}
            />
            <span className="flex h-10 rounded-r-md border-l-0 border border-input bg-background px-3 py-2 text-sm ring-offset-background text-muted-foreground">
              @panache.so
            </span>
          </div>
          {errors?.localPart && <p className="text-sm text-red-600">{errors?.localPart}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="backupEmail" className="items-center flex">
            <span className="mr-1">{t('auth.backup_email_address')}</span>

            <Popover>
              <PopoverTrigger>
                <Info className="h-3.5 w-3.5 text-muted-foreground" />
              </PopoverTrigger>
              <PopoverContent
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: t('auth.backup_email_description') }}
              ></PopoverContent>
            </Popover>

            <span className="ml-2 text-muted-foreground">({t('auth.optional')})</span>
          </Label>
          <Input
            className="lowercase"
            id="backupEmail"
            type="text"
            placeholder={t('auth.backup_email_placeholder')}
            value={form.data.backupEmail}
            onChange={(e) => form.setData('backupEmail', e.target.value)}
          />
          {errors?.backupEmail && <p className="text-sm text-red-600">{errors?.backupEmail}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">{t('auth.password')}</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••••"
            required
            minLength={8}
            value={form.data.password}
            onChange={(e) => form.setData('password', e.target.value)}
          />
          {errors?.password && <p className="text-sm text-red-600">{errors?.password}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={form.processing}>
          {form.processing && <LoaderIcon className="w-4 h-4" />}
          <span>{t('auth.sign_up')}</span>
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        {t('auth.already_have_account')}{' '}
        <Link
          href="/auth/sign_in"
          className="text-muted-foreground underline hover:opacity-75 transition"
        >
          {t('auth.sign_in')}
        </Link>
      </div>
    </AuthLayout>
  )
}

export default SignUp
