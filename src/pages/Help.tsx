import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, Package, CreditCard } from 'lucide-react';

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
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center">
          <button onClick={() => navigate('/')} className="mr-3 p-1 rounded hover:bg-gray-100">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold">Help & Support</h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto p-4 space-y-6 pb-24">
        {/* FAQ Section */}
        <section className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-3">❓ Frequently Asked Questions</h3>
          <div className="divide-y">
            {faqs.map((f, idx) => (
              <details
                key={idx}
                className="py-3 group cursor-pointer hover:bg-gray-50 rounded-md px-2 transition"
              >
                <summary className="list-none font-medium flex justify-between items-center">
                  {f.q}
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">📬 Contact Us</h3>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thanks! We will get back to you shortly.');
            }}
          >
            <div>
              <label className="text-sm font-medium">Your Email</label>
              <input
                type="email"
                required
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fashion-purple"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Issue Type</label>
              <select className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fashion-purple">
                <option>Order related</option>
                <option>Payment</option>
                <option>Returns</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fashion-purple"
                rows={4}
                placeholder="Describe your issue..."
              />
            </div>
            <Button type="submit" variant="fashion" className="w-full">
              Submit
            </Button>
          </form>
        </section>

        {/* Quick Support Buttons */}
        <section className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-3">⚡ Quick Support</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
              onClick={() => window.location.href = 'mailto:support@example.com'}
            >
              <Mail className="w-4 h-4" /> Email
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
              onClick={() => window.location.href = 'tel:+911234567890'}
            >
              <Phone className="w-4 h-4" /> Call
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
              onClick={() => navigate('/orders')}
            >
              <Package className="w-4 h-4" /> My Orders
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
              onClick={() => navigate('/checkout')}
            >
              <CreditCard className="w-4 h-4" /> Checkout
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Help;
