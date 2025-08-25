import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';
import { useMemo, useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { indianStates, stateToCities } from '@/data/indiaLocations';

const Signup = () => {
  const navigate = useNavigate();
  const { saveUser } = useUser();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', mobile: '', state: '', city: '', pincode: '' });

  const stateOptions = indianStates;
  const cityOptions = useMemo(() => (form.state ? stateToCities[form.state] : []), [form.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.city) return;
    saveUser({ firstName: form.firstName, lastName: form.lastName, email: form.email, mobile: form.mobile, state: form.state, pincode: form.pincode });
    navigate('/');
    setTimeout(() => navigate('/account'), 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="mr-3">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-fashion-purple" />
            <h1 className="text-2xl font-extrabold lowercase tracking-tight" style={{ color: '#6D106A' }}>meesho</h1>
          </div>
          <div className="w-6" />
        </div>
      </header>

      <main className="max-w-xl mx-auto p-4">
        <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 rounded-lg p-4 text-white mb-4">
          <div className="font-semibold">Create your account</div>
          <div className="text-xs opacity-90">Sign up to save your details for faster checkout and personalized offers.</div>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">First name</label>
              <input pattern="[A-Za-z ]{2,}" title="Only letters, min 2 characters" className="mt-1 w-full border rounded px-3 py-2 text-sm" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
            </div>
            <div>
              <label className="text-sm">Last name</label>
              <input pattern="[A-Za-z ]{2,}" title="Only letters, min 2 characters" className="mt-1 w-full border rounded px-3 py-2 text-sm" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
            </div>
          </div>
          <div>
            <label className="text-sm">Email</label>
            <input type="email" className="mt-1 w-full border rounded px-3 py-2 text-sm" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <label className="text-sm">Mobile number</label>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              pattern="[0-9]{10}"
              title="Enter exactly 10 digits (0-9)"
              className="mt-1 w-full border rounded px-3 py-2 text-sm"
              value={form.mobile}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                setForm({ ...form, mobile: digitsOnly });
              }}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">State</label>
              <select className="mt-1 w-full border rounded px-3 py-2 text-sm" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value, city: '' })} required>
                <option value="" disabled>Select state</option>
                {stateOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm">City</label>
              <select className="mt-1 w-full border rounded px-3 py-2 text-sm" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required disabled={!form.state}>
                <option value="" disabled>{form.state ? 'Select city' : 'Select state first'}</option>
                {cityOptions.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm">Pincode</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              pattern="[0-9]{6}"
              title="Enter exactly 6 digits (0-9)"
              className="mt-1 w-full border rounded px-3 py-2 text-sm"
              value={form.pincode}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
                setForm({ ...form, pincode: digitsOnly });
              }}
              required
            />
          </div>

          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <input type="checkbox" required className="mt-1" />
            I agree to the Terms and Privacy Policy. We may contact you on the provided mobile number/email for order updates.
          </label>
          <Button type="submit" variant="fashion" className="w-full">Sign up</Button>
        </form>
      </main>
    </div>
  );
};

export default Signup;


