import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Timer, Brain, Focus, ArrowRight } from "lucide-react"

export default function Home() {
  const features = [
    {
      icon: <Timer className="h-6 w-6" />,
      title: "Time Management",
      description: "Break your work into focused 25-minute intervals",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Better Productivity",
      description: "Reduce mental fatigue and maintain high energy levels",
    },
    {
      icon: <Focus className="h-6 w-6" />,
      title: "Deep Focus",
      description: "Eliminate distractions and achieve flow state",
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0d0d0f]" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Grow Your Productivity
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Transform your work sessions into a journey of growth with our unique Pomodoro timer that helps you stay
            focused and motivated.
          </p>
          <Link href="/dashboard">
            <Button className="bg-[#f35021] hover:bg-[#f35021]/90 text-white px-8 py-6 text-lg rounded-full">
              Start Growing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose Sprout?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="bg-background/5 backdrop-blur border-none">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 rounded-full bg-[#f35021]/10 text-[#f35021]">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Boost Your Productivity?</h2>
          <Link href="/dashboard">
            <Button className="bg-[#f35021] hover:bg-[#f35021]/90 text-white px-8 py-6 text-lg rounded-full">
              Try Sprout Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}

