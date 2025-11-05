import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * Get current user session data
 * Deployed stores proxy this to the main Prometora API to get user info
 */
export async function GET(req: NextRequest) {
  try {
    // Get the auth cookie
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth_token');

    if (!authToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Proxy the request to the main Prometora API
    const prometoraApiUrl = process.env.PROMETORA_API_URL || ''; // Use empty string for relative URLs
    const proxyUrl = `${prometoraApiUrl}/api/user/me`;

    console.log(`📤 Proxying user/me request to: ${proxyUrl}`);

    const response = await fetch(proxyUrl, {
      method: 'GET',
      headers: {
        // Forward the auth cookie
        'Cookie': `auth_token=${authToken.value}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Proxy request failed:', data);
      return NextResponse.json(
        { error: data.error || 'Failed to fetch user data' },
        { status: response.status }
      );
    }

    console.log('✅ Proxy user/me successful');

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error proxying user/me request:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
