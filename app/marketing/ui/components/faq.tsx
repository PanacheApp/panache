import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '#common/ui/components/accordion'

const faqData = [
  {
    question: 'What is Panache?',
    answer:
      'Panache is a comprehensive suite of productivity tools including email, file storage, team collaboration, calendar, and more.',
  },
  {
    question: 'How do I create a Panache account?',
    answer:
      "To create a Panache account, visit our sign-up page and follow the instructions. You'll need to provide some basic information and choose a unique username.",
  },
  {
    question: 'Is Panache free to use?',
    answer:
      'Panache offers both free and premium plans. The free plan includes basic features, while premium plans offer additional storage, advanced features, and priority support.',
  },
  {
    question: 'Can I use Panache for my business?',
    answer:
      'Absolutely! Panache offers business plans with advanced features tailored for team collaboration, increased storage, and dedicated support.',
  },
]

const FAQ = () => {
  return (
    <div className="bg-zinc-950 text-white py-24 sm:py-28 px-4 sm:px-0">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {faqData.map((faq, index) => (
          <AccordionItem className="border-zinc-600" key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left hover:text-gray-300 transition-colors">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-zinc-300">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default FAQ
