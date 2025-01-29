import { NextResponse } from "next/server"

export async function GET() {
  const mockRequests = [            // get the name , image, query, and time from database in this format
    {
      name: "Shree",
      iconUrl: "/placeholder.svg?height=40&width=40",
      text: "Need Help in Frontend",
      time: "5m ago",
      cgpa : "7.0",
      branch : "EEE"
    },
    {
        name: "Ritesh",
        iconUrl: "/placeholder.svg?height=40&width=40",
        text: "ANC ajao",
        time: "1m ago",
        cgpa : "8.0",
        branch : "ECE"
    },
    {
        name: "Devansh",
        iconUrl: "/placeholder.svg?height=40&width=40",
        text: "Update on the project",
        time: "10m ago",
        cgpa : "6.9",
        branch : "CS"
    },
    {
        name: "Dhairya",
        iconUrl: "/placeholder.svg?height=40&width=40",
        text: "Hey, can we chat about the project?",
        time: "1h ago",
        cgpa : "7.0",
        branch : "EEE"
    },
    {
        name: "Aravind",
        iconUrl: "/placeholder.svg?height=40&width=40",
        text: "Missed the meet",
        time: "2h ago",
        cgpa : "7.0",
        branch : "EEE"
    },
    {
      name: "Shashwat",
      iconUrl: "/placeholder.svg?height=40&width=40",
      text: "I have a question about the latest update.",
      time: "15m ago",
      cgpa : "7.0",
      branch : "EEE"
    },
    {
      name: "Vikashh",
      iconUrl: "/placeholder.svg?height=40&width=40",
      text: "Goodnight",
      time: "30m ago",
      cgpa : "7.0",
      branch : "EEE"
    },
    {
      name: "Arinjay",
      iconUrl: "/placeholder.svg?height=40&width=40",
      text: "Meet ajao",
      time: "1m ago",
      cgpa : "7.0",
      branch : "EEE"
    },
    {
      name: "Arinjay",
      iconUrl: "/placeholder.svg?height=40&width=40",
      text: "Nvm cancelled",
      time: "1m ago",
      cgpa : "7.0",
      branch : "EEE"
    },
  ]

  return NextResponse.json({
    requests: mockRequests,
    totalRequests: mockRequests.length,
  })
}

