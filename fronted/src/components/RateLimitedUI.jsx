import React from 'react'
import { Zap } from 'lucide-react'

const RateLimitedUI = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-green-200 text-black border border-green-400 rounded-xl p-6 shadow-md">
        <div className="flex items-start gap-4">
          <Zap className="size-6 mt-1 text-green-800" />
          <div>
            <h2 className="text-xl font-bold font-mono">Rate Limit Reached</h2>
            <p className="text-sm mt-1 font-mono">
              You've made too many requests in a short period. Please wait a moment.
              <br />
              Try again in a few seconds for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RateLimitedUI


