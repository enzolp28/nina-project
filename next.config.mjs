
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: "10mb",
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "iwygeawwasqxspmojudl.supabase.co",
            },
        ],
    }
};


export default nextConfig;
