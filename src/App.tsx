import { Toaster } from "sonner"
import BookingsPage from "./pages/BookingsPage"

export default function App() {
  return (
    <>
      <header className="border-b bg-background">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <h1 className="text-xl font-semibold tracking-tight">
            Booking Manager
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <BookingsPage />
      </main>

      <Toaster richColors position="top-right" />
    </>
  )
}
