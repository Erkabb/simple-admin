
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
  schema: "https://project-api-jade.vercel.app/api/graphql",
  documents: ['src/**/*.gql'],
  config: {
    useTypeImports: true,
    dedupeOperationSuffix: true,
    onlyOperationTypes: true,
  },
  generates: {
    'src/gql/graphql.ts': { plugins: ['typescript'] },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: 'gql/graphql.ts',
        extension: '.generated.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
    },
  },
};

export default config;
