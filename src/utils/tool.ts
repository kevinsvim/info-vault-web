import { openF, openS } from "@/utils/tip";

function getRandomNumberByRange(start: number, end: number) {
    return Math.round(Math.random() * (end - start) + start);
}

function sum(x: number, y: number) {
    return x + y;
}

function square(x: number) {
    return x * x;
}

/**
 * 复制到剪贴板
 */
const copyClipboard = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
        openS('复制成功', 'success')
    }).catch(() => {
        openF('复制失败', 'error')
    })
}

/**
 * 将json数据进行转义
 */
const escapeJson = (json: string) => {
    return json.replace(/["\\/\b\f\n\r\t]/g, (match: string): any => {
        switch (match) {
            case '"':
                return '\\"';
            case '\\':
                return '\\\\';
            case '/':
                return '\\/';
            case '\b':
                return '\\b';
            case '\f':
                return '\\f';
            case '\n':
                return '\\n';
            case '\r':
                return '\\r';
            case '\t':
                return '\\t';
        }
    })
}
export { getRandomNumberByRange, sum, square, copyClipboard, escapeJson }
