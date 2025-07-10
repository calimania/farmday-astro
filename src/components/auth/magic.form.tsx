import type { Store, Page } from "@/markket";
import React, { useState } from "react";
import { markketplace } from "@/config";
import { IconAlertCircle, IconCheck, IconMail, IconRotateClockwise2 as Loader2, } from "@tabler/icons-react";

interface MagicLinkFormProps {
  store: Store,
  page: Page,
}


const MagicLinkForm: React.FC<MagicLinkFormProps> = ({ page, store }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(new URL(`/api/auth-magic/request`, markketplace.api), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "*/*",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          store_id: store?.documentId,
        }),
        credentials: 'include'
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error?.message || "Failed to send email");
      }

      setStatus("success");
      setMessage("Check your email inbox for the magic link to continue.");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setMessage("");
    setEmail("");
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <IconMail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{page?.Title || 'Magic link login'}</h2>
          <p className="text-blue-100 text-sm">
            Enter your email to receive a secure login link
          </p>
        </div>

        <div className="p-8">
          {status === "success" ? (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <IconCheck className="w-10 h-10 text-green-600" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-900">Email Sent!</h3>
                <p className="text-gray-600 leading-relaxed">
                  {message}
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Sent to:</strong> {email}
                  </p>
                </div>
              </div>
              <button
                onClick={resetForm}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
              >
                Send to a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 pl-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${status === "error"
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-white hover:border-gray-400"
                        }`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "loading"}
                      autoComplete="email"
                    />
                    <IconMail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all transform ${status === "loading"
                    ? "bg-blue-400 text-white cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white hover:scale-[1.02] active:scale-[0.98]"
                    }`}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5 mr-2" />
                      Sending Magic Link...
                    </>
                  ) : (
                    <>
                      <IconMail className="w-5 h-5 mr-2" />
                      Send Magic Link
                    </>
                  )}
                </button>

                {status === "error" && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 border border-red-200 rounded-xl p-4">
                    <IconAlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">{message}</p>
                  </div>
                )}
              </form>
          )}
        </div>

        <div className="bg-gray-50 px-8 py-4 text-center">
          <p className="text-xs text-gray-500">
            We'll send you a secure link that expires in 15 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default MagicLinkForm;
