<script lang="ts">
    import type monaco from 'monaco-editor';
    
    import { onMount } from 'svelte';
    import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
    import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
    import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
    import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
    import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
	import { StringBuilder } from './utils/StringBuilder';
    
    let divEl: any = null;
    let editor: monaco.editor.IStandaloneCodeEditor;
    let Monaco;

    export const stringBuilder = new StringBuilder();

    onMount(async () => {
        // @ts-ignore
        self.MonacoEnvironment = {
            getWorker: function (_moduleId: any, label: string) {
                if (label === 'json') {
                    return new jsonWorker();
                }
                if (label === 'css' || label === 'scss' || label === 'less') {
                    return new cssWorker();
                }
                if (label === 'html' || label === 'handlebars' || label === 'razor') {
                    return new htmlWorker();
                }
                if (label === 'typescript' || label === 'javascript') {
                    return new tsWorker();
                }
                return new editorWorker();
            }
        };

        Monaco = await import('monaco-editor');
        editor = Monaco.editor.create(divEl, {
            readOnly: true,
            theme: 'vs-dark',
            lineNumbers: 'off',
            automaticLayout: true,
            minimap: {
                enabled: false
            },
            language: 'javascript'
        });

        return () => {
            editor.dispose();
        };
    });

    // Export an update function
    export const update = () => {
        if(!editor) {
            return;
        }
            
        editor.setValue(stringBuilder.getContent());
        
    };
</script>

<div bind:this={divEl} class="h-screen" />

<style>
    div {
        height: 100%;
        width: 100%;
        /**position: fixed;**/
    }
</style>
