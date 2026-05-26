// 获取数据
export function getStorage<T = unknown>(name: string, isSession?: boolean): T {
    const storage = isSession ? sessionStorage.getItem(name) : localStorage.getItem(name);
    const data = storage ?? "";

    try {
        return JSON.parse(data) as T;
    } catch {
        return data as unknown as T;
    }
}

// 存储数据
export function setStorage(name: string, data: unknown, isSession?: boolean): void {
    const saveData = JSON.stringify(data);
    const storage = isSession ? sessionStorage : localStorage;
    storage.setItem(name, saveData);
}

// 删除数据
export function deleteStorage(name: string, isSession?: boolean): void {
    const storage = isSession ? sessionStorage : localStorage;
    storage.removeItem(name);
}

// 清空数据
export function clearStorage(isSession?: boolean): void {
    const storage = isSession ? sessionStorage : localStorage;
    storage.clear();
}

// 生成浏览器指纹
export function generateFingerprint() {
    function md5Hash(str: string): string {
        let h0 = 0x67452301, h1 = 0xefcdab89, h2 = 0x98badcfe, h3 = 0x10325476;
        const s = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21];
        const K = new Array<number>(64);
        for (let i = 0; i < 64; i++) K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296);

        function rotL(x: number, n: number) {
            return (x << n) | (x >>> (32 - n));
        }

        function add(a: number, b: number) {
            return (a + b) >>> 0;
        }

        let bytes = unescape(encodeURIComponent(str));
        let len = bytes.length;
        let arr: number[] = [];
        for (let i = 0; i < len; i++) arr.push(bytes.charCodeAt(i));
        arr.push(0x80);
        while ((arr.length * 8) % 512 !== 448) arr.push(0);
        let bitLen = len * 8;
        arr.push(bitLen >>> 24 & 0xff, bitLen >>> 16 & 0xff, bitLen >>> 8 & 0xff, bitLen & 0xff);

        for (let offset = 0; offset < arr.length; offset += 64) {
            let w = new Array<number>(16).fill(0);
            for (let i = 0; i < 16; i++) {
                w[i] = arr[offset + i * 4]
                    | (arr[offset + i * 4 + 1] << 8)
                    | (arr[offset + i * 4 + 2] << 16)
                    | (arr[offset + i * 4 + 3] << 24);
            }
            let a = h0, b = h1, c = h2, d = h3;
            for (let i = 0; i < 64; i++) {
                let f: number, g: number;
                if (i < 16) {
                    f = (b & c) | (~b & d);
                    g = i;
                } else if (i < 32) {
                    f = (d & b) | (~d & c);
                    g = (5 * i + 1) % 16;
                } else if (i < 48) {
                    f = b ^ c ^ d;
                    g = (3 * i + 5) % 16;
                } else {
                    f = c ^ (b | ~d);
                    g = (7 * i) % 16;
                }
                let temp = d;
                d = c;
                c = b;
                b = add(b, rotL(add(add(a, f), add(K[i], w[g])), s[i % 4]));
                a = temp;
            }
            h0 = add(h0, a);
            h1 = add(h1, b);
            h2 = add(h2, c);
            h3 = add(h3, d);
        }

        const hex = (n: number) => {
            let s = '';
            for (let i = 0; i < 4; i++) {
                s += ('0' + ((n >>> (i * 8)) & 0xff).toString(16)).slice(-2);
            }
            return s;
        };
        return hex(h0) + hex(h1) + hex(h2) + hex(h3);
    }

// 获取Canvas画布指纹
    function getCanvasFinger(): string {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return '';
            canvas.width = 280;
            canvas.height = 60;
            ctx.textBaseline = 'top';
            ctx.fillStyle = '#123456';
            ctx.fillRect(20, 20, 150, 30);
            ctx.font = 'bold 19px Arial';
            ctx.fillStyle = '#f90';
            ctx.fillText('FP_Finger_2026ABC!@#', 25, 25);
            ctx.fillStyle = '#000';
            ctx.fillText('BrowserFingerPrint', 30, 45);
            return canvas.toDataURL('image/jpeg', 0.8);
        } catch {
            return '';
        }
    }

// 获取WebGL显卡指纹
    function getWebGLFinger(): string {
        try {
            const canvas = document.createElement('canvas');
            const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;

            if (!gl) return '';

            const v = gl.getParameter(gl.VERSION);
            const r = gl.getParameter(gl.RENDERER);
            const vd = gl.getParameter(gl.VENDOR);
            return `${v}|${r}|${vd}`;
        } catch {
            return '';
        }
    }

    // 获取设备基础特征信息
    function getDeviceBaseInfo(): string {
        const nav = navigator;
        const scr = window.screen;
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const info = {
            ua: nav.userAgent,
            platform: nav.platform,
            lang: nav.language,
            core: nav.hardwareConcurrency ?? 0,
            mem: (nav as any).deviceMemory ?? 0,
            sw: scr.width,
            sh: scr.height,
            dpr: window.devicePixelRatio,
            tz: tz,
            colorDepth: scr.colorDepth
        };
        return JSON.stringify(info);
    }

    /**
     * 主方法：生成浏览器唯一指纹
     * @returns 32位MD5浏览器指纹
     */
    function getBrowserFingerPrint(): string {
        const baseInfo = getDeviceBaseInfo();
        const canvasStr = getCanvasFinger();
        const webglStr = getWebGLFinger();
        // 合并所有特征
        const allStr = baseInfo + canvasStr + webglStr;
        let fingerprint = md5Hash(allStr)
        setStorage('fingerprint', fingerprint)
        // 生成最终指纹
        return fingerprint;
    }

    return {
        getBrowserFingerPrint
    }
}