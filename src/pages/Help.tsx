import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const faqs = [
  { q: 'How do I track my order?', a: 'Go to Orders from the bottom bar. Tap an order to see live status and details.' },
  { q: 'What is the return policy?', a: 'You can request a return within 7 days of delivery for eligible items.' },
  { q: 'How do I apply offers?', a: 'Eligible offers like Ganesh 30% are auto-applied when your cart qualifies.' },
  { q: 'Is online payment safe?', a: 'Yes. We use secure gateways and do not store your sensitive payment data.' },
];

const Help = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center">
          <button onClick={() => navigate('/')} className="mr-3">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold">Help & Support</h2>
        </div>
      </header>

      <main className="max-w-xl mx-auto p-4 space-y-6 pb-24">
        <section className="bg-white rounded-lg p-4">
          <h3 className="text-base font-semibold mb-2">Frequently Asked Questions</h3>
          <div className="divide-y">
            {faqs.map((f, idx) => (
              <details key={idx} className="py-3">
                <summary className="cursor-pointer list-none font-medium">{f.q}</summary>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg p-4">
          <h3 className="text-base font-semibold mb-3">Contact Us</h3>
          <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert('Thanks! We will get back to you shortly.'); }}>
            <div>
              <label className="text-sm">Your Email</label>
              <input type="email" required className="mt-1 w-full border rounded px-3 py-2 text-sm" placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-sm">Issue Type</label>
              <select className="mt-1 w-full border rounded px-3 py-2 text-sm">
                <option>Order related</option>
                <option>Payment</option>
                <option>Returns</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm">Message</label>
              <textarea className="mt-1 w-full border rounded px-3 py-2 text-sm" rows={4} placeholder="Describe your issue..." />
            </div>
            <Button type="submit" variant="fashion" className="w-full">Submit</Button>
          </form>
        </section>

        <section className="bg-white rounded-lg p-4">
          <h3 className="text-base font-semibold mb-2">Quick Support</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Button variant="outline" onClick={() => window.location.href = 'mailto:support@example.com'}>Email</Button>
            <Button variant="outline" onClick={() => window.location.href = 'tel:+911234567890'}>Call</Button>
            <Button variant="outline" onClick={() => navigate('/orders')}>My Orders</Button>
            <Button variant="outline" onClick={() => navigate('/checkout')}>Checkout</Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Help;


