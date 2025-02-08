"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0F172A] border-b border-[#4ADE80]/20">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Sprout Logo" width={32} height={32} />
            <span className="text-xl font-bold text-[#e4e4e7]">Sprout</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm text-[#a1a1aa] hover:text-[#e4e4e7] transition-colors"
            >
              Features
            </button>
          </div>
          <Link href="/dashboard">
            <Button variant="default" className="bg-[#4ADE80] hover:bg-[#22C55E] text-[#0F172A]">
              Start
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}