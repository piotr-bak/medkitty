/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@mui/lab'],
    modularizeImports: {
        '@mui/lab': {
            transform: '@mui/lab/{{member}}'
        }
    }
};

export default nextConfig;
