import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Sparkles, LogOut, UploadCloud, ArrowLeft } from 'lucide-react';

const Account = () => {
  const { user, logout, saveUser } = useUser();
  const navigate = useNavigate();

  if (!user) {
    navigate('/signup');
    return null;
  }

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
          <Button variant="ghost" size="sm" onClick={() => { logout(); navigate('/'); }}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-xl mx-auto p-4 space-y-4">
        {/* Profile Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user.avatarDataUrl || '/favicon.ico'}
                alt="avatar"
                className="w-16 h-16 rounded-full object-cover border"
              />
              <label className="absolute -bottom-1 -right-1 bg-purple-600 text-white rounded-full p-1 cursor-pointer">
                <UploadCloud className="w-4 h-4" />
                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => {
                    // Save to localStorage via hook
                    const newUser = { ...user, avatarDataUrl: String(reader.result) };
                    localStorage.setItem('menso-user-profile', JSON.stringify(newUser));
                    window.location.reload();
                  };
                  reader.readAsDataURL(file);
                }} />
              </label>
            </div>
            <div>
              <div className="text-lg font-semibold">{user.firstName} {user.lastName}</div>
              <div className="text-xs text-muted-foreground">Member since {new Date().getFullYear()}</div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="text-xs text-muted-foreground">Email</div>
            <div className="font-medium break-words">{user.email}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="text-xs text-muted-foreground">Mobile</div>
            <div className="font-medium">{user.mobile}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="text-xs text-muted-foreground">State</div>
            <div className="font-medium">{user.state}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="text-xs text-muted-foreground">City</div>
            <div className="font-medium">{user.city || '-'}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="text-xs text-muted-foreground">Pincode</div>
            <div className="font-medium">{user.pincode}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="text-xs text-muted-foreground">Orders</div>
            <div className="font-medium">View your order history</div>
            <Button variant="ghost" className="mt-1 p-0" onClick={() => navigate('/orders')}>Open</Button>
          </div>
        </div>

        {/* Quick Edit */}
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="font-semibold mb-2">Edit details</div>
          <form className="grid grid-cols-2 gap-3" onSubmit={(e) => { e.preventDefault(); }}>
            <input className="border rounded px-3 py-2 text-sm" defaultValue={user.firstName} placeholder="First name" id="acc-fn" />
            <input className="border rounded px-3 py-2 text-sm" defaultValue={user.lastName} placeholder="Last name" id="acc-ln" />
            <input className="border rounded px-3 py-2 text-sm col-span-2" defaultValue={user.email} placeholder="Email" id="acc-email" />
            <input className="border rounded px-3 py-2 text-sm" defaultValue={user.state} placeholder="State" id="acc-state" />
            <input className="border rounded px-3 py-2 text-sm" defaultValue={user.city || ''} placeholder="City" id="acc-city" />
            <input className="border rounded px-3 py-2 text-sm" defaultValue={user.pincode} placeholder="Pincode" id="acc-pin" />
            <input className="border rounded px-3 py-2 text-sm" defaultValue={user.mobile} placeholder="Mobile" id="acc-mobile" />
          </form>
          <div className="flex justify-end mt-3">
            <Button onClick={() => {
              const updated = {
                firstName: (document.getElementById('acc-fn') as HTMLInputElement).value,
                lastName: (document.getElementById('acc-ln') as HTMLInputElement).value,
                email: (document.getElementById('acc-email') as HTMLInputElement).value,
                state: (document.getElementById('acc-state') as HTMLInputElement).value,
                city: (document.getElementById('acc-city') as HTMLInputElement).value,
                pincode: (document.getElementById('acc-pin') as HTMLInputElement).value,
                mobile: (document.getElementById('acc-mobile') as HTMLInputElement).value,
                avatarDataUrl: user.avatarDataUrl,
              } as any;
              saveUser(updated);
              window.location.reload();
            }}>Save Changes</Button>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl p-4 shadow-sm border flex items-center justify-between">
          <div>
            <div className="font-semibold">Fast checkout</div>
            <div className="text-xs text-muted-foreground">Your profile details auto-fill the address form.</div>
          </div>
          <Button variant="fashion" onClick={() => navigate('/checkout')}>Go to Checkout</Button>
        </div>
      </main>
    </div>
  );
};

export default Account;


