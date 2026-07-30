function App() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-50">
      <section className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            React + Vite + Tailwind CSS
          </p>
          <h1 className="text-5xl font-black tracking-tight text-balance sm:text-6xl">
            Your website starter is ready.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
            Start building in <code>src/App.jsx</code> and style with Tailwind
            classes. Hot reload is already configured through Vite.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              className="rounded-full bg-amber-400 px-6 py-3 font-semibold text-stone-950 transition hover:bg-amber-300"
              href="https://react.dev"
              target="_blank"
              rel="noreferrer"
            >
              React Docs
            </a>
            <a
              className="rounded-full border border-stone-700 px-6 py-3 font-semibold text-stone-100 transition hover:border-stone-500 hover:bg-stone-900"
              href="https://tailwindcss.com/docs"
              target="_blank"
              rel="noreferrer"
            >
              Tailwind Docs
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
