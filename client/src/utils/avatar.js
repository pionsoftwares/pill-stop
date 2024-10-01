/**
 * Convert a string to a hexadecimal color code.
 * @param {string} string - The input string for color generation.
 * @returns {string} - Hexadecimal color code.
 */
export function stringToColor(string) {
    let hash = 0

    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    const color =
        '#' +
        [0, 8, 16].map((shift) => `00${((hash >> shift) & 0xff).toString(16)}`.slice(-2)).join('')

    return color
}

/**
 * Generate Avatar properties based on a given name.
 * @param {string} name - The name for which the avatar is generated.
 * @returns {Object} - Avatar properties including bgcolor and children (initials).
 */
export function stringAvatar(name) {
    if (!name || typeof name !== 'string') {
        return {
            sx: {
                bgcolor: '#000000'
            },
            children: 'NA'
        }
    }

    const initials = getInitials(name)

    return {
        sx: {
            bgcolor: stringToColor(name)
        },
        children: initials
    }
}

/**
 * Convert a string to title case.
 * @param {string} str - The input string to convert to title case.
 * @returns {string} - The title case version of the input string.
 */
export function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
}

/**
 * Get initials from a given name.
 * @param {string} firstName - The first name to extract initials from.
 * @returns {string} - Initials derived from the first name.
 */
export function getInitials(firstName = '') {
    const initials = firstName
        .replace(/-/g, ' ')
        .split(' ')
        .slice(0, 4)
        .map((word) => word.charAt(0))
        .join('')
        .toUpperCase()
    return initials
}
export function luminance(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// export Function to get a contrasting color
export function getContrastingColor(hex) {
    return luminance(hex) > 0.5 ? '#000000' : '#ffffff'
}
