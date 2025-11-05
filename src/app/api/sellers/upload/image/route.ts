import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * Proxy image upload to main Prometora API
 * Deployed stores don't have S3 credentials, so they proxy uploads through the main app
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Get the auth cookie to forward to the proxy endpoint
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth_token');

    // Proxy the request to the main Prometora API
    const prometoraApiUrl = process.env.PROMETORA_API_URL || ''; // Use empty string for relative URLs
    const proxyUrl = `${prometoraApiUrl}/api/proxy-upload/image`;

    console.log(`📤 Proxying image upload to: ${proxyUrl}`);

    const response = await fetch(proxyUrl, {
      method: 'POST',
      body: formData,
      headers: {
        // Forward the auth cookie
        'Cookie': authToken ? `auth_token=${authToken.value}` : '',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Proxy upload failed:', data);
      return NextResponse.json(
        { error: data.error || 'Failed to upload image' },
        { status: response.status }
      );
    }

    console.log('✅ Proxy upload successful');

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error proxying image upload:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
