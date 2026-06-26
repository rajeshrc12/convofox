import { Button } from "@workspace/ui/components/button"

const App = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google"
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="text-xl font-semibold tracking-tight text-slate-900">
          Convo<span className="text-slate-500">fox</span>
        </div>

        <Button onClick={handleLogin} className="rounded-full px-5">
          Login
        </Button>
      </header>

      <main className="mx-auto flex max-w-4xl flex-col items-center px-6 pt-24 text-center">
        <div className="mb-6 rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-sm text-slate-600">
          Secure Video Conferencing
        </div>

        <h1 className="text-6xl font-semibold tracking-tight text-slate-900">
          Connect with anyone
          <span className="block text-slate-500">from anywhere, instantly</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
          Host high-quality video meetings, collaborate in real time, share your
          screen, and stay connected with secure and reliable conferencing.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <Button size="lg" onClick={handleLogin} className="rounded-full px-8">
            Get Started
          </Button>

          <Button variant="outline" size="lg" className="rounded-full px-8">
            Learn More
          </Button>
        </div>
      </main>
    </div>
  )
}

export default App
