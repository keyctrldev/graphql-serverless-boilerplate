import type { CodegenConfig } from '@graphql-codegen/cli'
import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files'
 
const config: CodegenConfig = {
  schema: './src/schema/**/*.graphql',
  generates: {
    'src/schema': defineConfig()
  }
}
export default config