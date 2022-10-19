export class StringBuilder {

    private lines: string[] = [];

    append(value: string): void {
        let lastLineIndex = this.lines.length - 1;
        let lastLineVal = this.lines[lastLineIndex];

        this.lines[lastLineIndex] = lastLineVal + value;
    }

    appendLine(value: string): void {
        this.lines.push(value);
    }

    getContent(): string {
        return this.lines.join("\n");
    }
}