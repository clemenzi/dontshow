import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// TODO: move this page to dontshow.app/faq
// NOT TRANSLATED BECAUSE NEEDS TO BE MOVED

function App() {
  return (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger id="disabled">
            Why is my extension disabled on this page?
          </AccordionTrigger>
          <AccordionContent>
            Don't Show is disabled on all browser native pages, such as the settings, downloads,
            bookmarks, and history pages. This is because these pages are managed by the browser
            itself, and extensions cannot modify them.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default App;
