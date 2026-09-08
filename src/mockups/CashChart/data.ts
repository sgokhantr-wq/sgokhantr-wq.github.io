// synthetic — no real jobs, customers, people or dollars
export const WEEKS = ['W36', 'W37', 'W38', 'W39', 'W40', 'W41', 'W42', 'W43', 'W44', 'W45', 'W46', 'W47', 'W48']

/** Money in and out per week, in $K. Illustrative round figures. */
export const OUT = [232, 245, 228, 251, 219, 262, 238, 244, 227, 255, 236, 241, 230]
export const IN = [250, 211, 240, 199, 247, 216, 252, 216, 249, 217, 296, 287, 268]

export const NET = IN.map((v, i) => v - OUT[i])
/** The running balance: the figure the office actually watches. */
export const CUM = NET.reduce<number[]>((a, n) => [...a, (a.at(-1) ?? 0) + n], [])

/** The balance the office does not want to cross, and the weeks that cross it. */
export const FLOOR = -60
export const DIPS = CUM.map((v, i) => (v < FLOOR ? i : -1)).filter((i) => i >= 0)

export const NOTE = 'receipts at the measured terms: median 35 d over 90 paid jobs'
