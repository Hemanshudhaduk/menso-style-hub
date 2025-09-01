import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, LogOut, UploadCloud, ArrowLeft } from "lucide-react";

const Account = () => {
  const { user, logout, saveUser } = useUser();
  const navigate = useNavigate();

  if (!user) {
    navigate("/signup");
    return null;
  }

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
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-xl mx-auto p-4 space-y-4">
        {/* Profile Card */}
        <div className="bg-white rounded-xl p-4 shadow-md border flex items-center gap-4">
          <div className="relative">
            <img
              src={user.avatarDataUrl || "/favicon.ico"}
              alt="avatar"
              className="w-16 h-16 rounded-full object-cover border"
            />
            <label className="absolute -bottom-1 -right-1 bg-purple-600 text-white rounded-full p-1 cursor-pointer hover:bg-purple-700 transition">
              <UploadCloud className="w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => {
                    const newUser = {
                      ...user,
                      avatarDataUrl: String(reader.result),
                    };
                    saveUser(newUser);
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </label>
          </div>
          <div>
            <div className="text-lg font-semibold">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-xs text-muted-foreground">
              Member since {new Date().getFullYear()}
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Email", value: user.email },
            { label: "Mobile", value: user.mobile },
            { label: "State", value: user.state },
            { label: "City", value: user.city },
            { label: "Pincode", value: user.pincode },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-xl p-4 shadow-md border"
            >
              <div className="text-xs text-muted-foreground">{item.label}</div>
              <div className="font-medium break-words">{item.value}</div>
            </div>
          ))}
          <div className="bg-white rounded-xl p-4 shadow-md border flex flex-col">
            <div className="text-xs text-muted-foreground">Orders</div>
            <div className="font-medium mt-1">View your order history</div>
            <Button
              variant="outline"
              className="mt-2 py-1 text-sm"
              onClick={() => navigate("/orders")}
            >
              Open
            </Button>
          </div>
        </div>

        {/* Quick Edit */}
        <div className="bg-white rounded-xl p-4 shadow-md border">
          <div className="font-semibold mb-3">Edit details</div>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: "acc-fn", placeholder: "First name", value: user.firstName },
              { id: "acc-ln", placeholder: "Last name", value: user.lastName },
              { id: "acc-email", placeholder: "Email", value: user.email, col: 2 },
              { id: "acc-state", placeholder: "State", value: user.state },
              { id: "acc-city", placeholder: "City", value: user.city || "" },
              { id: "acc-pin", placeholder: "Pincode", value: user.pincode },
              { id: "acc-mobile", placeholder: "Mobile", value: user.mobile },
            ].map((field) => (
              <input
                key={field.id}
                className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fashion-purple ${
                  field.col === 2 ? "sm:col-span-2" : ""
                }`}
                defaultValue={field.value}
                placeholder={field.placeholder}
                id={field.id}
              />
            ))}
          </form>
          <div className="flex justify-end mt-3">
            <Button
              onClick={() => {
                const updated = {
                  firstName: (document.getElementById("acc-fn") as HTMLInputElement)
                    .value,
                  lastName: (document.getElementById("acc-ln") as HTMLInputElement)
                    .value,
                  email: (document.getElementById("acc-email") as HTMLInputElement)
                    .value,
                  state: (document.getElementById("acc-state") as HTMLInputElement)
                    .value,
                  city: (document.getElementById("acc-city") as HTMLInputElement)
                    .value,
                  pincode: (document.getElementById("acc-pin") as HTMLInputElement)
                    .value,
                  mobile: (document.getElementById("acc-mobile") as HTMLInputElement)
                    .value,
                  avatarDataUrl: user?.avatarDataUrl,
                };
                saveUser(updated);
              }}
            >
              Save Changes
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl p-4 shadow-md border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="font-semibold">Fast checkout</div>
            <div className="text-xs text-muted-foreground mt-1">
              Your profile details auto-fill the address form.
            </div>
          </div>
          <Button variant="fashion" className="sm:mt-0 w-full sm:w-auto" onClick={() => navigate("/checkout")}>
            Go to Checkout
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Account;
