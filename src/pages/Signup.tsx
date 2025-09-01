import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { useMemo, useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { indianStates, stateToCities } from "@/data/indiaLocations";

const Signup = () => {
  const navigate = useNavigate();
  const { saveUser } = useUser();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    state: "",
    city: "",
    pincode: "",
  });

  const stateOptions = indianStates;
  const cityOptions = useMemo(
    () => (form.state ? stateToCities[form.state] : []),
    [form.state]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.city) return;
    saveUser({
      ...form,
    });
    navigate("/");
    setTimeout(() => navigate("/account"), 0);
  };

  return (
    <div className="min-h-screen bg-background pb-10">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="mr-3 p-1 rounded hover:bg-gray-100"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-fashion-purple" />
            <h1
              className="text-3xl font-extrabold lowercase tracking-tight cursor-pointer"
              style={{ color: "#6D106A" }}
              onClick={() => navigate("/")}
            >
              meesho
            </h1>
          </div>
          <div className="w-6" />
        </div>
      </header>

      {/* Main Form */}
      <main className="max-w-xl mx-auto p-4">
        <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 rounded-xl p-5 text-white mb-6 shadow-md">
          <div className="font-semibold text-lg md:text-xl">
            Create your account
          </div>
          <div className="text-xs md:text-sm opacity-90 mt-1">
            Sign up to save your details for faster checkout and personalized
            offers.
          </div>
        </div>

        <form
          className="bg-white rounded-xl p-5 shadow-md space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">First name</label>
              <input
                pattern="[A-Za-z ]{2,}"
                title="Only letters, min 2 characters"
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fashion-purple"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Last name</label>
              <input
                pattern="[A-Za-z ]{2,}"
                title="Only letters, min 2 characters"
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fashion-purple"
                value={form.lastName}
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fashion-purple"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Mobile number</label>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              pattern="[0-9]{10}"
              title="Enter exactly 10 digits (0-9)"
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fashion-purple"
              value={form.mobile}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
                setForm({ ...form, mobile: digitsOnly });
              }}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">State</label>
              <select
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fashion-purple"
                value={form.state}
                onChange={(e) =>
                  setForm({ ...form, state: e.target.value, city: "" })
                }
                required
              >
                <option value="" disabled>
                  Select state
                </option>
                {stateOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">City</label>
              <select
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fashion-purple"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
                disabled={!form.state}
              >
                <option value="" disabled>
                  {form.state ? "Select city" : "Select state first"}
                </option>
                {cityOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Pincode</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              pattern="[0-9]{6}"
              title="Enter exactly 6 digits (0-9)"
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fashion-purple"
              value={form.pincode}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
                setForm({ ...form, pincode: digitsOnly });
              }}
              required
            />
          </div>

          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <input type="checkbox" required className="mt-1" />
            I agree to the Terms and Privacy Policy. We may contact you on the
            provided mobile number/email for order updates.
          </label>

          <Button type="submit" variant="fashion" className="w-full py-2 text-sm md:text-base">
            Sign up
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Signup;
