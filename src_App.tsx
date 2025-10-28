import React, { useState } from 'react'
import FunctionCard from './components/FunctionCard'
import { FuncCard, randomCard } from './utils/functions'

export default function App() {
  const [playerCard, setPlayerCard] = useState<FuncCard | null>(null)
  const [cpuCard, setCpuCard] = useState<FuncCard | null>(null)
  const [score, setScore] = useState({ player: 0, cpu: 0 })
  const [round, setRound] = useState(0)
  const maxRounds = 5

  function draw() {
    const p = randomCard()
    let c = randomCard()
    while (c.a === p.a && c.b === p.b) {
      c = randomCard()
    }
    setPlayerCard(p)
    setCpuCard(c)
    setRound(r => r + 1)

    // 判定: Slope War
    if (p.a > c.a) {
      setScore(s => ({ ...s, player: s.player + 1 }))
    } else if (p.a < c.a) {
      setScore(s => ({ ...s, cpu: s.cpu + 1 }))
    } else {
      if (p.b > c.b) setScore(s => ({ ...s, player: s.player + 1 }))
      else if (p.b < c.b) setScore(s => ({ ...s, cpu: s.cpu + 1 }))
    }
  }

  function reset() {
    setPlayerCard(null); setCpuCard(null); setScore({ player: 0, cpu: 0 }); setRound(0)
  }

  const finished = round >= maxRounds

  return (
    <div className='app'>
      <div className='header'>
        <h1>一次関数トランプ（Prototype）</h1>
        <div className='small'>Round: {round} / {maxRounds}</div>
      </div>

      <div className='cards'>
        <div>
          <h3>あなた</h3>
          {playerCard ? <FunctionCard card={playerCard} showDetails /> : <div style={{width:200,height:120,display:'flex',alignItems:'center',justifyContent:'center',background:'#fff',borderRadius:8}}>カードなし</div>}
        </div>
        <div>
          <h3>CPU</h3>
          {cpuCard ? <FunctionCard card={cpuCard} showDetails /> : <div style={{width:200,height:120,display:'flex',alignItems:'center',justifyContent:'center',background:'#fff',borderRadius:8}}>カードなし</div>}
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        {!finished ? <button className='button' onClick={draw}>カードを引く</button> : <button className='button' onClick={reset}>もう一度</button>}
      </div>

      <div style={{ marginTop: 20 }}>
        <strong>スコア</strong>
        <div>あなた: {score.player}  |  CPU: {score.cpu}</div>
      </div>

      <div style={{ marginTop: 20, color: '#555' }}>
        ルール: 傾き (a) を比較。傾きが同じなら切片 (b) を比較します。
      </div>
    </div>
  )
}