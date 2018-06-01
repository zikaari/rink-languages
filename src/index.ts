import { fs, packageRuntime, workspace } from 'rink-app'
import { join } from 'path-fx'
import { grammars, languages } from './manifest'

export default {
    onActivate: async () => {
        grammars.forEach(({ path, scopeName }) => {
            workspace.editor.registerLanguageGrammar(scopeName, {
                getAsJSON: () => fs.readFile(
                    join(packageRuntime.info.installPath, 'grammars/', path),
                    'utf8'
                ),
            })
        })

        languages.forEach(workspace.editor.registerLanguage)

        // Activate these languages right now (priority=high)
        await Promise.all([
            'html',
            'css',
            'JSON',
            // 'CoffeeScript',
            'JavaScript',
            'TypeScript',
            'TypeScriptReact',
            'vue'
        ].map(workspace.editor.getLanguageTokenizer))

        // Activate these in background (priority=low)
        // [
        //     'php',
        //     'scss',
        //     'less',
        //     'pug',
        // ].forEach(workspace.editor.getLanguageTokenizer)

        // The remaining languages will get activated on-demand (whenever that language's file is opened)
        return
    },
}
