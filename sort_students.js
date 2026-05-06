const fs = require('fs');

const code = fs.readFileSync('script.js', 'utf8');

// Find the STUDENTS array
const startIdx = code.indexOf('const STUDENTS = [');
if (startIdx === -1) throw new Error("Could not find STUDENTS array");

// We need to parse the array safely. We can't just JSON.parse because it has unquoted keys and single quotes.
// Let's extract the array string by matching braces.
let depth = 0;
let arrayStart = code.indexOf('[', startIdx);
let arrayEnd = -1;

for (let i = arrayStart; i < code.length; i++) {
    if (code[i] === '[') depth++;
    else if (code[i] === ']') {
        depth--;
        if (depth === 0) {
            arrayEnd = i;
            break;
        }
    }
}

const arrayStr = code.substring(arrayStart, arrayEnd + 1);

// This function uses eval to get the array
const students = eval(arrayStr);

// Now sort the students by name
students.sort((a, b) => a.name.localeCompare(b.name));

// Re-stringify the array manually to keep formatting
function stringifyStudent(s) {
    let out = '    {\n';
    out += `        name: '${s.name}',\n`;
    out += `        photo: ${s.photo ? "'" + s.photo + "'" : 'null'},\n`;
    if (Array.isArray(s.track)) {
        out += `        track: [${s.track.map(t => "'" + t + "'").join(', ')}],\n`;
    } else {
        out += `        track: '${s.track}',\n`;
    }
    out += `        color: '${s.color}',\n`;
    out += '        social: {\n';
    if (s.social) {
        for (const [k, v] of Object.entries(s.social)) {
            out += `            ${k}:  '${v}',\n`;
        }
    }
    out += '        },\n';
    out += '    }';
    return out;
}

const newArrayStr = '[\n' + students.map(stringifyStudent).join(',\n') + ',\n]';

const newCode = code.substring(0, arrayStart) + newArrayStr + code.substring(arrayEnd + 1);

fs.writeFileSync('script.js', newCode, 'utf8');
console.log('Sorted successfully!');
