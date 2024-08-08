import * as React from 'react'
import EmailsLayout from '#emails/ui/components/emails_layout'
import { Send, Save, HelpCircle } from 'lucide-react'
import { Button } from '#common/ui/components/button'
import { Card, CardHeader, CardContent, CardFooter } from '#common/ui/components/card'
import { Textarea } from '#common/ui/components/textarea'
import { Label } from '#common/ui/components/label'
import { Input } from '#common/ui/components/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '#common/ui/components/tooltip'
import useUser from '#common/ui/hooks/use_user'
import useTranslate from '#common/ui/hooks/use_translate'

interface EditProps {}

const Edit: React.FunctionComponent<EditProps> = () => {
  const user = useUser()
  const [cc, setCc] = React.useState('')
  const [bcc, setBcc] = React.useState('')
  const [subject, setSubject] = React.useState('')
  const [body, setBody] = React.useState('')
  const t = useTranslate()

  const handleSaveDraft = () => {
    // Implement save draft functionality
    console.log('Saving draft:', { cc, bcc, subject, body })
  }

  const handleSend = () => {
    // Implement send email functionality
    console.log('Sending email:', { cc, bcc, subject, body })
  }

  return (
    <EmailsLayout topChildren={<p className="font-semibold text-lg">Compose Message</p>}>
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col gap-y-1">
            <div className="flex">
              <label className="font-semibold w-20 flex h-10 rounded-l-md border-r-0 border border-input bg-background px-3 py-2 text-sm ring-offset-background text-accent-foreground">
                From
              </label>
              <Input
                className="!rounded-l-none"
                id="from"
                value={user.localPart + '@panache.so'}
                readOnly
              />
            </div>
            <div className="flex">
              <label className="font-semibold w-20 flex h-10 rounded-l-md border-r-0 border border-input bg-background px-3 py-2 text-sm ring-offset-background text-accent-foreground">
                To
              </label>
              <Input className="!rounded-l-none" id="to" placeholder="Add recipients..." />
            </div>
            <div className="flex items-center">
              <label className="items-center w-20 flex h-10 rounded-l-md border-r-0 border border-input bg-background px-3 py-2 text-sm ring-offset-background text-accent-foreground">
                <span className="font-semibold">CC</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="ml-2">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-lg">
                      <p>
                        Recipients in the CC field will receive a copy of the email, and everyone
                        can see who was CC'd.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </label>
              <Input
                className="!rounded-l-none"
                id="cc"
                placeholder="Add recipients..."
                value={cc}
                onChange={(e) => setCc(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center w-20 h-10 rounded-l-md border-r-0 border border-input bg-background px-3 py-2 text-sm ring-offset-background text-accent-foreground">
                <span className="font-semibold">BCC</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="ml-2">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-lg">
                      <p>
                        Recipients in the BCC field will receive a copy of the email, but other
                        recipients won't see who was BCC'd.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </label>
              <Input
                className="!rounded-l-none"
                id="bcc"
                placeholder="Add recipients..."
                value={bcc}
                onChange={(e) => setBcc(e.target.value)}
              />
            </div>
            <div className="flex">
              <label className="font-semibold w-20 flex h-10 rounded-l-md border-r-0 border border-input bg-background px-3 py-2 text-sm ring-offset-background text-accent-foreground">
                Subject
              </label>
              <Input
                className="!rounded-l-none"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter the subject..."
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="body">Message</Label>
              <Textarea
                id="body"
                placeholder="Write your message here"
                rows={10}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex items-center space-x-4">
          <Button onClick={handleSend}>
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
        </CardFooter>
      </Card>
    </EmailsLayout>
  )
}

export default Edit
