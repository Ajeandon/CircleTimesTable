const WIDTH_SQ = window.innerWidth;
const RADIUS = (window.innerHeight / 2) - 50;
let hue = 0;

const body = document.querySelector("body");
body.style.background = "#000";
body.style.height = "100vh";
body.style.width = "100%";
body.style.display = "flex";
body.style.justifyContent = "center";
body.style.alignItems = "center";

const canvas = document.createElement("canvas");
body.appendChild(canvas);
canvas.width = WIDTH_SQ;
canvas.height = WIDTH_SQ;
canvas.style.background = "#000";

function drawCircle(ctx) {
    ctx.beginPath();
    ctx.arc(WIDTH_SQ / 2, WIDTH_SQ / 2, RADIUS, 0, 2 * Math.PI);
    ctx.strokeStyle = `${hslToHex(hue, 100, 50)}`;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

function getPointOnCircle(angle) {
    const point = {x: 0, y: 0};
    point.x = (WIDTH_SQ / 2) + RADIUS * Math.cos(angle);
    point.y = (WIDTH_SQ / 2) + RADIUS * Math.sin(angle);
    return point;
}

function hslToHex(h, s, l) {
    // Convert hue to degrees
    h = h / 360;

    // Convert saturation and lightness to 0-1 range
    s = s / 100;
    l = l / 100;

    let r, g, b;

    if (s === 0) {
        // If saturation is 0, the color is achromatic (gray)
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    // Convert RGB values to hexadecimal string
    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function drawLines(n, f) {
    for (let i = 0; i <= n; i++) {
        if (i === 0) {
            continue;
        }

        const p_start = getPointOnCircle((i % n) * (2 * Math.PI / n));
        const p_end = getPointOnCircle(((i * f) % n) * (2 * Math.PI / n));

        ctx.beginPath();
        ctx.moveTo(p_start.x, p_start.y);
        ctx.lineTo(p_end.x, p_end.y);
        // ctx.strokeStyle = "#4bffb6";
        ctx.strokeStyle = `${hslToHex(hue, 100, 50)}`;
        ctx.lineWidth = "2px";
        ctx.stroke();
        ctx.closePath();
    }
}

const ctx = canvas.getContext("2d");
let total = 150;
let factor = 0;

function animate() {
    ctx.clearRect(0, 0, WIDTH_SQ, WIDTH_SQ);
    drawCircle(ctx);
    drawLines(total, factor);

    factor += 0.004;
    console.log(hue);
    if (hue > 700) {
        hue = 0;
    } else {
        hue+=0.02;
    }

    requestAnimationFrame(animate);
}

animate();