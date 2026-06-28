import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock response
    return NextResponse.json({
      tumor_type: "glioma",
      next: "submit_mutation_data",
      precaution: "Further analysis recommended to determine glioma stage.",
    })
  } catch (error) {
    console.error("Error in mock predict-image API:", error)
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 })
  }
}
