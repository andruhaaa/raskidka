import logo from './logo.svg';
import React from 'react';
import './App.css';

const MUTJE = "Мытье"
const GOTOVKA = "Готовка"
const UBORKA = "Уборка"
const GREBEC = "Гребля"
const bojcy = ["Антоха", "Дрон", "Егор", "Боря"]
const jobs = [MUTJE, GOTOVKA, UBORKA, GREBEC]
const exceptions = {
  "Антоха": [GOTOVKA],
  "Егор": [MUTJE, UBORKA],
}

function App() {

  const [raskidka, setRaskidka] = React.useState({})

  const raspred = () => {
    const boys = randomOrder(bojcy)
    const jobsOrdered = randomOrder(jobs)
    let res = {}
    boys.forEach(boy => {
      const randomIndex = Math.floor(Math.random() * jobsOrdered.length);
      const boyJob = jobsOrdered[randomIndex]
      res[boy] = boyJob
      jobsOrdered.splice(randomIndex, 1)
    })

    let hasExceptions = false
    Object.keys(exceptions).map((k,v) => {
      const boyExceptions = exceptions[k]
      if (boyExceptions.includes(res[k])) {
        hasExceptions = true
      }
    })

    if (hasExceptions) {
      raspred()
    } else {
      setRaskidka(res)
    }
  }

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
        <h1>Распределение обязанностей</h1>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1 }}>
          <h2 style={{marginLeft: 10}}>Бойцы:</h2>
          <ol>
            {bojcy.map((bojec) => (
              <li style={{marginTop: 10}}>{bojec}</li>
            ))}
          </ol>
          <h2 style={{marginLeft: 10, marginBottom: 10}}>Обязанности:</h2>
          <ol>
            {jobs.map((job) => (
              <li style={{marginTop: 10}}>{job}</li>
            ))}
          </ol>
          <h2 style={{marginLeft: 10, marginBottom: 10}}>Исключения:</h2>
          <ol>
            {Object.keys(exceptions).map((k,v) => (
              <li style={{marginTop: 10}}>{`${k}: ${exceptions[k]}`}</li>
            ))}
          </ol>
        </div>
        <div style={{ flex: 1 }}>
          <h2>Результат:</h2>
          <ol>
            {Object.keys(raskidka).map((k,v) => (
              <li style={{marginTop: 10}}>{`${k}: ${raskidka[k]}`}</li>
            ))}
          </ol>
        </div>
      </div>
      <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 50}}>
        <button onClick={raspred} style={{width :100, height :50}}>Раскидать</button>
      </div>
    </div>
  );
}

const randomOrder = (arr) => {
  return arr
      .map(value => ({ value, sort: Math.random()  }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value  }) => value)
}

export default App;
