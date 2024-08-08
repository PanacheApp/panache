import * as React from 'react'
import { useForm } from '@inertiajs/react'
import { Button } from '#common/ui/components/button'
import { Input } from '#common/ui/components/input'
import { Label } from '#common/ui/components/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#common/ui/components/select'
import DashboardLayout from '#common/ui/components/dashboard_layout'
import { Card, CardContent, CardFooter } from '#common/ui/components/card'

export default function CreateBusinessOrganization() {
  const form = useForm({
    name: '',
    sirenSiret: '',
    nafNaceNoga: '',
    vatNumber: '',
    address: '',
    addressComplement: '',
    postalCode: '',
    city: '',
    country: '',
    phoneNumber: '',
    website: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.post('/business/organizations')
  }

  return (
    <DashboardLayout
      moduleName="Business"
      topChildren={<h1 className="text-lg font-bold">Create Your Business Organization</h1>}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <CardContent className="mt-6 flex flex-col gap-y-4">
            <div>
              <Label htmlFor="name">Organization Name</Label>
              <Input
                id="name"
                value={form.data.name}
                onChange={(e) => form.setData('name', e.target.value)}
                required
                placeholder="Enter organization name"
              />
            </div>

            <div>
              <Label htmlFor="sirenSiret">SIREN/SIRET Number</Label>
              <Input
                id="sirenSiret"
                value={form.data.sirenSiret}
                onChange={(e) => form.setData('sirenSiret', e.target.value)}
                required
                placeholder="Enter SIREN/SIRET number"
              />
            </div>

            <div>
              <Label htmlFor="nafNaceNoga">NAF/NACE/NOGA Code</Label>
              <Input
                id="nafNaceNoga"
                value={form.data.nafNaceNoga}
                onChange={(e) => form.setData('nafNaceNoga', e.target.value)}
                required
                placeholder="Enter NAF/NACE/NOGA code"
              />
            </div>

            <div>
              <Label htmlFor="vatNumber">VAT Number</Label>
              <Input
                id="vatNumber"
                value={form.data.vatNumber}
                onChange={(e) => form.setData('vatNumber', e.target.value)}
                placeholder="Enter VAT number (optional)"
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={form.data.address}
                onChange={(e) => form.setData('address', e.target.value)}
                required
                placeholder="Enter street address"
              />
            </div>

            <div>
              <Label htmlFor="addressComplement">Address Complement</Label>
              <Input
                id="addressComplement"
                value={form.data.addressComplement}
                onChange={(e) => form.setData('addressComplement', e.target.value)}
                placeholder="Enter additional address info (optional)"
              />
            </div>

            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={form.data.postalCode}
                onChange={(e) => form.setData('postalCode', e.target.value)}
                required
                placeholder="Enter postal code"
              />
            </div>

            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={form.data.city}
                onChange={(e) => form.setData('city', e.target.value)}
                required
                placeholder="Enter city name"
              />
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Select onValueChange={(value) => form.setData('country', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="FR">France</SelectItem>
                  {/* Add more countries as needed */}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={form.data.phoneNumber}
                onChange={(e) => form.setData('phoneNumber', e.target.value)}
                placeholder="Enter phone number (optional)"
              />
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={form.data.website}
                onChange={(e) => form.setData('website', e.target.value)}
                placeholder="Enter website URL (optional)"
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" disabled={form.processing}>
              Create Organization
            </Button>
          </CardFooter>
        </Card>
      </form>
    </DashboardLayout>
  )
}
