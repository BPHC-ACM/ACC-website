import { NextResponse } from "next/server"

export async function GET() {
  const mockRequests = [            // get the name , image, query, and time from database in this format
    {
      name: "Shree",
      iconUrl: "/placeholder.svg?height=40&width=40",
      text: "Need Help in Frontend",
      time: "5m ago",
    },
    {
        name: "Ritesh",
        iconUrl: "/placeholder.svg?height=40&width=40",
        text: "ANC ajao",
        time: "1m ago",
    },
    {
        name: "Devansh",
        iconUrl: "/placeholder.svg?height=40&width=40",
        text: "Update on the project",
        time: "10m ago",
    },
    {
        name: "Dhairya",
        iconUrl: "/placeholder.svg?height=40&width=40",
        text: "Hey, can we chat about the project?",
        time: "1h ago",
    },
    {
        name: "Aravind",
        iconUrl: "/placeholder.svg?height=40&width=40",
        text: "Missed the meet",
        time: "2h ago",
    },
    {
      name: "Shashwat",
      iconUrl: "/placeholder.svg?height=40&width=40",
      text: "I have a question about the latest update.",
      time: "15m ago",
    },
    {
      name: "Vikashh",
      iconUrl: "/placeholder.svg?height=40&width=40",
      text: "Goodnight",
      time: "30m ago",
    },
    {
      name: "Arinjay",
      iconUrl: "/placeholder.svg?height=40&width=40",
      text: "Meet ajao",
      time: "1m ago",
    },
    {
      name: "Arinjay",
      iconUrl: "/placeholder.svg?height=40&width=40",
      text: "Nvm cancelled",
      time: "1m ago",
    },
  ]

  return NextResponse.json({
    requests: mockRequests,
    totalRequests: mockRequests.length,
  })
}

