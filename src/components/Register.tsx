import type { ReactNode } from 'react'

export interface Column {
  key: string
  label: string
  /** Right-aligned numeric column. */
  num?: boolean
  width?: string
}

interface Props {
  columns: Column[]
  rows: Array<Record<string, ReactNode>>
  /** Body cells in the body face instead of mono (for prose registers). */
  prose?: boolean
  dense?: boolean
  caption?: string
  foot?: Record<string, ReactNode>
  className?: string
}

/** A ruled ledger table with stamped column heads. */
export function Register({ columns, rows, prose, dense, caption, foot, className = '' }: Props) {
  const cls = ['ledger', prose && 'ledger--prose', dense && 'ledger--dense', className].filter(Boolean).join(' ')
  return (
    <table className={cls}>
      {caption && <caption className="head" style={{ textAlign: 'left', padding: '0 0 8px' }}>{caption}</caption>}
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key} scope="col" className={c.num ? 'num' : undefined} style={c.width ? { width: c.width } : undefined}>
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {columns.map((c) => (
              <td key={c.key} className={c.num ? 'num' : undefined}>
                {r[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {foot && (
        <tfoot>
          <tr>
            {columns.map((c) => (
              <td key={c.key} className={c.num ? 'num' : undefined}>
                {foot[c.key]}
              </td>
            ))}
          </tr>
        </tfoot>
      )}
    </table>
  )
}
