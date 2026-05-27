import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getOrganizationId } from '@/lib/middleware/tenant';

export async function POST(request: NextRequest) {
  try {
    // CRITICAL: Get organizationId from tenant context (middleware)
    const organizationId = await getOrganizationId(request);
    if (!organizationId) {
      return NextResponse.json(
        { error: 'No organization context found' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileType = formData.get('type') as string; // 'photo' | 'content-sample'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!['photo', 'content-sample'].includes(fileType)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }

    // Create Supabase client with service role key for admin access
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Supabase configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Generate file path with tenant isolation
    const fileExt = file.name.split('.').pop();
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(7);
    const fileName = `${timestamp}_${randomId}.${fileExt}`;
    const filePath = `${organizationId}/${fileType}/${fileName}`; // ← Tenant-scoped path

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('onboarding-files')
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error('Supabase storage error:', error);
      return NextResponse.json(
        { error: `Upload failed: ${error.message}` },
        { status: 500 }
      );
    }

    // Get public URL (or signed URL for private buckets)
    const { data: urlData } = supabase.storage
      .from('onboarding-files')
      .getPublicUrl(filePath);

    // For private buckets, use signed URL instead:
    // const { data: signedUrlData } = await supabase.storage
    //   .from('onboarding-files')
    //   .createSignedUrl(filePath, 3600); // 1 hour expiry

    return NextResponse.json({
      path: filePath,
      url: urlData.publicUrl,
      // signedUrl: signedUrlData?.signedUrl, // For private buckets
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
