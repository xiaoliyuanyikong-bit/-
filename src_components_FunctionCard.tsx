import React from 'react'
import { FuncCard, formatFunc } from '../utils/functions'

export default function FunctionCard({ card, showDetails = false }: { card: FuncCard; showDetails?: boolean }) {
  const stroke = card.a > 0 ? '#1976d2' : card.a < 0 ? '#d32f2f' : '#2e7d32'
  // map x from -4..4 to svg coords; svg y flips
  const y = (x: number) => -(card.a * x + card.b)
  const x1 = -4, x2 = 4
  const y1 = y(x1), y2 = y(x2)

  return (
    <div style={{
      border: '1px solid rgba(0,0,0,0.12)',
      borderRadius: 8,
      padding: 12,
      width: 200,
      background: 'white',
      boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
    }}>
      <div style={{ fontSize: 18, fontWeight: 700 }}>{formatFunc(card)}</div>
      <div style={{ height: 90, marginTop: 8 }}>
        <svg viewBox='-5 -6 10 12' width='100%' height='100%'>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={0.25} />
          <rect x='-5' y='-6' width='10' height='12' fill='none' stroke='rgba(0,0,0,0.04)' />
        </svg>
      </div>
      {showDetails && (
        <div style={{ fontSize: 13, marginTop: 8 }}>
          <div>傾き a: {card.a}</div>
          <div>切片 b: {card.b}</div>
        </div>
      )}
    </div>
  )
}