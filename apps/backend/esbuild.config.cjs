const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['src/server.ts'],
    bundle: true,
    platform: 'node',
    target: 'node20', // Align with Docker base image
    outfile: 'dist/server.cjs',
    external: [
        // Native modules or things that should not be bundled
        '@prisma/client', // We will copy the generated client manually or rely on its standard behavior
        'pg-native',      // Optional peer dep of pg
        'pg',             // pg often has issues with bundling due to native bindings lookup
        '@prisma/adapter-pg',
    ],
    logLevel: 'info',
}).catch(() => process.exit(1));
