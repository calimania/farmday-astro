import { IconCheck, IconX, IconLoader2, IconSparkles } from '@tabler/icons-react';
import React from 'react';

const MagicVerifyingCode = ({ showDelayedLoading, validationStatus, requestNew}: { showDelayedLoading: boolean, validationStatus: string , requestNew: () =>void; }) => {

  return (
    <div className=" flex items-center justify-center p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {!showDelayedLoading ? (
            <>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconSparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Magic Link Detected</h2>
                <p className="text-blue-100 text-sm">
                  Preparing to authenticate...
                </p>
              </div>
              <div className="p-8 text-center">
                <div className="animate-pulse space-y-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {validationStatus == 'invalid' && (
                <>
                  <div className="bg-gradient-to-r from-red-600 to-pink-600 px-8 py-6 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconX className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Invalid Magic Link</h2>
                    <p className="text-red-100 text-sm">
                      This link is not valid or has expired
                    </p>
                  </div>
                  <div className="p-8 text-center space-y-6">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                      <IconX className="w-10 h-10 text-red-600" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-gray-900">Link Not Valid</h3>
                      <p className="text-gray-600 leading-relaxed">
                        This magic link is either invalid, expired, or has already been used. Please request a new one.
                      </p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <div className="flex items-center justify-center space-x-2 text-red-800">
                        <IconX className="w-5 h-5" />
                        <p className="text-sm font-medium">Authentication Failed</p>
                      </div>
                    </div>
                    <button
                      onClick={requestNew}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Request New Magic Link
                    </button>
                  </div>
                </>
              )}
              {validationStatus == 'valid' && (
                <>
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconCheck className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Authentication Successful</h2>
                    <p className="text-green-100 text-sm">
                      Your magic link is valid!
                    </p>
                  </div>
                  <div className="p-8 text-center space-y-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <IconCheck className="w-10 h-10 text-green-600" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-gray-900">Welcome Back!</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Your magic link has been successfully validated. You will be redirected shortly.
                      </p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center justify-center space-x-2 text-green-800">
                        <IconSparkles className="w-5 h-5" />
                        <p className="text-sm font-medium">Authentication Complete</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {validationStatus == 'loading' && (
                <>
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconLoader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Processing Request</h2>
                    <p className="text-blue-100 text-sm">
                      Validating your magic link...
                    </p>
                  </div>

                  <div className="p-8">
                    <div className="space-y-6">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                      </div>
                      <div className="text-center space-y-2">
                        <p className="text-gray-600">Please wait while we verify your authentication...</p>
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                          <IconLoader2 className="w-4 h-4 animate-spin" />
                          <span>This should only take a moment</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MagicVerifyingCode;
