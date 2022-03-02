import { useState } from "react"
import styles from "./App.module.css"
import poweredImage from "./assets/powered.png"
import leftArrowImage from "./assets/leftarrow.png"
import { GridItem } from "./components/GridItem"

import { levels, calculateImc, Level } from "./helpers/imc"

const App = () => {

    const [ heightField, setheightField ] = useState<number>(0)
    const [ weightField, setWeightField ] = useState<number>(0)
    const [ toShow, setToShow ] = useState<Level | null>(null)

    const handleCalculateButton = () => {

        if(heightField && weightField) {
            setToShow(calculateImc(heightField, weightField))
        } else {
            alert("Preencha todos os campos corretamente!")
        }
        
    }

    const handleBackButton = () => {
        setToShow(null)
        setheightField(0)
        setWeightField(0)
    }

    return (
        <div className={styles.main}>
            <header>
                <div className={styles.headerContainer}>
                    <img src={poweredImage} width={150} alt="Logo" />
                </div>
            </header>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <h1>Calcule o seu IMC.</h1>
                    <p>IMC é a sigla para Índice de Massa Corporal,que é um cálculo que serve para avaliar se a pessoa está dentro do seu peso ideal em relação à altura.</p>

                    <input
                        type="number"
                        placeholder="Digite sua altura. Ex: 1.5 (em metros)"
                        value={heightField > 0 ? heightField : ""}
                        onChange={e => setheightField(parseFloat(e.target.value))}
                        disabled={toShow ? true : false}
                    />

                    <input
                        type="number"
                        placeholder="Digite seu peso. Ex: 57.8 (em Kg)"
                        value={weightField > 0 ? weightField : ""}
                        onChange={e => setWeightField(parseFloat(e.target.value))}
                        disabled={toShow ? true : false}
                    />

                    <button
                        onClick={handleCalculateButton}
                        disabled={toShow ? true : false}
                    >Calcular</button>

                </div>
                <div className={styles.rightSide}>
                    {!toShow &&
                        <div className={styles.grid}>
                            {levels.map((item, key) => (
                                <GridItem key={key} item={item} />
                            ))}
                        </div>
                    }
                    {toShow &&
                        <div className={styles.rightBig}>
                            <div className={styles.rightArrow} onClick={handleBackButton}>
                                <img src={leftArrowImage} alt="" width={26} />
                            </div>
                            <GridItem item={toShow} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default App