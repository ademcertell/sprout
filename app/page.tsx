import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Timer, Focus, LineChart, Sprout, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function Home() {
  const features = [
    {
      icon: <Timer className="h-10 w-10" />,
      title: "Smart Timer",
      description:
        "Customizable Pomodoro timer that adapts to your work style. Set work durations, break intervals, and stay focused.",
      /* image: "timer.png" */
    },
    {
      icon: <Focus className="h-10 w-10" />,
      title: "Focus Mode",
      description:
        "Enter distraction-free mode with a clean interface that helps you concentrate on what matters most.",
      /* image: "focusmode.png" */
    },
    {
      icon: <LineChart className="h-10 w-10" />,
      title: "Progress Tracking",
      description: "Monitor your productivity with detailed statistics and visualize your daily achievements.",
      /* image: "statistics.png" */
    },
    {
      icon: <Sprout className="h-10 w-10" />,
      title: "Growth Visualization",
      description:
        "Watch your tree grow as you complete work sessions, providing a visual representation of your progress.",
      /* image: "tree.png" */
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F172A]">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Grow Your Productivity
              <br />
              One Session at a Time
            </h1>
            <p className="text-lg md:text-xl text-[#a1a1aa] mb-8 max-w-2xl mx-auto">
              Sprout combines the power of the Pomodoro Technique with visual growth tracking, helping you stay focused
              and motivated throughout your work sessions.
            </p>
            <Link href="/dashboard">
              <Button className="bg-[#4ADE80] hover:bg-[#22C55E] text-[#0F172A] px-8 py-6 text-lg rounded-full">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
              Powerful Features to Boost Your Productivity
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border border-[#4ADE80]/50 bg-[#0F172A]/90 shadow-lg rounded-lg">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4">
                      <div className="p-4 rounded-full bg-[#4ADE80]/20 text-[#4ADE80]">{feature.icon}</div>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="text-[#a1a1aa] mt-2">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Ready to Boost Your Productivity?</h2>
            <Link href="/dashboard">
              <Button className="bg-[#4ADE80] hover:bg-[#22C55E] text-[#0F172A] px-8 py-6 text-lg rounded-full">
                Try Sprout Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}